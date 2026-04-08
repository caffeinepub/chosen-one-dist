import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Language, Notification } from "../types";

interface AppStore {
  // Artist name (user-set display name)
  artistName: string;
  setArtistName: (name: string) => void;

  // Session token for current artist login
  sessionToken: string | null;
  setSessionToken: (token: string | null) => void;

  // Customer session
  customerToken: string | null;
  setCustomerToken: (token: string | null) => void;
  customerEmail: string | null;
  setCustomerEmail: (email: string | null) => void;

  // Dark mode
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  toggleDarkMode: () => void;

  // Language
  language: Language;
  setLanguage: (lang: Language) => void;

  // Slide menu
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  toggleMenu: () => void;

  // Notifications
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  unreadCount: number;
  setUnreadCount: (count: number) => void;
  lastSeenNotificationId: bigint | null;
  setLastSeenNotificationId: (id: bigint | null) => void;

  // Crown banner
  crownBannerVisible: boolean;
  crownBannerMessage: string;
  showCrownBanner: (message: string) => void;
  hideCrownBanner: () => void;

  // Purchase thank you
  thankYouVisible: boolean;
  thankYouSongs: string[];
  showThankYou: (songs: string[]) => void;
  hideThankYou: () => void;

  // Liker token (unique per browser session for anonymous likes)
  likerToken: string;

  // Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

function generateLikerToken(): string {
  return `liker-${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      artistName: "",
      setArtistName: (name) => set({ artistName: name }),

      sessionToken: null,
      setSessionToken: (token) => set({ sessionToken: token }),

      customerToken: null,
      setCustomerToken: (token) => set({ customerToken: token }),
      customerEmail: null,
      setCustomerEmail: (email) => set({ customerEmail: email }),

      darkMode: true,
      setDarkMode: (dark) => set({ darkMode: dark }),
      toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),

      language: "en",
      setLanguage: (lang) => set({ language: lang }),

      menuOpen: false,
      setMenuOpen: (open) => set({ menuOpen: open }),
      toggleMenu: () => set((s) => ({ menuOpen: !s.menuOpen })),

      notifications: [],
      setNotifications: (notifications) => set({ notifications }),
      unreadCount: 0,
      setUnreadCount: (count) => set({ unreadCount: count }),
      lastSeenNotificationId: null,
      setLastSeenNotificationId: (id) => set({ lastSeenNotificationId: id }),

      crownBannerVisible: false,
      crownBannerMessage: "",
      showCrownBanner: (message) =>
        set({ crownBannerVisible: true, crownBannerMessage: message }),
      hideCrownBanner: () =>
        set({ crownBannerVisible: false, crownBannerMessage: "" }),

      thankYouVisible: false,
      thankYouSongs: [],
      showThankYou: (songs) =>
        set({ thankYouVisible: true, thankYouSongs: songs }),
      hideThankYou: () => set({ thankYouVisible: false, thankYouSongs: [] }),

      likerToken: generateLikerToken(),

      searchQuery: "",
      setSearchQuery: (q) => set({ searchQuery: q }),
    }),
    {
      name: "chosen-one-store",
      partialize: (state) => ({
        artistName: state.artistName,
        sessionToken: state.sessionToken,
        customerToken: state.customerToken,
        customerEmail: state.customerEmail,
        darkMode: state.darkMode,
        language: state.language,
        likerToken: state.likerToken,
        lastSeenNotificationId: state.lastSeenNotificationId,
      }),
    },
  ),
);
