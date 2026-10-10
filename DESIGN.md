# 🎂 Cinematic Romantic Birthday Experience — Design Specification

> Extracted from the Google Stitch design (Project ID: `8884931602139946901`)
> Screen: "Luxury Romantic Birthday Website" — 2560×17686 Desktop

---

## Color System

### Core Palette (Tailwind custom tokens)
| Token           | Hex         | Usage                                    |
|-----------------|-------------|------------------------------------------|
| `midnight`      | `#08131A`   | Primary background, void canvas          |
| `darkteal`      | `#0F2027`   | Gradient secondary, opening overlay      |
| `deepteal`      | `#203A43`   | Glass card gradients, mid-tone surfaces  |
| `blueteal`      | `#2C5364`   | Accent teal, timeline gradient endpoint  |
| `softpink`      | `#FFB6C1`   | Primary accent — buttons, borders, glows |
| `lightpink`     | `#FFD6E0`   | Secondary accent — text gradients, cake  |
| `warmwhite`     | `#FFF5F7`   | Primary text color, polaroid background  |
| `rosegold`      | `#E0A96D`   | Gold accent — badges, timeline, headings |
| `rosegoldLight` | `#F7D6B8`   | Cake platter, gift gradient endpoint     |

### Opacity usage patterns
- Text: `warmwhite/80`, `warmwhite/70`, `warmwhite/60`, `warmwhite/50`, `warmwhite/40`, `warmwhite/30`
- Borders: `softpink/15`, `softpink/20`, `softpink/30`, `softpink/40`, `softpink/50`
- Background accents: `softpink/20`, `rosegold/15`, `blueteal/30`

---

## Typography

### Font Families
| Token         | Fonts                                         | Usage                |
|---------------|-----------------------------------------------|----------------------|
| `font-serif`  | `Cormorant Garamond`, `Playfair Display`, Georgia | Headlines, quotes, letter |
| `font-sans`   | `Plus Jakarta Sans`, system-ui                | Body text, UI labels |
| `font-handwriting` | `Reenie Beanie`, cursive                 | Polaroid captions, signatures |

### Size Scale (from Stitch)
| Element                  | Size                  | Weight      |
|--------------------------|----------------------|-------------|
| Opening title (h1)       | `text-4xl` → `text-7xl` | `font-bold` |
| Hero heading (h2)        | `text-3xl` → `text-6xl` | `font-bold` |
| Section headings (h2)    | `text-3xl` → `text-5xl` | `font-bold` |
| Sub-headings (h3)        | `text-2xl` → `text-3xl` | `font-bold` |
| Card titles              | `text-2xl`             | `font-bold` |
| Body text                | `text-base` → `text-lg` | normal      |
| Small descriptive        | `text-sm`              | normal      |
| Labels / badges          | `text-xs`, `text-[11px]`, `text-[10px]` | `font-semibold` |
| Handwriting captions     | `text-3xl`             | normal      |

---

## Glassmorphism System

### `.glass-panel`
```css
background: rgba(15, 32, 39, 0.65);
backdrop-filter: blur(16px);
border: 1px solid rgba(255, 182, 193, 0.15);
```

### `.glass-card`
```css
background: linear-gradient(135deg, rgba(32, 58, 67, 0.5) 0%, rgba(15, 32, 39, 0.75) 100%);
backdrop-filter: blur(14px);
border: 1px solid rgba(255, 214, 224, 0.12);
```

### `.glass-pill`
```css
background: rgba(8, 19, 26, 0.8);
backdrop-filter: blur(20px);
border: 1px solid rgba(224, 169, 109, 0.25);
```

---

## Shadows
| Token          | Value                                           |
|----------------|------------------------------------------------|
| `shadow-glass` | `0 8px 32px 0 rgba(0, 0, 0, 0.45)`            |
| `shadow-glow-pink` | `0 0 35px -5px rgba(255, 182, 193, 0.35)` |
| `shadow-glow-gold` | `0 0 30px -5px rgba(224, 169, 109, 0.4)` |
| `shadow-cake-glow` | `0 20px 50px rgba(255, 182, 193, 0.25)`  |

---

## Animations

| Name           | Description                                    |
|----------------|------------------------------------------------|
| `float`        | translateY ±12px, rotate ±2deg, 6s ease-in-out |
| `floatRev`     | translateY ±10px, rotate ∓2deg, 7s ease-in-out |
| `pulseGlow`    | opacity 0.6→1, scale 1→1.04, 3s               |
| `flicker`      | scale/rotate/opacity, 1.2s (candle flames)     |
| `eqBounce`     | height 4px→20px, 1.2s (equalizer bars)         |

---

## Responsive Breakpoints

| Breakpoint | Width   | Layout                         |
|------------|---------|-------------------------------|
| Mobile     | <640px  | Single column, snap scroll    |
| sm         | 640px   | 2-col gallery, grid qualities |
| md         | 768px   | Desktop nav, timeline alt     |
| lg         | 1024px  | 12-col hero grid, 3-col gallery |

---

## Section Structure
1. Opening Screen (fullscreen overlay)
2. Hero (12-col grid, portrait + text)
3. Countdown (4-column timer grid)
4. Our Story (alternating timeline)
5. Gallery + Polaroid Wall
6. Things I Love About You (snap-scroll cards)
7. Interactive Birthday Cake
8. Audio Player (floating fixed)
9. Friend Birthday Wishes (form + grid)
10. Love Letter (envelope interaction)
11. Secret Surprise (5-tap unlock)
12. Gift Section (animated box + link)
13. Final Cinematic Scene
