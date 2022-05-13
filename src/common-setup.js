import { npmInstall, configureAddons } from "./actions/common.js";
import addonsHelper from "./helpers/addons-helper.js";

// this file is going to be loaded and configures all
// common shared actions, prompts, and configuration
export default function (plop) {
    plop.setDefaultInclude({ actionTypes: true });

    // register common actions
    plop.setActionType('configureAddons', configureAddons);
    plop.setActionType('npmInstall', npmInstall);

    // register any handlebars helpers
    plop.setHelper('addons', addonsHelper());
}