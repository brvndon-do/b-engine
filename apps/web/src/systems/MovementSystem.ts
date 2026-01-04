import { InputComponent, TransformComponent } from '../components';
import { EntityManager } from '../entities/EntityManager';
import { BaseSystem } from '../types/System';
import { applyIntent } from '../utils/IntentUtils';

export class MovementSystem extends BaseSystem {
  private speed = 2.0;

  constructor(private entityManager: EntityManager) {
    super(0, ['movement']);
  }

  update(deltaTime: number): void {
    const entities = this.entityManager.getEntitiesWithComponents(
      TransformComponent,
      InputComponent
    );

    for (const entity of entities) {
      const transformComponent = entity.getComponent(TransformComponent);
      const inputComponent = entity.getComponent(InputComponent);

      if (transformComponent == null || inputComponent == null) {
        console.warn('movementSystem: missing essential components'); // TODO: create a const for common log messages
        continue;
      }

      applyIntent(
        transformComponent,
        inputComponent.intent,
        deltaTime,
        this.speed
      );

      inputComponent.resetIntent();
    }
  }
}
