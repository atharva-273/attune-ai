# Flow Handoff Template

Use this exact template when sending a flow for implementation.

## Input: FlowRequest

- `flowId`:
- `figmaUrl`:
- `nodeIds`:
- `assetBundle`: optional when MCP asset extraction is used
- `interactionSpec.mode`: `intent` | `exact` | `hybrid`
- `interactionSpec.description`:
- `interactionSpec.timings` (if exact/hybrid):

## Required Attachments

- Frame list with exact node IDs
- Interaction notes per transition and per element

## Asset Mode (Default)

- `MCP-first` (default): I call Figma MCP `get_design_context` on the target node IDs and download referenced asset URLs directly into the project.
- `Manual fallback`: only used when an asset is missing/incorrect from MCP output or you want a specific export setting from Figma.

## Acceptance Criteria

- Static fidelity matches frame dimensions, spacing, typography, colors, radii, shadows, icon positions
- Route and screen naming maps one-to-one with node IDs
- Motion timing and easing match provided spec or agreed defaults
