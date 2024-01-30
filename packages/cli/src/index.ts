#!/usr/bin/env node
import { initInfoCommand } from './commands/info';
import { program } from 'commander';
import { initTemplateCommand } from './commands/templates';

import packInfo from '../package.json';
import { initDockerEnvCommand } from './commands/docker_env';

program.version(packInfo.version);

initInfoCommand(program);
initTemplateCommand(program);
initDockerEnvCommand(program);

// 解析命令行参数
program.parse(process.argv);
