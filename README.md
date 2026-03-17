# ICDB — Internet Chef Database

The pedigree and lineage of chefs, mapped.

**Live:** [prescientminds.github.io/icdb](https://prescientminds.github.io/icdb/)

## What

A credentialing and intelligence system for the restaurant industry. Tracks chefs, their career histories, the restaurants they've built, and the mentor-protégé networks that connect them.

- **22** chef profiles with bios, career timelines, cuisine tags
- **52** restaurants (LA + key training kitchens nationally)
- **88** career stops linking chefs → restaurants → positions → years
- **9** restaurant groups and investors with portfolios
- **Lineage trees** showing who trained whom across generations

## Pages

- **Chefs** — Profile cards with stop counts, current restaurants, bios
- **Chef detail** — Origin, education, current stops, full career timeline with mentor links, network (trained under / protégés)
- **Restaurants** — Sorted by Michelin stars, with staff and alumni
- **Restaurant detail** — Ratings, format, group/investor, current staff, kitchen diaspora
- **Lineage** — Mentor → protégé trees (Keller → Kahn → Ki Kim, Puck → Silverton → Colby, etc.)
- **Groups** — Restaurant group portfolios and investor intelligence

## Dev

```bash
npm install
npm run dev
```

## Stack

Next.js 16, TypeScript, Tailwind CSS. Static JSON data, exported to GitHub Pages.
