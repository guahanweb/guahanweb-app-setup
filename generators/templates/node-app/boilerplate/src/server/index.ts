import express from "express";
import * as config from "../../config";

if (require.main === module) {
    // automatically execute main if called directly
    main();
}

export async function main() {
    await bootstrap();

    const server = express();

    await server.listen(config.appConfig.port);
    console.log(`listening on port ${config.appConfig.port}`);
}

export async function bootstrap() {
    // any initialization logic goes here
}
