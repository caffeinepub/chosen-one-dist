import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle,
  FileAudio,
  Image,
  Lock,
  Pause,
  Play,
  Plus,
  Trash2,
  Upload as UploadIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";
import { ExternalBlob, createActor } from "../backend";
import { useAuth } from "../hooks/use-auth";
import { useAppStore } from "../store";
import { TrackType } from "../types";

function unwrapResult<T>(
  result: { __kind__: "ok"; ok: T } | { __kind__: "err"; err: string },
): T {
  if (result.__kind__ === "err") throw new Error(result.err);
  return result.ok;
}

/** Returns true when the error is a transient storage/platform error (not a validation error). */
function isStorageError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err);
  return (
    msg.toLowerCase().includes("v3") ||
    msg.toLowerCase().includes("certificate") ||
    msg.toLowerCase().includes("expected v3") ||
    msg.toLowerCase().includes("response body") ||
    msg.toLowerCase().includes("canister is stopped") ||
    msg.toLowerCase().includes("ic0508") ||
    msg.toLowerCase().includes("canister stopped") ||
    msg.toLowerCase().includes("network") ||
    msg.toLowerCase().includes("fetch") ||
    msg.toLowerCase().includes("failed to fetch")
  );
}

/** Translate platform-level storage errors into clear artist-facing messages. */
function classifyUploadError(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err);
  if (
    msg.toLowerCase().includes("v3") ||
    msg.toLowerCase().includes("certificate") ||
    msg.toLowerCase().includes("expected v3") ||
    msg.toLowerCase().includes("response body")
  ) {
    return "Upload temporarily unavailable — the storage service is initializing. Please try again in a moment.";
  }
  if (
    msg.toLowerCase().includes("canister is stopped") ||
    msg.toLowerCase().includes("ic0508") ||
    msg.toLowerCase().includes("canister stopped")
  ) {
    return "The platform is restarting. Please wait a minute and try uploading again.";
  }
  if (
    msg.toLowerCase().includes("network") ||
    msg.toLowerCase().includes("fetch") ||
    msg.toLowerCase().includes("failed to fetch")
  ) {
    return "Network error during upload. Check your connection and try again.";
  }
  return msg || "Upload failed. Please try again.";
}

/** Delays (ms) between successive retry attempts — covers IC storage cold-starts (up to 30-45s). */
const RETRY_DELAYS = [3000, 6000, 12000, 20000, 30000];

/**
 * Retry an async operation with fixed backoff delays.
 * onWarmingUp is called on the FIRST retryable failure so the UI can show a
 * non-blocking "storage is warming up" status before all retries are exhausted.
 */
async function withUploadRetry<T>(
  fn: () => Promise<T>,
  onWarmingUp?: () => void,
): Promise<T> {
  let lastErr: unknown;
  for (let attempt = 0; attempt <= RETRY_DELAYS.length; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (!isStorageError(err) || attempt === RETRY_DELAYS.length) break;
      if (attempt === 0 && onWarmingUp) onWarmingUp();
      await new Promise((res) => setTimeout(res, RETRY_DELAYS[attempt]));
    }
  }
  throw lastErr;
}

const GENRES = [
  "Hip-Hop",
  "R&B",
  "Pop",
  "Electronic",
  "Rock",
  "Jazz",
  "Classical",
  "Country",
  "Blues",
  "Soul",
  "Reggae",
  "Latin",
  "Metal",
  "Punk",
  "Folk",
  "Gospel",
  "EDM",
  "House",
  "Techno",
  "Drum & Bass",
  "Trap",
  "Lo-Fi",
  "Afrobeats",
  "K-Pop",
  "Indie",
  "Alternative",
  "Funk",
  "Disco",
  "Ambient",
  "New Age",
  "World Music",
  "Other",
];

const PREVIEW_DURATION = 30.0;
const GOLD_COLOR = "rgba(212, 175, 55, 0.35)";
const GOLD_BORDER = "rgba(212, 175, 55, 0.85)";

