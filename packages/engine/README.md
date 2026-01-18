# b-engine

A three.js-coupled browser game engine written in TypeScript.

## Installation

```bash
npm install @your-org/b-engine
```

## Usage

### Basic Setup

```typescript
import {
  EntityManager,
  SystemManager,
  SceneManager,
  RenderSystem,
  TransformSystem,
  CameraSystem,
} from '@engine';

// Initialize managers
const entityManager = new EntityManager();
const systemManager = new SystemManager();
const sceneManager = new SceneManager(entityManager);

// Create systems
const canvas = document.querySelector('canvas');
const transformSystem = new TransformSystem(entityManager);
const renderSystem = new RenderSystem(canvas, entityManager, sceneManager);
const cameraSystem = new CameraSystem('mainCamera', entityManager);

// Register systems
systemManager.addSystem(transformSystem);
systemManager.addSystem(renderSystem);
systemManager.addSystem(cameraSystem);

// Initialize and run
systemManager.initSystems();

function gameLoop(deltaTime: number) {
  systemManager.update(deltaTime);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
```

### Creating Entities

```typescript
import { BaseEntity, TransformComponent, MeshComponent } from '@engine';
import * as THREE from 'three';

class CubeEntity extends BaseEntity {
  constructor(id: string, position: THREE.Vector3) {
    super(id);
  }

  init(): void {
    const transform = new TransformComponent(position);
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: 'blue' });
    const mesh = new MeshComponent(new THREE.Mesh(geometry, material));

    this.addComponent(TransformComponent, transform);
    this.addComponent(MeshComponent, mesh);
  }
}
```

### Creating Custom Systems

```typescript
import { BaseSystem, EntityManager } from '@engine';

class MyCustomSystem extends BaseSystem {
  constructor(private entityManager: EntityManager) {
    super(0, ['custom']);
  }

  update(deltaTime: number): void {
    // Your game logic here
  }
}
```

## API

### Core Managers

- `EntityManager` — Entity lifecycle and component queries
- `SystemManager` — System registration and execution
- `SceneManager` — Scene transitions
- `InputManager` — Input state tracking
- `UIManager` — Canvas 2D rendering

### Components

- `TransformComponent` — Position, rotation, scale (THREE.Vector3)
- `MeshComponent` — THREE.Mesh wrapper
- `CameraComponent` — THREE.Camera wrapper

### Systems

- `RenderSystem` — THREE.WebGLRenderer integration
- `TransformSystem` — Syncs transforms to THREE.Mesh
- `CameraSystem` — Camera position/rotation sync
