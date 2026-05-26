# Iteration Process

1. Receive `FlowRequest` payload (plus manual exports only if fallback is needed).
2. Pull node design context via Figma MCP and auto-fetch referenced assets.
3. Rebuild static screen states with frame-locked fidelity.
4. Add interactions using `interactionSpec` (intent/exact/hybrid).
5. Validate visually with `docs/fidelity-checklist.md`.
6. Run screenshot diff checks with Playwright.
7. Record `FlowOutput` and `angular-handoff-template` notes.
