import { downloadLocal } from './utils/get';
import ora from 'ora';
import inquirer from 'inquirer';
import fs from 'fs';
import chalk from 'chalk';
import symbol from 'log-symbols';

let init = async (templateName, projectName) => {
    //如果项目不存在，则由用户输入项目描述和作者名称
    if (!fs.existsSync(projectName)) {
        inquirer.prompt([
            {
                name: 'description',
                message: 'Please enter the project description:'
            },
            {
                name: 'auther',
                message: 'Please enter the auther name:'
            }
        ]).then(async (anwser) => {
            let loading = ora('downloading template ...');
            loading.start();
            downloadLocal(templateName, projectName).then(() => {
                loading.succeed();
                const filename = `${projectName}/package.json`;
                if (fs.existsSync(filename)) {
                    const data = fs.readFileSync(filename).toString();
                    let json = JSON.parse(data);
                    json.name = projectName;
                    json.author = anwser.auther;
                    json.description = anwser.description;
                    fs.writeFileSync(filename, JSON.stringify(json, null, '\t'), 'utf-8');
                    console.log(symbol.success, chalk.green('Project initialization finished!'));
                }
            }, () => {
                loading.fail();
            });
        })
    } else {
        console.log(symbol.error, chalk.red('The project already exists'));
    }
}

module.exports = init;