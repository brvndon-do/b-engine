import { EntityManager, UIManager } from '@engine/managers';
import { HudComponent } from '../components/HudComponent';
import { BaseSystem, ScreenContext } from '@engine/types';
import { calculateAnchorPosition } from '@engine/utils/PositionUtils';

export class HudSystem extends BaseSystem {
  constructor(
    private entityManager: EntityManager,
    private uiManager: UIManager,
    private screenContext: ScreenContext
  ) {
    super(0, ['ui']);
  }

  update(_: number): void {
    const entities = this.entityManager.getEntitiesWithComponents(HudComponent);

    for (const entity of entities) {
      const hudComponent = entity.getComponent(HudComponent);

      if (hudComponent == null) {
        console.warn(
          `hudSystem: missing essential components for entity ${entity.id}`
        );
        continue;
      }

      const hudPosition = calculateAnchorPosition(
        hudComponent.anchor,
        this.screenContext.width,
        this.screenContext.height,
        hudComponent.offset
      );

      this.uiManager.drawText({
        text: hudComponent.text,
        color: hudComponent.color,
        fontSize: hudComponent.fontSize,
        position: { x: hudPosition.x, y: hudPosition.y },
      });
    }
  }
}
