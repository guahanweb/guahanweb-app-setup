import path from "path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { getPromptOptions } from "../actions/addons/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const baseTemplatePath = path.resolve(__dirname, '../../templates');
const templatePath = path.resolve(baseTemplatePath, 'node-app');

export default function (opts) {
    return {
        description: 'boilerplate a new node application',
        prompts: prompts(opts),
        actions: actions(opts),
    };
}

function prompts(opts) {
    return [
        {
            type: 'input',
            name: 'name',
            message: 'What is your application name'
        }, {
            type: 'checkbox',
            name: 'addons',
            message: 'Select addons to bootstrap',
            choices: getPromptOptions(),
        }
    ];
}

function actions(opts) {
    return [
        {
            type: 'add',
            path: '{{dashCase name}}/package.json',
            templateFile: `${templatePath}/package.json.hbs`
        }, {
            type: 'addMany',
            destination: '{{dashCase name}}',
            base: `${templatePath}/boilerplate`,
            templateFiles: `${templatePath}/boilerplate/**/*`
        }, {
            type: 'configureAddons',
            destination: '{{dashCase name}}'
//        }, {
//            type: 'npmInstall'
        }
    ];
}
