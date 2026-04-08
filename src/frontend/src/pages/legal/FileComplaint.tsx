import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import { CheckCircle, ChevronLeft } from "lucide-react";
import { useState } from "react";

const ISSUE_TYPES = [
  "Copyright / DMCA",
  "Payment Issue",
  "Download Problem",
  "Account Access",
  "Artist Dispute",
  "Inappropriate Content",
  "Royalty Discrepancy",
  "Technical Bug",
  "Other",
];

export default function FileComplaint() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    issueType: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.issueType ||
      !form.description.trim()
    )
      return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background" data-ocid="legal-page">
      <div
        className="bg-card border-b border-border py-8 sm:py-12 px-4 sm:px-6"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.76 0.165 65 / 0.08), transparent 60%), oklch(0.18 0 0)",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors-fast text-sm mb-5 sm:mb-6"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-3xl sm:text-4xl">📋</span>
            <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight">
              File a Complaint
            </h1>
          </div>
          <p className="text-muted-foreground text-sm mt-2 sm:mt-3">
            Chosen One Distribution · Last updated: April 2026
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {submitted ? (
          <div className="text-center py-16" data-ocid="complaint-success">
            <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            <h2 className="font-display font-bold text-2xl text-foreground mb-3">
              Complaint Received 👑
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Thank you for reaching out. Your complaint has been noted. For
              direct communication or if your matter is urgent, please email us
              directly at:
            </p>
            <a
              href="mailto:ChosenOneProductions901@gmail.com"
              className="inline-block px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors-fast"
            >
              ChosenOneProductions901@gmail.com
            </a>
            <p className="text-muted-foreground text-xs mt-6">
              We aim to respond to all complaints within 1–3 business days.
            </p>
            <Button
              type="button"
              variant="outline"
              className="mt-6"
              onClick={() => {
                setSubmitted(false);
                setForm({
                  name: "",
                  email: "",
                  issueType: "",
                  description: "",
                });
              }}
            >
              Submit Another Complaint
            </Button>
          </div>
        ) : (
          <>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              Use this form to submit a formal complaint or dispute. All
              complaints are reviewed by our team. Provide as much detail as
              possible so we can address your concern promptly. If your issue
              requires immediate attention, email us directly at{" "}
              <a
                href="mailto:ChosenOneProductions901@gmail.com"
                className="text-primary hover:underline"
              >
                ChosenOneProductions901@gmail.com
              </a>
              .
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              data-ocid="complaint-form"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="complaint-name">Full Name *</Label>
                  <Input
                    id="complaint-name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder="Your name"
                    required
                    data-ocid="complaint-name-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="complaint-email">Email Address *</Label>
                  <Input
                    id="complaint-email"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    placeholder="your@email.com"
                    required
                    data-ocid="complaint-email-input"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="complaint-type">Issue Type *</Label>
                <select
                  id="complaint-type"
                  value={form.issueType}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, issueType: e.target.value }))
                  }
                  required
                  className="w-full border border-input bg-background rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  data-ocid="complaint-type-select"
                >
                  <option value="">Select an issue type...</option>
                  {ISSUE_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="complaint-desc">Description *</Label>
                <Textarea
                  id="complaint-desc"
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  placeholder="Describe your complaint in detail. Include any relevant track titles, artist names, order numbers, or dates."
                  rows={6}
                  required
                  className="resize-none"
                  data-ocid="complaint-desc-input"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                data-ocid="complaint-submit-btn"
              >
                Submit Complaint
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
