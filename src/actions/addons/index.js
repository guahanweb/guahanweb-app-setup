import path from 'node:path';
import fs from 'node:fs';

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const addons = {};
load();

function load() {
    const datapath = path.resolve(__dirname, 'addons.json');
    const data = JSON.parse(fs.readFileSync(datapath));
    data.forEach(def => {
        addons[def.id] = def;
    });
}

const noFilter = () => true;
export function getPromptOptions(filter) {
    return Object.values(addons)
        .filter(filter || noFilter)
        .map(addon => ({
            value: addon.id,
            name: addon.name,
            checked: addon.isDefault,
        }));
}

export function getPackageExtras(requestedAddons) {
    let dependencies = {};
    let devDependencies = {};
    let peerDependencies = {};
    let scripts = {};

    requestedAddons.forEach(id => {
        const addon = addons && addons[id];
        if (addon) {
            dependencies = {
                ...dependencies,
                ...(addon.dependencies || {})
            };

            devDependencies = {
                ...devDependencies,
                ...(addon.devDependencies || {})
            };

            peerDependencies = {
                ...peerDependencies,
                ...(addon.peerDependencies || {})
            };

            scripts = {
                ...scripts,
                ...(addon.scripts || {})
            };
        }
    });

    return {
        dependencies,
        devDependencies,
        peerDependencies,
        scripts,
    };
}
