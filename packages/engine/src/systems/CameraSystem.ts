import { CameraComponent } from '../components/CameraComponent';
import { TransformComponent } from '../components/TransformComponent';
import { EntityManager } from '../managers/EntityManager';
import { BaseEntity, BaseSystem } from '../types';

export class CameraSystem extends BaseSystem {
  protected cameraEntity: BaseEntity | undefined;

  constructor(
    private cameraEntityId: string,
    private entityManager: EntityManager
  ) {
    super(0, ['camera', 'transform']);
  }

  override init(): void {
    this.cameraEntity = this.entityManager.getEntityById(this.cameraEntityId);

    if (this.cameraEntity == null) {
      throw new Error(
        `cameraSystem: camera entity "${this.cameraEntityId}" not found`
      );
    }
  }

  override update(_: number): void {
    const cameraComponent = this.cameraEntity!.getComponent(CameraComponent);
    const transformComponent =
      this.cameraEntity!.getComponent(TransformComponent);

    if (cameraComponent == null || transformComponent == null) {
      console.error('cameraSystem: necessary components were not found');
      return;
    }

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
