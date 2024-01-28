import axios from 'axios';
const markdownIt = require('markdown-it');

const md = markdownIt();

const DEFAULT_TEMPLATE_README =
    'https://raw.githubusercontent.com/jeiizou/template-set/master/README.md';

export async function getReadMEHtml(
    targetUrl: string = DEFAULT_TEMPLATE_README,
) {
    const des = await axios.get(targetUrl);
    const htmlText = md.render(des.data) as string;
    return htmlText;
}
