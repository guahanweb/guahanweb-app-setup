import { spawn } from "node:child_process";
import { getPackageExtras } from "./addons/index.js";
import path from "node:path";
import fs from "node:fs";

export async function configureAddons(data, config, plop) {
    const projectName = plop.renderString(config.destination, data);
    const packagePath = path.resolve(plop.getDestBasePath(), projectName, 'package.json');
    const pkg = JSON.parse(fs.readFileSync(packagePath));

    // extend the boilerplate package.json with any requested addons
    const {
        dependencies,
        devDependencies,
        peerDependencies,
        scripts,
    } = getPackageExtras(data.addons);

    const new_pkg = {
        ...pkg,
        scripts: {
            ...pkg.scripts,
            ...scripts,
        },
        dependencies: {
            ...pkg.dependencies,
            ...dependencies,
        },
        devDependencies: {
            ...pkg.devDependencies,
            ...devDependencies,
        },
        peerDependencies: {
            ...pkg.peerDependencies,
            ...peerDependencies,
        }
    };

    // write the file back where we read it from
    fs.writeFileSync(packagePath, JSON.stringify(new_pkg, null, 2));
    return 'done';
}

export function npmInstall(data, config, plop) {
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

