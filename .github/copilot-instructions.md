# Copilot Instructions for b-engine

## Overview

- **b-engine** is a three.js-coupled browser game engine written in TypeScript.
- The project is organized as a monorepo: `packages/engine` (core three.js ECS engine) and `apps/web` (game implementation).
- The architecture follows an **Entity-Component-System (ECS)** pattern. Entities are composed of components and processed by systems.
- The engine is **tightly coupled to three.js** — it is not render-agnostic.

## Architecture

### **packages/engine/** — Core THREE.js ECS Engine

The engine owns the fundamental ECS runtime plus three.js integration:

**Core Runtime:**

- `managers/EntityManager.ts` — Entity lifecycle, component management, and queries
- `managers/SystemManager.ts` — System registration, execution ordering, initialization/disposal
- `managers/SceneManager.ts` — Scene transitions and lifecycle management

**Three.js Integration:**

- `types/` — Core interfaces (`Entity`, `Component`, `System`, `Scene`)
- Generic **three.js-based components**: `TransformComponent` (THREE.Vector3), `MeshComponent` (THREE.Mesh), `CameraComponent` (THREE.Camera)
- Generic **three.js-based systems**: rendering, camera management, transform synchronization
- THREE.Renderer and scene graph handling

**Utilities:**

- Generic helpers for entity queries and filtering
- THREE.js-specific utility functions

### **apps/web/src/** — Game Implementation (Plug & Play)

Game-specific logic and content built on top of the engine:

- `components/` — Game-specific components (extends engine components as needed)
- `entities/` — Game entity definitions (Player, Enemy, etc.)
- `systems/` — Game mechanics systems (InputSystem, MovementSystem with game logic)
- `scenes/` — Game scene definitions and setup
- `misc/` — Platform/browser integration (InputManager for keyboard wiring, UIManager for HUD)
- `types/` — Game-specific type definitions
- `utils/` — Game-specific utility functions

## Patterns & Conventions

- **ECS Pattern:**
  - Components are plain data holders (minimal logic, focused on data).
  - Systems operate on entities with specific component sets.
  - Entities are registered via `EntityManager` and queried by component type.
- **Engine vs. Game Split:**
  - **Engine responsibility**: ECS runtime, three.js rendering, generic transform/camera/scene management.
  - **Game responsibility**: Game mechanics, input handling, entity definitions, scene content, UI logic.
- **TypeScript:**
  - Prefer explicit types and interfaces.
  - Use `index.ts` files for clean module re-exports.
- **Three.js Coupling:**
  - Engine components use THREE.Vector3, THREE.Mesh, THREE.Camera directly.
  - The engine assumes three.js for rendering; it is not render-agnostic.
  - Game code can extend or compose engine components as needed.

## Developer Workflows

- **Build:**
  - Use Vite for local development and builds in `apps/web` (`npm run dev` or `npm run build` in `apps/web`).
- **Dependencies:**
  - Install dependencies per package (e.g., `apps/web/package.json` for the web app, `packages/engine/package.json` for the engine).
- **Debugging:**
  - Use browser devtools; Vite provides fast HMR.
- **Testing:**
  - Add tests in `apps/web` or `packages/engine` as needed.

## Moving Code Between Layers

**When to move to engine:**

- Generic three.js systems (rendering, transform syncing, camera management)
- Core ECS runtime and managers
- Generic three.js components (Transform, Mesh, Camera)
- THREE.js utility functions

**When to keep in apps/web:**

- Game-specific components (player state, enemies, game mechanics)
- Game logic systems (input handling, movement application, game rules)
- Browser integration (keyboard input wiring, canvas/DOM interaction)
- Scene and entity definitions specific to the game
- Game-specific UI/HUD systems

## Integration Points

- **External:**
  - [three.js](https://threejs.org/) is the primary external dependency for rendering.
- **Internal:**
  - Cross-module communication is via ECS (systems operate on entities/components).

## Examples

- To add a new **engine system**: create a generic three.js-based system in `packages/engine/src/systems/`, implement the logic, and export it.
- To add a **game system**: create a file in `apps/web/src/systems/`, implement the logic, and register it in `SystemManager.ts`.
- To define a **new component**: decide if it's generic (engine) or game-specific (web app), add a file in the appropriate `components/` directory, and update the component types if needed.

---

For more details, see the code in `packages/engine/src/` and `apps/web/src/`, and the README.md.
