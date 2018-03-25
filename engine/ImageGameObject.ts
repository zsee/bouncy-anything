import GameObject from "./GameObject";
import GameObjectCoordinates from "./GameObjectCoordinates";
import Placement from "./Placement";

export default class ImageGameObject extends GameObject {
    public width: number;
    public height: number;

    constructor(
        private image: HTMLImageElement,
        public placement: Placement = new Placement(),
    ) {
        super();
    }

    public render(context: CanvasRenderingContext2D): void {
        if (this.width || this.height) {
            context.drawImage(
                this.image,
                this.placement.x,
                this.placement.y,
                this.width,
                this.height,
            );
        } else {
            context.drawImage(this.image, this.placement.x, this.placement.y);
        }
        super.render(context);
    }

    public getCoordinates(): GameObjectCoordinates {
        const coords = super.getCoordinates();
        coords.x = this.placement.x;
        coords.y = this.placement.y;
        coords.width = this.width;
        coords.height = this.height;
        return coords;
    }
}
