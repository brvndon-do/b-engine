import * as THREE from 'three';

export const isVector3Zero = (vector3: THREE.Vector3) =>
  !(vector3.x || vector3.y || vector3.z);
