/**
 * copy text to clipboard
 * @param text the test to be copied
 * @return
 */
export function copyText(text: string) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    // 隐藏此输入框
    textarea.style.position = 'fixed';
    textarea.style.clip = 'rect(0 0 0 0)';
    textarea.style.top = '10px';
    // 赋值
    textarea.value = text;
    // 选中
    textarea.select();
    // 复制
    document.execCommand('copy', true);
    // 移除输入框
    document.body.removeChild(textarea);
  }
}

export async function pasteText(): Promise<string> {
  try {
    if (navigator.clipboard) {
      return await navigator.clipboard.readText();
    } else {
      const textarea = document.createElement('textarea');
      document.body.appendChild(textarea);
      // 隐藏此输入框
      textarea.style.position = 'fixed';
      textarea.style.clip = 'rect(0 0 0 0)';
      textarea.style.top = '10px';
      // 选中
      textarea.select();
      // 复制
      document.execCommand('paste');
      const value = textarea.value;
      // 移除输入框
      document.body.removeChild(textarea);
      return value;
    }
  } catch (err) {
    console.error(err);
    return '';
  }
}
