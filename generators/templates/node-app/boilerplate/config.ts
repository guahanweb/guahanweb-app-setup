import * as path from "path";
import dotenv from "dotenv";

// if we have any environment file provided,
// be sure to hydrate the process.env vars
init();
function init() {
    const config_file: string|null = setFromEnvironment("ENV_FILE");
    if (config_file) {
        const filename = path.resolve(process.cwd(), config_file);
        dotenv.config({
            path: filename,
        });
    }
}

export const appConfig = (function () {
    return {
        host: setFromEnvironment("HOST", "localhost"),
        port: setFromEnvironment("PORT", 3000),
    };
})();

function setFromEnvironment(key: string, defaultValue: any = null) {
    const value: any = process.env && process.env[key];
    return value || defaultValue;
}
