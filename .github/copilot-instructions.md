# Copilot Instructions for b-engine

## Overview

- **b-engine** is a browser-based game engine written in TypeScript, leveraging [three.js](https://threejs.org/) for rendering.
- The project is organized as a monorepo with at least two main packages: `apps/web` (game/web app) and `packages/engine` (core engine logic).
- The architecture follows an **Entity-Component-System (ECS)** pattern. Entities are composed of components and processed by systems.

## Key Directories & Files

- `apps/web/src/` — Main web app/game logic, ECS implementations, and game-specific code.
  - `components/` — ECS components (e.g., `TransformComponent.ts`, `MeshComponent.ts`).
  - `entities/` — Entity definitions and managers.
  - `systems/` — ECS systems (e.g., `RenderSystem.ts`, `MovementSystem.ts`).
  - `scenes/` — Scene definitions and management.
  - `misc/` — Utility managers (e.g., `InputManager.ts`, `UIManager.ts`).
  - `types/` — Shared ECS type definitions.
  - `utils/` — Utility/helper functions.
- `packages/engine/` — (If populated) Core reusable engine logic, intended for sharing across apps.

## Patterns & Conventions

- **ECS Pattern:**
  - Components are plain data holders (no logic).
  - Systems operate on entities with specific component sets.
  - Entities are registered via `EntityManager`.
- **TypeScript:**
  - Prefer explicit types and interfaces (see `types/`).
  - Use `index.ts` files for module re-exports.
- **Three.js Integration:**
  - Rendering and 3D logic are handled via three.js, typically in `RenderSystem.ts` and related components.
- **Scene Management:**
  - Scenes are defined in `scenes/` and managed by `SceneManager.ts`.

## Developer Workflows

- **Build:**
  - Use Vite for local development and builds in `apps/web` (`npm run dev` or `npm run build` in `apps/web`).
- **Dependencies:**
  - Install dependencies per package (e.g., `apps/web/package.json`).
- **Debugging:**
  - Use browser devtools; Vite provides fast HMR.
- **Testing:**
  - No explicit test setup found; add tests in `apps/web` or `packages/engine` as needed.

## Integration Points

- **External:**
  - [three.js](https://threejs.org/) is the primary external dependency for rendering.
- **Internal:**
  - Cross-module communication is via ECS (systems operate on entities/components).

## Examples

- To add a new system: create a file in `systems/`, implement the logic, and register it in `SystemManager.ts`.
- To define a new component: add a file in `components/` and update `types/Component.ts` if needed.

---

For more details, see the code in `apps/web/src/` and the README.md.
