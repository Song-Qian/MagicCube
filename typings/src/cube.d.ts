import HttpMultiplexer from "./services/http-multiplexer";
export declare class Cube {
    constructor();
    private server;
    private configure;
    private cubeId;
    private name;
    setConfig(config: any): void;
    Run(): void;
    useHttpMultiplexer(multiplexer: typeof HttpMultiplexer): void;
}
