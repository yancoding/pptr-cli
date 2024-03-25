# pptr-cli

## Install

```sh
npm install -g pptr-cli
```

## Usage

1. generate pdf file

``` txt
Options:
  --url <url>                 url地址
  --width <string>            pdf宽度
  --height <string>           pdf高度
  --height-selector <string>  pdf高度选择器
  --path <string>             pdf文件输出地址
```

## Example

```sh
pptr-cli pdf --url https://www.google.com/ --path output.pdf
```
