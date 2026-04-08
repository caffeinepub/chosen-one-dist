import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  BarChart2,
  Check,
  DollarSign,
  Download,
  Eye,
  FileText,
  Globe,
  HelpCircle,
  KeyRound,
  Music,
  Pencil,
  RefreshCw,
  Share2,
  ShieldQuestion,
  Trash2,
  TrendingUp,
  Trophy,
  Upload,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";
import { hashPin, useAuth } from "../hooks/use-auth";
import { useTranslation } from "../hooks/use-translation";
import { useAppStore } from "../store";
import type {
  ArtistProfilePublic,
  ArtistSocialLinks,
  ArtistTrackSummary,
  DownloadReportEntry,
  RealTimeDashboardStats,
} from "../types";
import { TrackState, TrackType } from "../types";

const SECURITY_QUESTIONS = [
  "What was the name of your first pet?",
  "What is your mother's maiden name?",
  "What city were you born in?",
  "What was the name of your first school?",
  "What is the name of your favorite childhood friend?",
  "What street did you grow up on?",
  "What was your childhood nickname?",
  "What is your oldest sibling's middle name?",
  "What was the make of your first car?",
  "What is your favorite movie?",
];

// Extended actor type for social links + security question methods
type ActorWithExtras = ReturnType<typeof createActor> & {
  updateArtistSocialLinks: (
    token: string,
    links: ArtistSocialLinks,
  ) => Promise<{ __kind__: "ok"; ok: null } | { __kind__: "err"; err: string }>;
  getArtistProfile: (artistId: string) => Promise<
    | {
        __kind__: "ok";
        ok: {
          id: string;
          bio: string;
          name: string;
          status: string;
          createdAt: bigint;
          instagram?: string;
          twitterX?: string;
          tiktok?: string;
          youtube?: string;
          facebook?: string;
          soundcloud?: string;
          spotify?: string;
          appleMusic?: string;
          website?: string;
        };
      }
    | {
        __kind__: "err";
        err: string;
      }
  >;
  setArtistSecurityQuestion: (
    sessionToken: string,
    question: string,
    answerHash: string,
  ) => Promise<{ __kind__: "ok"; ok: null } | { __kind__: "err"; err: string }>;
  getArtistSecurityQuestion: (artistName: string) => Promise<string | null>;
};

const ALL_GENRES = [
  "Hip-Hop",
  "R&B / Soul",
  "Pop",
  "Electronic / Dance",
  "Rock",
  "Metal",
  "Jazz",
  "Blues",
  "Classical",
  "Country",
  "Reggae",
  "Latin",
  "Gospel / Christian",
  "Afrobeats",
  "Trap",
  "Lo-Fi",
  "Drill",
  "House",
  "Techno",
  "Ambient",
  "Folk / Acoustic",
  "Punk",
  "Indie",
  "Ska",
  "Funk",
  "World",
  "Other",
];

const CROWN_SESSION_KEY = "crown-welcome-shown";

function unwrapResult<T>(
  result: { __kind__: "ok"; ok: T } | { __kind__: "err"; err: string },
): T {
  if (result.__kind__ === "err") throw new Error(result.err);
  return result.ok;
}

