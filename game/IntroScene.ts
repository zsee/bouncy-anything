import ImageGameObject from "../engine/ImageGameObject";
import MouseDownEvent from "../engine/MouseDownEvent";
import Scene from "../engine/Scene";
import Bouncy from "./Bouncy";
import BouncyScene from "./BouncyScene";
import IBouncyOptions from "./IBouncyOptions";

export default class IntroScene extends Scene {
    private isOver: boolean = false;

    constructor(
        private options: IBouncyOptions,
    ) {
        super();
        if (options.backgroundImage) {
            this.addChild(new ImageGameObject(options.backgroundImage));
        }
    }

    public getNextScene(): Scene {
        if (this.isOver) {
            return new BouncyScene(this.options);
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
            this.options.introTextTitle,
            this.game.width / 2,
            this.game.height * 0.3,
            this.game.width * 0.6);
        context.font = "24px sans-serif";
        context.fillText(
            this.options.introTextMessage,
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
