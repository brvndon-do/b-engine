export interface System {
  update(deltaTime: number): void;
  init(): void;
  dispose(): void;
}

export abstract class BaseSystem implements System {
  constructor(public priority: number = 0, public tags: string[] = []) {}

  update(deltaTime: number): void {
    throw new Error('system: update() must be implemented');
  }
  init(): void {}
  dispose(): void {}
}
