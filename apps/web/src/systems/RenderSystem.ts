import * as THREE from 'three';
import { BaseSystem } from '../types';
import { EntityManager } from '../entities/EntityManager';
import { SceneManager } from '../scenes/SceneManager';
import { CameraComponent, MeshComponent } from '../components';

export class RenderSystem extends BaseSystem {
  private camera!: THREE.Camera;
  private renderer: THREE.WebGLRenderer;

  private addedObjects: Set<THREE.Object3D>;

  constructor(
    private canvas: HTMLCanvasElement,
    private entityManager: EntityManager,
    private sceneManager: SceneManager
  ) {
    super(0, ['render']);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
    });
    this.addedObjects = new Set<THREE.Object3D>();
  }

  init(): void {
    const cameraEntity = this.entityManager.getEntityById('mainCamera'); // TODO: this might be a lazy way to do it... find a proper way later
    const cameraComponent = cameraEntity!.getComponent(CameraComponent);

    this.camera = cameraComponent!.getCamera();
  }

  update(_: number): void {
    const scene = this.sceneManager.getCurrentScreen()?.threeScene;

    if (scene == null) {
      // TODO: log some sort of message?
      return;
    }

    const entities =
      this.entityManager.getEntitiesWithComponents(MeshComponent);

    for (const entity of entities) {
      const meshComponent = entity.getComponent(MeshComponent)!;

      if (!this.addedObjects.has(meshComponent.mesh)) {
        this.addedObjects.add(meshComponent.mesh);
        scene.add(meshComponent.mesh);
      }
    }

    this.renderer.render(scene, this.camera);
  }
}
