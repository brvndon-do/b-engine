import { CameraComponent, TransformComponent } from '../components';
import { EntityManager } from '../entities/EntityManager';
import { BaseEntity, BaseSystem } from '../types';

import { PointerLockControls } from 'three/examples/jsm/Addons.js';

export class CameraSystem extends BaseSystem {
  private cameraEntity: BaseEntity | undefined;
  private pointerLockControls: PointerLockControls | undefined;

  constructor(
    private canvas: HTMLCanvasElement,
    private entityManager: EntityManager
  ) {
    super(0, ['camera', 'transform']);
  }

  init(): void {
    this.cameraEntity = this.entityManager.getEntityById('mainCamera');

    if (this.cameraEntity == null) {
      throw new Error('cameraSystem: camera entity is null');
    }

    const cameraComponent = this.cameraEntity.getComponent(CameraComponent);

    this.pointerLockControls = new PointerLockControls(
      cameraComponent!.getCamera(),
      this.canvas
    );
  }

  update(_: number): void {
    const cameraComponent = this.cameraEntity!.getComponent(CameraComponent);
    const transformComponent =
      this.cameraEntity!.getComponent(TransformComponent);

    if (cameraComponent == null || transformComponent == null) {
      console.error('cameraSystem: necessary components were not found');
      return;
    }

    transformComponent.rotation.copy(this.pointerLockControls!.object.rotation);

    const camera = cameraComponent.getCamera();
    camera.position.set(
      transformComponent.position.x,
      transformComponent.position.y,
      transformComponent.position.z
    );
    camera.rotation.set(
      transformComponent.rotation.x,
      transformComponent.rotation.y,
      transformComponent.rotation.z
    );
  }
}
