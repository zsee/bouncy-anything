import GameObject from "./GameObject";

export default class QueryObjectsByTagEvent {
    public objects: GameObject[] = [];

    constructor(public tag: string) { }
}
