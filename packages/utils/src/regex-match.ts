/**
 * 常用正则表达式匹配
 * @param reg
 */
function matchBase(reg: RegExp) {
  return function (str: string) {
    if (str.match(reg)) {
      return true;
    } else {
      return false;
    }
  };
}

export const Match = {
  /**
   * 匹配手机号
   */
  phone: matchBase(/^1[3456789]\d{9}$/),
  /**
   * 数字
   */
  number: matchBase(/^[0-9]*$/),
  /**
   * 中文
   */
  chinese: matchBase(/^[\u4e00-\u9fa5]{0,}$/),
  /**
   * 邮箱
   */
  email: matchBase(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/),
  /**
   * 邮箱
   */
  ip: matchBase(/((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/),
  /**
   * 邮政编码
   */
  chinaPost: matchBase(/[1-9]\d{5}(?!\d)/),
};
