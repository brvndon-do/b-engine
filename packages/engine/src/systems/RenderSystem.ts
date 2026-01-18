import * as THREE from 'three';
import { BaseSystem } from '../types';
import { EntityManager } from '../managers/EntityManager';
import { SceneManager } from '../managers/SceneManager';
import { CameraComponent } from '../components/CameraComponent';
import { MeshComponent } from '../components/MeshComponent';

// TODO: maybe move to types?
export interface RenderSystemConfig {
  antialias?: boolean;
  alpha?: boolean;
  width?: number;
  height?: number;
  pixelRatio?: number;
}

export class RenderSystem extends BaseSystem {
  private camera!: THREE.Camera;
  private renderer: THREE.WebGLRenderer;
  private addedObjects: Set<THREE.Object3D>;

  constructor(
    private cameraEntityId: string,
    private canvas: HTMLCanvasElement,
    private entityManager: EntityManager,
    private sceneManager: SceneManager,
    config: RenderSystemConfig = {}
  ) {
    super(0, ['render']);

    const {
      antialias = true,
      alpha = false,
      width = window.innerWidth,
      height = window.innerHeight,
      pixelRatio = window.devicePixelRatio,
    } = config;

    this.renderer = new THREE.WebGLRenderer({
      antialias,
      alpha,
      canvas: this.canvas,
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(pixelRatio);
    this.addedObjects = new Set<THREE.Object3D>();
  }

  override init(): void {
    const cameraEntity = this.entityManager.getEntityById(this.cameraEntityId);

    if (cameraEntity == null) {
      throw new Error(
        `renderSystem: camera entity "${this.cameraEntityId}" not found`
      );
    }

    const cameraComponent = cameraEntity.getComponent(CameraComponent);

    if (cameraComponent == null) {
      throw new Error(
        `renderSystem: camera component not found on entity "${this.cameraEntityId}"`
      );
    }

    this.camera = cameraComponent.getCamera();
  }

  override update(_: number): void {
    const scene = this.sceneManager.getCurrentScreen()?.threeScene;

    if (scene == null) {
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

  public getRenderer(): THREE.WebGLRenderer {
    return this.renderer;
  }

  public setSize(width: number, height: number): void {
    this.renderer.setSize(width, height);
  }
}
