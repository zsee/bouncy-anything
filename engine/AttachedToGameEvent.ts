import Game from "./Game";

export default class AttachedToGameEvent {
    constructor(
        public game: Game,
    ) { }
}
