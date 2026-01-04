import * as THREE from 'three';
import { startGame } from './game';
import { EntityManager } from './entities/EntityManager';
import { SystemManager } from './systems/SystemManager';
import { InputManager } from './misc/InputManager';
import { CameraEntity } from './entities';
import {
  RenderSystem,
  InputSystem,
  MovementSystem,
  CameraSystem,
  HudSystem,
} from './systems';
import { SceneManager } from './scenes/SceneManager';
import { TransformSystem } from './systems/TransformSystem';
import { TestScene } from './scenes/TestScene';
import { FooScene } from './scenes/FooScene';
import { UIManager } from './misc/UIManager';
import { ScreenContext } from './types';

(() => {
  const gameCanvas = document.querySelector(
    '#game'
  ) as HTMLCanvasElement | null;
  const hudCanvas = document.querySelector('#hud') as HTMLCanvasElement | null;
  const hudCanvasContext = hudCanvas?.getContext('2d');

  if (!gameCanvas) {
    throw new Error('main: unable to initialize canvas');
  }

  if (!hudCanvas || !hudCanvasContext) {
    throw new Error('main: unable to initialize hud');
  }

  gameCanvas.focus();

  // instantiate managers
  const entityManager = new EntityManager();
  const systemManager = new SystemManager();
  const inputManager = new InputManager();
  const uiManager = new UIManager(hudCanvasContext);

  const sceneManager = new SceneManager(entityManager);
  sceneManager.addScene('test', new TestScene());
  sceneManager.addScene('test2', new FooScene());
  sceneManager.load('test'); // TODO: this should be moved into a different file/function for handling scene initializations; for now this is ok.

  const camera = new CameraEntity(
    'mainCamera',
    gameCanvas.clientWidth,
    gameCanvas.clientHeight,
    new THREE.Vector3(0, 0, 5)
  );

  entityManager.addEntity(camera);

  // set context
  const screenContext: ScreenContext = {
    width: gameCanvas.width,
    height: gameCanvas.height,
  };

  // instantiate systems
  const transformSystem = new TransformSystem(entityManager);
  const renderSystem = new RenderSystem(
    gameCanvas,
    entityManager,
    sceneManager
  );
  const inputSystem = new InputSystem(entityManager, inputManager);
  const movementSystem = new MovementSystem(entityManager);
  const cameraSystem = new CameraSystem(gameCanvas, entityManager);
  const hudSystem = new HudSystem(entityManager, uiManager, screenContext);

  systemManager.addSystem(transformSystem);
  systemManager.addSystem(renderSystem);
  systemManager.addSystem(inputSystem);
  systemManager.addSystem(movementSystem);
  systemManager.addSystem(cameraSystem);
  systemManager.addSystem(hudSystem);

  startGame({
    canvas: gameCanvas,
    entityManager,
    systemManager,
    inputManager,
    sceneManager,
    uiManager,
  });
})();
