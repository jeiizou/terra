import process from 'node:child_process';

export function getProfileItemWithCmd(cmd: string, label: string, extra?: string) {
  try {
    const pnpmInfo = process
      .execSync(cmd, {
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'ignore'],
      })
      .toString()
      .trim();

    return {
      label,
      extra,
      value: pnpmInfo,
    };
  } catch (error) {
    return {
      label,
      value: '',
      extra: `some error when run ${cmd}`,
    };
  }
}

export function getVscodeVersion() {
  const item = getProfileItemWithCmd('code --version', 'vscode');
  const actualValue = item.value.split('\n')?.[0];
  return {
    ...item,
    value: actualValue,
  };
}
