import * as THREE from 'three';
import { AnchorOptions, Component } from '../types';

export class HudComponent implements Component {
  public type = 'hud';

  constructor(
    public text: string,
    public color: string = '#fff',
    public fontSize = 16,
    public anchor: AnchorOptions = 'top-left',
    public offset: THREE.Vector2 = new THREE.Vector2(),
    public isVisible = true
  ) {}
}
