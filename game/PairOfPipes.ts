import AttachedToGameEvent from "../engine/AttachedToGameEvent";
import GameObject from "../engine/GameObject";
import ImageGameObject from "../engine/ImageGameObject";
import Placement from "../engine/Placement";
import Speed from "../engine/Speed";
import IBouncyOptions from "./IBouncyOptions";

export default class PairOfPipes extends GameObject {
    public static pipeTag = "pipe";
    private static pipeWidth: number = 80;
    private placement = new Placement();
    private topPipe: ImageGameObject;
    private bottomPipe: ImageGameObject;
    private speed = new Speed(this.placement);

    constructor(
        private options: IBouncyOptions,
        private gapPosition: number,
    ) {
        super();
        this.topPipe = new ImageGameObject(options.topPipeImage);
        this.bottomPipe = new ImageGameObject(options.bottomPipeImage);
        this.topPipe.width = PairOfPipes.pipeWidth;
        this.bottomPipe.width = PairOfPipes.pipeWidth;
        this.topPipe.tags.push(PairOfPipes.pipeTag);
        this.bottomPipe.tags.push(PairOfPipes.pipeTag);
        this.addChild(this.topPipe);
        this.addChild(this.bottomPipe);
        this.speed.x = -this.options.pipeOptions.speed;
    }

    public update(elapsedTime: number): void {
        this.speed.x = -this.options.pipeOptions.pipeSpeed;
        this.speed.update(elapsedTime);
        this.topPipe.placement.x = this.placement.x;
        this.bottomPipe.placement.x = this.placement.x;
        super.update(elapsedTime);
    }

    public isOutsideOfScreen(): boolean {
        return this.placement.x < -PairOfPipes.pipeWidth;
    }

    public onEvent(event: any): void {
        super.onEvent(event);
        if (event instanceof AttachedToGameEvent) {
            this.placement.x = this.game.width;
            this.topPipe.placement.y = -this.game.height + this.gapPosition;
            this.bottomPipe.placement.y = this.gapPosition + this.options.pipeOptions.gapSize;
            this.topPipe.height = this.game.height;
            this.bottomPipe.height = this.game.height;
        }
    }
}
