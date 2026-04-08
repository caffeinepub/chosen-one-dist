import { Button } from "@/components/ui/button";
import { Download, Receipt, X } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "../hooks/use-translation";
import { useAppStore } from "../store";

// ─── Receipt Generator ────────────────────────────────────────────────────────

function generateReceiptPng(songs: string[], sessionId: string): string {
  const canvas = document.createElement("canvas");
  const W = 600;
  const lineH = 32;
  const padding = 40;
  const headerH = 180;
  const footerH = 80;
  const itemsH = Math.max(songs.length * lineH + 60, 80);
  canvas.width = W;
  canvas.height = headerH + itemsH + footerH + padding * 2;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  const H = canvas.height;

  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 3;
  ctx.strokeRect(12, 12, W - 24, H - 24);

  ctx.font = "52px serif";
  ctx.textAlign = "center";
  ctx.fillText("👑", W / 2, 68);

  ctx.fillStyle = "#d4af37";
  ctx.font = "bold 22px Georgia, serif";
  ctx.fillText("CHOSEN ONE DISTRIBUTION", W / 2, 100);

  ctx.fillStyle = "#b8962e";
  ctx.font = "13px Georgia, serif";
  ctx.fillText("Empowering Independent Artists", W / 2, 118);

  ctx.fillStyle = "#888";
  ctx.font = "11px monospace";
  ctx.fillText("Official Purchase Receipt", W / 2, 135);

  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, 148);
  ctx.lineTo(W - padding, 148);
  ctx.stroke();

  ctx.textAlign = "left";
  ctx.fillStyle = "#888";
  ctx.font = "11px monospace";
  const receiptId = sessionId
    ? `#${sessionId.slice(-8).toUpperCase()}`
    : `#${Date.now().toString(36).toUpperCase()}`;
  const dateStr = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  ctx.fillText(`Receipt ${receiptId}`, padding, 168);
  ctx.textAlign = "right";
  ctx.fillText(`Date: ${dateStr}`, W - padding, 168);

  ctx.strokeStyle = "#333";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, 182);
  ctx.lineTo(W - padding, 182);
  ctx.stroke();

  let y = 204;
  ctx.textAlign = "left";
  ctx.fillStyle = "#888";
  ctx.font = "11px monospace";
  ctx.fillText("PURCHASED TRACKS", padding, y);
  y += 16;

  ctx.strokeStyle = "#222";
  ctx.beginPath();
  ctx.moveTo(padding, y);
  ctx.lineTo(W - padding, y);
  ctx.stroke();
  y += 18;

  for (const song of songs) {
    ctx.fillStyle = "#e8e8e8";
    ctx.font = "bold 13px Georgia, serif";
    ctx.textAlign = "left";
    const label = song.length > 52 ? `${song.slice(0, 50)}…` : song;
    ctx.fillText(`🎵  ${label}`, padding, y + 10);
    y += lineH;
  }

  y += 8;
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, y);
  ctx.lineTo(W - padding, y);
  ctx.stroke();
  y += 24;

  ctx.textAlign = "center";
  ctx.fillStyle = "#d4af37";
  ctx.font = "bold 14px Georgia, serif";
  ctx.fillText(
    `${songs.length} Track${songs.length !== 1 ? "s" : ""} Purchased — Download available in My Purchases`,
    W / 2,
    y,
  );

  y += 36;
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, y);
  ctx.lineTo(W - padding, y);
  ctx.stroke();
  y += 22;

  ctx.textAlign = "center";
  ctx.fillStyle = "#d4af37";
  ctx.font = "13px Georgia, serif";
  ctx.fillText("Thank you for your purchase! 👑", W / 2, y);
  y += 20;
  ctx.fillStyle = "#555";
  ctx.font = "11px monospace";
  ctx.fillText("chosenonedist.com  •  85% artist royalties", W / 2, y);

  return canvas.toDataURL("image/png");
}

// ─── Crown Thank You Modal ─────────────────────────────────────────────────────

export function CrownThankYou() {
  const { thankYouVisible, thankYouSongs, hideThankYou } = useAppStore();
  const { t } = useTranslation();

  if (!thankYouVisible) return null;

  const handleDownloadReceipt = () => {
    const dataUrl = generateReceiptPng(thankYouSongs, "");
    if (!dataUrl) {
      toast.error("Could not generate receipt.");
      return;
    }
    const dateStr = new Date().toISOString().slice(0, 10);
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `receipt-${dateStr}.png`;
    a.click();
    toast.success("Receipt downloaded!");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-fade-in"
        onClick={hideThankYou}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Escape" || e.key === "Enter") hideThankYou();
        }}
        aria-label="Close thank you dialog"
      />

      {/* Modal — responsive sizing and padding */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none"
        data-ocid="crown-thank-you-modal"
      >
        <div
          className="pointer-events-auto w-full max-w-sm sm:max-w-md rounded-2xl bg-card border border-primary/40 p-6 sm:p-8 animate-crown-scale-in animate-crown-glow-pulse text-center relative max-h-[90dvh] overflow-y-auto scrollbar-hidden"
          style={{ boxShadow: "0 0 60px oklch(0.76 0.165 65 / 0.3)" }}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={hideThankYou}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-lg hover:bg-secondary transition-colors-fast text-muted-foreground hover:text-foreground min-w-[40px] min-h-[40px] flex items-center justify-center"
            aria-label="Close"
            data-ocid="thank-you-close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Crown icon */}
          <div className="flex justify-center mb-4 sm:mb-5">
            <span
              className="text-6xl sm:text-7xl animate-crown-scale-in"
              style={{
                filter:
                  "drop-shadow(0 0 20px oklch(0.76 0.165 65 / 0.9)) drop-shadow(0 0 40px oklch(0.76 0.165 65 / 0.5))",
                animationDelay: "0.1s",
              }}
            >
              👑
            </span>
          </div>

          {/* Message */}
          <h2 className="font-display text-xl sm:text-2xl font-bold text-primary mb-1">
            {t("thankYou")}
          </h2>
          <p className="text-foreground font-semibold text-base sm:text-lg mb-1">
            Chosen One Productions Distribution
          </p>
          <p className="text-muted-foreground text-sm mb-5 sm:mb-6">
            {t("downloadPrompt")}
          </p>

          {/* Song list */}
          {thankYouSongs.length > 0 && (
            <ul className="space-y-2 mb-5 sm:mb-6 text-left">
              {thankYouSongs.map((song) => (
                <li
                  key={song}
                  className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-secondary border border-border"
                >
                  <span className="text-primary text-lg shrink-0">🎵</span>
                  <span className="text-sm font-medium text-foreground truncate flex-1 min-w-0">
                    {song}
                  </span>
                  <span className="text-xs text-muted-foreground shrink-0 hidden sm:inline">
                    {t("downloadReady")}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Button
              type="button"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 font-semibold h-11 sm:h-12 text-sm sm:text-base"
              onClick={hideThankYou}
              data-ocid="thank-you-download-btn"
            >
              <Download className="w-4 h-4" />
              {t("downloadNow")}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full gap-2 border-primary/30 text-primary hover:bg-primary/10 h-11 sm:h-12 text-sm sm:text-base"
              onClick={handleDownloadReceipt}
              data-ocid="thank-you-receipt-btn"
            >
              <Receipt className="w-4 h-4" />
              Download Receipt
            </Button>
          </div>

          {/* Footer */}
          <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Chosen One Productions Distribution &bull; 85% Artist Royalties
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
