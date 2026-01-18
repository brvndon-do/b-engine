import { EntityManager } from '@engine/managers';
import { BaseSystem } from '@engine/types';
import { InputComponent } from '../components';
import { InputManager } from '@engine/managers';

export class InputSystem extends BaseSystem {
  constructor(
    private entityManager: EntityManager,
    private inputManager: InputManager
  ) {
    super(0, ['input']);
  }

  update(_: number): void {
    const entities =
      this.entityManager.getEntitiesWithComponents(InputComponent);

    for (const entity of entities) {
      const inputComponent = entity.getComponent(InputComponent);

      if (inputComponent == null) {
        console.warn(
          `inputSystem: missing essential components for entity ${entity.id}`
        );
        continue;
      }

      if (this.inputManager.isKeyPressed(inputComponent.bindings['forward'])) {
        inputComponent.intent.move.z -= 1;
      }

      if (this.inputManager.isKeyPressed(inputComponent.bindings['backward'])) {
        inputComponent.intent.move.z += 1;
      }

      if (this.inputManager.isKeyPressed(inputComponent.bindings['left'])) {
        inputComponent.intent.move.x -= 1;
      }

      if (this.inputManager.isKeyPressed(inputComponent.bindings['right'])) {
        inputComponent.intent.move.x += 1;
      }
    }
  }
}
