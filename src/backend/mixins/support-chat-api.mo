import OutCall "mo:caffeineai-http-outcalls/outcall";

// On-site customer support AI chat assistant.
// Uses OpenAI Chat Completions API via http-outcalls.
// No stable state needed — stateless per-request.
mixin (transform : OutCall.Transform) {

  // Placeholder API key — swap with a real key in admin settings.
  let _openAiApiKey : Text = "";

  let _supportSystemPrompt : Text = "You are a helpful customer support assistant for Chosen One Distribution, a music distribution platform. Help customers with questions about: uploading songs, purchasing music, downloading songs, Stripe payments, artist accounts and PIN, royalties and payouts, platform rules and policies. Keep answers concise and friendly. If you cannot answer a specific question or it requires account-specific investigation, tell the user you're unable to help with that specific issue and suggest they reach out through the platform's File a Complaint or Contact Us pages. Do not make up information you don't know.";

  // Build the JSON request body for OpenAI Chat Completions.
  func buildOpenAiRequestBody(question : Text, language : Text) : Text {
    let systemPromptWithLang = _supportSystemPrompt # " Respond in the language: " # language;
    // Escape double-quotes and backslashes in user-provided text to produce valid JSON.
    let safeQuestion = escapeJsonString(question);
    let safeSystemPrompt = escapeJsonString(systemPromptWithLang);
    "{\"model\":\"gpt-3.5-turbo\",\"messages\":[{\"role\":\"system\",\"content\":\"" #
      safeSystemPrompt #
      "\"},{\"role\":\"user\",\"content\":\"" #
      safeQuestion #
      "\"}],\"max_tokens\":300,\"temperature\":0.7}";
  };

  // Minimal JSON string escaper for backslash and double-quote characters.
  func escapeJsonString(s : Text) : Text {
    let withBackslash = s.replace(#text "\\", "\\\\");
    let withQuote     = withBackslash.replace(#text "\"", "\\\"");
    let withNewline   = withQuote.replace(#text "\n", "\\n");
    withNewline.replace(#text "\r", "\\r");
  };

  // Extract the assistant's reply text from the OpenAI JSON response.
  // Expected shape: {"choices":[{"message":{"content":"<reply>"}},...]}
  // Uses a lightweight substring search — no full JSON parser needed.
  func parseSupportChatReply(responseBody : Text) : ?Text {
    // Find `"content":"` after the first message entry.
    let marker = "\"content\":\"";
    switch (findSubstring(responseBody, marker)) {
      case null { null };
      case (?startIdx) {
        let markerEnd = startIdx + marker.size();
        let _afterMarker : Nat = if (responseBody.size() > markerEnd) { responseBody.size() - markerEnd } else { 0 };
        // Slice from just after the marker to the end of the string.
        let tail = substringFrom(responseBody, markerEnd);
        // Find the closing `"` that ends the content value (un-escaped).
        switch (findUnescapedQuote(tail)) {
          case null { null };
          case (?endIdx) {
            let raw = substringSlice(tail, 0, endIdx);
            // Unescape the common JSON escape sequences.
            ?unescapeJsonString(raw);
          };
        };
      };
    };
  };

  // Find the first occurrence of `needle` in `haystack`; returns the
  // character index of the start of the match, or null.
  func findSubstring(haystack : Text, needle : Text) : ?Nat {
    let hLen = haystack.size();
    let nLen = needle.size();
    if (nLen == 0) return ?0;
    if (nLen > hLen) return null;
    let hChars = haystack.toArray();
    let nChars = needle.toArray();
    var i : Nat = 0;
    label search loop {
      if (i + nLen > hLen) break search;
      var matched = true;
      var j : Nat = 0;
      label inner loop {
        if (j >= nLen) break inner;
        if (hChars[i + j] != nChars[j]) {
          matched := false;
          break inner;
        };
        j += 1;
      };
      if (matched) return ?i;
      i += 1;
    };
    null;
  };

  // Return the substring of `s` starting at character index `from`.
  func substringFrom(s : Text, from : Nat) : Text {
    let chars = s.toArray();
    let len = chars.size();
    if (from >= len) return "";
    var result : Text = "";
    var i = from;
    while (i < len) {
      result #= Text.fromChar(chars[i]);
      i += 1;
    };
    result;
  };

  // Return the substring of `s` from index `from` (inclusive) to `to` (exclusive).
  func substringSlice(s : Text, from : Nat, to : Nat) : Text {
    let chars = s.toArray();
    let len = chars.size();
    var result : Text = "";
    var i = from;
    while (i < to and i < len) {
      result #= Text.fromChar(chars[i]);
      i += 1;
    };
    result;
  };

  // Find the index of the first un-escaped `"` in `s`.
  func findUnescapedQuote(s : Text) : ?Nat {
    let chars = s.toArray();
    let len = chars.size();
    var i : Nat = 0;
    let backslash : Char = '\\';
    let dquote : Char = '\u{22}'; // U+0022 = double-quote character
    while (i < len) {
      if (chars[i] == backslash) {
        i += 2; // skip escaped character
      } else if (chars[i] == dquote) {
        return ?i;
      } else {
        i += 1;
      };
    };
    null;
  };

  // Reverse the common JSON escape sequences in a parsed string value.
  func unescapeJsonString(s : Text) : Text {
    let withNewline   = s.replace(#text "\\n", "\n");
    let withCarriage  = withNewline.replace(#text "\\r", "\r");
    let withTab       = withCarriage.replace(#text "\\t", "\t");
    let withQuote     = withTab.replace(#text "\\\"", "\"");
    withQuote.replace(#text "\\\\", "\\");
  };

  // ─── Public API ──────────────────────────────────────────────────────────

  /// Ask the support AI a question.
  /// `language` is a 2-letter BCP-47 code (en, es, fr, pt, de, ja, ko, ar).
  /// Returns the assistant reply, or an error message the frontend can display.
  public func askSupportChat(question : Text, language : Text) : async { #ok : Text; #err : Text } {
    if (_openAiApiKey == "") {
      // No API key configured — return a friendly fallback.
      return #err("I'm having trouble connecting right now. Please try again or contact us at our Help Center.");
    };

    let headers : [OutCall.Header] = [
      { name = "Content-Type";  value = "application/json" },
      { name = "Authorization"; value = "Bearer " # _openAiApiKey },
    ];

    let body = buildOpenAiRequestBody(question, language);

    try {
      let responseBody = await OutCall.httpPostRequest(
        "https://api.openai.com/v1/chat/completions",
        headers,
        body,
        transform,
      );

      switch (parseSupportChatReply(responseBody)) {
        case (?reply) { #ok(reply) };
        case null {
          #err("I'm having trouble connecting right now. Please try again or contact us at our Help Center.");
        };
      };
    } catch (_) {
      #err("I'm having trouble connecting right now. Please try again or contact us at our Help Center.");
    };
  };
};
