import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { useActor } from "@caffeineai/core-infrastructure";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Bell,
  LogOut,
  Menu,
  Search,
  ShoppingBag,
  ShoppingCart,
  Upload,
  X,
} from "lucide-react";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createActor } from "../backend";
import { useAuth } from "../hooks/use-auth";
import { useTranslation } from "../hooks/use-translation";
import { useAppStore } from "../store";
import { useCartStore } from "../store/cart";
import type { Notification } from "../types";
import { NotificationType } from "../types";
import { CrownRollBanner } from "./CrownRollBanner";
import { CrownThankYou } from "./CrownThankYou";
import { Footer } from "./Footer";
import { SlideMenu } from "./SlideMenu";

const TOP_NAV = [
  { to: "/", labelKey: "home" as const, artistOnly: false },
  { to: "/store", labelKey: "store" as const, artistOnly: false },
  { to: "/upload", labelKey: "upload" as const, artistOnly: true },
  { to: "/dashboard", labelKey: "dashboard" as const, artistOnly: true },
  { to: "/royalties", labelKey: "royalties" as const, artistOnly: true },
] as const;

function playNotificationChime() {
  try {
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(880, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      1320,
      ctx.currentTime + 0.1,
    );
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.4);
    oscillator.onended = () => ctx.close();
  } catch {
    // Web Audio not available — silently skip
  }
}

function formatNotifType(type: NotificationType): string {
  switch (type) {
    case NotificationType.newSale:
      return "💰 New sale!";
    case NotificationType.newComment:
      return "💬 New comment";
    case NotificationType.trackUploaded:
      return "🎵 Track uploaded";
    case NotificationType.artistJoined:
      return "👑 New artist joined";
    case NotificationType.newDrop:
      return "🎶 New release!";
    default:
      return "🔔 Notification";
  }
}

function filterNotificationsForUser(
  notifications: Notification[],
  isArtist: boolean,
): Notification[] {
  if (isArtist) return notifications;
  return notifications.filter(
    (n) =>
      n.notifType === NotificationType.newDrop ||
      n.notifType === NotificationType.artistJoined ||
      n.notifType === NotificationType.trackUploaded,
  );
}

interface LayoutProps {
  children: ReactNode;
  onSearch?: (query: string) => void;
}

