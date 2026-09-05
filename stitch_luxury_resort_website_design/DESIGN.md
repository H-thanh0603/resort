---
name: Sanctuary Quiet Luxury
colors:
  surface: '#fbf9f4'
  surface-dim: '#dbdad5'
  surface-bright: '#fbf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ee'
  surface-container: '#f0eee9'
  surface-container-high: '#eae8e3'
  surface-container-highest: '#e4e2dd'
  on-surface: '#1b1c19'
  on-surface-variant: '#444748'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f1ec'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#725b38'
  on-secondary: '#ffffff'
  secondary-container: '#fedeb2'
  on-secondary-container: '#78603e'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#061f25'
  on-tertiary-container: '#708890'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#fedeb2'
  secondary-fixed-dim: '#e0c298'
  on-secondary-fixed: '#281800'
  on-secondary-fixed-variant: '#584323'
  tertiary-fixed: '#cee7f0'
  tertiary-fixed-dim: '#b2cbd3'
  on-tertiary-fixed: '#061f25'
  on-tertiary-fixed-variant: '#334a52'
  background: '#fbf9f4'
  on-background: '#1b1c19'
  surface-variant: '#e4e2dd'
typography:
  display-hero:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '400'
    lineHeight: 76px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Playfair Display
    fontSize: 38px
    fontWeight: '400'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 44px
    fontWeight: '400'
    lineHeight: 54px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 30px
    fontWeight: '400'
    lineHeight: 38px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  title-editorial:
    fontFamily: Playfair Display
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0.02em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '300'
    lineHeight: 30px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: 0.01em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.015em
  label-uppercase:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.18em
  label-regular:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
spacing:
  space-3xs: 0.25rem
  space-2xs: 0.5rem
  space-xs: 0.75rem
  space-sm: 1rem
  space-md: 1.5rem
  space-lg: 2.5rem
  space-xl: 4rem
  space-2xl: 6rem
  space-3xl: 9rem
  gutter-mobile: 1.25rem
  gutter-desktop: 3rem
  container-max: 1440px
---

## Brand & Style

This design system embodies the ethos of "Quiet Luxury" and architectural stillness for an ultra-luxury coastal sanctuary and ecological retreat. The visual identity avoids loud embellishments, relying instead on architectural symmetry, deliberate spatial breathing room, and meticulous micro-details that evoke serene exclusivity, restorative nature, and timeless elegance.

### Emotional Objectives
- **Sanctuary & Calm:** High white space ratios, soft natural transitions, and unhurried visual pacing that slow the user's pulse.
- **Understated Opulence:** Replacing vibrant, aggressive accents with muted champagne metallics, tactile warm alabaster surfaces, and deep ocean slate depths.
- **Architectural Precision:** Subtle hairline divides (0.5px–1px), deliberate alignment, and refined serif editorial headers reminiscent of high-end architectural monographs and bespoke hospitality journals.

## Colors

The color palette is derived directly from pristine coastal topography: warm sun-bleached sand, raw mineral stone, sunlit champagne metals, and twilight ocean waters.

### Core Roles
- **Primary (`#161616` - Obsidian Charcoal):** Used for primary typography, authoritative framing, and structural balance. Delivers deep contrast without the harshness of pure `#000000`.
- **Secondary (`#C5A880` - Muted Champagne Gold):** Used selectively for focal highlights, active navigation accents, subtle interactive states, and refined ornamental touches. Paired with Deep Bronze (`#8C6D46`) for hover states and pressed interactions.
- **Tertiary (`#1F363D` - Deep Sea Slate):** Infuses ecological richness. Reserved for curated wellness, aquatic experience modules, nature reservation tags, and atmospheric hero backdrops.
- **Neutral Base (`#F7F5F0` - Warm Alabaster):** The foundational canvas. Replaces sterile digital whites with a warm, tactile, linen-and-limestone tone that reduces eye strain and establishes quiet warmth.

### Functional Roles
- **Surface Elevation 0 (Base Canvas):** `#F7F5F0`
- **Surface Elevation 1 (Card / Panel):** `#FFFFFF` (pure soft white layer over alabaster)
- **Surface Elevation 2 (Floating Popover / Modal):** `#FCFAF7`
- **Text Primary:** `#161616`
- **Text Secondary / Editorial Meta:** `#5C5852`
- **Text Disabled / Micro Border:** `rgba(22, 22, 22, 0.08)`
- **Metallic Accent Border:** `rgba(197, 168, 128, 0.35)`

## Typography

The typographic hierarchy creates a dialogue between the classical literary elegance of **Playfair Display** and the pristine, hyper-legible geometry of **Plus Jakarta Sans**.

### Typographic Rules
- **Editorial Contrast:** All major narrative headings, section titles, and pull-quotes must employ `Playfair Display`. It should never be set in bold; its authority derives from natural character width, high stroke contrast, and gentle tracking.
- **Functional Clarity:** All UI elements, descriptive copy, data tables, booking engine selectors, and navigation bars use `Plus Jakarta Sans` with airy tracking (`0.01em` to `0.02em`) and relaxed line-heights (minimum 1.6x body size) to preserve visual tranquility.
- **Uppercase Hierarchy:** Category trackers, micro-headers, and booking step indicators employ `label-uppercase` styled strictly in small uppercase letters with extended letter-spacing (`0.18em`), rendered in muted gold or charcoal tint.

