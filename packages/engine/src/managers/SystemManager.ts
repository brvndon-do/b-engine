import { BaseSystem } from '../types/System';

export class SystemManager {
  private systems: BaseSystem[] = [];

  addSystem(system: BaseSystem): void {
    this.systems.push(system);
    this.systems.sort((a, b) => a.priority - b.priority);
  }

  removeSystem(system: BaseSystem): void {
    this.systems = this.systems.filter((x) => x !== system);
  }

  getSystemsByTag(tag: string): BaseSystem[] {
    return this.systems.filter((x) => x.tags.includes(tag));
  }

  update(deltaTime: number): void {
    for (const system of this.systems) {
      system.update(deltaTime);
    }
  }

  initSystems(): void {
    for (const system of this.systems) {
      system.init();
    }
  }

  disposeSystem(system: BaseSystem): void {
    const foundSystem = this.systems.find((x) => x === system);

    if (foundSystem == null) {
      console.warn('systemManager: unable to find system');
      return;
    }

    foundSystem.dispose();
  }

  disposeSystems(): void {
    for (const system of this.systems) {
      system.dispose();
    }
  }
}
