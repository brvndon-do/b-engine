### Known gaps and quirks (relevant for npm publishing)

- `packages/engine/package.json` is not publish-ready. The name is `engine`, it has `"type": "commonjs"` while the code is ESM, `main: index.js` points to a file that doesn't exist, and it has no `exports`/`types`/`files`/build script. `three` should be a `peerDependency`.
- `packages/engine/README.md` examples are out of date (e.g. the `RenderSystem` constructor now takes `cameraEntityId` first).
- `.github/copilot-instructions.md` is partly stale (mentions `apps/web/src/misc/`, which no longer exists).
- Every system currently uses priority `0`, so execution order is insertion order.
- `SceneManager.load()` doesn't remove the previous scene's entities. `RenderSystem` adds meshes to the scene but never removes them. `SystemManager.removeSystem()` doesn't call `dispose()`.
- `EntityManager.getEntitiesWithComponents` does a linear scan every call (no archetype or query caching).
- There are no tests yet.