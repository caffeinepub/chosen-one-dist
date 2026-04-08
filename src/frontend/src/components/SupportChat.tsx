import { useActor } from "@caffeineai/core-infrastructure";
import { MessageCircle, Minus, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createActor } from "../backend";
import { useTranslation } from "../hooks/use-translation";

interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  text: string;
  showLinks?: boolean;
}

const CANNED_RESPONSES: Array<{ patterns: RegExp; answer: string }> = [
  {
    patterns: /upload|how.*(add|post|submit).*(song|track|music|album)/i,
    answer:
      "To upload music, sign in to your artist account and click **Upload** in the navigation. You can upload singles or batch-upload up to 10 songs as an album. Supported formats: MP3 and WAV. You can also set a 30-second preview clip using the waveform selector.",
  },
  {
    patterns: /purchase|buy|how.*(get|download|buy)/i,
    answer:
      "To purchase a song, visit the Store, click **Buy Now** on any track, and complete checkout. You can pay with Apple Pay, Google Pay, PayPal, CashApp, Zelle, or enter your card details manually. After payment, you can download your songs immediately.",
  },
  {
    patterns: /download|where.*(find|get).*(song|purchase|bought)/i,
    answer:
      "After a successful purchase, you'll see a download prompt right on the confirmation screen. Click **Download Now** for each track — the file saves to your device in the original format (MP3 or WAV). If you registered with an email + PIN, you can also re-download from **My Purchases** within 30 days.",
  },
  {
    patterns: /payment|pay|apple pay|google pay|paypal|cashapp|zelle|card/i,
    answer:
      "We accept **Apple Pay, Google Pay, PayPal, CashApp, Zelle**, and manual card entry (cardholder name, card number, CVC). All payments are processed securely through Stripe.",
  },
  {
    patterns: /royalt|85|percent|payout|earn|revenue/i,
    answer:
      "Artists receive **85% of every sale** — one of the highest payout rates in music distribution. Your royalty balance updates in real time on your Royalty Dashboard. You can request a payout once you've entered your banking information.",
  },
  {
    patterns: /pin|password|change.*pin|forgot.*pin|reset.*pin/i,
    answer:
      "To change your PIN, go to your Artist Dashboard and look for the **Change PIN** option. You'll need to enter your current PIN to set a new one (4–6 digits). If you've forgotten your PIN, please reach out to our support team through the Contact Us page.",
  },
  {
    patterns: /expire|expir|30.?day|re.?download/i,
    answer:
      "Download links are valid for **30 days** from the purchase date. To re-download within that window, go to **My Purchases** and click Re-Download. After 30 days, downloads expire and cannot be recovered.",
  },
  {
    patterns: /genre|music.*(type|style|category)/i,
    answer:
      "We support all major genres — Hip Hop, R&B, Pop, Rock, Electronic, Jazz, Classical, Country, Gospel, Afrobeats, Reggae, Latin, Metal, Blues, Soul, Folk, and more. Artists can also enter a custom genre if their style doesn't fit a category.",
  },
  {
    patterns: /receipt|invoice|proof.*(purchase|payment)/i,
    answer:
      "After purchase, you can download a branded receipt image directly from the confirmation screen. It's styled as a real invoice with **Chosen One Distribution** at the top and includes all your purchase details.",
  },
  {
    patterns: /share|share.*(song|track|platform)/i,
    answer:
      "Every song in the store has a **Share** button so you can share it on social media or messaging apps. There's also a platform share button to spread the word about Chosen One Distribution.",
  },
  {
    patterns: /artist.*profile|profile.*page|social.*(link|media)/i,
    answer:
      "Each artist has a public profile page where fans can browse their full catalog. Artists can add links to Instagram, Twitter/X, TikTok, YouTube, Facebook, SoundCloud, Spotify, Apple Music, and more from their dashboard — these appear as clickable icons on their profile.",
  },
  {
    patterns: /hello|hi|hey|greet|help/i,
    answer:
      "Hi! I'm the Chosen One Support assistant. I can help you with uploading music, buying and downloading songs, payment methods, royalties, PIN changes, and more. What do you need help with?",
  },
];

function getCannedResponse(question: string): string | null {
  for (const entry of CANNED_RESPONSES) {
    if (entry.patterns.test(question)) return entry.answer;
  }
  return null;
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 justify-start">
      <div className="w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center shrink-0">
        <span className="text-xs">👑</span>
      </div>
      <div className="bg-zinc-800 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-bounce [animation-delay:0ms]" />
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-bounce [animation-delay:150ms]" />
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
}

