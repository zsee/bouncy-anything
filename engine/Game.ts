import AttachedToGameEvent from "./AttachedToGameEvent";
import DetachedFromGameEvent from "./DetachedFromGameEvent";
import MouseDownEvent from "./MouseDownEvent";
import Scene from "./Scene";

export default class Game {
    public width = 800;
    public height = 600;
    private currentScene: Scene;
    private isStarted = false;
    private lastUpdateTime: number;

    constructor(
        initialScene: Scene,
        private context: CanvasRenderingContext2D,
    ) {
        this.currentScene = initialScene;
    }

    public start() {
        this.isStarted = true;
        this.lastUpdateTime = +new Date();
        this.currentScene.onEvent(new AttachedToGameEvent(this));
        this.requestNextFrame();
        this.context.canvas.addEventListener("mousedown", this.onMouseDown);
    }

    public stop() {
        this.context.canvas.removeEventListener("mousedown", this.onMouseDown);
        this.currentScene.onEvent(new DetachedFromGameEvent(this));
        this.isStarted = false;
    }

    public publishEvent(event: any): void {
        this.currentScene.onEvent(event);
    }

    private onMouseDown = () => {
        this.currentScene.onEvent(new MouseDownEvent());
    }

    private requestNextFrame = () => {
        window.requestAnimationFrame(this.onLoop);
    }

    private onLoop = () => {
        if (!this.isStarted) {
            return;
        }
        const currentTime = +new Date();
        const elapsedTime = currentTime - this.lastUpdateTime;
        this.lastUpdateTime = currentTime;
        this.currentScene.update(elapsedTime);
        this.currentScene.render(this.context);
        const nextScene = this.currentScene.getNextScene();
        if (nextScene && nextScene !== this.currentScene) {
            this.currentScene.onEvent(new DetachedFromGameEvent(this));
            nextScene.onEvent(new AttachedToGameEvent(this));
            this.currentScene = nextScene;
        }
        this.requestNextFrame();
    }
}
