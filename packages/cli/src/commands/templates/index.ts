import { Command } from 'commander';
import ora from 'ora';
import { loggerTitle } from '../../utils/logger';
import { getTableInfoFromHtml } from '../../utils/html-helper';
import { getReadMEHtml } from '../../utils/git-helper';

import path from 'node:path';

const inquirer = require('inquirer');
const degit = require('degit');

export function initTemplateCommand(program: Command) {
  program
    .command('template')
    .alias('temp')
    .description('模板管理')
    .action(async () => {
      loggerTitle('获取模板');

      const spinner = ora().start('信息获取中...');

      const htmlText = await getReadMEHtml();
      const templateList = getTableInfoFromHtml(htmlText);

      spinner.stop();
      spinner.clear();

      inquirer
        .prompt([
          {
            type: 'list',
            name: 'templates',
            message: '选择模板',
            choices: templateList.map((item) => `${item[0]}--${item[1]}`),
          },
          {
            type: 'input',
            name: 'target',
            message: '目标文件夹',
            default: '.',
          },
        ])
        .then((answers: Record<string, string>) => {
          const name = answers['templates'].split('--')[0];
          const res = templateList.find((i) => i[0] === name);
          const cmd = res?.[2].split(' ')[1];

          const targetDir = path.resolve('.', answers['target']);

          const emitter = degit(cmd, {
            cache: true,
            force: true,
            verbose: true,
          });

          emitter.on('info', (info: any) => {
            console.log(`degit message: ${info.message}`);
          });

          emitter.clone(targetDir).then(() => {
            console.log('复制完成');
          });
        })
        .catch((error: any) => {
          console.log(error);
        });
    });
}
