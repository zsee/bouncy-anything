import PairOfPipes from "./PairOfPipes";

export default interface IBouncyOptions {
    backgroundImage?: HTMLImageElement;
    bouncyAcceleration: number;
    bouncyClickSpeed: number;
    bouncyDeadTextMessage: string;
    bouncyDeadTextTitle: string;
    bouncyImageCycleTime: number;
    bouncyImages: HTMLImageElement[];
    container: HTMLElement;
    introTextFillStyle: string;
    introTextMessage: string;
    introTextTitle: string;
    topPipeImage: HTMLImageElement;
    bottomPipeImage: HTMLImageElement;
    pipeOptions: IPipeOptions;
}

export interface IPipeOptions {
    addPipeFrequency: number;
    pipeSpeed: number;
    gapSize: number;
    speed: number;
}

export function applyDefaults(options: any): IBouncyOptions {
    return {
        backgroundImage: options.backgroundImage,
        bottomPipeImage: options.bottomPipeImage,
        bouncyAcceleration: options.bouncyAcceleration || 300,
        bouncyClickSpeed: options.bouncyClickSpeed || -250,
        bouncyDeadTextMessage: "Click to go back to the main screen",
        bouncyDeadTextTitle: "You died. Score: {score}",
        bouncyImageCycleTime: options.bouncyImageCycleTime || 200,
        bouncyImages: options.bouncyImages,
        container: options.container,
        introTextFillStyle: options.introTextFillStyle || "white",
        introTextMessage: options.introTextMessage || "Click to play",
        introTextTitle: options.introTextTitle || "Bouncy anything",
        pipeOptions: options.pipeSpeed || {
            addPipeFrequency: 2000,
            gapSize: 150,
            pipeSpeed: 200,
            speed: 20,
        },
        topPipeImage: options.topPipeImage,
    };
}