/* ─── Stat Card ─── */
function StatCard({
  label,
  value,
  icon: Icon,
  sub,
  highlight,
}: {
  label: string;
  value: string;
  icon: typeof Music;
  sub?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`card-elevated p-4 sm:p-5 ${highlight ? "border border-primary/30" : ""}`}
    >
      <div className="flex items-start justify-between mb-2 sm:mb-3">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground leading-tight pr-2">
          {label}
        </p>
        <div
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-md flex items-center justify-center shrink-0 ${highlight ? "bg-primary/25" : "bg-primary/15"}`}
        >
          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
        </div>
      </div>
      <p className="font-display font-bold text-xl sm:text-2xl text-foreground">
        {value}
      </p>
      {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
    </div>
  );
}

/* ─── Top Track Card ─── */
function TopTrackCard({ track }: { track: ArtistTrackSummary }) {
  return (
    <div className="card-elevated p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
        <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-0.5">
          Top Track
        </p>
        <p className="font-display font-bold text-foreground truncate">
          {track.title}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {Number(track.saleCount).toLocaleString()} sales ·{" "}
          {Number(track.previewCount).toLocaleString()} previews · {track.genre}
        </p>
      </div>
      <Badge variant="secondary" className="shrink-0 capitalize text-xs">
        {track.trackType === TrackType.album ? "Album" : "Single"}
      </Badge>
    </div>
  );
}

/* ─── Edit Track Modal ─── */
interface EditForm {
  title: string;
  genre: string;
  customGenre: string;
  priceInCents: string;
  description: string;
  releaseDate: string;
  explicit: boolean;
  preOrder: boolean;
  previewStartSecs: string;
  previewEndSecs: string;
  songDetails: string;
}

function EditTrackModal({
  track,
  open,
  onClose,
  onSave,
  isPending,
}: {
  track: ArtistTrackSummary;
  open: boolean;
  onClose: () => void;
  onSave: (trackId: bigint, form: EditForm) => void;
  isPending: boolean;
}) {
  const { t } = useTranslation();
  const isOtherGenre = !ALL_GENRES.slice(0, -1).includes(track.genre);

  const [form, setForm] = useState<EditForm>({
    title: track.title,
    genre: isOtherGenre ? "Other" : track.genre,
    customGenre: isOtherGenre ? track.genre : "",
    priceInCents: String(Number(track.priceInCents)),
    description: "",
    releaseDate: track.releaseDate ?? "",
    explicit: false,
    preOrder: track.state === TrackState.preOrder,
    previewStartSecs: "",
    previewEndSecs: "",
    songDetails: "",
  });

  function setField<K extends keyof EditForm>(key: K, val: EditForm[K]) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="w-full max-w-lg mx-auto max-h-[92dvh] overflow-y-auto rounded-t-2xl sm:rounded-lg bottom-0 sm:bottom-auto fixed sm:relative inset-x-0 sm:inset-auto"
        data-ocid="edit-track-modal"
      >
        <DialogHeader>
          <DialogTitle className="font-display font-bold text-foreground flex items-center gap-2">
            <Pencil className="w-4 h-4 text-primary" />
            {t("editTrack")}: {track.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {/* Title */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-title">{t("trackTitle")}</Label>
            <Input
              id="edit-title"
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
              data-ocid="edit-track-title"
            />
          </div>

          {/* Genre */}
          <div className="space-y-1.5">
            <Label>{t("genre")}</Label>
            <Select
              value={form.genre}
              onValueChange={(v) => setField("genre", v)}
            >
              <SelectTrigger data-ocid="edit-track-genre">
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent>
                {ALL_GENRES.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.genre === "Other" && (
              <Input
                placeholder="Enter custom genre"
                value={form.customGenre}
                onChange={(e) => setField("customGenre", e.target.value)}
                className="mt-2"
                data-ocid="edit-track-custom-genre"
              />
            )}
          </div>

          {/* Price */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-price">{t("price")}</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                $
              </span>
              <Input
                id="edit-price"
                className="pl-7"
                value={
                  form.priceInCents === ""
                    ? ""
                    : String(Number(form.priceInCents) / 100)
                }
                onChange={(e) => {
                  const dollars = Number.parseFloat(e.target.value);
                  setField(
                    "priceInCents",
                    Number.isNaN(dollars)
                      ? "0"
                      : String(Math.round(dollars * 100)),
                  );
                }}
                type="number"
                min="0"
                step="0.01"
                placeholder="0.99"
                data-ocid="edit-track-price"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-description">{t("description")}</Label>
            <Textarea
              id="edit-description"
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
              placeholder="Describe this track..."
              rows={3}
              data-ocid="edit-track-description"
            />
          </div>

          {/* Song Details */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-song-details">{t("songDetails")}</Label>
            <Textarea
              id="edit-song-details"
              value={form.songDetails}
              onChange={(e) => setField("songDetails", e.target.value)}
              placeholder="Credits, lyrics, production notes... (optional)"
              rows={2}
              data-ocid="edit-track-song-details"
            />
          </div>

          {/* Release Date */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-release-date">{t("releaseDate")}</Label>
            <Input
              id="edit-release-date"
              type="date"
              value={form.releaseDate}
              onChange={(e) => setField("releaseDate", e.target.value)}
              data-ocid="edit-track-release-date"
            />
          </div>

          {/* Preview window */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-preview-start">Preview Window (seconds)</Label>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Start</p>
                <Input
                  id="edit-preview-start"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="e.g. 30"
                  value={form.previewStartSecs}
                  onChange={(e) => setField("previewStartSecs", e.target.value)}
                  data-ocid="edit-track-preview-start"
                />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">End</p>
                <Input
                  id="edit-preview-end"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="e.g. 60"
                  value={form.previewEndSecs}
                  onChange={(e) => setField("previewEndSecs", e.target.value)}
                  data-ocid="edit-track-preview-end"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Leave blank to keep current preview times
            </p>
          </div>

          {/* Flags */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1">
            <div className="flex items-center gap-2">
              <Checkbox
                id="edit-explicit"
                checked={form.explicit}
                onCheckedChange={(v) => setField("explicit", !!v)}
                data-ocid="edit-track-explicit"
              />
              <Label
                htmlFor="edit-explicit"
                className="cursor-pointer text-sm font-normal"
              >
                {t("explicit")}
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="edit-preorder"
                checked={form.preOrder}
                onCheckedChange={(v) => setField("preOrder", !!v)}
                data-ocid="edit-track-preorder"
              />
              <Label
                htmlFor="edit-preorder"
                className="cursor-pointer text-sm font-normal"
              >
                {t("preOrder")}
              </Label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2 border-t border-border">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
              disabled={isPending}
              data-ocid="edit-track-cancel"
            >
              {t("cancel")}
            </Button>
            <Button
              type="button"
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isPending || !form.title.trim()}
              onClick={() => onSave(track.id, form)}
              data-ocid="edit-track-save"
            >
              {isPending ? "Saving…" : t("save")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ─── Download Report Section ─── */
function DownloadReportSection({
  entries,
  isLoading,
}: {
  entries: DownloadReportEntry[];
  isLoading: boolean;
}) {
  return (
    <div
      className="card-elevated overflow-hidden mb-8"
      data-ocid="dashboard-download-report"
    >
      <div className="flex items-center gap-2 px-4 sm:px-6 py-4 border-b border-border">
        <FileText className="w-4 h-4 text-primary" />
        <h2 className="font-display font-semibold text-foreground">
          Download Report
        </h2>
        <Badge variant="secondary" className="text-xs ml-auto">
          {entries.length} entries
        </Badge>
      </div>

      {isLoading ? (
        <div className="p-4 sm:p-6 space-y-3">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      ) : entries.length === 0 ? (
        <div
          className="flex flex-col items-center py-12 text-center text-muted-foreground px-4"
          data-ocid="download-report-empty"
        >
          <FileText className="w-10 h-10 opacity-30 mb-3" />
          <p className="text-sm">
            No purchase records yet. Sales will appear here once customers buy
            your tracks.
          </p>
        </div>
      ) : (
        <>
          {/* Mobile card view */}
          <div className="sm:hidden divide-y divide-border">
            {entries.map((entry) => {
              const purchasedDate = new Date(
                Number(entry.purchasedAt) / 1_000_000,
              );
              const isExpired = !entry.downloadAvailable;
              return (
                <div
                  key={String(entry.saleId)}
                  className="p-4 space-y-1.5"
                  data-ocid={`report-row-${entry.saleId}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium text-foreground truncate">
                      {entry.trackTitle}
                    </p>
                    <Badge
                      variant={isExpired ? "destructive" : "secondary"}
                      className="text-xs shrink-0"
                    >
                      {isExpired ? "Expired" : "Active"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <Badge
                      variant="outline"
                      className="text-xs uppercase font-mono"
                    >
                      {entry.format}
                    </Badge>
                    <span>{purchasedDate.toLocaleDateString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground">
                  <th className="text-left px-6 py-3 font-medium">Track</th>
                  <th className="text-left px-4 py-3 font-medium">Format</th>
                  <th className="text-left px-4 py-3 font-medium">Customer</th>
                  <th className="text-left px-4 py-3 font-medium">Purchased</th>
                  <th className="text-left px-4 py-3 font-medium">Expires</th>
                  <th className="text-right px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {entries.map((entry) => {
                  const purchasedDate = new Date(
                    Number(entry.purchasedAt) / 1_000_000,
                  );
                  const expiresDate = new Date(
                    Number(entry.expiresAt) / 1_000_000,
                  );
                  const isExpired = !entry.downloadAvailable;
                  return (
                    <tr
                      key={String(entry.saleId)}
                      className="hover:bg-secondary/40 transition-colors"
                      data-ocid={`report-row-${entry.saleId}`}
                    >
                      <td className="px-6 py-3">
                        <p className="font-medium text-foreground truncate max-w-40">
                          {entry.trackTitle}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant="outline"
                          className="text-xs uppercase font-mono"
                        >
                          {entry.format}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs truncate max-w-32">
                        {entry.artistName}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">
                        {purchasedDate.toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">
                        {expiresDate.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-3 text-right">
                        <Badge
                          variant={isExpired ? "destructive" : "secondary"}
                          className="text-xs"
                        >
                          {isExpired ? "Expired" : "Active"}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Social Links Editor ─── */
const SOCIAL_FIELDS: {
  key: keyof ArtistSocialLinks;
  label: string;
  placeholder: string;
  icon: typeof Globe;
}[] = [
  {
    key: "instagram",
    label: "Instagram",
    placeholder: "instagram.com/yourhandle",
    icon: Share2,
  },
  {
    key: "twitterX",
    label: "Twitter / X",
    placeholder: "twitter.com/yourhandle",
    icon: Share2,
  },
  {
    key: "tiktok",
    label: "TikTok",
    placeholder: "tiktok.com/@yourhandle",
    icon: Music,
  },
  {
    key: "youtube",
    label: "YouTube",
    placeholder: "youtube.com/@yourchannel",
    icon: TrendingUp,
  },
  {
    key: "facebook",
    label: "Facebook",
    placeholder: "facebook.com/yourpage",
    icon: Share2,
  },
  {
    key: "soundcloud",
    label: "SoundCloud",
    placeholder: "soundcloud.com/yourprofile",
    icon: Music,
  },
  {
    key: "spotify",
    label: "Spotify",
    placeholder: "open.spotify.com/artist/...",
    icon: Music,
  },
  {
    key: "appleMusic",
    label: "Apple Music",
    placeholder: "music.apple.com/...",
    icon: Music,
  },
  {
    key: "website",
    label: "Website",
    placeholder: "yourwebsite.com",
    icon: Globe,
  },
];

interface SocialLinksEditorProps {
  actor: ActorWithExtras;
  sessionToken: string;
  profileId: string;
  queryClient: ReturnType<typeof useQueryClient>;
}

function SocialLinksEditor({
  actor,
  sessionToken,
  profileId,
  queryClient,
}: SocialLinksEditorProps) {
  const [links, setLinks] = useState<ArtistSocialLinks>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!actor || !profileId || loaded) return;
    actor
      .getArtistProfile(profileId)
      .then((result) => {
        if (result.__kind__ === "ok") {
          const p = result.ok;
          const extracted: ArtistSocialLinks = {};
          if (p.instagram) extracted.instagram = p.instagram;
          if (p.twitterX) extracted.twitterX = p.twitterX;
          if (p.tiktok) extracted.tiktok = p.tiktok;
          if (p.youtube) extracted.youtube = p.youtube;
          if (p.facebook) extracted.facebook = p.facebook;
          if (p.soundcloud) extracted.soundcloud = p.soundcloud;
          if (p.spotify) extracted.spotify = p.spotify;
          if (p.appleMusic) extracted.appleMusic = p.appleMusic;
          if (p.website) extracted.website = p.website;
          if (Object.keys(extracted).length > 0) setLinks(extracted);
        }
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, [actor, profileId, loaded]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const result = await actor.updateArtistSocialLinks(sessionToken, links);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["artist-public-profile", profileId],
      });
      toast.success("Social links saved! 🌐");
    },
    onError: (err: Error) =>
      toast.error(err.message || "Failed to save social links."),
  });

  const setLink = (key: keyof ArtistSocialLinks, value: string) => {
    setLinks((prev) => ({ ...prev, [key]: value || undefined }));
  };

  return (
    <div
      className="card-elevated p-4 sm:p-6 mb-8"
      data-ocid="dashboard-social-links"
    >
      <div className="flex items-center gap-2 mb-1">
        <Globe className="w-4 h-4 text-primary" />
        <h3 className="font-display font-semibold text-foreground">
          Social Media Links
        </h3>
      </div>
      <p className="text-sm text-muted-foreground mb-5">
        Add your social media profiles so fans can find you everywhere.
      </p>

      {!loaded ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SOCIAL_FIELDS.map((f) => (
            <Skeleton key={f.key} className="h-9 w-full rounded-md" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SOCIAL_FIELDS.map((field) => (
            <div key={field.key} className="space-y-1.5">
              <Label
                htmlFor={`social-${field.key}`}
                className="text-primary/90 text-xs font-semibold uppercase tracking-wide"
              >
                {field.label}
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs select-none">
                  🔗
                </span>
                <Input
                  id={`social-${field.key}`}
                  className="pl-8 bg-secondary/30 border-border focus:border-primary/50 text-sm"
                  placeholder={field.placeholder}
                  value={links[field.key] ?? ""}
                  onChange={(e) => setLink(field.key, e.target.value)}
                  data-ocid={`social-input-${field.key}`}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <Button
        type="button"
        className="mt-5 bg-primary text-primary-foreground hover:bg-primary/90 gap-2 w-full sm:w-auto"
        disabled={saveMutation.isPending || !loaded}
        onClick={() => saveMutation.mutate()}
        data-ocid="social-links-save"
      >
        <Check className="w-4 h-4" />
        {saveMutation.isPending ? "Saving…" : "Save Social Links"}
      </Button>
    </div>
  );
}

/* ─── Security Question Section ─── */
interface SecurityQuestionSectionProps {
  actor: ActorWithExtras;
  sessionToken: string;
  artistName: string;
}

function SecurityQuestionSection({
  actor,
  sessionToken,
  artistName,
}: SecurityQuestionSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const {
    data: currentQuestion,
    isLoading: questionLoading,
    refetch,
  } = useQuery<string | null>({
    queryKey: ["artist-security-question", artistName],
    queryFn: async () => {
      const result = await actor.getArtistSecurityQuestion(artistName);
      return result ?? null;
    },
    enabled: !!actor && !!artistName,
  });

  const saveMutation = useMutation({
    mutationFn: async ({
      question,
      answerRaw,
    }: { question: string; answerRaw: string }) => {
      const normalized = answerRaw.trim().toLowerCase();
      const encoder = new TextEncoder();
      const data = encoder.encode(normalized);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const answerHash = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      const result = await actor.setArtistSecurityQuestion(
        sessionToken,
        question,
        answerHash,
      );
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      toast.success("Security question saved! 🔒");
      setIsEditing(false);
      setSelectedQuestion("");
      setAnswer("");
      refetch();
    },
    onError: (err: Error) =>
      toast.error(err.message || "Failed to save security question."),
  });

  const removeMutation = useMutation({
    mutationFn: async () => {
      const result = await actor.setArtistSecurityQuestion(
        sessionToken,
        "",
        "",
      );
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      toast.success("Security question removed.");
      refetch();
    },
    onError: (err: Error) =>
      toast.error(err.message || "Failed to remove security question."),
  });

  const hasQuestion = !!currentQuestion && currentQuestion.trim().length > 0;
  const canSubmit =
    selectedQuestion && answer.trim().length >= 2 && !saveMutation.isPending;

  return (
    <div
      className="card-elevated p-4 sm:p-6 mb-8"
      data-ocid="dashboard-security-question"
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <ShieldQuestion className="w-4 h-4 text-primary" />
          <h3 className="font-display font-semibold text-foreground">
            Security Question
          </h3>
        </div>
        {!isEditing ? (
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => {
              setIsEditing(true);
              setSelectedQuestion(hasQuestion ? currentQuestion! : "");
              setAnswer("");
            }}
            data-ocid="dashboard-security-question-toggle"
          >
            {hasQuestion ? "Update" : "Set Question"}
          </Button>
        ) : (
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => {
              setIsEditing(false);
              setSelectedQuestion("");
              setAnswer("");
            }}
          >
            Cancel
          </Button>
        )}
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        A security question helps the admin verify your identity for a PIN reset
        if you ever get locked out.
      </p>

      {questionLoading ? (
        <Skeleton className="h-9 w-full rounded-md" />
      ) : !isEditing ? (
        hasQuestion ? (
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-secondary/30 rounded-lg border border-primary/20">
            <HelpCircle className="w-4 h-4 text-primary shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-sm text-foreground flex-1 leading-relaxed">
              <span className="text-muted-foreground text-xs font-medium uppercase tracking-wide block mb-0.5">
                Current Question
              </span>
              {currentQuestion}
            </p>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0 w-full sm:w-auto"
                  disabled={removeMutation.isPending}
                  data-ocid="dashboard-security-question-remove"
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                  Remove
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Remove Security Question</AlertDialogTitle>
                  <AlertDialogDescription>
                    Removing your security question means you may not be able to
                    verify your identity for a PIN reset. Are you sure?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    onClick={() => removeMutation.mutate()}
                    disabled={removeMutation.isPending}
                    data-ocid="dashboard-security-question-remove-confirm"
                  >
                    Remove Question
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ) : (
          <div className="flex items-start gap-3 p-4 bg-secondary/20 rounded-lg border border-border">
            <ShieldQuestion className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">
                No security question set.
              </p>
              <p className="text-xs text-muted-foreground/70 mt-0.5">
                Setting one gives the admin a way to verify you during a PIN
                reset.
              </p>
            </div>
          </div>
        )
      ) : (
        <div className="space-y-4 border-t border-border pt-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="security-question-select">Question</Label>
            <Select
              value={selectedQuestion}
              onValueChange={setSelectedQuestion}
            >
              <SelectTrigger
                id="security-question-select"
                data-ocid="security-question-select"
              >
                <SelectValue placeholder="Choose a security question…" />
              </SelectTrigger>
              <SelectContent>
                {SECURITY_QUESTIONS.map((q) => (
                  <SelectItem key={q} value={q}>
                    {q}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="security-question-answer">Answer</Label>
            <Input
              id="security-question-answer"
              type="text"
              placeholder="Your answer (case-insensitive)"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={saveMutation.isPending}
              data-ocid="security-question-answer"
            />
            <p className="text-xs text-muted-foreground">
              Answers are stored securely — only you know the plaintext.
            </p>
          </div>

          <Button
            type="button"
            disabled={!canSubmit}
            onClick={() =>
              saveMutation.mutate({
                question: selectedQuestion,
                answerRaw: answer,
              })
            }
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
            data-ocid="security-question-save"
          >
            <Check className="w-4 h-4" />
            {saveMutation.isPending ? "Saving…" : "Save Security Question"}
          </Button>
        </div>
      )}
    </div>
  );
}

function RegisterForm({
  onRegister,
}: { onRegister: (name: string, bio: string) => void }) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  return (
    <div
      className="max-w-md mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center"
      data-ocid="dashboard-register-form"
    >
      <span className="text-5xl block mb-4">👑</span>
      <h2 className="font-display font-bold text-2xl text-foreground mb-2">
        Create Your Artist Profile
      </h2>
      <p className="text-muted-foreground mb-8 text-sm">
        Set up your profile to start distributing music on Chosen One
        Productions.
      </p>
      <div className="card-elevated p-4 sm:p-6 text-left space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="reg-name">Artist / Stage Name</Label>
          <Input
            id="reg-name"
            placeholder="e.g. DJ Chosen One"
            value={name}
            onChange={(e) => setName(e.target.value)}
            data-ocid="dashboard-register-name"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="reg-bio">Bio</Label>
          <Textarea
            id="reg-bio"
            placeholder="Tell fans about yourself…"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            data-ocid="dashboard-register-bio"
          />
        </div>
        <Button
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={!name.trim()}
          onClick={() => onRegister(name.trim(), bio.trim())}
          data-ocid="dashboard-register-submit"
        >
          Create Profile
        </Button>
      </div>
    </div>
  );
}

/* ─── Track Mobile Card ─── */
function TrackMobileCard({
  track,
  onEdit,
  onDelete,
  deletePending,
  t,
}: {
  track: ArtistTrackSummary;
  onEdit: () => void;
  onDelete: () => void;
  deletePending: boolean;
  t: (key: import("../types").TranslationKey) => string;
}) {
  return (
    <div
      className="p-4 border-b border-border last:border-0"
      data-ocid={`dashboard-track-card-${track.id}`}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center shrink-0 mt-0.5">
          <Music className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-foreground truncate">{track.title}</p>
          <div className="flex flex-wrap items-center gap-1.5 mt-1">
            <Badge variant="secondary" className="text-xs">
              {track.genre}
            </Badge>
            <span className="text-xs text-muted-foreground capitalize">
              {track.trackType === TrackType.album ? "Album" : "Single"}
            </span>
            {track.releaseDate && (
              <span className="text-xs text-muted-foreground">
                {track.releaseDate}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
            <span>
              <Eye className="w-3 h-3 inline mr-0.5" />
              {Number(track.previewCount).toLocaleString()}
            </span>
            <span>
              <TrendingUp className="w-3 h-3 inline mr-0.5" />
              {Number(track.saleCount).toLocaleString()} sales
            </span>
          </div>
        </div>
        {/* Action buttons — min 44px touch targets */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            className="w-11 h-11 flex items-center justify-center rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            onClick={onEdit}
            aria-label={`Edit ${track.title}`}
            data-ocid={`dashboard-edit-${track.id}`}
          >
            <Pencil className="w-4 h-4" />
          </button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                type="button"
                className="w-11 h-11 flex items-center justify-center rounded-md text-destructive hover:bg-destructive/10 transition-colors"
                aria-label={`Delete ${track.title}`}
                data-ocid={`dashboard-delete-${track.id}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Track</AlertDialogTitle>
                <AlertDialogDescription>
                  Delete{" "}
                  <strong className="text-foreground">{track.title}</strong>?
                  This removes it from the store permanently.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  onClick={onDelete}
                  disabled={deletePending}
                  data-ocid={`dashboard-delete-confirm-${track.id}`}
                >
                  {t("deleteTrack")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function Dashboard() {
  const { t } = useTranslation();
  const { isAuthenticated, changePIN, sessionToken, artistName } = useAuth();
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showCrownBanner } = useAppStore();

  /* ── Crown banner once per session ── */
  useEffect(() => {
    if (!isAuthenticated || !artistName) return;
    const alreadyShown = sessionStorage.getItem(CROWN_SESSION_KEY);
    if (alreadyShown) return;
    sessionStorage.setItem(CROWN_SESSION_KEY, "1");
    const timer = setTimeout(() => {
      showCrownBanner(`${t("welcomeBack")} 👑 ${artistName}`);
    }, 600);
    return () => clearTimeout(timer);
  }, [isAuthenticated, artistName, showCrownBanner, t]);

  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [showChangePIN, setShowChangePIN] = useState(false);
  const [currentPIN, setCurrentPIN] = useState("");
  const [newPIN, setNewPIN] = useState("");
  const [confirmNewPIN, setConfirmNewPIN] = useState("");
  const [pinPending, setPinPending] = useState(false);
  const [editingTrack, setEditingTrack] = useState<ArtistTrackSummary | null>(
    null,
  );
  const [showReport, setShowReport] = useState(false);

  /* ── Queries ── */
  const { data: profile, isLoading: profileLoading } =
    useQuery<ArtistProfilePublic | null>({
      queryKey: ["my-artist-profile"],
      queryFn: async () => {
        const result = await actor!.getMyArtistProfile(sessionToken!);
        return result ?? null;
      },
      enabled: !!actor && !actorFetching && isAuthenticated && !!sessionToken,
    });

  const { data: rtStats, isLoading: rtStatsLoading } =
    useQuery<RealTimeDashboardStats>({
      queryKey: ["rt-dashboard-stats"],
      queryFn: async () => {
        const result = await actor!.getRealTimeDashboardStats(sessionToken!);
        return unwrapResult(result);
      },
      enabled:
        !!actor &&
        !actorFetching &&
        isAuthenticated &&
        !!profile &&
        !!sessionToken,
      refetchInterval: 30_000,
    });

  const { data: tracks, isLoading: tracksLoading } = useQuery<
    ArtistTrackSummary[]
  >({
    queryKey: ["artist-tracks"],
    queryFn: async () => {
      const result = await actor!.getArtistTracks(sessionToken!);
      return unwrapResult(result);
    },
    enabled:
      !!actor &&
      !actorFetching &&
      isAuthenticated &&
      !!profile &&
      !!sessionToken,
  });

  const { data: reportEntries, isLoading: reportLoading } = useQuery<
    DownloadReportEntry[]
  >({
    queryKey: ["download-report"],
    queryFn: async () => {
      const result = await actor!.getDownloadReport(sessionToken!);
      return unwrapResult(result);
    },
    enabled:
      !!actor &&
      !actorFetching &&
      isAuthenticated &&
      !!sessionToken &&
      showReport,
  });

  /* ── Mutations ── */
  const registerMutation = useMutation({
    mutationFn: async ({ name, bio }: { name: string; bio: string }) => {
      const result = await actor!.updateArtistProfile(sessionToken!, name, bio);
      return unwrapResult(result);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-artist-profile"] });
      toast.success("Artist profile created! Welcome 👑");
    },
    onError: (err: Error) =>
      toast.error(err.message || "Failed to create profile."),
  });

  const updateProfileMutation = useMutation({
    mutationFn: async ({ name, bio }: { name: string; bio: string }) => {
      const result = await actor!.updateArtistProfile(sessionToken!, name, bio);
      return unwrapResult(result);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-artist-profile"] });
      toast.success("Profile updated! 🎵");
      setEditingName(false);
    },
    onError: (err: Error) =>
      toast.error(err.message || "Failed to update profile."),
  });

  const editTrackMutation = useMutation({
    mutationFn: async ({
      trackId,
      form,
    }: { trackId: bigint; form: EditForm }) => {
      const effectiveGenre =
        form.genre === "Other"
          ? form.customGenre.trim() || "Other"
          : form.genre;
      const result = await actor!.updateTrackMetadata(
        sessionToken!,
        trackId,
        form.title.trim(),
        effectiveGenre,
        BigInt(form.priceInCents || "0"),
        form.description,
        form.releaseDate,
        form.explicit,
        form.preOrder,
        form.previewStartSecs ? Number.parseFloat(form.previewStartSecs) : null,
        form.previewEndSecs ? Number.parseFloat(form.previewEndSecs) : null,
        form.songDetails || null,
      );
      return unwrapResult(result);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["artist-tracks"] });
      toast.success("Track updated! 🎵");
      setEditingTrack(null);
    },
    onError: (err: Error) =>
      toast.error(err.message || "Failed to update track."),
  });

  const deleteMutation = useMutation({
    mutationFn: async (trackId: bigint) => {
      const result = await actor!.deleteTrack(sessionToken!, trackId);
      return unwrapResult(result);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["artist-tracks"] });
      queryClient.invalidateQueries({ queryKey: ["rt-dashboard-stats"] });
      toast.success("Track deleted.");
    },
    onError: (err: Error) =>
      toast.error(err.message || "Failed to delete track."),
  });

  const deleteAccountMutation = useMutation({
    mutationFn: async () => {
      const result = await actor!.deleteArtistAccount(sessionToken!);
      return unwrapResult(result);
    },
    onSuccess: () => {
      queryClient.clear();
      toast.success("Account deleted.");
      navigate({ to: "/" });
    },
    onError: (err: Error) =>
      toast.error(err.message || "Failed to delete account."),
  });

  /* ── Auth gate ── */
  if (!isAuthenticated) {
    return (
      <div
        className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center"
        data-ocid="dashboard-auth-gate"
      >
        <BarChart2 className="w-16 h-16 text-muted-foreground/40 mx-auto mb-6" />
        <h2 className="font-display font-bold text-2xl text-foreground mb-3">
          {t("dashboardTitle")}
        </h2>
        <p className="text-muted-foreground mb-8">
          Sign in to access your dashboard and manage your music.
        </p>
        <Button
          asChild
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          data-ocid="dashboard-login-btn"
        >
          <Link to="/login">Sign In</Link>
        </Button>
      </div>
    );
  }

  if (profileLoading || actorFetching) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-6">
        <Skeleton className="h-9 w-64" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="card-elevated p-4 sm:p-5">
              <Skeleton className="h-4 w-24 mb-4" />
              <Skeleton className="h-8 w-16" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <RegisterForm
        onRegister={(name, bio) => registerMutation.mutate({ name, bio })}
      />
    );
  }

  const grossUSD = rtStats
    ? `$${(Number(rtStats.grossRevenue) / 100).toFixed(2)}`
    : "$0.00";
  const payoutUSD = rtStats
    ? `$${(Number(rtStats.artistPayout) / 100).toFixed(2)}`
    : "$0.00";

  const STAT_CARDS = [
    {
      label: t("trackPreviews"),
      value: rtStats ? Number(rtStats.trackPreviews).toLocaleString() : "—",
      icon: Eye,
    },
    {
      label: t("totalListens"),
      value: rtStats ? Number(rtStats.totalListens).toLocaleString() : "—",
      icon: Music,
    },
    {
      label: t("totalSales"),
      value: rtStats ? Number(rtStats.totalSales).toLocaleString() : "—",
      icon: TrendingUp,
      sub: "Units sold",
    },
    {
      label: t("grossRevenue"),
      value: grossUSD,
      icon: DollarSign,
      sub: "Before split",
    },
    {
      label: t("yourPayout"),
      value: payoutUSD,
      icon: DollarSign,
      sub: "85% royalty share",
      highlight: true,
    },
  ];

  const topTrack =
    tracks && tracks.length > 0
      ? tracks.reduce((best, tr) => (tr.saleCount > best.saleCount ? tr : best))
      : null;

  const handleSaveName = () => {
    if (!nameInput.trim()) return;
    updateProfileMutation.mutate({ name: nameInput.trim(), bio: profile.bio });
  };

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10"
      data-ocid="dashboard-page"
    >
      {/* Edit track modal */}
      {editingTrack && (
        <EditTrackModal
          track={editingTrack}
          open={!!editingTrack}
          onClose={() => setEditingTrack(null)}
          onSave={(trackId, form) =>
            editTrackMutation.mutate({ trackId, form })
          }
          isPending={editTrackMutation.isPending}
        />
      )}

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <p className="text-sm text-muted-foreground mb-1">
            {t("welcomeBack")} 👑
          </p>
          {editingName ? (
            <div className="flex items-center gap-2">
              <Input
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="h-9 text-lg font-display font-bold w-full sm:w-64"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveName();
                  if (e.key === "Escape") setEditingName(false);
                }}
                autoFocus
                data-ocid="dashboard-name-input"
              />
              <Button
                size="sm"
                variant="ghost"
                className="h-9 w-9 p-0 text-primary hover:text-primary shrink-0"
                onClick={handleSaveName}
                disabled={updateProfileMutation.isPending}
                aria-label="Save name"
                data-ocid="dashboard-name-save"
              >
                <Check className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-9 w-9 p-0 shrink-0"
                onClick={() => setEditingName(false)}
                aria-label="Cancel"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 group">
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
                {profile.name}
              </h1>
              <button
                type="button"
                className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary p-1 rounded min-h-[44px] min-w-[44px] flex items-center justify-center sm:min-h-0 sm:min-w-0"
                onClick={() => {
                  setNameInput(profile.name);
                  setEditingName(true);
                }}
                aria-label="Edit artist name"
                data-ocid="dashboard-name-edit-btn"
              >
                <Pencil className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {rtStatsLoading && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <RefreshCw className="w-3 h-3 animate-spin" />
              <span className="hidden sm:inline">Updating…</span>
            </div>
          )}
          <Link to="/upload">
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
              data-ocid="dashboard-upload-btn"
            >
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">{t("upload")} Music</span>
              <span className="sm:hidden">Upload</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* ── Real-Time Label ── */}
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {t("realTimeStats")} · auto-refreshes every 30s
        </p>
      </div>

      {/* ── Stats Grid: 2-col mobile, 3-col sm, 5-col lg ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {rtStatsLoading && !rtStats
          ? Array.from({ length: 5 }, (_, i) => i).map((i) => (
              <div key={i} className="card-elevated p-4 sm:p-5">
                <Skeleton className="h-4 w-20 mb-3" />
                <Skeleton className="h-7 w-14" />
              </div>
            ))
          : STAT_CARDS.map((card) => <StatCard key={card.label} {...card} />)}
      </div>

      {/* ── Top Track ── */}
      {topTrack && (
        <div className="mb-6 sm:mb-8" data-ocid="dashboard-top-track">
          <TopTrackCard track={topTrack} />
        </div>
      )}

      {/* ── Tracks Section ── */}
      <div className="card-elevated overflow-hidden mb-6 sm:mb-8">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-border">
          <h2 className="font-display font-semibold text-foreground flex items-center gap-2">
            <Music className="w-4 h-4 text-primary" />
            {t("tracks")}
          </h2>
          <Badge variant="secondary" className="text-xs">
            {tracks?.length ?? 0} tracks
          </Badge>
        </div>

        {tracksLoading ? (
          <div className="p-4 sm:p-6 space-y-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="w-10 h-10 rounded-md shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            ))}
          </div>
        ) : !tracks || tracks.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-12 sm:py-16 text-center px-4"
            data-ocid="dashboard-empty-tracks"
          >
            <Music className="w-12 h-12 text-muted-foreground/40 mb-4" />
            <h3 className="font-display font-semibold text-foreground mb-2">
              {t("noTracks2")}
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Upload your first track to reach fans worldwide.
            </p>
            <Link to="/upload">
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                data-ocid="dashboard-upload-first-btn"
              >
                <Upload className="w-4 h-4" />
                Upload Music
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Mobile: stacked cards */}
            <div className="sm:hidden">
              {tracks.map((track) => (
                <TrackMobileCard
                  key={String(track.id)}
                  track={track}
                  onEdit={() => setEditingTrack(track)}
                  onDelete={() => deleteMutation.mutate(track.id)}
                  deletePending={deleteMutation.isPending}
                  t={t}
                />
              ))}
            </div>
            {/* Desktop: table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-xs text-muted-foreground">
                    <th className="text-left px-6 py-3 font-medium">Title</th>
                    <th className="text-left px-4 py-3 font-medium">Genre</th>
                    <th className="text-left px-4 py-3 font-medium">Type</th>
                    <th className="text-left px-4 py-3 font-medium">
                      Release Date
                    </th>
                    <th className="text-right px-4 py-3 font-medium">
                      Previews
                    </th>
                    <th className="text-right px-4 py-3 font-medium">Sales</th>
                    <th className="text-right px-6 py-3 font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {tracks.map((track) => (
                    <tr
                      key={String(track.id)}
                      className="hover:bg-secondary/50 transition-colors duration-150"
                      data-ocid={`dashboard-track-row-${track.id}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-md bg-secondary flex items-center justify-center shrink-0">
                            <Music className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <p className="font-medium text-foreground truncate max-w-44">
                            {track.title}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Badge variant="secondary" className="text-xs">
                          {track.genre}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 text-muted-foreground capitalize">
                        {track.trackType === TrackType.album
                          ? "Album"
                          : "Single"}
                      </td>
                      <td className="px-4 py-4 text-muted-foreground text-xs">
                        {track.releaseDate || "—"}
                      </td>
                      <td className="px-4 py-4 text-right text-foreground font-mono text-xs">
                        {Number(track.previewCount).toLocaleString()}
                      </td>
                      <td className="px-4 py-4 text-right text-foreground font-mono text-xs">
                        {Number(track.saleCount).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0 text-muted-foreground hover:text-primary hover:bg-primary/10"
                            onClick={() => setEditingTrack(track)}
                            aria-label={`Edit ${track.title}`}
                            data-ocid={`dashboard-edit-${track.id}`}
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                                aria-label={`Delete ${track.title}`}
                                data-ocid={`dashboard-delete-${track.id}`}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete Track
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Delete{" "}
                                  <strong className="text-foreground">
                                    {track.title}
                                  </strong>
                                  ? This removes it from the store permanently
                                  and cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>
                                  {t("cancel")}
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  onClick={() =>
                                    deleteMutation.mutate(track.id)
                                  }
                                  disabled={deleteMutation.isPending}
                                  data-ocid={`dashboard-delete-confirm-${track.id}`}
                                >
                                  {t("deleteTrack")}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* ── Download Report ── */}
      <div className="mb-6 sm:mb-8">
        {!showReport ? (
          <Button
            type="button"
            variant="outline"
            className="gap-2 border-primary/30 text-primary hover:bg-primary/10 w-full sm:w-auto"
            onClick={() => setShowReport(true)}
            data-ocid="dashboard-show-report-btn"
          >
            <Download className="w-4 h-4" />
            View Download Report
          </Button>
        ) : (
          <DownloadReportSection
            entries={reportEntries ?? []}
            isLoading={reportLoading}
          />
        )}
      </div>

      {/* ── Social Links Editor ── */}
      {profile && (
        <SocialLinksEditor
          actor={actor as unknown as ActorWithExtras}
          sessionToken={sessionToken!}
          profileId={profile.id}
          queryClient={queryClient}
        />
      )}

      {/* ── Change PIN ── */}
      <div
        className="card-elevated p-4 sm:p-6 mb-6 sm:mb-8"
        data-ocid="dashboard-change-pin"
      >
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-primary" />
            <h3 className="font-display font-semibold text-foreground">
              Change PIN
            </h3>
          </div>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => {
              setShowChangePIN((v) => !v);
              setCurrentPIN("");
              setNewPIN("");
              setConfirmNewPIN("");
            }}
            data-ocid="dashboard-change-pin-toggle"
          >
            {showChangePIN ? t("cancel") : "Update PIN"}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Update your account PIN. You&apos;ll need your current PIN to make
          changes.
        </p>

        {showChangePIN && (
          <div className="space-y-4 border-t border-border pt-4 mt-2">
            <div className="space-y-2">
              <Label htmlFor="current-pin">Current PIN</Label>
              <Input
                id="current-pin"
                type="password"
                inputMode="numeric"
                placeholder="Enter current PIN"
                value={currentPIN}
                onChange={(e) =>
                  setCurrentPIN(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                maxLength={6}
                disabled={pinPending}
                data-ocid="dashboard-current-pin-input"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-pin">New PIN (4–6 digits)</Label>
                <Input
                  id="new-pin"
                  type="password"
                  inputMode="numeric"
                  placeholder="Enter new PIN"
                  value={newPIN}
                  onChange={(e) =>
                    setNewPIN(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  maxLength={6}
                  disabled={pinPending}
                  data-ocid="dashboard-new-pin-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-new-pin">Confirm New PIN</Label>
                <Input
                  id="confirm-new-pin"
                  type="password"
                  inputMode="numeric"
                  placeholder="Re-enter new PIN"
                  value={confirmNewPIN}
                  onChange={(e) =>
                    setConfirmNewPIN(
                      e.target.value.replace(/\D/g, "").slice(0, 6),
                    )
                  }
                  maxLength={6}
                  disabled={pinPending}
                  className={
                    confirmNewPIN.length > 0 && newPIN !== confirmNewPIN
                      ? "border-destructive"
                      : ""
                  }
                  data-ocid="dashboard-confirm-new-pin-input"
                />
                {confirmNewPIN.length > 0 && newPIN !== confirmNewPIN && (
                  <p className="text-xs text-destructive">PINs do not match</p>
                )}
              </div>
            </div>
            <Button
              type="button"
              disabled={
                pinPending ||
                currentPIN.length < 4 ||
                newPIN.length < 4 ||
                newPIN !== confirmNewPIN
              }
              onClick={async () => {
                if (!/^\d{4,6}$/.test(newPIN)) {
                  toast.error("New PIN must be 4–6 digits.");
                  return;
                }
                setPinPending(true);
                try {
                  const currentHash = await hashPin(currentPIN);
                  const newHash = await hashPin(newPIN);
                  await changePIN(currentHash, newHash);
                  toast.success("PIN updated successfully! 🔐");
                  setShowChangePIN(false);
                  setCurrentPIN("");
                  setNewPIN("");
                  setConfirmNewPIN("");
                } catch (err: unknown) {
                  toast.error(
                    (err as Error).message || "Failed to update PIN.",
                  );
                } finally {
                  setPinPending(false);
                }
              }}
              className="w-full sm:w-auto gap-2"
              data-ocid="dashboard-change-pin-submit"
            >
              <KeyRound className="w-4 h-4" />
              {pinPending ? "Updating…" : "Update PIN"}
            </Button>
          </div>
        )}
      </div>

      {/* ── Security Question ── */}
      {profile && (
        <SecurityQuestionSection
          actor={actor as unknown as ActorWithExtras}
          sessionToken={sessionToken!}
          artistName={artistName}
        />
      )}

      {/* ── Danger Zone ── */}
      <div
        className="card-elevated border-destructive/30 p-4 sm:p-6"
        data-ocid="dashboard-danger-zone"
      >
        <h3 className="font-display font-semibold text-destructive mb-1">
          Danger Zone
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Permanently delete your artist account and all associated tracks. This
          action cannot be undone.
        </p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              size="sm"
              className="gap-2 w-full sm:w-auto"
              data-ocid="dashboard-delete-account-btn"
            >
              <Trash2 className="w-4 h-4" />
              Delete Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent data-ocid="dashboard-delete-account-dialog">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Artist Account</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete your artist profile, all your
                tracks, and all associated data. This action{" "}
                <strong className="text-foreground">cannot be undone</strong>.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel data-ocid="dashboard-delete-account-cancel">
                {t("cancel")}
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={() => deleteAccountMutation.mutate()}
                disabled={deleteAccountMutation.isPending}
                data-ocid="dashboard-delete-account-confirm"
              >
                Yes, Delete My Account
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
