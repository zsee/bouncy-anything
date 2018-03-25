import GameObject from "./GameObject";

export default abstract class Scene extends GameObject {
    public abstract getNextScene(): Scene;

    public render(context: CanvasRenderingContext2D): void {
        context.clearRect(0, 0, this.game.width, this.game.height);
        super.render(context);
    }
}
