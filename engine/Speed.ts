import Placement from "./Placement";

/**
 * Represents horizontal or vertical speed
 * in pixels per second
 */
export default class Speed {
    public x: number = 0;
    public y: number = 0;

    constructor(
        private placement: Placement,
    ) { }

    public update(elapsedTime: number): void {
        const dX = (elapsedTime * this.x) / 1000;
        const dY = (elapsedTime * this.y) / 1000;
        this.placement.x += dX;
        this.placement.y += dY;
    }
}
