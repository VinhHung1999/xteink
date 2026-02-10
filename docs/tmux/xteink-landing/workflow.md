# Xteink Landing Page Team

<context>
A simplified 2-agent team for building the Xteink X4 eReader landing page.
PO manages product backlog and brand alignment. FE implements the landing page.
Communication flows: Boss → PO → FE (direct, no SM intermediary).
</context>

**Terminology:** "Role" and "agent" are used interchangeably. Each role (PO, FE) is a Claude Code AI agent instance that may lose context between sessions.

---

## Team Structure

| Role | Pane | Purpose | Model |
|------|------|---------|-------|
| PO | 0 | Product Owner — backlog, brand alignment, acceptance | Opus |
| FE | 1 | Frontend Developer — implements landing page | Sonnet |
| Boss | Outside | Human — sprint goals, feedback, final acceptance | - |

---

## CRITICAL: Pane Detection (Common Bug)

**NEVER use `tmux display-message -p '#{pane_index}'`** — returns ACTIVE/FOCUSED pane, NOT your pane!

**Always use `$TMUX_PANE` environment variable:**

```bash
# CORRECT
echo $TMUX_PANE
tmux list-panes -a -F '#{pane_id} #{pane_index} #{@role_name}' | grep $TMUX_PANE
```

---

## Communication Protocol

### Use tm-send for ALL Messages

```bash
# Correct
tm-send FE "PO [HH:mm]: message"

# Forbidden
tmux send-keys -t %16 "message" C-m C-m  # NEVER!
```

### Two-Step Response Rule

Every task requires TWO responses:

1. **ACKNOWLEDGE** (immediately): "Received, starting now"
2. **COMPLETE** (when done): "Task DONE. [Summary]"

### Communication Flow

Since this is a 2-person team, communication is direct (no SM):

| From | To | When |
|------|-----|------|
| Boss | PO | Sprint goals, priorities, feedback |
| PO | FE | Requirements, acceptance criteria, brand guidance |
| FE | PO | Status updates, completion reports, questions |

**PO is the hub.** FE reports directly to PO. Boss communicates only with PO.

---

## Project Context

### Brand Source of Truth

Before creating ANY content or design:
- Read `soul/00-start-here.md` — brand philosophy
- Read `design-guidelines/00-design-philosophy.md` — visual design system

### Brand Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Paper White | `#F5F0EB` | Backgrounds |
| Charcoal | `#2D2D2D` | Body text |
| Warm Gold | `#D4A574` | Accents, CTAs |
| Deep Gold | `#B8864A` | Hover states |
| Sage | `#8B9E7E` | Nature accents |
| Dusty Rose | `#C4A0A0` | Soft accents |
| Ink | `#1A1A1A` | Headings, overlays |
| Surface | `#FAF7F3` | Card backgrounds |

### Typography

- **Cormorant Garamond** — headings, literary quotes
- **Be Vietnam Pro** — UI, body text
- **Caveat** — accent only (handwritten feel)

### Icons

- Lucide (primary), Heroicons outline (alternative)

### Four Design Pillars

Every visual/copy decision must map to one of these:
1. **Quiet** — whitespace, warm neutrals, no heavy animations
2. **Return** — paper texture, tactile feel, page-turning
3. **Warmth** — golden hour lighting, latte/sage palette
4. **Becoming** — show transformation, inviting CTAs

---

## Known Technical Issues (from project memory)

1. **Next.js 16 + React 19 + Turbopack**: `useEffect`, `framer-motion`, `react-intersection-observer` fail silently. Use `<script dangerouslySetInnerHTML>` with `DOMContentLoaded` for vanilla JS. Use `[data-sr-ready]` CSS guard.
2. **Dark mode token inversion**: Use hardcoded Tailwind arbitrary values (`text-[#1A1A1A]`, `from-[#1A1A1A]/70`) for colors that must stay absolute regardless of theme.

---

## Sprint Workflow (Simplified for 2-Agent Team)

### Phase 1: Sprint Planning
```
Boss → PO: Sprint Goal
PO: Creates PRODUCT_BACKLOG items, defines sprint scope
PO → FE: Sprint assignment with acceptance criteria
```

### Phase 2: Sprint Execution
```
FE: Implements with TDD (progressive commits)
FE → PO: Questions about requirements/brand
PO → FE: Clarifications + brand guidance
FE → PO: Completion report
```

### Phase 3: Sprint Review
```
PO: Reviews FE's work against acceptance criteria + brand guidelines
PO: Accepts or requests changes
PO → Boss: Present completed sprint for acceptance
Boss → PO: Feedback
```

### Phase 4: Sprint Retrospective (CRITICAL)
```
PO: Facilitates retro with FE
  → What went well?
  → What went wrong?
  → What to improve?
PO: Updates role prompts (PO_PROMPT.md, FE_PROMPT.md) based on lessons learned
PO: Updates project memory (.claude/memory/) with new patterns/bugs/insights
PO → Boss: Retro summary + prompt/memory changes made
```

### Phase 5: Next Sprint
```
PO: Updates backlog based on Boss feedback + retro insights
PO: Selects next sprint items
Repeat Phase 1
```

---

## Definition of Done

A Story is "Done" when:
- [ ] Code implemented and committed
- [ ] Tests pass (lint + build)
- [ ] Brand alignment verified (colors, typography, tone)
- [ ] PO accepts
- [ ] Boss accepts (at Sprint Review)

---

## Git Workflow

```bash
# Sprint branch
git checkout -b sprint_{N}

# Feature branches off sprint
git checkout -b feature_{story_id}_{description}

# After PO acceptance
git checkout sprint_{N}
git merge feature_{story_id}_{description}

# After Boss acceptance
git checkout main
git merge sprint_{N}
git push origin main
```

---

## Frontend Tech Stack

- Next.js 16, React 19
- TypeScript strict mode
- Tailwind CSS v4
- Working directory: `website/`
- **Dev port: 2002** (`npm run dev` → `localhost:2002`)

---

## Files in This Directory

```
xteink-landing/
├── workflow.md          # This file
├── WHITEBOARD.md        # Status updates
├── PRODUCT_BACKLOG.md   # All work items (PO owned)
├── setup-team.sh        # Automated setup
└── prompts/
    ├── PO_PROMPT.md     # Product Owner
    └── FE_PROMPT.md     # Frontend Developer
```
