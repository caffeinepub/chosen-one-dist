import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useLocation } from "@tanstack/react-router";
import {
  BarChart2,
  DollarSign,
  Home,
  LogIn,
  LogOut,
  Moon,
  ShoppingBag,
  Sun,
  Upload,
  User,
  X,
} from "lucide-react";
import { useCallback, useEffect } from "react";
import { useAuth } from "../hooks/use-auth";
import { useTranslation } from "../hooks/use-translation";
import { useAppStore } from "../store";
import { LANGUAGES } from "../types";

const PUBLIC_NAV_LINKS = [
  { to: "/", labelKey: "home" as const, icon: Home },
  { to: "/store", labelKey: "store" as const, icon: ShoppingBag },
] as const;

const ARTIST_NAV_LINKS = [
  { to: "/upload", labelKey: "upload" as const, icon: Upload },
  { to: "/dashboard", labelKey: "dashboard" as const, icon: BarChart2 },
  { to: "/royalties", labelKey: "royalties" as const, icon: DollarSign },
] as const;

export function SlideMenu() {
  const {
    menuOpen,
    setMenuOpen,
    darkMode,
    toggleDarkMode,
    language,
    setLanguage,
    artistName,
    setArtistName,
  } = useAppStore();
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const { t } = useTranslation();

  const { pathname } = location;
  useEffect(() => {
    if (pathname) setMenuOpen(false);
  }, [setMenuOpen, pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    },
    [setMenuOpen],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  if (!menuOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        role="button"
        tabIndex={0}
        className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm animate-fade-in cursor-default"
        onClick={() => setMenuOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setMenuOpen(false);
        }}
        aria-label="Close menu"
      />

      {/* Panel — full height, scrollable, safe-area aware */}
      <dialog
        open
        className="fixed top-0 left-0 h-[100dvh] w-72 sm:w-80 max-w-[85vw] z-50 flex flex-col border-r border-border bg-card animate-slide-in-left overflow-y-auto scrollbar-hidden m-0 p-0"
        aria-label="Navigation menu"
        data-ocid="slide-menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl sm:text-3xl">👑</span>
            <div>
              <p className="font-display font-bold text-sm sm:text-base text-foreground leading-tight">
                Chosen One
              </p>
              <p className="text-primary text-xs font-medium">Productions</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="p-2 rounded-lg transition-colors-fast hover:bg-secondary text-muted-foreground hover:text-foreground min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close menu"
            data-ocid="menu-close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Artist Name — only shown when authenticated */}
        {isAuthenticated && (
          <div className="px-5 py-4 border-b border-border shrink-0">
            <label
              htmlFor="menu-artist-name"
              className="text-label block mb-2 text-muted-foreground"
            >
              {t("yourArtistName")}
            </label>
            <div className="flex items-center gap-2.5">
              <User className="w-4 h-4 shrink-0 text-muted-foreground" />
              <input
                id="menu-artist-name"
                type="text"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
                placeholder="Set your name..."
                className="flex-1 text-sm outline-none border-b border-border bg-transparent text-foreground placeholder:text-muted-foreground/60 focus:border-primary pb-1 transition-colors-fast min-h-[44px]"
                data-ocid="menu-artist-name-input"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="px-3 py-4 flex-1" aria-label="Main navigation">
          <p className="text-label px-3 mb-3 text-muted-foreground">
            {t("navigation")}
          </p>
          <ul className="space-y-0.5">
            {PUBLIC_NAV_LINKS.map(({ to, labelKey, icon: Icon }) => {
              const isActive = location.pathname === to;
              return (
                <li key={to}>
                  <Link
                    to={to}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors-fast font-medium text-sm min-h-[48px] ${
                      isActive
                        ? "bg-primary/15 text-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                    data-ocid={`nav-link-${to.replace("/", "") || "home"}`}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    {t(labelKey)}
                    {isActive && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
                  </Link>
                </li>
              );
            })}

            {/* Artist-only nav — only rendered when authenticated */}
            {isAuthenticated &&
              ARTIST_NAV_LINKS.map(({ to, labelKey, icon: Icon }) => {
                const isActive = location.pathname === to;
                return (
                  <li key={to}>
                    <Link
                      to={to}
                      className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors-fast font-medium text-sm min-h-[48px] ${
                        isActive
                          ? "bg-primary/15 text-primary"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                      data-ocid={`nav-link-${to.replace("/", "")}`}
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      {t(labelKey)}
                      {isActive && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                      )}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </nav>

        <Separator className="border-border shrink-0" />

        {/* Language Switcher */}
        <div className="px-5 py-4 shrink-0">
          <p className="text-label mb-3 text-muted-foreground">
            {t("language")}
          </p>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as typeof language)}
            className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[48px] cursor-pointer"
            data-ocid="menu-language-select"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.nativeName}
              </option>
            ))}
          </select>
        </div>

        {/* Dark Mode Toggle */}
        <div className="px-5 py-3 flex items-center justify-between shrink-0 min-h-[56px]">
          <span className="text-sm font-medium text-foreground">
            {t("darkMode")}
          </span>
          <button
            type="button"
            onClick={toggleDarkMode}
            className={`relative w-14 h-7 rounded-full transition-smooth shrink-0 ${
              darkMode ? "bg-primary" : "bg-muted"
            }`}
            aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
            data-ocid="menu-dark-mode-toggle"
          >
            <span
              className={`absolute top-0.5 w-6 h-6 rounded-full bg-card border flex items-center justify-center transition-smooth shadow-sm ${
                darkMode
                  ? "right-0.5 border-primary/30"
                  : "left-0.5 border-border"
              }`}
            >
              {darkMode ? (
                <Moon className="w-3.5 h-3.5 text-primary" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-amber-500" />
              )}
            </span>
          </button>
        </div>

        <Separator className="border-border shrink-0" />

        {/* Auth button — safe bottom padding */}
        <div className="px-5 py-5 shrink-0 safe-bottom">
          {isAuthenticated ? (
            <Button
              type="button"
              variant="outline"
              className="w-full gap-2 h-12 text-base border-border"
              onClick={logout}
              data-ocid="menu-logout-btn"
            >
              <LogOut className="w-5 h-5" />
              {t("signOut")}
            </Button>
          ) : (
            <Button
              type="button"
              asChild
              className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base"
              data-ocid="menu-login-btn"
            >
              <Link to="/login">
                <LogIn className="w-5 h-5" />
                {t("signIn")}
              </Link>
            </Button>
          )}
        </div>
      </dialog>
    </>
  );
}
