const XLSX = require('xlsx');
const fs = require('fs');

/*function generateHTML(data) {
    let htmlContent = '';
    data.forEach(row => {
        htmlContent += `题号: ${row[0]}\n`; // 题号
        htmlContent += `类型: ${row[1]}\n`; // 类型（单选或多选）
        htmlContent += `题干: ${row[2]}\n`; // 题干
        htmlContent += `选项A: ${row[3]}\n`; // 选项A
        htmlContent += `选项B: ${row[4]}\n`; // 选项B
        htmlContent += `选项C: ${row[5]}\n`; // 选项C
        htmlContent += `选项D: ${row[6]}\n`; // 选项D
        htmlContent += `选项E: ${row[7]}\n`; // 选项E
        htmlContent += `答案: ${row[8]}\n`; // 答案
        htmlContent += '--------------------------\n'; // 分隔线
    });
    return htmlContent;
}

// 读取 Excel 文件
const workbook = XLSX.readFile('./计算机硬件技术.xlsx');

// 获取第一个工作表
const firstSheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[firstSheetName];

// 将工作表转换为 JSON 对象数组
const data = XLSX.utils.sheet_to_json(worksheet, {header: 1}); // header:1 表示第一行是标题行

const htmlContent = generateHTML(data);
fs.writeFile('计算机硬件技术.txt', htmlContent, (err) => {
    if (err) throw err;
    console.log('文本文件已保存');
});*/

function generateHTML(data) {
    let htmlContent = '';
    data.forEach(row => {
        htmlContent += `科目: ${row[0]}\n`; // 题号
        htmlContent += `类型: ${row[1]}\n`; // 类型
        htmlContent += `题干: ${row[2]}\n`; // 题干
        htmlContent += `A: ${row[3]}\n`; // 选项A
        htmlContent += `B: ${row[4]}\n`; // 选项B
        htmlContent += `C: ${row[5]}\n`; // 选项C
        htmlContent += `D: ${row[6]}\n`; // 选项D
        htmlContent += `E: ${row[7]}\n`; // 选项E
        htmlContent += `答案: ${row[8]}\n`; // 答案
        htmlContent += '--------------------------\n'; // 分隔线
    });
    return htmlContent;
}

// 读取 Excel 文件
const workbook = XLSX.readFile('./高数题库.xlsx');

// 获取第一个工作表
const firstSheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[firstSheetName];

// 将工作表转换为 JSON 对象数组
const data = XLSX.utils.sheet_to_json(worksheet, {header: 1}); // header:1 表示第一行是标题行

const htmlContent = generateHTML(data);
fs.writeFile('高数题库.txt', htmlContent, (err) => {
    if (err) throw err;
    console.log('文本文件已保存');
})
