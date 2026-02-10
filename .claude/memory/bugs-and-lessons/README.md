# Bugs & Lessons Learned

## Resolved Bugs

_(Add bugs as they are fixed)_

```markdown
### Bug title (Sprint/Context)
- **Cause:** What caused it
- **Fix:** How it was resolved
```

## Lessons Learned

### JS execution broken in Next.js 16 + React 19 + Turbopack
- `framer-motion`, `react-intersection-observer`, `useEffect` hooks, and `next/script` ALL fail silently — animations/effects never fire
- `useState` + click handlers DO work (Navbar drawer), but `useEffect` does not run in client components
- **Fix:** Use `<script dangerouslySetInnerHTML>` with `DOMContentLoaded` for vanilla JS. Use `[data-sr-ready]` CSS guard so content stays visible if JS fails

### Turbopack wrong workspace root — "Can't resolve 'tailwindcss'"
- **Cause:** Ancestor directory (e.g. `~/`) has `package-lock.json`, so Turbopack infers it as workspace root and resolves modules from there instead of the actual project
- **Fix:** `turbopack.root` in next.config.ts did NOT work. `TURBOPACK=0` env var did NOT work. Use `next dev --webpack` flag to disable Turbopack

### Git revert on CSS-heavy commits loses styles
- **Cause:** `git revert` on commits with extensive CSS changes creates conflicts; resolution often drops styles silently
- **Fix:** Use `git checkout <good-commit> -- <files>` to restore exact file state, then re-apply only the changes you want

### Dark mode token inversion breaks "absolute" color uses
- Swapping `paper`↔`ink` for dark mode breaks: image overlays (`from-ink/70`), CTA text on gold (`text-ink`), hero text on images (`text-paper`), footer `bg-charcoal`
- **Fix:** Use hardcoded Tailwind arbitrary values (`text-[#1A1A1A]`, `from-[#1A1A1A]/70`, `text-[#E8E0D6]`) for colors that must stay "absolutely" dark or light regardless of theme
