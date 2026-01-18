import { CameraComponent, TransformComponent } from '@engine/components';
import { EntityManager } from '@engine/managers';
import { CameraSystem } from '@engine/systems';
import { PointerLockControls } from 'three/examples/jsm/Addons.js';

export class PointerLockCameraSystem extends CameraSystem {
  private pointerLockControls: PointerLockControls | undefined;

  constructor(
    cameraEntityId: string,
    private canvas: HTMLCanvasElement,
    entityManager: EntityManager
  ) {
    super(cameraEntityId, entityManager);
    this.tags.push('pointerlock');
  }

  override init(): void {
    super.init();

    const cameraComponent = this.cameraEntity?.getComponent(CameraComponent);

    if (cameraComponent == null) {
      throw new Error('pointerLockCameraSystem: camera component not found');
    }

    this.pointerLockControls = new PointerLockControls(
      cameraComponent.getCamera(),
      this.canvas
    );
  }

  override update(deltaTime: number): void {
    const transformComponent =
      this.cameraEntity?.getComponent(TransformComponent);

    if (transformComponent == null) {
      console.error('pointerLockCameraSystem: transform component not found');
      return;
    }

    transformComponent.rotation.copy(this.pointerLockControls!.object.rotation);

    super.update(deltaTime);
  }
}
