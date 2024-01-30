import process from 'node:child_process';

// 检测 Docker 是否安装
function isInstall() {
  try {
    const info = process.execSync('docker --version', {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'ignore'],
    });
    return info;
  } catch (error) {
    return false;
  }
}

export const DockerHelper = {
  isInstall,
};
