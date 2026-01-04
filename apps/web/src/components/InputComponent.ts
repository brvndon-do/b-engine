import * as THREE from 'three';
import { Component } from '../types/Component';

// TODO: move to different file
export type Intent = {
  move: THREE.Vector3;
  rotate: THREE.Vector3;
};

export class InputComponent implements Component {
  public type = 'input';
  public intent: Intent;

  constructor(public readonly bindings: Record<string, string> = {}) {
    this.intent = { move: new THREE.Vector3(), rotate: new THREE.Vector3() };
  }

  public resetIntent(): void {
    this.intent.move.set(0, 0, 0);
    this.intent.rotate.set(0, 0, 0);
  }
}
