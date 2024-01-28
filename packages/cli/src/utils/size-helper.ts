//  求次幂
//   num = 1 代表 1024
//   num = 2 代表 1024*1024
//   num = 3 代表 1024*1024*1024 依次类推
function pow1024(num: number) {
  return Math.pow(1024, num);
}

export const formatSize = (size: number) => {
  if (!size) return '';
  if (size < pow1024(1)) return size + ' B';
  if (size < pow1024(2)) return (size / pow1024(1)).toFixed(2) + ' KB';
  if (size < pow1024(3)) return (size / pow1024(2)).toFixed(2) + ' MB';
  if (size < pow1024(4)) return (size / pow1024(3)).toFixed(2) + ' GB';
  return (size / pow1024(4)).toFixed(2) + ' TB';
};
