# ICDB Brand Guide

## Positioning

**What it is:** The definitive reference for understanding how Los Angeles became one of the great food cities in the world — through the invisible network of kitchens that trained the cooks who opened the restaurants you eat at tonight.

**Tagline:** *The pedigree of LA dining, mapped.*

**Descriptor (long):** Verified career histories, mentor-protégé networks, kitchen diaspora, and investment intelligence for 235+ chefs across 318 restaurants. The only database that traces who trained whom, who backs whom, where they went, and what they built.

**Descriptor (short):** Chef lineage, career intelligence, and capital networks for LA dining.

**Who uses it:** Food journalists researching profiles. Restaurant groups evaluating talent pipelines. Industry professionals tracking career movements. Serious diners who want to understand what connects their favorite restaurants.

**Voice:** Authoritative without being academic. The tone of a well-sourced food editor who's had dinner at every restaurant in the database — factual, specific, never promotional. Data speaks. Adjectives don't.

---

## Color System — "California Coral"

Clean, light, and inviting — white cards on warm cream, with coral as the single confident accent color. The palette reads as editorial and fresh, not corporate or clinical.

### Core Palette

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Background** | `#f9f8f6` | 249, 248, 246 | Page body, warm cream |
| **Surface** | `#ffffff` | 255, 255, 255 | Cards, panels, nav, dropdown |
| **Elevated** | `#f5f4f0` | 245, 244, 240 | Hover states, subtle bg fills |
| **Border** | `#e7e5e4` | 231, 229, 228 | Card borders, dividers |
| **Border Hover** | `#d6d3d1` | 214, 211, 209 | Interactive border hover |

### Text

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Primary** | `#1c1917` | 28, 25, 23 | Headlines, body text |
| **Secondary** | `#78716c` | 120, 113, 108 | Descriptions, metadata |
| **Muted** | `#a8a29e` | 168, 162, 158 | Timestamps, low-priority info |

### Accent & Semantic

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Coral (accent)** | `#e8614d` | 232, 97, 77 | Links, interactive elements, the splash |
| **Coral Hover** | `#d4533f` | 212, 83, 63 | Link/button hover |
| **Star Gold** | `#eab308` | 234, 179, 8 | Michelin stars |
| **Verified** | `#16a34a` | 22, 163, 74 | Verified badges |
| **Closed** | `#ef4444` | 239, 68, 68 | Closed restaurant indicator |
| **Notable** | `#1d4ed8` | 29, 78, 216 | Notable tier badge |

### Badge/Tag Backgrounds

Semantic colors at low opacity on white surface:

| Token | Hex | Context |
|-------|-----|---------|
| Coral bg | `#fff1ee` | Cuisine tags, protégé badges |
| Coral border | `#f5b8ad` | Tag borders |
| Green bg | `#f0fdf4` | Verified badge bg |
| Green border | `#bbf7d0` | Verified badge border |
| Red bg | `#fef2f2` | Closed badge bg |
| Red border | `#fecaca` | Closed badge border |
| Blue bg | `#eff6ff` | Notable badge bg |
| Blue border | `#bfdbfe` | Notable badge border |

### Contrast Ratios (WCAG)

| Pair | Ratio | Grade |
|------|-------|-------|
| Primary text on Background | 15.4:1 | AAA |
| Primary text on Surface | 16.8:1 | AAA |
| Secondary text on Surface | 4.9:1 | AA large text |
| Coral accent on Surface | 4.6:1 | AA large text |
| Coral accent on Background | 4.3:1 | AA large text |

### Rules

- Background is warm cream (`#f9f8f6`), not sterile white. Cards are true white — the contrast creates lift.
- Coral is the only chromatic accent on most pages. Stars (gold) and badges (green/red/blue) are the exceptions.
- Badge backgrounds use the semantic color at very low opacity. Text uses the semantic color at full saturation.
- One color does all the work. Everything else is warm neutrals.

---

## Typography

**Font family:** Geist Sans (primary), Geist Mono (tabular data)

Both loaded via `next/font/google`. Geist is a contemporary geometric sans-serif with high legibility at small sizes — correct for a data-dense application. Geist Mono provides clean alignment for dates, numbers, and career timeline columns.

### Type Scale

