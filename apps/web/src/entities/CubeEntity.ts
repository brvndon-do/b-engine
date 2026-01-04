import * as THREE from 'three';
import {
  TransformComponent,
  MeshComponent,
  InputComponent,
} from '../components';
import { BaseEntity } from '../types/Entity';

export class CubeEntity extends BaseEntity {
  constructor(
    public id: string,
    public color: string,
    public position: THREE.Vector3
  ) {
    super(id);
  }

  init(): void {
    const transformComponent = new TransformComponent(this.position);

    const inputComponent = new InputComponent({
      up: 'ArrowUp',
      down: 'ArrowDown',
      left: 'ArrowLeft',
      right: 'ArrowRight',
    });

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: this.color });
    const meshComponent = new MeshComponent(new THREE.Mesh(geometry, material));

    this.addComponent(TransformComponent, transformComponent);
    this.addComponent(InputComponent, inputComponent);
    this.addComponent(MeshComponent, meshComponent);
  }
}
