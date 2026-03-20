# ICDB Brand Guide

## Positioning

**What it is:** The definitive reference for understanding how Los Angeles became one of the great food cities in the world — through the invisible network of kitchens that trained the cooks who opened the restaurants you eat at tonight.

**Tagline:** *The pedigree of LA dining, mapped.*

**Descriptor (long):** Verified career histories, mentor-protégé networks, and kitchen diaspora for 235+ chefs across 318 restaurants. The only database that traces who trained whom, where they went, and what they built.

**Descriptor (short):** Chef lineage and career intelligence for LA dining.

**Who uses it:** Food journalists researching profiles. Restaurant groups evaluating talent pipelines. Industry professionals tracking career movements. Serious diners who want to understand what connects their favorite restaurants.

**Voice:** Authoritative without being academic. The tone of a well-sourced food editor who's had dinner at every restaurant in the database — factual, specific, never promotional. Data speaks. Adjectives don't.

---

## Color System — "Dark Walnut"

The palette draws from three sources: the high-contrast readability of IMDB, the dark wood and brass interiors of Hillstone restaurants, and the golden-hour warmth of California coastal light.

### Core Palette

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Background** | `#141210` | 20, 18, 16 | Page body, deepest surface |
| **Surface** | `#2d2a23` | 45, 42, 35 | Cards, panels, nav, dropdown |
| **Elevated** | `#363229` | 54, 50, 41 | Hover states, subtle bg fills |
| **Border** | `#4a453b` | 74, 69, 59 | Card borders, dividers |
| **Border Hover** | `#585244` | 88, 82, 68 | Interactive border hover |

### Text

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Primary** | `#ede8df` | 237, 232, 223 | Headlines, body text |
| **Secondary** | `#9e978a` | 158, 151, 138 | Descriptions, metadata |
| **Dim** | `#706a5e` | 112, 106, 94 | Timestamps, low-priority info |

### Accent & Semantic

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Brass (accent)** | `#c9a66c` | 201, 166, 108 | Links, interactive elements |
| **Brass Hover** | `#d4b07a` | 212, 176, 122 | Link/button hover |
| **Star Gold** | `#e5b94e` | 229, 185, 78 | Michelin stars |
| **Verified** | `#6a9e66` | 106, 158, 102 | Verified badges |
| **Closed** | `#c47070` | 196, 112, 112 | Closed restaurant indicator |
| **Notable** | `#6a8ec0` | 106, 142, 192 | Notable tier badge |

### Badge/Tag Backgrounds

Semantic colors at low opacity on surface:

| Token | Hex | Context |
|-------|-----|---------|
| Amber bg | `#38322a` | Cuisine tags, protégé badges |
| Amber border | `#6b5838` | Tag borders |
| Green bg | `#253024` | Verified badge bg |
| Red bg | `#352222` | Closed badge bg |
| Blue bg | `#222a38` | Notable badge bg |

### Contrast Ratios (WCAG)

| Pair | Ratio | Grade |
|------|-------|-------|
| Primary text on Background | 14.2:1 | AAA |
| Primary text on Surface | 11.7:1 | AAA |
| Secondary text on Background | 6.1:1 | AA |
| Accent on Background | 5.8:1 | AA |
| Accent on Surface | 4.9:1 | AA large text |

### Rules

- Never use pure black (`#000`) or pure white (`#fff`). Every value carries warmth.
- The accent brass is the only "color" on most pages. Stars are the exception.
- Badge backgrounds use the semantic color at ~10% opacity equivalent (dark tinted versions). Text uses the semantic color at full saturation.
- Cards must visibly lift off the background. Minimum ~25 RGB points of separation.

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

Surface background, 1px border (stone-200), 8px radius. Hover: border warms to amber-200, subtle shadow. Content: title + cuisine tags + signal line. Transition: `transition-all`.

### Signal Line

The one-line summary answering "why is this entity in the database?" Always below the title.

- **Chef signals:** Current restaurant + stars + mentor lineage + protégé count
- **Restaurant signals:** Neighborhood + alumni stats + group affiliation

### Tags/Chips

Full-radius pill, amber tint bg, amber border, amber text. Used for cuisine tags and tier badges.

### Protégé Count Badge

Circular amber badge, right-aligned on card. The number is the hook — tells you someone has influence before you click.

### "→ where they went" Pattern

On restaurant diaspora and chef protégé sections. Right-aligned link showing the alum's current restaurant. Dim text, warms on hover. This is the connective tissue that makes the database a discovery engine.

### Section Labels

11px uppercase, wider tracking, secondary text color. Always followed by content, never standalone.

---

## Content Specifications

### Social / Share Cards
- **Dimensions:** 1200×630px (OG image standard)
- **Background:** Dark Walnut background (#141210)
- **Typography:** Geist Sans, Display size for chef/restaurant name, Body for signal line
- **Accent:** Brass for emphasis elements
- **Include:** Chef name, signal line, data visualization element (protégé count or lineage preview)

### Print Reference Sheets
- **Dimensions:** Letter (8.5×11")
- **Color option A:** Surface bg (#2d2a23) with cream text — matches digital
- **Color option B:** Invert to cream bg (#ede8df) with charcoal text — for print economy
- **Typography:** Maintain full type hierarchy. Geist exports clean to PDF.

### Presentation Slides
- **Dimensions:** 16:9 (1920×1080)
- **Background:** #141210 for slides, Surface for content blocks
- **Accent:** Brass for emphasis
- **Rule:** Max 3 type sizes per slide

### Data Visualizations
- **Connections:** Brass (#c9a66c)
- **Labels:** Secondary text (#9e978a)
- **Highlights:** Star gold (#e5b94e)
- **Nodes:** Surface bg with border
- **Rule:** Visualization on background layer, text on surface cards

### Email / Newsletter
- **Background:** Surface (#2d2a23) for header
- **Fallback:** Dark neutral for email clients that strip custom colors
- **Links:** Brass (#c9a66c)
- **Max width:** 600px
- **Styles:** Inline only