export function Layout({ children, onSearch }: LayoutProps) {
  const {
    toggleMenu,
    darkMode,
    notifications,
    setNotifications,
    unreadCount,
    setUnreadCount,
  } = useAppStore();
  const { isAuthenticated, artistName, sessionToken, logout } = useAuth();
  const { customerEmail, customerToken } = useAppStore();
  const location = useLocation();
  const { t } = useTranslation();
  const { actor } = useActor(createActor);
  const { items: cartItems } = useCartStore();

  const [notifOpen, setNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const prevCountRef = useRef(0);
  const notifRef = useRef<HTMLDivElement>(null);

  // Enforce dark class on html element
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [darkMode]);

  // Always start dark
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // Poll notifications every 30s
  useEffect(() => {
    if (!actor) return;
    const fetchNotifs = async () => {
      try {
        const notifs = await actor.getRecentNotifications(sessionToken ?? "");
        const sorted = [...notifs].sort(
          (a, b) => Number(b.timestamp) - Number(a.timestamp),
        );
        setNotifications(sorted);
        const visible = filterNotificationsForUser(sorted, isAuthenticated);
        const newCount = visible.length;
        if (newCount > prevCountRef.current && prevCountRef.current > 0) {
          playNotificationChime();
          setUnreadCount(newCount - prevCountRef.current);
        }
        prevCountRef.current = newCount;
      } catch {
        // silently fail
      }
    };
    fetchNotifs();
    const interval = setInterval(fetchNotifs, 30_000);
    return () => clearInterval(interval);
  }, [actor, setNotifications, setUnreadCount, isAuthenticated, sessionToken]);

  // Close notif panel on outside click
  useEffect(() => {
    if (!notifOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [notifOpen]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      onSearch?.(e.target.value);
    },
    [onSearch],
  );

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSearch?.(searchQuery);
    },
    [onSearch, searchQuery],
  );

  const handleBellClick = () => {
    setNotifOpen((o) => !o);
    if (!notifOpen) setUnreadCount(0);
  };

  const visibleNotifications = filterNotificationsForUser(
    notifications,
    isAuthenticated,
  );

  return (
    <div
      className="min-h-screen flex flex-col bg-background text-foreground"
      data-ocid="layout"
    >
      <CrownRollBanner />
      <CrownThankYou />
      <SlideMenu />

      {/* Top header */}
      <header
        className="sticky top-0 z-30 bg-card border-b border-border shadow-sm"
        data-ocid="header"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center gap-2 sm:gap-3">
          {/* Hamburger — always visible */}
          <button
            type="button"
            onClick={toggleMenu}
            className="p-2 -ml-1 rounded-lg hover:bg-secondary transition-colors-fast shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Open navigation menu"
            data-ocid="header-menu-btn"
          >
            <Menu className="w-5 h-5 text-foreground" />
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-1.5 shrink-0 min-h-[44px] items-center"
            data-ocid="header-logo"
          >
            <span className="text-lg sm:text-xl">👑</span>
            <div className="hidden xs:block sm:block">
              <span className="font-display font-bold text-foreground text-xs sm:text-sm leading-tight">
                Chosen One
              </span>
              <span className="text-primary text-[10px] sm:text-xs font-medium ml-1">
                Productions
              </span>
            </div>
          </Link>

          {/* Desktop nav — lg+ only */}
          <nav
            className="hidden lg:flex items-center gap-1 mx-4 flex-1"
            aria-label="Top navigation"
          >
            {TOP_NAV.filter(
              ({ artistOnly }) => !artistOnly || isAuthenticated,
            ).map(({ to, labelKey }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors-fast ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-foreground/70 hover:text-foreground hover:bg-secondary"
                  }`}
                  data-ocid={`header-nav-${to.replace("/", "") || "home"}`}
                >
                  {t(labelKey)}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            {/* Cart — always visible, touch-friendly */}
            <Link
              to="/checkout"
              className="relative p-2 rounded-lg hover:bg-secondary transition-colors-fast min-w-[40px] min-h-[40px] flex items-center justify-center"
              aria-label={`${t("cart")} — ${cartItems.length} item${cartItems.length !== 1 ? "s" : ""}`}
              data-ocid="header-cart-btn"
            >
              <ShoppingCart
                className={`w-5 h-5 ${cartItems.length > 0 ? "text-primary" : "text-muted-foreground"}`}
              />
              {cartItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center px-1 leading-none">
                  {cartItems.length > 9 ? "9+" : cartItems.length}
                </span>
              )}
            </Link>

            {/* Search — collapsible */}
            {searchOpen ? (
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center gap-1 animate-fade-in"
              >
                <input
                  type="search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder={t("searchPlaceholder")}
                  className="w-36 sm:w-48 md:w-56 px-3 py-1.5 text-sm bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  data-ocid="header-search-input"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                    onSearch?.("");
                  }}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors-fast min-w-[40px] min-h-[40px] flex items-center justify-center"
                  aria-label="Close search"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-lg hover:bg-secondary transition-colors-fast min-w-[40px] min-h-[40px] flex items-center justify-center"
                aria-label={t("searchPlaceholder")}
                data-ocid="header-search-btn"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
              </button>
            )}

            {/* Artist name + Bell */}
            <div className="relative flex items-center" ref={notifRef}>
              {isAuthenticated && artistName && (
                <Link
                  to="/dashboard"
                  className="hidden sm:flex items-center gap-1.5 mr-1 px-2 py-1 rounded-lg hover:bg-primary/10 transition-colors-fast group min-h-[40px]"
                  title={`${artistName} — View Dashboard`}
                  data-ocid="header-artist-identity"
                >
                  <span
                    className="text-base leading-none select-none"
                    aria-hidden="true"
                  >
                    👑
                  </span>
                  <span
                    className="font-bold text-xs sm:text-sm tracking-wide truncate max-w-[100px] sm:max-w-[130px]"
                    style={{ color: "#d4af37" }}
                    data-ocid="header-artist-name"
                  >
                    {artistName.length > 16
                      ? `${artistName.slice(0, 16)}…`
                      : artistName}
                  </span>
                </Link>
              )}

              {/* Bell */}
              <button
                type="button"
                onClick={handleBellClick}
                className="p-2 rounded-lg hover:bg-secondary transition-colors-fast relative min-w-[40px] min-h-[40px] flex items-center justify-center"
                aria-label={t("notifications")}
                data-ocid="header-notifications-btn"
              >
                <Bell
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${unreadCount > 0 ? "text-primary" : "text-muted-foreground"}`}
                />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                  </span>
                )}
              </button>

              {/* Notifications dropdown */}
              {notifOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-[min(320px,calc(100vw-1.5rem))] bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden animate-slide-up"
                  data-ocid="notifications-dropdown"
                >
                  <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                    <h3 className="font-display font-semibold text-sm text-foreground flex items-center gap-1.5">
                      <Bell className="w-3.5 h-3.5 text-primary" />
                      {t("notifications")}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setNotifOpen(false)}
                      className="p-1 rounded hover:bg-secondary transition-colors-fast"
                      aria-label="Close notifications"
                    >
                      <X className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                  </div>
                  <div className="max-h-64 sm:max-h-72 overflow-y-auto scrollbar-hidden">
                    {visibleNotifications.length === 0 ? (
                      <div
                        className="px-4 py-8 text-center text-muted-foreground text-sm"
                        data-ocid="notifications-empty"
                      >
                        {t("noNotifications")}
                      </div>
                    ) : (
                      <ul>
                        {visibleNotifications
                          .slice(0, 20)
                          .map((n: Notification) => (
                            <li
                              key={String(n.id)}
                              className="px-4 py-3 border-b border-border/50 last:border-0 hover:bg-secondary/50 transition-colors-fast"
                              data-ocid={`notification-item-${String(n.id)}`}
                            >
                              <p className="text-xs text-primary font-semibold mb-0.5">
                                {formatNotifType(n.notifType)}
                              </p>
                              <p className="text-sm text-foreground line-clamp-2">
                                {n.message}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {new Date(
                                  Number(n.timestamp) / 1_000_000,
                                ).toLocaleString()}
                              </p>
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Quick upload — sm+ only */}
            {isAuthenticated && (
              <Link
                to="/upload"
                className="hidden sm:flex"
                data-ocid="header-quick-upload"
              >
                <Button
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5 text-xs h-9"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">{t("upload")}</span>
                </Button>
              </Link>
            )}

            {/* My Purchases — md+ */}
            <Link
              to={customerToken ? "/store" : "/customer-login"}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-primary/25 text-primary hover:bg-primary/10 transition-colors-fast min-h-[36px]"
              aria-label="My Purchases"
              data-ocid="header-my-purchases-btn"
              title={
                customerEmail
                  ? `My Purchases (${customerEmail})`
                  : "Sign in to view purchases"
              }
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>
                {customerEmail
                  ? customerEmail.split("@")[0].slice(0, 12)
                  : "My Purchases"}
              </span>
            </Link>

            {/* Auth */}
            {isAuthenticated ? (
              <div
                className="flex items-center gap-1"
                data-ocid="header-user-menu"
              >
                <button
                  type="button"
                  onClick={logout}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors-fast text-muted-foreground hover:text-destructive min-w-[40px] min-h-[40px] flex items-center justify-center"
                  aria-label={t("signOut")}
                  data-ocid="header-logout-btn"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link to="/login" data-ocid="header-login-btn">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="text-xs h-9 px-3"
                >
                  {t("signIn")}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1" data-ocid="main-content">
        {children}
      </main>

      <Footer />
      <Toaster richColors position="bottom-right" />
    </div>
  );
}
