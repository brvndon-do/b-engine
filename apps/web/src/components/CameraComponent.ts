import * as THREE from 'three';
import { Component } from '../types/Component';

type CameraConstructor<T extends THREE.Camera> = new (...args: any[]) => T;
type CameraConfig<T extends THREE.Camera> = {
  CameraType: CameraConstructor<T>;
  cameraArgs: ConstructorParameters<CameraConstructor<T>>;
};

export class CameraComponent<T extends THREE.Camera> implements Component {
  public type = 'camera';
  private camera: T;

  constructor(public config: CameraConfig<T>, public position: THREE.Vector3) {
    const { CameraType, cameraArgs } = config;

    this.camera = new CameraType(...cameraArgs);
    this.camera.position.copy(position);
  }

  public getCamera(): T {
    return this.camera;
  }
}