| Level | Element | Size | Weight | Tracking | Line Height | Tailwind |
|-------|---------|------|--------|----------|-------------|----------|
| Display | Home h1 | 36px / 2.25rem | 700 | -0.025em | 1.1 | `text-4xl font-bold tracking-tight` |
| Page Title | Detail h1 | 30px / 1.875rem | 700 | -0.025em | 1.2 | `text-3xl font-bold tracking-tight` |
| Section Head | h2 | 20px / 1.25rem | 600 | normal | 1.4 | `text-xl font-semibold` |
| Section Label | Uppercase dividers | 11px | 600 | 0.05em | 1 | `text-[11px] font-semibold uppercase tracking-wider` |
| Card Title | Names | 14px / 0.875rem | 600 | normal | 1.4 | `text-sm font-semibold` |
| Body | Bios, descriptions | 14px / 0.875rem | 400 | normal | 1.625 | `text-sm leading-relaxed` |
| Meta | Tags, stats | 12px / 0.75rem | 400–500 | normal | 1.5 | `text-xs` |
| Micro | Smallest badges | 10px | 500 | normal | 1 | `text-[10px] font-medium` |
| Nav Logo | "ICDB" | 20px / 1.25rem | 700 | -0.025em | 1 | `text-xl font-bold tracking-tight` |
| Nav Links | Navigation | 14px / 0.875rem | 500 | normal | 1 | `text-sm font-medium` |

### Rules

- Maximum 4 type sizes on any single page: title → section label → card title → body/meta.
- Bold (700) is reserved for page titles and the nav logo. Section headings use semibold (600). Body never uses bold.
- Uppercase is reserved for section labels (11px). Never uppercase a heading or title.
- Line height increases as size decreases. Display = 1.1, body = 1.625.

---

## Spacing & Layout

| Parameter | Value | Tailwind |
|-----------|-------|----------|
| Max content width | 1152px / 72rem | `max-w-6xl` |
| Page horizontal padding | 24px | `px-6` |
| Page vertical padding | 32px | `py-8` |
| Nav vertical padding | 12px | `py-3` |
| Section gap | 48px | `mb-12` |
| Card padding | 20px | `p-5` |
| Card gap (grid) | 16px | `gap-4` |
| Card border radius | 8px | `rounded-lg` |
| Tag border radius | 9999px | `rounded-full` |
| Tag padding | 12px h / 2px v | `px-3 py-0.5` |
| Detail page max width | 768px / 48rem | `max-w-3xl` |

### Grid Patterns

| Context | Columns | Tailwind |
|---------|---------|----------|
| Index pages (chefs, restaurants) | 1 → 2 at md | `grid-cols-1 md:grid-cols-2` |
| Home: network, kitchens | 2 → 3 at md | `grid-cols-2 md:grid-cols-3` |
| Home: Michelin grid | 2 → 4 at md | `grid-cols-2 md:grid-cols-4` |

---

## Component Patterns

### Cards (index pages)

White surface, 1px warm border, 8px radius. Hover: border warms to coral tint, subtle shadow. Content: title + cuisine tags + signal line. Transition: `transition-all`.

### Signal Line

The one-line summary answering "why is this entity in the database?" Always below the title.

- **Chef signals:** Current restaurant + stars + mentor lineage + protégé count
- **Restaurant signals:** Neighborhood + alumni stats + group affiliation + capital backing

### Tags/Chips

Full-radius pill, light coral bg, coral border, coral text. Used for cuisine tags and tier badges.

### Protégé Count Badge

Circular coral badge, right-aligned on card. The number is the hook — tells you someone has influence before you click.

### "→ where they went" Pattern

On restaurant diaspora and chef protégé sections. Right-aligned link showing the alum's current restaurant. Muted text, warms to coral on hover. This is the connective tissue that makes the database a discovery engine.

### Capital Section

On restaurant detail pages when investment/ownership stakes exist. Shows investor name, role, year. On groups page: "Backed by" (incoming stakes) and "Investments" (outgoing stakes).

### Section Labels

11px uppercase, wider tracking, secondary text color. Always followed by content, never standalone.

---

## Content Specifications

### Social / Share Cards
- **Dimensions:** 1200×630px (OG image standard)
- **Background:** White (`#ffffff`) or warm cream (`#f9f8f6`)
- **Typography:** Geist Sans, Display size for chef/restaurant name, Body for signal line
- **Accent:** Coral for emphasis elements
- **Include:** Chef name, signal line, data visualization element (protégé count or lineage preview)

### Print Reference Sheets
- **Dimensions:** Letter (8.5×11")
- **Background:** White or warm cream — matches digital
- **Text:** Primary dark (`#1c1917`)
- **Typography:** Maintain full type hierarchy. Geist exports clean to PDF.

### Presentation Slides
- **Dimensions:** 16:9 (1920×1080)
- **Background:** White or warm cream, coral accent for emphasis
- **Rule:** Max 3 type sizes per slide

### Data Visualizations
- **Connections:** Coral (`#e8614d`)
- **Labels:** Secondary text (`#78716c`)
- **Highlights:** Star gold (`#eab308`)
- **Nodes:** White surface with border
- **Rule:** Visualization on cream background layer, text on white surface cards

### Email / Newsletter
- **Background:** White (`#ffffff`) for content area
- **Header accent:** Coral (`#e8614d`)
- **Links:** Coral (`#e8614d`)
- **Max width:** 600px
- **Styles:** Inline only
