import { Command } from 'commander';
import { getDivider, loggerProfile, loggerTitle } from '../../utils/logger';
import { getBasicProfileInfos } from '../../utils/os-helper';
import { getProfileItemWithCmd, getVscodeVersion } from '../../utils/cmd-helper';
import ora from 'ora';

export function initInfoCommand(program: Command) {
  // 定义命令和参数
  program
    .command('info')
    .alias('i')
    .description('输出当前环境信息')
    .action(async () => {
      // 输出信息
      loggerTitle('环境信息');
      const spinner = ora().start('采集中...');

      const envInfo = getBasicProfileInfos();
      envInfo.push(getDivider());
      envInfo.push(getProfileItemWithCmd('node -v', 'node'));
      envInfo.push(getProfileItemWithCmd('pnpm -v', 'pnpm'));
      envInfo.push(getProfileItemWithCmd('yarn -v', 'yarn'));
      envInfo.push(getProfileItemWithCmd('npm -v', 'npm'));
      envInfo.push(getProfileItemWithCmd('emo -v', 'emo'));
      envInfo.push(getDivider());
      envInfo.push(getVscodeVersion());

      envInfo.unshift(getDivider());

      spinner.stop();
      spinner.clear();

      loggerProfile(envInfo);
    });
}
