# Agentation + Superpowers Setup

This project now supports both tools.

## Agentation (project integration)

Agentation is wired into the React app in development mode from `src/App.tsx`.

- Default endpoint: `http://127.0.0.1:4747`
- Override with env var: `VITE_AGENTATION_ENDPOINT`

### Commands

```bash
npm run agentation:mcp
npm run agentation:doctor
```

Recommended workflow while prototyping:

1. Terminal A: `npm run agentation:mcp`
2. Terminal B: `npm run dev`
3. Add annotations in the browser via Agentation UI.

## Superpowers (Codex integration)

Installed via Codex native skill discovery using the official clone + symlink pattern.

Installed paths on this machine:

- `~/.codex/superpowers`
- `~/.agents/skills/superpowers -> ~/.codex/superpowers/skills`

### Verify

```bash
ls -la ~/.agents/skills/superpowers
ls ~/.codex/superpowers/skills
```

If newly installed, restart Codex so skills are discovered at startup.
