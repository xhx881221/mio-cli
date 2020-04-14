import program from 'commander';
import { VERSION } from './utils/constants';
import apply from './index';
import chalk from 'chalk';

/**
 * 定义mio的命令
 * config
 * init
 */

let actionMap = {
    init: {
        description: 'generate a new project from a template',
        usages: [
            'mio init templateName projectName'
        ]
    },
    config: {
        alias: 'conf',
        description: 'config mio',
        usages: [
            'mio config set <k> <v>',
            'mio config get <k>',
            'mio config remove <k>'
        ]
    }
}

Object.keys(actionMap).forEach((action) => {
    program.command(action).description(actionMap[action].description).action(() => {
        switch (action) {
            case 'config':
                apply(action, ...process.argv.slice(3));
                break;
            case 'init':
                apply(action, ...process.argv.slice(3));
                break;
            default:
                break;
        }
    });
});

function help() {
    console.log('\r\nUsage:');
    Object.keys(actionMap).forEach((action) => {
        actionMap[action].usages.forEach(usage => {
            console.log('  - ' + usage);
        });
    });
    console.log('\r')
}

program.usage('<command> [options]');
program.on('-h', help);
program.on('--help', help);
program.version(VERSION, '-V --version').parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp(make_green);
}

function make_green(txt) {
    return chalk.green(txt);
}