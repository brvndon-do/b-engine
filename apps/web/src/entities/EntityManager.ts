import { ObjectIdentifier } from '../types';
import { Component, ComponentClass } from '../types/Component';
import { BaseEntity } from '../types/Entity';

export class EntityManager {
  private entities: Map<ObjectIdentifier, BaseEntity>;

  constructor() {
    this.entities = new Map<ObjectIdentifier, BaseEntity>();
  }

  addEntity(entity: BaseEntity): void {
    this.entities.set(entity.id, entity);

    entity.init?.();
  }

  removeEntity(id: ObjectIdentifier): void {
    this.entities.delete(id);
  }

  getEntityById(id: ObjectIdentifier): BaseEntity | undefined {
    return this.entities.get(id);
  }

  getEntitiesWithComponents<T extends Component[]>(
    ...componentClasses: { [K in keyof T]: ComponentClass<T[K]> }
  ): BaseEntity[] {
    return Array.from(this.entities.values()).filter((x) =>
      componentClasses.every((y) => x.hasComponent(y))
    );
  }
}
