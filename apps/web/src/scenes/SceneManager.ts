import { EntityManager } from '../entities/EntityManager';
import { ObjectIdentifier, Scene } from '../types';

export class SceneManager {
  private currentScene: Scene | undefined;
  private scenes: Map<ObjectIdentifier, Scene>;

  constructor(private entityManager: EntityManager) {
    this.scenes = new Map<ObjectIdentifier, Scene>();
  }

  addScene(id: ObjectIdentifier, scene: Scene): void {
    this.scenes.set(id, scene);
  }

  removeScene(id: ObjectIdentifier): void {
    this.scenes.delete(id);
  }

  getCurrentScreen(): Scene | undefined {
    return this.currentScene;
  }

  load(id: ObjectIdentifier): void {
    this.currentScene?.cleanup?.();

    const scene = this.scenes.get(id);

    if (scene == null) {
      throw new Error(`sceneManager: unable to retrieve scene ${id}`);
    }

    scene.setup(this.entityManager);

    this.currentScene = scene;
  }

  update(deltaTime: number): void {
    this.currentScene?.update?.(deltaTime);
  }
}
