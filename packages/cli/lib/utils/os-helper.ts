import { ProfileItem } from './logger';
import { formatSize } from './size-helper';
import os from 'node:os';

export function getBasicProfileInfos() {
    const envInfo: ProfileItem[] = [];
    envInfo.push({
        label: 'OS',
        value: `${os.type()} / ${os.platform()} / ${os.release()}`,
    });

    envInfo.push({
        label: 'CPU',
        value: `${os.arch()} / ${os.cpus().map((i: any) => i.model)[0]}`,
    });

    envInfo.push({
        label: '内存',
        value: `${formatSize(os.freemem())} / ${formatSize(os.totalmem())}`,
    });

    const userInfo = os.userInfo();

    envInfo.push({
        label: '用户@主机名',
        value: `${userInfo.username}@${os.hostname()}`,
    });
    envInfo.push({
        label: '当前终端',
        value: `${userInfo.shell}`,
    });

    return envInfo;
}
