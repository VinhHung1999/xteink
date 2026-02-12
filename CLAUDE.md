# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **brand strategy and design system project** for the **Xteink X4 eReader** — a $69 ultra-portable e-ink reading device (4.3", 74g, 5.9mm, physical buttons, DRM-free). The project contains market research, brand soul documentation, design guidelines, and web image assets for launching in the Vietnam market.

## Repository Structure

| Directory | Purpose |
|-----------|---------|
| `website/` | **E-commerce website** — Next.js 16 + React 19 + Tailwind v4. Multi-page: `/`, `/products`, `/guides`, `/community`, `/faq`. Dev: `npm run dev` (port 2002) |
| `soul/` | Brand philosophy — three souls (product, brand, user), emotional landscape, paradoxes, moments of magic, Vietnam soul. **Source of truth** for all brand decisions. |
| `design-guidelines/` | Visual design system derived from `soul/`. Colors, typography (Cormorant Garamond + Be Vietnam Pro), photography, UI components, motion, copy voice, Vietnam localization. See its `README.md` for the full file index. |
| `brand-soul/` | Alternative/earlier brand documentation (overlaps with `soul/`) |
| `raw-data/` | Comprehensive Vietnam market research (~114KB) with 72+ citations — product specs, SWOT, competitive landscape, go-to-market strategy |
| `structured_images/` | Crawled web image assets from xteink.com with metadata catalog in `index.md` |

## Key Concepts

- **"Permission slip" positioning**: The X4 is not sold as a gadget but as permission to be quiet, slow, and present. All content should reflect this.
- **"Innocent Rebel" brand archetype**: Warm but countercultural — gentle rebellion against always-on digital life.
- **Four design pillars**: Quiet, Return, Warmth, Becoming — every visual/copy decision maps to these.
- **Subtraction philosophy**: What's NOT included matters as much as what is (no touchscreen, no apps, no subscriptions).

## Working With This Project

- **Before creating any content or design**, read `soul/00-start-here.md` and `design-guidelines/00-design-philosophy.md`.
- **For quick rules reference**, use `design-guidelines/11-dos-and-donts.md` (every rule cited with soul origin).
- **For Vietnam-specific work**, reference `soul/08-the-vietnam-soul.md` and `design-guidelines/12-vietnam-localization.md`.
- **Brand colors**: Paper White `#F5F0EB`, Charcoal `#2D2D2D`, Warm Gold `#D4A574`, Deep Gold `#B8864A`, Sage `#8B9E7E`, Dusty Rose `#C4A0A0`, Ink `#1A1A1A`, Surface `#FAF7F3`.
- **Fonts**: Cormorant Garamond (headings/literary), Be Vietnam Pro (UI/body), Caveat (accent only).
- **Icons**: Lucide (primary), Heroicons outline variant (alternative).

## Workflow Steps (from `Xteink Steps.md`)

1. Research and gather insight (Brain, Vibe, Mood, Emotional)
2. Crawl image data from website
3. Remove backgrounds from product images

## Tmux Multi-Agent Team

Session `xteink-landing` — 6-person team for website development:

| Pane | Role | Model | Responsibility |
|------|------|-------|----------------|
| 0 | **PO** | Opus | Product Owner — backlog, brand guardian, accept/reject work |
| 1 | **SM** | Sonnet | Scrum Master — ceremonies, impediments, retros, process |
| 2 | **TL** | Opus | Tech Lead — architecture, code review, technical decisions |
| 3 | **FE** | Opus | Frontend Dev — implements UI in `website/` |
| 4 | **BE** | Opus | Backend Dev — APIs, database, payment/shipping integrations |
| 5 | **QA** | Sonnet | Quality Assurance — testing, bug reports, brand validation |

**Setup:** `bash docs/tmux/xteink-landing/setup-team.sh`

**Communication:** `tm-send -s xteink-landing <ROLE> "message"`

**Prompts:** `docs/tmux/xteink-landing/prompts/{PO,SM,TL,FE,BE,QA}_PROMPT.md`

**Workflow:** Boss → PO (goals) → SM (planning) → TL (technical direction) → FE/BE (implement) → QA (test) → PO (accept) → Boss (review)

## Project Memory

Project memories are stored in `.claude/memory/`. Use `--project-recall` before complex tasks, `--project-store` after meaningful work.

| Topic | Content |
|-------|---------|
| [bugs-and-lessons](.claude/memory/bugs-and-lessons/README.md) | Bugs encountered and lessons learned |
| [architecture](.claude/memory/architecture/README.md) | System structure, module boundaries, key patterns |
| [frontend](.claude/memory/frontend/README.md) | FE patterns, components, styling, Next.js/React conventions |
| [backend](.claude/memory/backend/README.md) | BE patterns, API, payment/shipping integrations |
