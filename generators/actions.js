import { spawn } from "node:child_process";
import path from "node:path";

export function register(plop) {
    plop.setActionType('npmInstall', execNpmInstall);
}

function execNpmInstall(data, config, plop) {
    return new Promise((resolve, reject) => {
        const appPath = path.resolve(plop.getDestBasePath(), data.name);

        const cmd = spawn('npm', ['install'], {
            cwd: appPath,
            shell: true,
        });

        const output = [];
        const errors = [];
        let outbuf, errbuf;
        cmd.stdout.on('data', d => output.push(d));
        cmd.stdout.on('end', () => outbuf = Buffer.concat(output));
        cmd.stderr.on('data', d => errors.push(d));
        cmd.stderr.on('end', () => errbuf = Buffer.concat(errors));

        cmd.on('close', (code) => {
            if (code == 0) {
                resolve('npm install complete');
            } else {
                reject('error running npm install');
            }
        });
    });
}
