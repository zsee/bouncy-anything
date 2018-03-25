export interface ILogger {
    log(...args: any[]): void;
}

const consoleLogger: ILogger = window.console;

const silentLogger: ILogger = {
    // tslint:disable-next-line:no-empty
    log: () => { },
};

export default consoleLogger;
