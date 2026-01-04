import * as THREE from 'three';
import { AnchorOptions } from '../types';

// TODO: think about returning owned b-engine's types instead of three.js
export const calculateAnchorPosition = (
  anchorPosition: AnchorOptions,
  width: number,
  height: number,
  offset: THREE.Vector2
): THREE.Vector2 => {
  const { x: dx, y: dy } = offset;

  switch (anchorPosition) {
    case 'top-left':
      return new THREE.Vector2(dx, dy);
    case 'top-right':
      return new THREE.Vector2(width - dx, dy);
    case 'bottom-left':
      return new THREE.Vector2(dx, height - dy);
    case 'bottom-right':
      return new THREE.Vector2(width - dx, height - dy);
  }
};