interface TrackFormData {
  id: string;
  artistName: string;
  title: string;
  trackType: TrackType;
  genre: string;
  customGenre: string;
  price: string;
  description: string;
  releaseDate: string;
  preOrder: boolean;
  explicit: boolean;
  audioFile: File | null;
  coverArt: File | null;
  audioProgress: number;
  coverProgress: number;
  previewStartSecs: number;
  previewEndSecs: number;
  songDetails: string;
}

function emptyTrack(): TrackFormData {
  return {
    id: crypto.randomUUID(),
    artistName: "",
    title: "",
    trackType: TrackType.single,
    genre: "",
    customGenre: "",
    price: "",
    description: "",
    releaseDate: "",
    preOrder: false,
    explicit: false,
    audioFile: null,
    coverArt: null,
    audioProgress: 0,
    coverProgress: 0,
    previewStartSecs: 0,
    previewEndSecs: PREVIEW_DURATION,
    songDetails: "",
  };
}

function formatTime(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function resolveGenre(genre: string, customGenre: string): string {
  return genre === "Other" && customGenre.trim() ? customGenre.trim() : genre;
}

// ── Waveform Preview Selector ─────────────────────────────────────────────────
function WaveformSelector({
  audioFile,
  startSecs,
  endSecs,
  onChange,
  trackIndex,
}: {
  audioFile: File;
  startSecs: number;
  endSecs: number;
  onChange: (start: number, end: number) => void;
  trackIndex: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WaveSurfer | null>(null);
  const regionsRef = useRef<ReturnType<typeof RegionsPlugin.create> | null>(
    null,
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [duration, setDuration] = useState(0);
  const [localStart, setLocalStart] = useState(startSecs);
  const [localEnd, setLocalEnd] = useState(endSecs);

  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  });

  useEffect(() => {
    if (!containerRef.current) return;
    const regions = RegionsPlugin.create();
    regionsRef.current = regions;

    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "rgba(212,175,55,0.3)",
      progressColor: "rgba(212,175,55,0.75)",
      cursorColor: "#d4af37",
      barWidth: 2,
      barGap: 1,
      barRadius: 2,
      height: 80,
      normalize: true,
      plugins: [regions],
    });
    wsRef.current = ws;

    const initialStart = startSecs;
    ws.on("ready", () => {
      const dur = ws.getDuration();
      setDuration(dur);
      setIsLoading(false);
      const clampedEnd = Math.min(initialStart + PREVIEW_DURATION, dur);
      const clampedStart = Math.max(0, clampedEnd - PREVIEW_DURATION);
      setLocalStart(clampedStart);
      setLocalEnd(clampedEnd);
      onChangeRef.current(clampedStart, clampedEnd);
      regions.addRegion({
        id: "preview",
        start: clampedStart,
        end: clampedEnd,
        color: GOLD_COLOR,
        drag: true,
        resize: false,
        minLength: PREVIEW_DURATION,
        maxLength: PREVIEW_DURATION,
      });
      const regionEl = containerRef.current?.querySelector(
        '[data-id="preview"]',
      ) as HTMLElement | null;
      if (regionEl) {
        regionEl.style.borderLeft = `2px solid ${GOLD_BORDER}`;
        regionEl.style.borderRight = `2px solid ${GOLD_BORDER}`;
      }
    });

    ws.on("finish", () => setIsPlaying(false));
    ws.on("pause", () => setIsPlaying(false));
    ws.on("play", () => setIsPlaying(true));

    regions.on("region-updated", (region) => {
      const dur = ws.getDuration();
      let s = region.start;
      let e = s + PREVIEW_DURATION;
      if (e > dur) {
        e = dur;
        s = Math.max(0, e - PREVIEW_DURATION);
      }
      region.setOptions({ start: s, end: e });
      setLocalStart(s);
      setLocalEnd(e);
      onChangeRef.current(s, e);
    });

    const url = URL.createObjectURL(audioFile);
    ws.load(url).catch(() => {
      toast.error("Could not load audio for waveform preview.");
      setIsLoading(false);
    });

    return () => {
      ws.destroy();
      URL.revokeObjectURL(url);
      wsRef.current = null;
    };
  }, [audioFile, startSecs]);

  const handlePlayPreview = () => {
    const ws = wsRef.current;
    if (!ws) return;
    if (isPlaying) {
      ws.pause();
    } else {
      ws.play(localStart, localEnd);
    }
  };

  return (
    <div
      className="rounded-xl border border-primary/30 bg-black/60 p-3 sm:p-4 space-y-3 w-full"
      data-ocid={`waveform-selector-${trackIndex}`}
    >
      <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
        <p className="text-xs font-semibold text-primary uppercase tracking-widest">
          30-Second Preview Window
        </p>
        {!isLoading && duration > 0 && (
          <span className="text-xs text-muted-foreground">
            Track: {formatTime(duration)}
          </span>
        )}
      </div>

      {isLoading && (
        <div className="h-20 flex items-center justify-center">
          <div className="flex gap-1 items-end h-10">
            {Array.from({ length: 20 }, (_, i) => i).map((i) => (
              <div
                key={`bar-${i}`}
                className="w-1 rounded-full bg-primary/30 animate-pulse"
                style={{
                  height: `${20 + Math.sin(i * 0.8) * 14}px`,
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div
        ref={containerRef}
        className="rounded-lg overflow-hidden cursor-crosshair w-full"
        style={
          isLoading
            ? { position: "absolute", opacity: 0, pointerEvents: "none" }
            : undefined
        }
      />

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handlePlayPreview}
            disabled={isLoading}
            className="gap-1.5 border-primary/40 text-primary hover:bg-primary/10 shrink-0"
            data-ocid={`preview-play-btn-${trackIndex}`}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5" />
            ) : (
              <Play className="w-3.5 h-3.5" />
            )}
            {isPlaying ? "Stop" : "Audition Preview"}
          </Button>
          <p className="text-xs text-muted-foreground hidden sm:block">
            Drag the gold region to choose your preview window
          </p>
          <p className="text-xs text-muted-foreground sm:hidden">
            Drag gold region
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-primary font-semibold">
            {formatTime(localStart)}
          </span>
          <span className="text-muted-foreground">→</span>
          <span className="text-primary font-semibold">
            {formatTime(localEnd)}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── File drop zone ────────────────────────────────────────────────────────────
function FileDropZone({
  label,
  accept,
  maxMB,
  file,
  progress,
  icon: Icon,
  onChange,
  ocid,
}: {
  label: string;
  accept: string;
  maxMB: number;
  file: File | null;
  progress: number;
  icon: React.ElementType;
  onChange: (f: File | null) => void;
  ocid?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const validate = (f: File) => {
    if (f.size > maxMB * 1024 * 1024) {
      toast.error(`File exceeds ${maxMB} MB limit`);
      return;
    }
    onChange(f);
  };
  const dropZoneId = `dropzone-${ocid ?? "file"}`;

  return (
    <label
      htmlFor={dropZoneId}
      className={`block border-2 border-dashed rounded-lg p-4 sm:p-5 text-center cursor-pointer transition-smooth group w-full ${
        file
          ? "border-primary/60 bg-primary/5"
          : "border-border hover:border-primary/40"
      }`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const d = e.dataTransfer.files[0];
        if (d) validate(d);
      }}
      data-ocid={ocid}
    >
      <input
        id={dropZoneId}
        ref={ref}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => e.target.files?.[0] && validate(e.target.files[0])}
      />
      {file ? (
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-primary shrink-0" />
          <div className="flex-1 min-w-0 text-left">
            <p className="text-sm font-medium truncate">{file.name}</p>
            <p className="text-xs text-muted-foreground">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
            {progress > 0 && progress < 100 && (
              <div className="mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>
          <button
            type="button"
            aria-label="Remove file"
            className="text-muted-foreground hover:text-destructive transition-colors-fast shrink-0 p-1"
            onClick={(e) => {
              e.stopPropagation();
              onChange(null);
            }}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 py-3 sm:py-4">
          <Icon className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-smooth" />
          <p className="text-sm text-muted-foreground">
            <span className="text-primary font-medium">Tap to upload</span>
            <span className="hidden sm:inline"> or drag &amp; drop</span>
          </p>
          <p className="text-xs text-muted-foreground">
            {label} · Max {maxMB} MB
          </p>
        </div>
      )}
    </label>
  );
}

// ── Per-track form ────────────────────────────────────────────────────────────
function TrackForm({
  data,
  index,
  isAlbumMode,
  onChange,
  showRemove,
  onRemove,
}: {
  data: TrackFormData;
  index: number;
  isAlbumMode: boolean;
  onChange: (patch: Partial<TrackFormData>) => void;
  showRemove: boolean;
  onRemove: () => void;
}) {
  const artistReceives =
    data.price && Number.parseFloat(data.price) > 0
      ? `$${(Number.parseFloat(data.price) * 0.85).toFixed(2)}`
      : null;

  return (
    <div
      className={`space-y-4 sm:space-y-5 ${index > 0 ? "pt-6 border-t border-border" : ""}`}
    >
      {index > 0 && (
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Track {index + 1}
          </h3>
          {showRemove && (
            <button
              type="button"
              aria-label="Remove track"
              onClick={onRemove}
              className="text-muted-foreground hover:text-destructive transition-colors-fast p-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Artist + Title — single col mobile, 2 col sm+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-2">
          <Label htmlFor={`artistName-${index}`}>Artist Name</Label>
          <Input
            id={`artistName-${index}`}
            placeholder="Your artist name"
            value={data.artistName}
            onChange={(e) => onChange({ artistName: e.target.value })}
            data-ocid={`artist-name-input-${index}`}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`title-${index}`}>Track Title</Label>
          <Input
            id={`title-${index}`}
            placeholder="Track title"
            value={data.title}
            onChange={(e) => onChange({ title: e.target.value })}
            data-ocid={`track-title-input-${index}`}
          />
        </div>
      </div>

      {/* Track Type — single upload only */}
      {!isAlbumMode && (
        <div className="space-y-2">
          <Label>Track Type</Label>
          <div className="flex gap-6 flex-wrap">
            {(["Single", "Album"] as const).map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 cursor-pointer min-h-[44px]"
              >
                <input
                  type="radio"
                  name={`trackType-${index}`}
                  checked={
                    type === "Single"
                      ? data.trackType === TrackType.single
                      : data.trackType === TrackType.album
                  }
                  onChange={() =>
                    onChange({
                      trackType:
                        type === "Single" ? TrackType.single : TrackType.album,
                    })
                  }
                  className="accent-primary w-4 h-4"
                  data-ocid={`track-type-${type.toLowerCase()}-${index}`}
                />
                <span className="text-sm font-medium">{type}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Genre + Price */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-2">
          <Label>Genre</Label>
          <Select
            value={data.genre}
            onValueChange={(v) =>
              onChange({
                genre: v,
                customGenre: v !== "Other" ? "" : data.customGenre,
              })
            }
          >
            <SelectTrigger data-ocid={`genre-select-${index}`}>
              <SelectValue placeholder="Select genre" />
            </SelectTrigger>
            <SelectContent className="max-h-72 overflow-y-auto">
              {GENRES.map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {data.genre === "Other" && (
            <Input
              id={`customGenre-${index}`}
              placeholder="Enter your genre (e.g. Afro-Jazz, Christian Rap…)"
              value={data.customGenre}
              onChange={(e) => onChange({ customGenre: e.target.value })}
              className="mt-2"
              data-ocid={`custom-genre-input-${index}`}
              autoFocus
            />
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor={`price-${index}`}>
            Price (USD)
            {artistReceives && (
              <span className="ml-2 text-xs font-normal text-primary">
                Artist receives {artistReceives}
              </span>
            )}
          </Label>
          <Input
            id={`price-${index}`}
            type="number"
            min="0.01"
            step="0.01"
            placeholder="0.99"
            value={data.price}
            onChange={(e) => onChange({ price: e.target.value })}
            data-ocid={`price-input-${index}`}
          />
          {!artistReceives && (
            <p className="text-xs text-muted-foreground">
              Artist receives 85% of each sale
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor={`desc-${index}`}>Description</Label>
        <Textarea
          id={`desc-${index}`}
          placeholder="Tell listeners about this track..."
          rows={3}
          value={data.description}
          onChange={(e) => onChange({ description: e.target.value })}
          data-ocid={`description-input-${index}`}
        />
      </div>

      {/* Release Date */}
      <div className="space-y-2">
        <Label htmlFor={`releaseDate-${index}`}>Release Date</Label>
        <Input
          id={`releaseDate-${index}`}
          type="date"
          value={data.releaseDate}
          onChange={(e) => onChange({ releaseDate: e.target.value })}
          data-ocid={`release-date-input-${index}`}
        />
      </div>

      {/* Toggles */}
      <div className="flex flex-wrap gap-4 sm:gap-6">
        <div className="flex items-center gap-3 min-h-[44px]">
          <Switch
            id={`preOrder-${index}`}
            checked={data.preOrder}
            onCheckedChange={(v) => onChange({ preOrder: v })}
            data-ocid={`pre-order-toggle-${index}`}
          />
          <Label htmlFor={`preOrder-${index}`} className="cursor-pointer">
            Pre-Order
          </Label>
        </div>
        <div className="flex items-center gap-3 min-h-[44px]">
          <Switch
            id={`explicit-${index}`}
            checked={data.explicit}
            onCheckedChange={(v) => onChange({ explicit: v })}
            data-ocid={`explicit-toggle-${index}`}
          />
          <Label htmlFor={`explicit-${index}`} className="cursor-pointer">
            Explicit Content
          </Label>
        </div>
      </div>

      {/* Audio File Upload */}
      <div className="space-y-2">
        <Label className="text-label">
          Audio File{" "}
          <span className="text-destructive normal-case tracking-normal font-normal text-sm">
            *
          </span>
        </Label>
        <FileDropZone
          label="MP3 or WAV"
          accept=".mp3,.wav,audio/mpeg,audio/wav"
          maxMB={200}
          file={data.audioFile}
          progress={data.audioProgress}
          icon={FileAudio}
          onChange={(f) =>
            onChange({
              audioFile: f,
              audioProgress: 0,
              previewStartSecs: 0,
              previewEndSecs: PREVIEW_DURATION,
            })
          }
          ocid={`audio-dropzone-${index}`}
        />
      </div>

      {/* Waveform preview selector — full-width on mobile */}
      {data.audioFile && (
        <div className="space-y-2 w-full overflow-hidden">
          <Label className="text-label">
            Preview Selector{" "}
            <span className="text-muted-foreground normal-case tracking-normal font-normal text-xs">
              (drag gold region to choose 30s preview)
            </span>
          </Label>
          <WaveformSelector
            audioFile={data.audioFile}
            startSecs={data.previewStartSecs}
            endSecs={data.previewEndSecs}
            onChange={(start, end) =>
              onChange({ previewStartSecs: start, previewEndSecs: end })
            }
            trackIndex={index}
          />
        </div>
      )}

      {/* Song Details */}
      <div className="space-y-2">
        <Label htmlFor={`songDetails-${index}`}>Song Details (optional)</Label>
        <Textarea
          id={`songDetails-${index}`}
          placeholder="Add credits, lyrics, production notes, or anything you want fans to know"
          rows={4}
          value={data.songDetails}
          onChange={(e) => onChange({ songDetails: e.target.value })}
          className="resize-y"
          data-ocid={`song-details-input-${index}`}
        />
      </div>

      {/* Cover Art Upload */}
      <div className="space-y-2">
        <Label className="text-label">
          Cover Art{" "}
          <span className="text-destructive normal-case tracking-normal font-normal text-sm">
            *
          </span>
        </Label>
        <FileDropZone
          label="JPG or PNG"
          accept=".jpg,.jpeg,.png,image/jpeg,image/png"
          maxMB={10}
          file={data.coverArt}
          progress={data.coverProgress}
          icon={Image}
          onChange={(f) => onChange({ coverArt: f, coverProgress: 0 })}
          ocid={`cover-dropzone-${index}`}
        />
      </div>
    </div>
  );
}

// ── Auth gate ─────────────────────────────────────────────────────────────────
function AuthGate() {
  return (
    <div className="flex flex-col items-center justify-center py-20 sm:py-24 gap-6 text-center animate-fade-in px-4">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
        <Lock className="w-8 h-8 text-muted-foreground" />
      </div>
      <div>
        <h2 className="text-xl font-display font-semibold mb-2">
          Login required to upload music
        </h2>
        <p className="text-muted-foreground text-sm max-w-sm">
          Sign in to your Chosen One Productions account to release your tracks.
        </p>
      </div>
      <Button asChild className="gap-2" data-ocid="upload-login-btn">
        <Link to="/login">Sign In</Link>
      </Button>
    </div>
  );
}

// ── Success state ─────────────────────────────────────────────────────────────
function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 sm:py-24 gap-6 text-center animate-slide-up px-4">
      <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center gold-glow">
        <CheckCircle className="w-8 h-8 text-primary" />
      </div>
      <div>
        <h2 className="text-2xl font-display font-semibold mb-2">
          Track released! 🎵
        </h2>
        <p className="text-muted-foreground">
          Your music is now live on Chosen One Productions.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <Button
          asChild
          variant="default"
          className="w-full sm:w-auto"
          data-ocid="view-dashboard-btn"
        >
          <Link to="/dashboard">View in Dashboard</Link>
        </Button>
        <Button
          variant="outline"
          onClick={onReset}
          className="w-full sm:w-auto"
          data-ocid="upload-another-btn"
        >
          Upload Another
        </Button>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Upload() {
  const { isAuthenticated, sessionToken } = useAuth();
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const showCrownBanner = useAppStore((s) => s.showCrownBanner);

  const [activeTab, setActiveTab] = useState("single");
  const [singleTrack, setSingleTrack] = useState<TrackFormData>(emptyTrack());
  const [albumTracks, setAlbumTracks] = useState<TrackFormData[]>([
    emptyTrack(),
  ]);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [success, setSuccess] = useState(false);
  /** Set to true on the first transient storage failure — shows warming-up status. */
  const [storageWarmingUp, setStorageWarmingUp] = useState(false);
  /** Non-null when all retries are exhausted on a storage error — enables Try Again UI. */
  const [storageError, setStorageError] = useState<Error | null>(null);
  /** Holds the last tracks array so we can re-trigger without re-filling the form. */
  const lastTracksRef = useRef<TrackFormData[]>([]);

  const uploadMutation = useMutation({
    mutationFn: async (tracks: TrackFormData[]) => {
      if (!actor) throw new Error("Not connected to backend");
      if (!sessionToken) throw new Error("Not logged in.");
      lastTracksRef.current = tracks;
      const uploadedTitles: string[] = [];

      for (let i = 0; i < tracks.length; i++) {
        const track = tracks[i];
        const label = track.title || `track ${i + 1}`;
        const finalGenre = resolveGenre(track.genre, track.customGenre);

        if (!track.artistName.trim())
          throw new Error(`Artist name required for ${label}`);
        if (!track.title.trim())
          throw new Error(`Track title required for track ${i + 1}`);
        if (!finalGenre) throw new Error(`Genre required for ${label}`);
        if (track.genre === "Other" && !track.customGenre.trim())
          throw new Error(`Please enter a custom genre for ${label}`);
        if (!track.price || Number.parseFloat(track.price) < 0.01)
          throw new Error(`Price must be at least $0.01 for ${label}`);
        if (!track.audioFile)
          throw new Error(`Audio file required for ${label}`);
        if (!track.coverArt) throw new Error(`Cover art required for ${label}`);

        const audioBytes = new Uint8Array(await track.audioFile.arrayBuffer());
        const audioBlob = ExternalBlob.fromBytes(audioBytes).withUploadProgress(
          (pct) => {
            if (activeTab === "single") {
              setSingleTrack((prev) => ({ ...prev, audioProgress: pct }));
            } else {
              setAlbumTracks((prev) =>
                prev.map((t, idx) =>
                  idx === i ? { ...t, audioProgress: pct } : t,
                ),
              );
            }
          },
        );

        const coverBytes = new Uint8Array(await track.coverArt.arrayBuffer());
        const coverBlob = ExternalBlob.fromBytes(coverBytes).withUploadProgress(
          (pct) => {
            if (activeTab === "single") {
              setSingleTrack((prev) => ({ ...prev, coverProgress: pct }));
            } else {
              setAlbumTracks((prev) =>
                prev.map((t, idx) =>
                  idx === i ? { ...t, coverProgress: pct } : t,
                ),
              );
            }
          },
        );

        const priceInCents = BigInt(
          Math.round(Number.parseFloat(track.price) * 100),
        );

        // Retry the upload on transient storage/v3 errors.
        // Cover art is bundled into the same uploadTrack call as audio, so
        // any ExternalBlob error from either file is caught by the same wrapper.
        const trackId = await withUploadRetry(
          async () => {
            const uploadResult = await actor.uploadTrack(sessionToken, {
              title: track.title,
              artistName: track.artistName,
              genre: finalGenre,
              trackType: track.trackType,
              priceInCents,
              description: track.description,
              releaseDate:
                track.releaseDate || new Date().toISOString().split("T")[0],
              explicit: track.explicit,
              preOrder: track.preOrder,
              audioFile: audioBlob,
              coverArt: coverBlob,
              previewStartSecs: track.previewStartSecs,
              previewEndSecs: track.previewEndSecs,
              songDetails: track.songDetails || undefined,
            });
            return unwrapResult(uploadResult);
          },
          () => setStorageWarmingUp(true),
        );

        await withUploadRetry(
          async () => {
            const publishResult = await actor.publishTrack(
              sessionToken,
              trackId,
            );
            unwrapResult(publishResult);
          },
          () => setStorageWarmingUp(true),
        );

        try {
          await actor.notifyTrackUploaded(sessionToken, track.title);
        } catch {
          /* Non-critical */
        }

        uploadedTitles.push(track.title);
      }
      return uploadedTitles;
    },
    onSuccess: (uploadedTitles) => {
      setStorageWarmingUp(false);
      setStorageError(null);
      setSuccess(true);
      queryClient.invalidateQueries({ queryKey: ["artist-tracks"] });
      queryClient.invalidateQueries({ queryKey: ["published-tracks"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      const firstTitle = uploadedTitles[0] ?? "your track";
      const msg =
        uploadedTitles.length > 1
          ? `👑 Your ${uploadedTitles.length} tracks are now live on Chosen One Distribution!`
          : `👑 "${firstTitle}" is now live on Chosen One Distribution!`;
      showCrownBanner(msg);
    },
    onError: (err: Error) => {
      setStorageWarmingUp(false);
      if (isStorageError(err)) {
        setStorageError(err);
      } else {
        setStorageError(null);
        toast.error(classifyUploadError(err));
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      toast.error("Please accept the Terms of Service to continue.");
      return;
    }
    setStorageWarmingUp(false);
    setStorageError(null);
    const tracks = activeTab === "single" ? [singleTrack] : albumTracks;
    uploadMutation.mutate(tracks);
  };

  const patchAlbumTrack = (i: number, patch: Partial<TrackFormData>) => {
    setAlbumTracks((prev) =>
      prev.map((t, idx) => (idx === i ? { ...t, ...patch } : t)),
    );
  };

  const handleReset = () => {
    setSingleTrack(emptyTrack());
    setAlbumTracks([emptyTrack()]);
    setTermsAccepted(false);
    setSuccess(false);
    setStorageWarmingUp(false);
    setStorageError(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        <AuthGate />
      </div>
    );
  }
  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        <SuccessState onReset={handleReset} />
      </div>
    );
  }

  return (
    <div
      className="max-w-2xl mx-auto px-4 py-8 sm:py-10 animate-fade-in"
      data-ocid="upload-page"
    >
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl sm:text-3xl">🎵</span>
          <h1 className="text-2xl sm:text-3xl font-display font-bold">
            Release Your Track
          </h1>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base">
          Distribute your music worldwide. Artists receive{" "}
          <span className="text-primary font-semibold">85%</span> of every sale.
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        data-ocid="upload-tabs"
      >
        {/* Tabs — full-width, scrollable label on small screens */}
        <TabsList className="mb-5 sm:mb-6 w-full">
          <TabsTrigger
            value="single"
            className="flex-1 text-xs sm:text-sm"
            data-ocid="tab-single"
          >
            Single Upload
          </TabsTrigger>
          <TabsTrigger
            value="album"
            className="flex-1 text-xs sm:text-sm"
            data-ocid="tab-album"
          >
            Album Upload
            <Badge
              variant="secondary"
              className="ml-1.5 text-xs hidden sm:inline-flex"
            >
              up to 10
            </Badge>
          </TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit}>
          <TabsContent value="single">
            <div className="card-elevated p-4 sm:p-6">
              <TrackForm
                data={singleTrack}
                index={0}
                isAlbumMode={false}
                onChange={(patch) =>
                  setSingleTrack((prev) => ({ ...prev, ...patch }))
                }
                showRemove={false}
                onRemove={() => {}}
              />
            </div>
          </TabsContent>

          <TabsContent value="album">
            {/* Album track list — scrollable container on mobile */}
            <div className="card-elevated p-4 sm:p-6 overflow-y-auto max-h-[70vh] sm:max-h-none">
              {albumTracks.map((track, i) => (
                <TrackForm
                  key={track.id}
                  data={track}
                  index={i}
                  isAlbumMode={true}
                  onChange={(patch) => patchAlbumTrack(i, patch)}
                  showRemove={albumTracks.length > 1}
                  onRemove={() =>
                    setAlbumTracks((prev) => prev.filter((_, idx) => idx !== i))
                  }
                />
              ))}
              {albumTracks.length < 10 && (
                <button
                  type="button"
                  onClick={() =>
                    setAlbumTracks((prev) => [...prev, emptyTrack()])
                  }
                  className="mt-6 w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-border rounded-lg text-sm text-muted-foreground hover:border-primary hover:text-primary transition-smooth min-h-[52px]"
                  data-ocid="add-track-btn"
                >
                  <Plus className="w-4 h-4" />
                  Add Another Track ({albumTracks.length}/10)
                </button>
              )}
            </div>
          </TabsContent>

          {/* Footer actions */}
          <div className="mt-5 sm:mt-6 card-elevated p-4 sm:p-6 space-y-4 sm:space-y-5">
            <label
              className="flex items-start gap-3 cursor-pointer group"
              data-ocid="terms-checkbox"
            >
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-0.5 accent-primary w-4 h-4 shrink-0"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors-fast">
                I agree to the{" "}
                <span className="text-primary underline underline-offset-2">
                  Terms of Service
                </span>{" "}
                and confirm I own the rights to this content.
              </span>
            </label>

            <Button
              type="submit"
              disabled={uploadMutation.isPending || !termsAccepted}
              className="w-full gap-2 h-12 text-base font-semibold"
              data-ocid="release-now-btn"
            >
              {uploadMutation.isPending ? (
                <>
                  <span className="animate-spin inline-block">⏳</span>
                  Uploading &amp; Publishing…
                </>
              ) : (
                <>
                  <UploadIcon className="w-5 h-5" />
                  Release Now
                </>
              )}
            </Button>

            {uploadMutation.isPending && (
              <p className="text-xs text-muted-foreground text-center animate-pulse">
                {storageWarmingUp
                  ? "⚡ Storage is warming up, please wait — this may take up to a minute…"
                  : "Uploading your files — this may take a moment for large audio files…"}
              </p>
            )}

            {/* Storage error: all retries exhausted — show Try Again */}
            {storageError && !uploadMutation.isPending && (
              <div
                className="rounded-lg border border-primary/30 bg-primary/5 p-4 space-y-3"
                data-ocid="storage-error-banner"
              >
                <p className="text-sm font-medium text-foreground">
                  Upload temporarily unavailable — the storage service is
                  initializing. Please try again in a moment.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-2 border-primary/50 text-primary hover:bg-primary/10"
                  onClick={() => {
                    setStorageError(null);
                    setStorageWarmingUp(false);
                    uploadMutation.mutate(lastTracksRef.current);
                  }}
                  data-ocid="storage-retry-btn"
                >
                  <UploadIcon className="w-4 h-4" />
                  Try Again
                </Button>
              </div>
            )}
          </div>
        </form>
      </Tabs>
    </div>
  );
}
