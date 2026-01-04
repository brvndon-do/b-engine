import { MeshComponent, TransformComponent } from '../components';
import { EntityManager } from '../entities/EntityManager';
import { BaseSystem } from '../types';
import { isVector3Zero } from '../utils/Vector3Utils';

export class TransformSystem extends BaseSystem {
  constructor(private entityManager: EntityManager) {
    super(0, ['transform']);
  }

  update(_: number): void {
    const entities = this.entityManager.getEntitiesWithComponents(
      TransformComponent,
      MeshComponent
    );

    for (const entity of entities) {
      const transformComponent = entity.getComponent(TransformComponent);
      const meshComponent = entity.getComponent(MeshComponent);

      if (transformComponent == null || meshComponent == null) {
        console.warn(
          `renderSystem: missing essential components for entity ${entity.id}`
        );
        continue;
      }

      meshComponent.mesh.position.set(
        transformComponent.position.x,
        transformComponent.position.y,
        transformComponent.position.z
      );

      meshComponent.mesh.rotation.set(
        transformComponent.rotation.x,
        transformComponent.rotation.y,
        transformComponent.rotation.z
      );

      if (!isVector3Zero(transformComponent.scale)) {
        meshComponent.mesh.scale.set(
          transformComponent.scale.x,
          transformComponent.scale.y,
          transformComponent.scale.z
        );
      }
    }
  }
}
