#!/usr/bin/env node
import { initInfoCommand } from './commands/info';
import { program } from 'commander';
import { initTemplateCommand } from './commands/templates';

import packInfo from '../package.json';

program.version(packInfo.version);

initInfoCommand(program);
initTemplateCommand(program);

// 解析命令行参数
program.parse(process.argv);
