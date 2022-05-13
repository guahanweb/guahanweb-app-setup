#!/usr/bin/env node

import { Command } from "commander";
import fs from "node:fs";
import path from "node:path";
import { Plop, run } from "plop";

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import inquirer from "inquirer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, './package.json')));
const { generators } = packageJson;

main();
function main() {
    const program = new Command();
    program
        .option('--cwd <cwd>', 'current working directory')
        .option('--preload <preload>', 'file(s) to preload')
        .option('--completion <completion>', 'plop completion argument')
        .action((opts) => initialize(opts))
        .parse(process.argv);
}

function initialize(opts) {
    Plop.prepare({
        cwd: opts.cwd,
        configPath: path.join(__dirname, 'plopfile.js'),
        preload: opts.preload || [],
        completion: opts.completion,
    }, env =>
        Plop.execute(env, (env) => {
            const options = {
                ...env,
                dest: process.cwd(), // set destination path based on exec path
            }
            return run(options, undefined, true);
        })
    );
}
