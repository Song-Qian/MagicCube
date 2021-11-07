import HttpMultiplexer from "./services/http-multiplexer";
export declare class Cube {
    constructor({ config }: {
        config: any;
    });
    private server;
    private configure;
    private cubeId;
    private name;
    Run(): void;
    useHttpMultiplexer(multiplexer: typeof HttpMultiplexer): void;
}
