import Game from "./engine/Game";
import GameObject from "./engine/GameObject";
import Bouncy from "./game/Bouncy";
import IBouncyOptions, { applyDefaults } from "./game/IBouncyOptions";
import IntroScene from "./game/IntroScene";

(window as any).startBouncyAnything = (options: IBouncyOptions) => {
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 480;
    canvas.style.width = "640px";
    canvas.style.height = "480px";
    canvas.style.border = "solid 1px black";
    options.container.appendChild(canvas);
    const context = canvas.getContext("2d");
    const game = new Game(new IntroScene(applyDefaults(options)), context);
    game.width = 640;
    game.height = 480;
    game.start();
    (window as any).stopBouncyAnything = () => {
        game.stop();
    };
};
