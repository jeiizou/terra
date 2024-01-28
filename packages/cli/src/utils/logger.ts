import chalk from 'chalk';

const log = console.log;
const DIVIDER_FLAG = '__divider__';
// @ts-ignore
chalk.enabled = true;
chalk.level = 2;

export interface ProfileItem {
  label: string;
  value: string | null;
  extra?: string;
}

export function getDivider() {
  return {
    label: DIVIDER_FLAG,
    value: null,
  };
}

export function loggerProfile(profileInfo: ProfileItem[]) {
  const str = profileInfo
    .map((info) => {
      if (info.label === DIVIDER_FLAG) {
        return chalk.grey('-'.padEnd(20, '-'));
      }

      if (!info.value) {
        return '';
      }

      return [info.label, chalk.blue(info.value), info.extra ? chalk.cyanBright(info.extra) : '']

        .map((i) => (i ? i.padEnd(10, ' ') : ''))
        .join('\t');
    })
    .filter((i) => !!i)
    .join('\n');
  log(chalk`${str}`);
}

export function loggerProfileTable(profileInfo: ProfileItem[]) {
  const tableObj: Record<string, any> = {};
  profileInfo.forEach((info) => {
    tableObj[info.label] = {
      值: info.value,
    };
    if (info.extra) {
      tableObj[info.label]['备注'] = info.extra;
    }
  });
  console.table(tableObj);
}

export function loggerTitle(title: string) {
  log(chalk.bgGreenBright.white.bold(title + ' >>> '));
}
