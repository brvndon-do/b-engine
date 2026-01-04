import { EntityManager } from './entities/EntityManager';
import { InputManager } from './misc/InputManager';
import { UIManager } from './misc/UIManager';
import { SceneManager } from './scenes/SceneManager';
import { SystemManager } from './systems/SystemManager';

type GameConfiguration = {
  canvas: HTMLCanvasElement;
  entityManager: EntityManager;
  systemManager: SystemManager;
  inputManager: InputManager;
  sceneManager: SceneManager;
  uiManager: UIManager;
};

let lastTimestamp = performance.now();

export const startGame = ({
  canvas,
  entityManager,
  systemManager,
  inputManager,
  sceneManager,
  uiManager,
}: GameConfiguration) => {
  systemManager.initSystems();

  canvas.addEventListener('mousedown', () => {
    canvas.requestPointerLock();
  });
  canvas.addEventListener('keydown', (e) => {
    inputManager.keyDown(e.key);
  });
  canvas.addEventListener('keyup', (e) => {
    inputManager.keyUp(e.key);
  });

  const gameLoop = (currentTimestamp: number) => {
    const deltaTime = (currentTimestamp - lastTimestamp) / 1000;
    lastTimestamp = currentTimestamp;

    uiManager.clear();
    sceneManager.update(deltaTime);
    systemManager.update(deltaTime);

    requestAnimationFrame(gameLoop);
  };

  requestAnimationFrame(gameLoop);
};
