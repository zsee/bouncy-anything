import Speed from "./Speed";

/**
 * Represents horizontal and vertical acceleration
 * Units are in pixels/s^2
 */
export default class Acceleration {
    public x: number = 0;
    public y: number = 0;

    constructor(
        private speed: Speed,
    ) { }

    public update(elapsedTime: number): void {
        const dX = (elapsedTime * this.x) / 1000;
        const dY = (elapsedTime * this.y) / 1000;
        this.speed.x += dX;
        this.speed.y += dY;
    }
}