function AssistantMessage({
  text,
  showLinks,
}: { text: string; showLinks?: boolean }) {
  const needsLinks =
    showLinks ||
    text.toLowerCase().includes("file a complaint") ||
    text.toLowerCase().includes("contact us") ||
    text.toLowerCase().includes("reach out") ||
    text.toLowerCase().includes("our support team") ||
    text.toLowerCase().includes("contact");

  const renderText = (raw: string) => {
    const parts = raw.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <strong
          key={`bold-${i}-${part.slice(0, 8)}`}
          className="text-yellow-300 font-semibold"
        >
          {part}
        </strong>
      ) : (
        part
      ),
    );
  };

  return (
    <div className="flex items-end gap-2 justify-start">
      <div className="w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center shrink-0 mt-auto">
        <span className="text-xs">👑</span>
      </div>
      <div className="bg-zinc-800 border border-zinc-700 rounded-2xl rounded-bl-sm px-4 py-3 max-w-[85%]">
        <p className="text-sm text-white leading-relaxed whitespace-pre-wrap">
          {renderText(text)}
        </p>
        {needsLinks && (
          <div className="mt-2 pt-2 border-t border-zinc-700 flex flex-wrap gap-2">
            <a
              href="/help"
              className="text-xs text-yellow-400 hover:text-yellow-300 underline underline-offset-2 transition-colors"
              data-ocid="support-chat-help-link"
            >
              📚 Help Center
            </a>
            <span className="text-zinc-600">·</span>
            <a
              href="/complaint"
              className="text-xs text-yellow-400 hover:text-yellow-300 underline underline-offset-2 transition-colors"
              data-ocid="support-chat-complaint-link"
            >
              📋 File a Complaint
            </a>
            <span className="text-zinc-600">·</span>
            <a
              href="mailto:ChosenOneProductions901@gmail.com"
              className="text-xs text-yellow-400 hover:text-yellow-300 underline underline-offset-2 transition-colors"
              data-ocid="support-chat-contact-link"
            >
              📧 Contact Us
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

const QUICK_QUESTIONS = [
  "How do I upload music?",
  "What payment methods are accepted?",
  "How do I download my purchase?",
  "How does the 85% royalty work?",
];

let messageIdCounter = 0;

export function SupportChat() {
  const { t, language } = useTranslation();
  const { actor } = useActor(createActor);
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasWelcomed, setHasWelcomed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  useEffect(() => {
    if (open && !hasWelcomed) {
      setHasWelcomed(true);
      setMessages([
        {
          id: ++messageIdCounter,
          role: "assistant",
          text: t("support_chat_welcome"),
        },
      ]);
    }
  }, [open, hasWelcomed, t]);

  useEffect(() => {
    if (open && !minimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, minimized]);

  async function handleSend(question?: string) {
    const msg = (question ?? input).trim();
    if (!msg || loading) return;

    setInput("");
    setMessages((prev) => [
      ...prev,
      { id: ++messageIdCounter, role: "user", text: msg },
    ]);
    setLoading(true);

    try {
      if (actor) {
        try {
          const result = await actor.askSupportChat(msg, language);
          if (result.__kind__ === "ok" && result.ok) {
            setMessages((prev) => [
              ...prev,
              { id: ++messageIdCounter, role: "assistant", text: result.ok },
            ]);
            return;
          }
        } catch {
          // Fall through to canned responses
        }
      }

      const canned = getCannedResponse(msg);
      if (canned) {
        setMessages((prev) => [
          ...prev,
          { id: ++messageIdCounter, role: "assistant", text: canned },
        ]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: ++messageIdCounter,
          role: "assistant",
          text: "I'm not sure I have the right answer for that one. Our team can help you directly — please visit our Help Center or File a Complaint page.",
          showLinks: true,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: ++messageIdCounter,
          role: "assistant",
          text: t("support_chat_error"),
          showLinks: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const showQuickQuestions = messages.length <= 1 && !loading;

  // Safe bottom offset for mobile notch/home bar
  const safeBottomPx = "max(1rem, env(safe-area-inset-bottom))";

  return (
    <>
      {/* Floating chat panel */}
      {open && (
        <div
          className="fixed right-3 sm:right-5 z-50 flex flex-col rounded-2xl shadow-2xl border border-zinc-700 overflow-hidden animate-slide-up"
          data-ocid="support-chat-panel"
          style={{
            bottom: `calc(${safeBottomPx} + 4.5rem)`,
            width: "min(420px, calc(100vw - 1.5rem))",
            maxHeight: minimized ? "56px" : "min(520px, calc(100dvh - 10rem))",
            transition: "max-height 0.2s ease",
          }}
        >
          {/* Header */}
          <div className="bg-zinc-900 border-b border-zinc-700 px-3 sm:px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center shrink-0">
                <span className="text-sm">👑</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-yellow-400">
                  {t("support_chat_title")}
                </h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <p className="text-xs text-zinc-400">Always here to help</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setMinimized((m) => !m)}
                className="p-2 rounded-lg hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white min-w-[36px] min-h-[36px] flex items-center justify-center"
                aria-label={
                  minimized ? "Expand support chat" : "Minimize support chat"
                }
                data-ocid="support-chat-minimize-btn"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white min-w-[36px] min-h-[36px] flex items-center justify-center"
                aria-label="Close support chat"
                data-ocid="support-chat-close-btn"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!minimized && (
            <>
              {/* Messages area — scrollable */}
              <div
                className="flex-1 overflow-y-auto bg-zinc-900/95 px-3 py-4 space-y-3 min-h-0"
                style={{
                  maxHeight: "calc(min(520px, calc(100dvh - 10rem)) - 160px)",
                }}
              >
                {messages.map((msg) =>
                  msg.role === "user" ? (
                    <div key={msg.id} className="flex justify-end">
                      <div className="bg-yellow-400 text-black rounded-2xl rounded-br-sm px-4 py-3 max-w-[85%]">
                        <p className="text-sm leading-relaxed font-medium">
                          {msg.text}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <AssistantMessage
                      key={msg.id}
                      text={msg.text}
                      showLinks={msg.showLinks}
                    />
                  ),
                )}
                {loading && <TypingIndicator />}

                {showQuickQuestions && (
                  <div
                    className="pt-2 space-y-1.5"
                    data-ocid="support-chat-quick-questions"
                  >
                    <p className="text-xs text-zinc-500 font-medium px-1">
                      Common questions:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {QUICK_QUESTIONS.map((q) => (
                        <button
                          key={q}
                          type="button"
                          onClick={() => handleSend(q)}
                          className="text-xs bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-yellow-500/40 text-zinc-300 hover:text-yellow-300 rounded-xl px-3 py-2 transition-colors text-left min-h-[36px]"
                          data-ocid={`support-chat-quick-${q.toLowerCase().replace(/\s+/g, "-").slice(0, 30)}`}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input area */}
              <div className="bg-zinc-900 border-t border-zinc-700 p-3 shrink-0">
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={t("support_chat_placeholder")}
                    disabled={loading}
                    className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/30 disabled:opacity-50 transition-colors min-h-[44px]"
                    data-ocid="support-chat-input"
                    maxLength={500}
                  />
                  <button
                    type="button"
                    onClick={() => handleSend()}
                    disabled={!input.trim() || loading}
                    className="w-11 h-11 rounded-xl bg-yellow-400 hover:bg-yellow-300 disabled:bg-zinc-700 disabled:text-zinc-500 text-black flex items-center justify-center transition-colors shrink-0"
                    aria-label={t("support_chat_send")}
                    data-ocid="support-chat-send-btn"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-zinc-600 mt-2 text-center">
                  Can't find what you need?{" "}
                  <a
                    href="/help"
                    className="text-yellow-500/70 hover:text-yellow-400 underline underline-offset-2"
                  >
                    Help Center
                  </a>{" "}
                  or{" "}
                  <a
                    href="/complaint"
                    className="text-yellow-500/70 hover:text-yellow-400 underline underline-offset-2"
                  >
                    File a Complaint
                  </a>
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Floating trigger button — above safe area */}
      <button
        type="button"
        onClick={() => {
          if (open) {
            setOpen(false);
          } else {
            setOpen(true);
            setMinimized(false);
          }
        }}
        className="fixed right-3 sm:right-5 z-50 w-14 h-14 rounded-full bg-yellow-400 hover:bg-yellow-300 text-black shadow-lg hover:shadow-yellow-400/30 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
        style={{ bottom: safeBottomPx }}
        aria-label={open ? "Close support chat" : "Open support chat"}
        data-ocid="support-chat-trigger"
      >
        {open ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>
    </>
  );
}
