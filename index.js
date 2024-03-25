#!/usr/bin/env node

const puppeteer = require('puppeteer')
const { Command } = require('commander')
const program = new Command()

const toPdf = async (options) => {
  let { url, path, width, height, format, landscape, heightSelector, cookie } = options

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: 'new',
  })
  const page = await browser.newPage()

  try {
    await page.setCookie(...JSON.parse(cookie))
  } catch (error) {
    console.log('cookie解析错误')
  }

  await page.goto(url, { waitUntil: 'networkidle2' })

  if (!height && heightSelector) {
    height = await page.evaluate((selector) => {
      const selectorHeight = window.document.querySelector(selector).scrollHeight
      const bodyHeight = window.document.body.scrollHeight
      return `${Math.max(selectorHeight, bodyHeight)}px`
    }, heightSelector)
  }

  await page.pdf({
    path,
    format,
    landscape,
    printBackground: true,
  })

  await browser.close()
}

program
  .name('pptr-cli')
  .description('用于生成pdf的命令行工具')
  .version(require('./package').version)

program.command('pdf')
  .description('根据指定的url生成pdf')
  .requiredOption('--url <url>', 'url地址')
  .option('--width <string>', 'pdf宽度')
  .option('--height <string>', 'pdf高度')
  .option('--format <string>', 'pdf format')
  .option('--landscape', '水平方向')
  .option('--height-selector <string>', 'pdf高度css元素选择器')
  .option('--path <string>', 'pdf文件输出地址')
  .option('--cookie <string>', '设置cookie')
  .action((options) => {
    toPdf(options)
  })

program.parse()