## Layout & Spacing

This layout architecture relies on monumental negative space, intentional asymmetry, and wide margins, rejecting cramped dashboards in favor of gallery-inspired editorial compositions.

### Grid System & Breakpoints
- **Desktop (1200px+):** 12-column symmetrical grid. Outer container bound at `1440px`, with dynamic lateral padding starting at `space-xl` (`4rem`) and `space-lg` (`2.5rem`) column gutters.
- **Tablet (768px – 1199px):** 8-column layout. Margin safety offsets set to `2rem`, gutter set to `1.5rem`.
- **Mobile (Below 768px):** 4-column layout. Minimal side paddings of `1.25rem`, allowing imagery and editorial cards to reach fluid edge-to-edge bleed when appropriate.

### Spatial Rhythm
- **Vertical Hierarchy:** Section blocks must be delineated by generous vertical pauses (`space-2xl` to `space-3xl`) rather than heavy horizontal separator bars.
- **Macro Whitespace:** Maintain at least 40% empty surface space on any view viewport to preserve the tranquil luxury aesthetic.

## Elevation & Depth

To remain faithful to "Quiet Luxury," the system avoids pronounced dropshadows and heavy structural borders. Visual stratification is achieved through tonal micro-shifts, soft ambient diffusion, and ultra-fine hairline outlines.

### Architectural Stratification
- **The Hairline Divide:** When dividing modular content, use a single 1px solid stroke with `rgba(22, 22, 22, 0.06)` or metallic hairline `rgba(197, 168, 128, 0.3)`. No 2px or thicker border lines are permitted for structural containers.
- **Ambient Sun-Cast Shadows:**
  - *Resting Elevation:* `0 4px 24px -2px rgba(22, 22, 22, 0.03), 0 2px 8px -1px rgba(22, 22, 22, 0.02)`
  - *Interactive Float / Hover:* `0 20px 48px -10px rgba(31, 54, 61, 0.08), 0 6px 16px -2px rgba(22, 22, 22, 0.02)`
- **Atmospheric Translucency:** Modal overlays, persistent header bars, and floating booking summaries utilize subtle backdrop blurs (`backdrop-filter: blur(16px)`) with warm translucent background washes (`rgba(247, 245, 240, 0.85)`).

## Shapes

The design system adopts a razor-sharp, architectural aesthetic (`roundedness: 0`). 

### Geometric Precision
- **Architectural Planarity:** Cards, imagery frames, modals, input containers, and button surfaces are engineered with clean `0px` radii. This evokes classical stone architecture, luxury print magazines, and timeless precision.
- **Circular Balance:** Pure geometric circles (`50%` radius) are strictly reserved for navigation directionals (e.g., editorial slider arrows), interactive audio triggers, or minimalist date pickers, providing counterpoints to rectangular layouts.

## Components

### Buttons & CTAs
- **Primary Luxury Action:** Solid Obsidian background (`#161616`), Warm Alabaster text (`#F7F5F0`), 0px border radius, uppercase typography with `letter-spacing: 0.16em`. Padding: `18px 36px`. Hover state softly lightens background to `#2A2A2A` accompanied by an understated `1px` inner bronze highlight.
- **Secondary Ghost Action:** Transparent background, crisp 1px border `rgba(22, 22, 22, 0.25)`, Charcoal text. On hover, background shifts to `#FFFFFF` and border transitions to `#C5A880`.
- **Editorial Text Link:** Pure typography with an expanding hairline bottom stroke (`#C5A880`) offset by `6px`.

### Room & Sanctuary Cards
- Pristine aspect-ratio image framing (16:11 or 4:5), overlayed with subtle gradient fades (`rgba(22, 22, 22, 0.3)` to transparent).
- Typography placed with generous inset padding (`2rem`), featuring villa title in `headline-sm` and room amenities set in `label-uppercase` (`#C5A880`).
- Subtle upward image scale transition (`scale(1.03)` over 700ms bezier `(0.16, 1, 0.3, 1)`) on container hover.

### Form Inputs & Booking Selectors
- Minimalist open layout: Transparent surface with an ultra-thin bottom border `1px solid rgba(22, 22, 22, 0.2)`. 
- Floating labels in `label-uppercase`. 
- Active and focus state expands the bottom border to full Champagne Gold (`#C5A880`) without harsh focus rings.

### Checkboxes & Selectors
- Bespoke square selector with razor corners.
- Unchecked: `1px solid rgba(22, 22, 22, 0.3)`.
- Checked: Obsidian background (`#161616`) housing an intricate hairline checkmark rendered in `#C5A880`.

### Sanctuary Experience Badges & Chips
- Crisp, unrounded tags with warm alabaster backings (`rgba(255, 255, 255, 0.7)`), bounded by `1px solid rgba(197, 168, 128, 0.4)`.
- Typography styled in `label-uppercase` at 10px, rendered in Deep Sea Teal (`#1F363D`) for ecological tags, and Deep Bronze (`#8C6D46`) for VIP amenities.