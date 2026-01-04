import * as THREE from 'three';
import {
  CameraComponent,
  InputComponent,
  TransformComponent,
} from '../components';
import { BaseEntity } from '../types/Entity';

export class CameraEntity extends BaseEntity {
  constructor(
    public id: string,
    private width: number,
    private height: number,
    private position: THREE.Vector3
  ) {
    super(id);
  }

  init(): void {
    const cameraComponent = new CameraComponent(
      {
        CameraType: THREE.PerspectiveCamera,
        cameraArgs: [75, this.width / this.height, 0.1, 1000],
      },
      this.position
    );
    const transformComponent = new TransformComponent(this.position);
    const inputComponent = new InputComponent({
      forward: 'w',
      backward: 's',
      left: 'a',
      right: 'd',
    });

    this.addComponent(CameraComponent, cameraComponent);
    this.addComponent(TransformComponent, transformComponent);
    this.addComponent(InputComponent, inputComponent);
  }
}
