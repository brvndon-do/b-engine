# Copilot Instructions for b-engine

## Project Overview

b-engine is a browser-based game engine built with TypeScript and Vite, using Three.js for 3D rendering. The architecture is Entity-Component-System (ECS), with clear separation between entities, components, systems, and scenes.

## Architecture & Key Patterns

- **ECS Structure**:

  - **Entities**: Extend `BaseEntity` ([src/types/Entity.ts](src/types/Entity.ts)), hold components, and are managed by `EntityManager` ([src/entities/EntityManager.ts](src/entities/EntityManager.ts)).
  - **Components**: Extend the `Component` interface ([src/types/Component.ts](src/types/Component.ts)), e.g., `TransformComponent`, `MeshComponent`, `InputComponent`, `HudComponent`.
  - **Systems**: Extend `BaseSystem` ([src/types/System.ts](src/types/System.ts)), operate on entities with specific components. Examples: `RenderSystem`, `MovementSystem`, `InputSystem`, `HudSystem`, `CameraSystem`, `TransformSystem`.
  - **Scenes**: Implement the `Scene` interface ([src/types/Scene.ts](src/types/Scene.ts)), manage entity setup and per-frame updates.

- **Managers**:

  - `EntityManager`: Adds/removes entities, queries by component.
  - `SystemManager`: Registers systems, sorts by priority, calls `update()` each frame.
  - `SceneManager`: Loads/unloads scenes, calls scene `setup()` and `update()`.

- **Game Loop**:
  - Entry point: [src/main.ts](src/main.ts) initializes managers, systems, and scenes, then calls `startGame()` ([src/game.ts](src/game.ts)).
  - The game loop calls `systemManager.update(deltaTime)` and `sceneManager.update(deltaTime)` every frame.

## Developer Workflows

- **Run Dev Server**: `npm run dev` (uses Vite)
- **Build**: `npm run build` (TypeScript + Vite)
- **Preview**: `npm run preview`
- **No explicit test or lint scripts** (add if needed)

## Project-Specific Conventions

- **Component/Entity Registration**: Always add entities via `EntityManager.addEntity()`, which calls their `init()` method to attach components.
- **System Registration**: Use `SystemManager.addSystem()`; systems are sorted by priority.
- **Scene Switching**: Use `SceneManager.load(id)` to change scenes; scenes must be registered first.
- **Input Handling**: Keyboard events are managed by `InputManager` ([src/misc/InputManager.ts](src/misc/InputManager.ts)), and mapped to entity intents via `InputComponent`.
- **Rendering**: All Three.js objects are managed via `MeshComponent` and added to the scene in `RenderSystem`.
- **UI/HUD**: Drawn on a separate canvas using `UIManager` ([src/misc/UIManager.ts](src/misc/UIManager.ts)) and `HudSystem`.

## Integration Points

- **Three.js**: All 3D objects, cameras, and vectors use Three.js types and APIs.
- **Vite**: Handles module bundling and dev server.
- **No external state management or networking yet.**

## File/Directory References

- **src/components/**: All component types
- **src/entities/**: Entity classes and manager
- **src/systems/**: System classes and manager
- **src/scenes/**: Scene classes and manager
- **src/utils/**: Utility functions for ECS and math
- **src/types/**: Core type definitions

## Example Patterns

- To add a new system:
  1. Extend `BaseSystem`.
  2. Register with `SystemManager.addSystem()` in [src/main.ts](src/main.ts).
- To add a new entity:
  1. Extend `BaseEntity`.
  2. Implement `init()` to attach components.
  3. Add via `EntityManager.addEntity()`.
- To switch scenes:
  1. Register with `SceneManager.addScene(id, scene)`.
  2. Call `SceneManager.load(id)`.

## Style & Formatting

- Uses Prettier ([.prettierrc.json](.prettierrc.json)) for code style.
- TypeScript strict mode is enabled ([tsconfig.json](tsconfig.json)).

---

**For AI agents:**

- Follow ECS conventions and use managers for all entity/system/scene operations.
- Reference and extend existing types and patterns; avoid introducing new architectural styles.
- Prefer Three.js types for vectors, positions, and rendering.
- Keep UI logic in HUD/UI systems and avoid mixing with game logic.
