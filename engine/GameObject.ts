import AttachedToGameEvent from "./AttachedToGameEvent";
import DetachedFromGameEvent from "./DetachedFromGameEvent";
import Game from "./Game";
import GameObjectCoordinates from "./GameObjectCoordinates";
import QueryObjectsByTagEvent from "./QueryObjectsByTagEvent";

export default abstract class GameObject {
    public tags: string[] = [];
    protected childObjects: GameObject[] = [];
    protected game: Game;

    /**
     * Update the state of the game object.
     * The default implementation calls update on all child objects
     * @param elapsedTime The elapsed time in milliseconds since the last update.
     */
    public update(elapsedTime: number) {
        for (const child of this.childObjects) {
            child.update(elapsedTime);
        }
    }

    /**
     * Render the GameObject on a canvas.
     * The default implementation calls render on all child objects.
     * @param context
     */
    public render(context: CanvasRenderingContext2D) {
        for (const child of this.childObjects) {
            child.render(context);
        }
    }

    /**
     * Handle an event produced by the game.
     * The default implementation forwards the event to all child objects.
     */
    public onEvent(event: any): void {
        if (event instanceof AttachedToGameEvent) {
            this.game = event.game;
        } else if (event instanceof DetachedFromGameEvent) {
            this.game = null;
        } else if (event instanceof QueryObjectsByTagEvent) {
            if (this.tags.indexOf(event.tag) !== -1) {
                event.objects.push(this);
            }
        }
        for (const child of this.childObjects) {
            child.onEvent(event);
        }
    }

    /**
     * Add a child object
     * @param gameObject
     */
    public addChild(gameObject: GameObject): void {
        this.childObjects.push(gameObject);
        if (this.game) {
            gameObject.onEvent(new AttachedToGameEvent(this.game));
        }
    }

    /**
     * Remove a child object
     * @param gameObject
     */
    public removeChild(gameObject: GameObject): void {
        const index = this.childObjects.indexOf(gameObject);
        if (index !== -1) {
            this.childObjects.splice(index, 1);
            if (this.game) {
                gameObject.onEvent(new DetachedFromGameEvent(this.game));
            }
        }
    }

    /**
     * Get the coordinates of the game object.
     * The coordinates can be used for collision detection.
     */
    public getCoordinates(): GameObjectCoordinates {
        return new GameObjectCoordinates();
    }
}
