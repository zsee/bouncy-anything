import ImageGameObject from "../engine/ImageGameObject";
import MouseDownEvent from "../engine/MouseDownEvent";
import Scene from "../engine/Scene";
import Bouncy from "./Bouncy";
import BouncyScene from "./BouncyScene";
import IBouncyOptions from "./IBouncyOptions";
import IntroScene from "./IntroScene";

export default class BouncyDeadScene extends Scene {
    private isOver: boolean = false;
    private isDelayPassed: boolean = false;
    private delay = 500;

    constructor(
        private options: IBouncyOptions,
        private score: number,
    ) {
        super();
        if (options.backgroundImage) {
            this.addChild(new ImageGameObject(options.backgroundImage));
        }
    }

    public update(elapsedTime: number) {
        super.update(elapsedTime);
        this.delay -= elapsedTime;
        if (this.delay < 0) {
            this.isDelayPassed = true;
        }
    }

    public getNextScene(): Scene {
        if (this.isOver && this.isDelayPassed) {
            return new IntroScene(this.options);
        }
    }

    public render(context: CanvasRenderingContext2D): void {
        super.render(context);
        context.save();
        context.shadowBlur = 4;
        context.shadowColor = "black";
        context.fillStyle = this.options.introTextFillStyle;
        context.textBaseline = "center";
        context.textAlign = "center";
        context.font = "48px cursive";
        context.strokeStyle = "2px blue";
        context.fillText(
            this.options.bouncyDeadTextTitle.replace("{score}", this.score.toString()),
            this.game.width / 2,
            this.game.height * 0.3,
            this.game.width * 0.6);
        context.font = "24px sans-serif";
        context.fillText(
            this.options.bouncyDeadTextMessage,
            this.game.width / 2,
            this.game.height * 0.7,
            this.game.width * 0.6);
        context.restore();
    }

    public onEvent(event: any): void {
        super.onEvent(event);
        if (event instanceof MouseDownEvent) {
            this.isOver = true;
        }
    }
}
