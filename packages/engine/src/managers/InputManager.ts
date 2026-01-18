export class InputManager {
  private keys: Set<string> = new Set<string>();

  keyDown(key: string): void {
    this.keys.add(key);
  }

  keyUp(key: string): void {
    this.keys.delete(key);
  }

  isKeyPressed(key: string): boolean {
    return this.keys.has(key);
  }
}
