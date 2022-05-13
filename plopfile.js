import nodeAppGenerator from './src/generators/node-app-generator.js';

export default function (plop, options) {
    plop.load('./src/common-setup.js');
    plop.setGenerator('node-app', nodeAppGenerator(options));
    plop.setGenerator('foo', {
        description: 'something',
        prompts: [{
            type: 'input',
            message: 'app name',
            name: 'name'
        }],
        actions: [{
            type: 'configureAddons'
        }],
    })
}