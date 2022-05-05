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
        .argument('[generator]', 'name of generator to initialize')
        .action(async (generator, opts) => {
            if (!generator) {
                // prompt for which to initialize
                const answers = await inquirer.prompt([
                    {
                        type: 'rawlist',
                        name: 'generator',
                        message: 'Select a generator to initialize',
                        choices: generators
                    }
                ]);
                generator = answers.generator;
            }

            // bootstrap the project using plopfiles
            await initialize(generator, opts);
        })
        .parse(process.argv);
}

function initialize(generator, argv) {
    Plop.prepare({
        cwd: argv.cwd,
        configPath: path.join(__dirname, `generators/${generator}.plopfile.js`),
        preload: argv.preload || [],
        completion: argv.completion,
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
