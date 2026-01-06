import { ObjectIdentifier } from '.';
import { Component, ComponentClass } from './Component';

export interface Entity {
  id: ObjectIdentifier;
  addComponent<T extends Component>(
    componentClass: ComponentClass<T>,
    instance: T
  ): void;
  removeComponent<T extends Component>(componentClass: ComponentClass<T>): void;
  getComponents(): Component[];
  getComponent<T extends Component>(
    componentClass: ComponentClass<T>
  ): T | undefined;
  hasComponent<T extends Component>(componentClass: ComponentClass<T>): boolean;
  init?(): void;
}

export class BaseEntity implements Entity {
  protected components: Map<Function, Component>;

  constructor(public id: ObjectIdentifier) {
    this.components = new Map<Function, Component>();
  }

  addComponent<T extends Component>(
    componentClass: ComponentClass<T>,
    instance: T
  ): void {
    if (this.components.has(componentClass)) {
      console.error(`entity ${this.id}: component already exists`);
      return;
    }

    this.components.set(componentClass, instance);
  }

  removeComponent<T extends Component>(
    componentClass: ComponentClass<T>
  ): void {
    this.components.delete(componentClass);
  }

  getComponents(): Component[] {
    return [...this.components.values()];
  }

  getComponent<T extends Component>(
    componentClass: ComponentClass<T>
  ): T | undefined {
    return this.components.get(componentClass) as T | undefined;
  }

  hasComponent<T extends Component>(
    componentClass: ComponentClass<T>
  ): boolean {
    return this.components.has(componentClass);
  }

  init?(): void {}
}
