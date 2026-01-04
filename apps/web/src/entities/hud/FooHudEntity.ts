import * as THREE from 'three';
import { HudComponent } from '../../components/HudComponent';
import { BaseEntity } from '../../types';

export class FooHudEntity extends BaseEntity {
  constructor(public id: string, public text: string) {
    super(id);
  }

  init(): void {
    const hudComponent = new HudComponent(
      this.text,
      'white',
      16,
      'top-left',
      new THREE.Vector2(50, 50)
    );

    this.addComponent(HudComponent, hudComponent);
  }
}
