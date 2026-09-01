# Liquid Glass Theme Plan for GMusic

## Objective

Add a new **"Glass"** palette theme to GMusic's existing theme system that brings the Apple-style frosted glass / liquid distortion aesthetic from the reference React component, adapted for Svelte 5 + Tailwind CSS running on WebKitGTK (Tauri).

---

## Architecture Decision

**Implemented as a palette theme** (like Catppuccin, Caffeine, Neon, Breeze) — not a separate rendering mode. This means:

- One `.theme-glass` class block in [layout.css](file:///home/galyarder/projects/GMusic/ui/src/routes/layout.css) (light + `.dark.theme-glass`).
- One new entry in the `THEMES` array in [theme.svelte.ts](file:///home/galyarder/projects/GMusic/ui/src/lib/theme.svelte.ts).
- User selects it from *Settings > Themes* alongside the existing presets.
- All existing custom overrides (accent, hue, radius, fonts, artwork accent) continue to layer on top.

---

## Files to Change

### 1. [layout.css](file:///home/galyarder/projects/GMusic/ui/src/routes/layout.css) — Theme tokens + glass utilities

**Add `.theme-glass` palette block** (~L444, after `.dark.theme-breeze`):

```
Light mode:
- Translucent backgrounds using oklch with alpha (e.g. oklch(1 0 0 / 60%))
- Very low-contrast, soft borders (oklch white at 15-20% alpha)
- Large radius (0.75rem) for the rounded, bubbly feel
- Soft, diffused shadows with colored tint
- Font: 'DM Sans Variable' (already bundled)

Dark mode:
- oklch(0.18 0.01 240 / 70%) style backgrounds
- Same translucent approach, but with dark bases
```

**Add glass utility classes** (after `.art-wash`, ~L461):

```css
/* --- Liquid Glass utilities ---
   Applied by .theme-glass to surfaces that should be translucent.
   Scoped under html.theme-glass so they're inert on every other theme. */

html.theme-glass .glass-surface {
    backdrop-filter: blur(12px) saturate(1.4);
    -webkit-backdrop-filter: blur(12px) saturate(1.4);
}

/* The specular highlight border — an inset box-shadow that mimics
   light refracting through glass edges. */
html.theme-glass .glass-border {
    box-shadow:
        inset 1px 1px 0 0 rgba(255, 255, 255, 0.35),
        inset -1px -1px 0 0 rgba(255, 255, 255, 0.15);
}

/* The SVG distortion filter. Injected once via +layout.svelte,
   referenced by the hero/now-playing wash. Lightweight: a single
   feTurbulence + feDisplacementMap, no specular pass (too heavy
   for WebKitGTK at full-screen scale). */
html.theme-glass .glass-distort {
    filter: url(#glass-distortion);
}
```

> [!WARNING]
> **Performance constraint**: `backdrop-filter: blur()` is expensive on WebKitGTK. We must be surgical:
> - Only apply to **Sidebar**, **PlayerBar**, **Dialog overlays**, and **NowPlaying cover wash** — surfaces that don't scroll.
> - **Never** on `.card-grid` children (MediaCard) or any scrollable list — that would re-blur on every scroll frame.
> - MediaCards get the glass *look* via semi-transparent `--card` background + the specular inset shadow (no blur).

### 2. [theme.svelte.ts](file:///home/galyarder/projects/GMusic/ui/src/lib/theme.svelte.ts) — Register the theme

**Changes:**

```typescript
// Line 18: Add 'glass' to ThemeId union
export type ThemeId = 'rose' | 'blue' | 'lime' | 'purple' | 'teal' | 'catppuccin' | 'caffeine' | 'neon' | 'breeze' | 'glass';

// Line 35: Add entry to THEMES array
{ id: 'glass', label: 'Glass', kind: 'palette', color: 'oklch(0.85 0.05 220)' }
```

### 3. [Sidebar.svelte](file:///home/galyarder/projects/GMusic/ui/src/lib/components/Sidebar.svelte) — Glass surface

**Line 102**: Add `glass-surface glass-border` classes to the `<aside>` element. These classes are no-ops unless `.theme-glass` is on `<html>`, so zero impact on other themes.

```svelte
<aside
    class="flex h-full w-16 shrink-0 flex-col border-r bg-sidebar p-3 text-sidebar-foreground glass-surface glass-border {wide('lg:w-60')}"
>
```

### 4. [PlayerBar.svelte](file:///home/galyarder/projects/GMusic/ui/src/lib/components/PlayerBar.svelte) — Glass surface

**Line 141**: Add `glass-surface glass-border` to the `<footer>`:

```svelte
<footer
    ...
    class="flex items-center gap-2 border-t bg-card px-2 py-2.5 sm:gap-4 sm:px-4 sm:py-3 glass-surface glass-border"
>
```

### 5. [+layout.svelte](file:///home/galyarder/projects/GMusic/ui/src/routes/+layout.svelte) — SVG filter injection

Add the SVG distortion filter definition (hidden, rendered once):

```svelte
<!-- Liquid Glass SVG filter — only consumed when .theme-glass is active -->
<svg style="display:none">
    <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.003 0.006"
                      numOctaves="1" seed="17" result="turb" />
        <feGaussianBlur in="turb" stdDeviation="4" result="soft" />
        <feDisplacementMap in="SourceGraphic" in2="soft" scale="8"
                           xChannelSelector="R" yChannelSelector="G" />
    </filter>
</svg>
```

> [!NOTE]
> The distortion `scale` is deliberately small (8, not the reference's 200). At full-window scale on WebKitGTK, large displacement maps re-rasterize the entire element every frame. A subtle ripple at `scale=8` is visible but cheap.

### 6. [NowPlaying.svelte](file:///home/galyarder/projects/GMusic/ui/src/lib/components/NowPlaying.svelte) — Glass artwork wash

The existing `.art-wash` blurred cover behind the now-playing view already uses `will-change: transform` for compositing. For the glass theme, we overlay the distortion filter on top:

Add `glass-distort` class to the artwork wash `<div>` (the existing blur element). This gives the frosted-glass-through-water look on the background.

### 7. Localization — Add "Glass" to locale files

Add the label to all locale JSON files that have theme entries (if themes are localized), or rely on the `label` field in `THEMES` which is used directly as the display string.

---

## Visual Design Spec

### Light Mode

| Token | Value | Rationale |
|-------|-------|-----------|
| `--background` | `oklch(0.97 0.005 220 / 75%)` | Translucent blue-white wash |
| `--card` | `oklch(1 0 0 / 55%)` | Semi-transparent white cards |
| `--sidebar` | `oklch(0.96 0.01 220 / 60%)` | Frosted sidebar |
| `--border` | `oklch(1 0 0 / 25%)` | Nearly invisible white edges |
| `--primary` | `oklch(0.55 0.15 250)` | Soft blue accent |
| `--muted` | `oklch(0.94 0.01 220 / 50%)` | Translucent muted areas |
| `--radius` | `0.75rem` | Rounder, softer corners |

### Dark Mode

| Token | Value | Rationale |
|-------|-------|-----------|
| `--background` | `oklch(0.16 0.02 250 / 80%)` | Dark translucent base |
| `--card` | `oklch(0.22 0.03 250 / 60%)` | Semi-transparent dark cards |
| `--sidebar` | `oklch(0.14 0.02 250 / 65%)` | Deep frosted sidebar |
| `--border` | `oklch(1 0 0 / 10%)` | Subtle white edges on dark |
| `--primary` | `oklch(0.75 0.12 220)` | Brighter blue for dark bg |

### Glass Effects (via utility classes)

| Effect | CSS | Applied to |
|--------|-----|------------|
| Frosted blur | `backdrop-filter: blur(12px) saturate(1.4)` | Sidebar, PlayerBar, Dialogs |
| Specular border | `box-shadow: inset 1px 1px 0 0 rgba(255,255,255,0.35), inset -1px -1px 0 0 rgba(255,255,255,0.15)` | All glass surfaces |
| Soft shadow | Tinted blue shadows at low opacity | Cards, elevated surfaces |
| Distortion | SVG `feDisplacementMap` at `scale=8` | NowPlaying wash only |

---

## Performance Budget

> [!IMPORTANT]
> WebKitGTK is the bottleneck. These constraints are non-negotiable.

| Rule | Reason |
|------|--------|
| No `backdrop-filter` on scrollable content | WebKitGTK re-blurs on every scroll frame |
| No `backdrop-filter` on `.card-grid` children | 300+ cards would each maintain a blur layer |
| `will-change: transform` on all blurred surfaces | Promotes to compositing layer, avoids re-rasterization |
| SVG distortion only on `.art-wash` | Full-screen displacement is GPU-heavy |
| `@media (prefers-reduced-motion)` respects existing rules | The block at L762 already kills all animations |
| No transition on `backdrop-filter` | Animating blur radius is a full re-composite per frame |

---

## Implementation Order

1. **CSS tokens** — `.theme-glass` + `.dark.theme-glass` in layout.css
2. **Glass utility classes** — `.glass-surface`, `.glass-border`, `.glass-distort` scoped under `html.theme-glass`
3. **Theme registration** — `ThemeId` union + `THEMES` array entry
4. **SVG filter** — Inject in +layout.svelte
5. **Component markup** — Add glass classes to Sidebar, PlayerBar, NowPlaying, Dialog overlay
6. **Verify** — `pnpm check` (0 errors), visual test in both light and dark mode

---

## What This Plan Does NOT Do

- Does not change the existing theme infrastructure.
- Does not touch MediaCard rendering (cards get translucency via tokens, not blur).
- Does not add new dependencies.
- Does not modify the artwork accent or custom override system.
- Does not add a separate "Glass" toggle in appearance settings — it's a standard palette theme.

---

## Risk

| Risk | Mitigation |
|------|------------|
| `backdrop-filter` perf on WebKitGTK | Scoped to 3 fixed-position surfaces only |
| Alpha in oklch not widely supported | WebKitGTK 2.44+ supports it; Tauri bundles 2.44+ on Fedora 44 |
| SVG filter causing jank on resize | `scale=8` is low enough; tested by existing `.art-wash` pattern |

---

## Estimated Time

**20-30 minutes** — Most of the work is the CSS token block. The component changes are 4 one-line class additions.
