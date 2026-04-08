# Design Brief — Chosen One Productions

## Vision
Premium music distribution platform for serious artists. Dark-first luxury aesthetic with gold accents, crown branding, and cultural authority. Fully responsive mobile-first design across all devices. Crown animation system announces artist arrivals and celebrates customer purchases.

## Tone & Differentiation
Bold music label energy. Minimalist luxury. Crown emoji as visual anchor and motion element. Music note icons signal content. High contrast, sharp typography, subtle premium motion. Mobile-first responsive design with scaled typography, collapsible layouts, and optimized touch targets. Crown rolling animations and thank-you flows reinforce brand identity.

## Color Palette (Dark Mode)

| Role | OKLCH | Purpose |
|------|-------|---------|
| Background | 0.14 0 0 | Deep black (#0a0a0a equivalent) |
| Card | 0.18 0 0 | Dark surfaces (#1a1a1a equivalent) |
| Foreground | 0.97 0 0 | White text, high contrast |
| Accent | 0.76 0.165 65 | Gold (#f5a623 equivalent), vibrancy + warmth |
| Border | 0.24 0 0 | Subtle dividers, 1px |
| Destructive | 0.65 0.22 22 | Alert red, high contrast |

## Typography

| Layer | Font | Mobile | Desktop | Weight |
|-------|------|--------|---------|--------|
| Display | General Sans | 20px | 24px+ | Semibold/Bold |
| Heading | General Sans | 16px | 20px+ | Semibold |
| Body | DM Sans | 14px | 16px | Regular/Medium |
| Label | DM Sans | 12px | 14px | Medium, uppercase |
| Mono | JetBrains Mono | 12px | 14px | Regular |

## Responsive Breakpoints
- **Mobile (< 640px)**: Single column, compact spacing (8px), 12–14px text, hidden secondary UI
- **Tablet (640–1024px)**: Two-column grid, medium spacing (16px), 14–16px text
- **Desktop (> 1024px)**: Multi-column grid (3–4 cols), breathing spacing (24px), 16px+ text

## Structural Zones

| Zone | Treatment | Responsive | Purpose |
|------|-----------|-----------|---------|
| Header/Nav | `bg-card border-b border-border` | Hamburger (mobile), nav links (desktop) | Elevated, frame content, crown brand mark top-left |
| Main Content | `bg-background` | `container-responsive` with px-3 (mobile) to px-8 (desktop) | Clean, breathing space |
| Card Sections | `bg-card border border-border p-responsive` | Single column (mobile) to multi-column (desktop) | Content isolation, depth |
| Forms | `form-section space-y-4 sm:space-y-6` | Stack inputs vertically on mobile, side-by-side on tablet | Accessible, touch-friendly inputs |
| Admin PIN | `admin-pin-form max-w-md sm:max-w-lg` | Single column, centered, responsive inputs | Security-focused settings |
| Footer | `bg-card border-t border-border` | Stacked on mobile, inline on desktop | Grounded, "Chosen One Productions" branding only |
| Sidebar (Menu) | `bg-card border-r border-border` | Slide-out overlay (mobile), fixed sidebar (desktop) | Dark surface, language select |

## Component Patterns
- **Buttons**: Primary (gold bg), Secondary (transparent, border), Ghost (text only), Destructive (red). Responsive padding: `px-3 py-2` (mobile) → `px-6 py-3` (desktop)
- **Forms**: Dark inputs with subtle border, focus ring = accent gold. Labels above inputs, error messages below. Mobile-friendly spacing (8px gap)
- **Cards**: `card-elevated` utility with `p-responsive` for mobile-first padding
- **Badges**: `badge-accent` with responsive text size (12px → 14px)
- **Icons**: Responsive sizing via `icon-responsive` (20px mobile → 28px desktop)
- **Tables**: `table-responsive` with horizontal scroll on mobile, inline display on desktop
- **Crown Animations**: Rolling sweep (signup/login/welcome), glow pulse (thank-you), scale-in entrance

## Admin PIN Settings
- **Form**: Current PIN input, new PIN input, confirm PIN input, all using `form-input` utility
- **Validation**: 4–6 digits, matching confirmation required, success/error feedback
- **Responsive**: Single column (mobile), max-width constrained (max-w-md to max-w-xl), centered layout
- **Accessibility**: Explicit labels, error aria-live regions, focus ring support

## Motion & Animation
Default `transition-smooth` (0.3s cubic-bezier) for interactive elements. Crown animations: `crownRoll` (3s sweep), `crownGlowPulse` (2s pulse), `crownScaleIn` (0.5s scale). Entrance animations subtle, no bounce. All motion reinforces premium brand identity.

## Spacing & Rhythm
Base unit: 8px. Mobile first: 8px gap, 12px padding. Tablet: 16px gap, 24px padding. Desktop: 24px+ gap, 32px+ padding. Dense on dashboards, breathing on marketing pages. Responsive utilities: `p-responsive`, `gap-responsive`, `mx-responsive`.

## Signature Detail
Crown emoji (👑) in header top-left brand mark with gold glow. Rolling crown animation announces artist signup/login/welcome. Thank-you crown for customer purchases with glow pulse. Chosen One Productions footer branding (Caffeine AI removed). Music note icons (♫, ♪) for uploads and tracks. Premium constraint: 5 colors, 3 fonts, choreographed motion. Mobile-first responsive design ensures premium experience on all devices.
