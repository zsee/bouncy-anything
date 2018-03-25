import CollisionDetector from "../engine/CollisionDetector";
import ImageGameObject from "../engine/ImageGameObject";
import QueryObjectsByTagEvent from "../engine/QueryObjectsByTagEvent";
import Scene from "../engine/Scene";
import Bouncy from "./Bouncy";
import BouncyDeadScene from "./BouncyDeadScene";
import IBouncyOptions from "./IBouncyOptions";
import IntroScene from "./IntroScene";
import PairOfPipes from "./PairOfPipes";
import PipeController from "./PipeController";
import PipePassedEvent from "./PipePassedEvent";

export default class BouncyScene extends Scene {
    private isBouncyDead = false;
    private score = 0;
    private bouncy: Bouncy;
    private collisionDetector = new CollisionDetector();

    constructor(
        private options: IBouncyOptions,
    ) {
        super();
        if (options.backgroundImage) {
            this.addChild(new ImageGameObject(options.backgroundImage));
        }
        this.bouncy = new Bouncy(options);
        this.addChild(this.bouncy);
        this.addChild(new PipeController(options));
    }

    public update(elapsedTime: number): void {
        super.update(elapsedTime);
        const queryPipes = new QueryObjectsByTagEvent(PairOfPipes.pipeTag);
        this.game.publishEvent(queryPipes);
        if (this.collisionDetector.collidesWithAny(this.bouncy, queryPipes.objects)) {
            this.isBouncyDead = true;
        }
        const bouncyY = this.bouncy.getCoordinates().y;
        if (bouncyY < -30 || bouncyY > this.game.height + 30) {
            this.isBouncyDead = true;
        }
    }

    public render(context: CanvasRenderingContext2D): void {
        super.render(context);
        this.renderScore(context);
    }

    public getNextScene(): Scene {
        if (this.isBouncyDead) {
            return new BouncyDeadScene(this.options, this.score);
        }
        return this;
    }

    public onEvent(event: any): void {
        super.onEvent(event);
        if (event instanceof PipePassedEvent) {
            this.score++;
        }
    }

    private renderScore(context: CanvasRenderingContext2D): void {
        context.save();
        context.textAlign = "left";
        context.textBaseline = "top";
        context.font = "bold 16px sans-serif";
        context.shadowColor = "black";
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowBlur = 1;
        context.fillStyle = "white";
        context.fillText("Score: " + this.score, 10, 10);
        context.restore();
    }
}
