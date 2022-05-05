import path from "path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { register } from './actions.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const templatePath = path.resolve(__dirname, 'templates/node-app');

export default function (plop, options) {
    // add all our helper actions
    register(plop);

    plop.setGenerator('node-app', {
        description: 'boilerplate a new node application',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'app name please'
        }],
        actions: [{
            type: 'add',
            path: '{{name}}/package.json',
            templateFile: `${templatePath}/package.json.hbs`
        }, {
            type: 'addMany',
            destination: '{{name}}',
            base: `${templatePath}/boilerplate`,
            templateFiles: `${templatePath}/boilerplate/**/*`
        }, {
            type: 'npmInstall'
        }],
    });
}
