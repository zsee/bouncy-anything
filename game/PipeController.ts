import GameObject from "../engine/GameObject";
import IBouncyOptions from "./IBouncyOptions";
import PairOfPipes from "./PairOfPipes";
import PipePassedEvent from "./PipePassedEvent";

export default class PipeController extends GameObject {
    private pipes: PairOfPipes[] = [];
    private timeLeftToAddPipe: number;

    constructor(
        private options: IBouncyOptions,
    ) {
        super();
        this.timeLeftToAddPipe = options.pipeOptions.addPipeFrequency;
    }

    public update(elapsedTime: number): void {
        let timeLeft = this.timeLeftToAddPipe - elapsedTime;
        if (timeLeft < 0) {
            timeLeft += this.options.pipeOptions.addPipeFrequency;
            const minGapPosition = 10;
            const randomOffset = Math.random() *
                (this.game.height - 2 * minGapPosition - this.options.pipeOptions.gapSize);
            const gapPosition = minGapPosition + randomOffset;
            const pipe = new PairOfPipes(this.options, gapPosition);
            this.addChild(pipe);
            this.pipes.push(pipe);
        }
        while (this.pipes.length > 0 && this.pipes[0].isOutsideOfScreen()) {
            this.removeChild(this.pipes[0]);
            this.pipes.splice(0, 1);
            this.game.publishEvent(new PipePassedEvent());
        }
        this.timeLeftToAddPipe = timeLeft;
        super.update(elapsedTime);
    }
}
