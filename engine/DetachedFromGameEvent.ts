import Game from "./Game";

export default class DetachedFromGameEvent {
    constructor(
        public game: Game,
    ) { }
}
