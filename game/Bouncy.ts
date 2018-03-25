import Acceleration from "../engine/Acceleration";
import AttachedToGameEvent from "../engine/AttachedToGameEvent";
import GameObject from "../engine/GameObject";
import GameObjectCoordinates from "../engine/GameObjectCoordinates";
import MouseDownEvent from "../engine/MouseDownEvent";
import Placement from "../engine/Placement";
import Speed from "../engine/Speed";
import TemporaryAcceleration from "../engine/TemporaryAcceleration";
import IBouncyOptions from "./IBouncyOptions";

export default class Bouncy extends GameObject {
    public static width = 32;
    public static height = 32;
    private cycleTimeLeft = 0;
    private imageIndex = 0;
    private placement = new Placement();
    private speed = new Speed(this.placement);
    private acc = new Acceleration(this.speed);
    private tempAcc = new TemporaryAcceleration(this.speed);

    constructor(
        private options: IBouncyOptions,
    ) {
        super();
        this.acc.y = options.bouncyAcceleration;
    }

    public update(elapsedTime: number): void {
        this.updateCycledImages(elapsedTime);
        this.acc.update(elapsedTime);
        this.tempAcc.update(elapsedTime);
        this.speed.update(elapsedTime);
        super.update(elapsedTime);
    }

    public render(context: CanvasRenderingContext2D): void {
        const image = this.options.bouncyImages[this.imageIndex];
        context.drawImage(image, this.placement.x, this.placement.y, Bouncy.width, Bouncy.height);
        super.render(context);
    }

    public onEvent(event: any): void {
        super.onEvent(event);
        if (event instanceof MouseDownEvent) {
            this.speed.y = this.options.bouncyClickSpeed;
        }
        if (event instanceof AttachedToGameEvent) {
            this.placement.x = event.game.width * 0.25;
        }
    }

    public getCoordinates(): GameObjectCoordinates {
        const coords = super.getCoordinates();
        coords.x = this.placement.x;
        coords.y = this.placement.y;
        coords.width = Bouncy.width;
        coords.height = Bouncy.height;
        return coords;
    }

    private updateCycledImages(elapsedTime: number): void {
        this.cycleTimeLeft -= elapsedTime;
        if (this.cycleTimeLeft < 0) {
            this.cycleTimeLeft += this.options.bouncyImageCycleTime;
            this.imageIndex++;
            if (!this.options.bouncyImages[this.imageIndex]) {
                this.imageIndex = 0;
            }
        }
    }
}
