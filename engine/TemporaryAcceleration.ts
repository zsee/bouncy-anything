import Acceleration from "./Acceleration";
import Speed from "./Speed";

export default class TemporaryAcceleration {
    private duration: number = 0;
    private durationLeft: number = 0;
    private acceleration: Acceleration = new Acceleration(this.speed);

    constructor(private speed: Speed) {
    }

    public update(elapsedTime: number): void {
        if (this.durationLeft <= 0) {
            return;
        }
        let timeToUpdateWith = elapsedTime;
        const left = Math.max(0, this.durationLeft - elapsedTime);
        if (left === 0) {
            timeToUpdateWith = this.durationLeft;
        }
        this.acceleration.update(timeToUpdateWith);
        this.durationLeft = left;
    }

    public push(x: number, y: number, duration: number) {
        this.acceleration.x = x;
        this.acceleration.y = y;
        this.durationLeft = duration;
    }
}
