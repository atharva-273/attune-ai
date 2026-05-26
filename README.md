# Attune AI Prototype Workspace

Code-first prototype workspace for reproducing Attune mobile Figma flows with high visual fidelity and micro-interactions.

## Stack

- Vite + React + TypeScript
- Framer Motion for route and element transitions
- CSS Modules + CSS variables
- Playwright screenshot diff support for visual regression

## Commands

```bash
npm install
npm run dev
npm run typecheck
npm run build
npm run agentation:mcp
npm run agentation:doctor
npm run test:visual
npm run test:visual:update
```

## Working Model

1. Implement one flow at a time.
2. Keep static fidelity frame-locked to the Figma node first.
3. Pull assets from Figma MCP (`get_design_context`) by node ID.
4. Add micro-interactions from the interaction spec.
5. Run visual QA checklist and screenshot diff test.

## Agent Tooling

- Agentation is integrated in development via `src/App.tsx`.
- Superpowers is installed via Codex skill discovery on this machine.
- Setup and verification details: `docs/tooling-agentation-superpowers.md`

## Contracts

Process-level contracts live in `src/contracts/flowContracts.ts`:

- `FlowRequest` input contract (Figma URL, node IDs, asset bundle, interaction spec)
- `FlowOutput` output contract (routes/screens, motion config, fidelity checklist, Angular handoff notes)

Each runtime screen must include a `figmaNodeId` mapped through metadata and emitted as `data-figma-node-id` for traceability.

## First Implemented Flow

The onboarding flow under Figma node `2480:17652` is implemented at:

- `/flows/onboarding/splash`
- `/flows/onboarding/1`
- `/flows/onboarding/2`
- `/flows/onboarding/3`
- `/flows/onboarding/4-1`
- `/flows/onboarding/4-2`
- `/flows/onboarding/4-3`
- `/flows/onboarding/5-1`
- `/flows/onboarding/5-2`
- `/flows/onboarding/6-1`
- `/flows/onboarding/6-2`
- `/flows/onboarding/8-2`
- `/flows/onboarding/9`
- `/flows/onboarding/10`
