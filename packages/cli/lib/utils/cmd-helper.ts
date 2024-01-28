import process from 'node:child_process';

export function getProfileItemWithCmd(
    cmd: string,
    label: string,
    extra?: string,
) {
    try {
        const pnpmInfo = process.execSync(cmd).toString().trim();
        return {
            label,
            extra,
            value: pnpmInfo,
        };
    } catch (error) {
        return {
            label,
            value: 'unknown',
            extra: String(error),
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
