import { Command } from 'commander';
import { DockerHelper } from './docker-helper';

export function initDockerEnvCommand(program: Command) {
  program
    .command('docker_env')
    .alias('env')
    .description('容器应用环境')
    .action(async () => {
      const version = DockerHelper.isInstall();
      if (!version) {
        console.log('docker 环境未就绪, 请先安装docker环境: https://www.docker.com/');
        return;
      } else {
        console.log('docker version: ', version);
      }
    });
}
