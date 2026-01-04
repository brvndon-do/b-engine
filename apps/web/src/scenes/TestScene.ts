import * as THREE from 'three';
import { EntityManager } from '../entities/EntityManager';
import { Scene } from '../types';
import { CubeEntity } from '../entities';
import { FooHudEntity } from '../entities/hud/FooHudEntity';

export class TestScene implements Scene {
  public name = 'Test';
  public threeScene: THREE.Scene;
  private light: THREE.DirectionalLight;

  constructor() {
    this.threeScene = new THREE.Scene();
    this.light = new THREE.DirectionalLight('white', 10);
  }

  setup(entityManager: EntityManager): void {
    this.light.position.set(-1, 2, 4);

    const cubes = [
      new CubeEntity('x', 'blue', new THREE.Vector3(0, 0, 0)),
      new CubeEntity('y', 'red', new THREE.Vector3(-2, 0, 0)),
      new CubeEntity('z', 'yellow', new THREE.Vector3(2, 0, 0)),
    ];

    cubes.forEach((cube) => entityManager.addEntity(cube));

    const fooHud = new FooHudEntity('foo', 'Hello, world!');
    entityManager.addEntity(fooHud);

    this.threeScene.add(this.light);
  }
}
