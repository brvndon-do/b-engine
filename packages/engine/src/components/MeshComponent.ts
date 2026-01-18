import * as THREE from 'three';
import { Component } from '../types/Component';

export class MeshComponent implements Component {
  public type = 'mesh';

  constructor(public mesh: THREE.Mesh) {}
}
