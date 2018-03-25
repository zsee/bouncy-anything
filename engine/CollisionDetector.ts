import GameObject from "./GameObject";

export default class CollisionDetector {
    public collidesWithAny(o1: GameObject, others: GameObject[]): boolean {
        for (const o of others) {
            if (this.collides(o1, o)) {
                return true;
            }
        }
        return false;
    }

    public collides(o1: GameObject, o2: GameObject): boolean {
        const c1 = o1.getCoordinates();
        const c2 = o2.getCoordinates();
        const minX = c2.x;
        const maxX = c2.x + c2.width;
        const minY = c2.y;
        const maxY = c2.y + c2.height;
        // check upper left corner
        if (this.isInside(c1.x, c1.y, minX, maxX, minY, maxY)) {
            return true;
        }
        // upper right corner
        if (this.isInside(c1.x + c1.width, c1.y, minX, maxX, minY, maxY)) {
            return true;
        }
        // lower left corner
        if (this.isInside(c1.x, c1.y + c1.height, minX, maxX, minY, maxY)) {
            return true;
        }
        // lower right corner
        if (this.isInside(c1.x + c1.width, c1.y + c1.height, minX, maxX, minY, maxY)) {
            return true;
        }
        return false;
    }

    private isInside(x: number, y: number, minX: number, maxX: number, minY: number, maxY: number) {
        const isXinside = this.isBetween(x, minX, maxX);
        const isYinside = this.isBetween(y, minY, maxY);
        return isXinside && isYinside;
    }

    private isBetween(x: number, min: number, max: number) {
        return min < x && max > x;
    }
}
