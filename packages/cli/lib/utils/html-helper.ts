import * as cheerio from 'cheerio';

export function getTableInfoFromHtml(htmlText: string) {
    const $ = cheerio.load(htmlText);

    const templateInfo: string[][] = [];

    $('tr').each((rowIndex, row) => {
        const tds = $(row).find('td');
        templateInfo[rowIndex] = [];
        // 遍历每一个 td 元素
        tds.each(function (colIndex, td) {
            // 获取 td 元素的文本内容
            const text = $(td).text();
            templateInfo[rowIndex][colIndex] = text;
        });
        return;
    });

    return templateInfo.filter(i => i.length);
}
