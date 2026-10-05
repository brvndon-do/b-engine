# Project Name: Proton

Browser-based game engine built using TypeScript and three.js. (Repo/package name is currently `b-engine`.)

## Core Principles

- **ECS architecture.** Entities are IDs + a bag of components; components are plain data; systems hold the logic and query entities by component class.
- **three.js-coupled by design.** The engine is not render-agnostic. Components and systems use `THREE.Vector3`, `THREE.Mesh`, `THREE.Camera`, `THREE.WebGLRenderer` directly.
- **Engine is generic, game is specific.** `packages/engine` owns the ECS runtime, rendering, and generic transform/camera/scene handling. Anything game-specific (input bindings, movement rules, HUD content, entity definitions, scenes, DOM event wiring) belongs in the consumer.
- **Library-first.** The engine is meant to be published to npm and consumed by other projects. Keep its public API intentional (everything goes through barrel `index.ts` files), avoid app-specific assumptions, and avoid leaking globals.
- **Extensible via inheritance + composition.** Consumers extend `BaseEntity` / `BaseSystem` and implement `Component` / `Scene`. Engine systems can be subclassed (e.g. `PointerLockCameraSystem extends CameraSystem` in the app).

## Project Structure

npm workspaces monorepo (root `package.json` → `workspaces: ["packages/engine", "apps/web"]`).

```
packages/engine/src/        # The engine (library)
  index.ts                  # Public entry; re-exports every folder below
  types/                    # Core contracts
    Component.ts            #   Component { type }, ComponentClass<T>
    Entity.ts               #   Entity interface + BaseEntity (components Map keyed by class ctor)
    System.ts               #   System interface + abstract BaseSystem(priority, tags)
    Scene.ts                #   Scene { name, threeScene, setup(em), update?, cleanup? }
    index.ts                #   + ObjectIdentifier, AnchorOptions, ScreenContext
  managers/
    EntityManager.ts        #   add/remove/get entities; getEntitiesWithComponents(...Classes)
    SystemManager.ts        #   ordered by priority; initSystems / update / disposeSystems; tag lookup
    SceneManager.ts         #   register scenes, load(id) → cleanup old, setup new; update()
    InputManager.ts         #   key state set (wiring to DOM events is the consumer's job)
    UIManager.ts            #   Canvas 2D text drawing for HUD overlays
  components/               # TransformComponent, MeshComponent, CameraComponent<T extends THREE.Camera>
  systems/                  # TransformSystem (transform → mesh), CameraSystem (transform → camera),
                            # RenderSystem (WebGLRenderer, adds meshes to current scene, renders; RenderSystemConfig)
  utils/                    # isComponentNull, calculateAnchorPosition, isVector3Zero

apps/web/                   # Vite consumer app — a sandbox for exercising the engine, not a product
  index.html                # Two stacked canvases: #game (WebGL) and #hud (2D, pointer-events: none)
  src/main.ts               # Bootstraps managers, scenes, camera entity, systems
  src/game.ts               # startGame(): DOM input wiring + requestAnimationFrame loop
  src/components/           # Game components: InputComponent (bindings + intent), HudComponent
  src/entities/             # CameraEntity, CubeEntity, hud/FooHudEntity
  src/systems/              # InputSystem, MovementSystem, HudSystem, PointerLockCameraSystem
  src/scenes/               # TestScene, FooScene
  src/utils/                # IntentUtils (applyIntent: local intent → world-space movement)
```

### How the app consumes the engine

`apps/web` imports engine **source** through the `@engine/*` alias (`apps/web/tsconfig.json` `paths` + `apps/web/vite.config.ts` `resolve.alias`), e.g. `import { BaseEntity } from '@engine/types'`. It does not go through the workspace package. Changes to the engine show up immediately with Vite HMR.

### Runtime flow (see `apps/web/src/main.ts` / `game.ts`)

1. Create `EntityManager`, `SystemManager`, `InputManager`, `UIManager(hudCtx)`, `SceneManager(entityManager)`.
2. Register scenes and `sceneManager.load(id)`. `Scene.setup` adds entities, and `addEntity` calls `entity.init()`, where components get attached.
3. Add the camera entity. `RenderSystem` and `CameraSystem` look it up by ID in `init()`, so it has to exist **before** `initSystems()`.
4. Construct systems, `addSystem(...)`, then `initSystems()`.
5. Each frame: `uiManager.clear()` → `sceneManager.update(dt)` → `systemManager.update(dt)` (`dt` is in seconds).

### Commands

- `npm install` at the root installs all workspaces.
- `npm run dev` at the root runs the Vite dev server for `apps/web`.
- `npm run build --prefix apps/web` runs type-check + Vite build for the app.
- The engine has no build or test script yet. `packages/engine/tsconfig.json` is set up to emit `dist/` with declarations (`npx tsc -p packages/engine`).

## Conventions

- **Formatting:** Prettier (`.prettierrc.json`): single quotes, semicolons, 2-space indent, `trailingComma: es5`, 80 cols, `arrowParens: always`.
- **Files:** one class per file, PascalCase filename matching the class (`TransformComponent.ts`). Suffixes are `*Component`, `*Entity`, `*System`, `*Manager`, `*Scene`, `*Utils`.
- **Barrels:** every folder has an `index.ts`, and new public modules must be exported there. The engine root `index.ts` re-exports all folders.
- **Components:** classes implementing `Component` with a `type` string and public constructor-param fields. Data only, apart from small helpers such as `resetIntent()`.
- **Component lookup is by class constructor**, not by `type` string: `entity.getComponent(TransformComponent)`, `addComponent(Class, instance)`.
- **Entities:** extend `BaseEntity`, take `id` in the constructor, and attach components in `init()`, not in the constructor.
- **Systems:** extend `BaseSystem`, call `super(priority, tags)`, inject dependencies (managers, canvas, IDs) through the constructor, and mark lifecycle methods with `override`. A system that needs a specific entity (e.g. the camera) takes its ID and resolves it in `init()`.
- **Error/log messages** are prefixed with the lowercase-camel owner, e.g. `renderSystem: camera entity "x" not found`. Throw in `init()` for misconfiguration and `console.warn`/`console.error` + `continue` inside `update()` loops.
- **Null checks** use `== null` (covers `undefined`).
- **TypeScript:** `strict`, `noUnusedLocals/Parameters` (name unused params `_`), `noImplicitOverride` in the engine.
- **Engine vs. app placement:** generic three.js and ECS code goes in `packages/engine`. Game rules, input bindings, HUD content, and DOM event wiring go in `apps/web`.

## Guidelines
- Be succinct but effective in explanations. Do NOT overload the user with a ton of information.
- Use modern semantics and patterns.
