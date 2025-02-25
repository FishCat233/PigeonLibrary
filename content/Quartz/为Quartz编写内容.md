---
tags:
  - QuartzObsidian
---

## 语法
Quartz使用markdown文件作为主要的编写内容的方式，其完全支持markdown语法。同时Quartz还默认支持一些像 [Github Flavored Markdown](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) 的脚注、删除线、表格、任务清单和[Obsidian Flavored Markdown](https://help.obsidian.md/Editing+and+formatting/Obsidian+Flavored+Markdown)的`callout` `wikilinks`语法。

此外，Quartz还允许你给你的笔记指定metadata元信息——`frontmatter`。

```
---
title: Example Title
draft: false
tags:
  - example-tag
---
 
The rest of your content lives here. You can use **Markdown** here :)
```
这些常用的 frontmatter 字段是 Quartz 自带的：
- `title`：page 的标题，默认值是文件的名字
- `description`：文件的介绍，用于链接预览（link previews）
- `permalink`：永久路径
- `aliases`：笔记的别名。这是一个string list
- `tags`：笔记的 tags
- `draft`： 决定笔记是否公开
- `date`：代表笔记公布/发行的字符串，通常是 `YYYY-MM-DD` 格式。
## 同步笔记
当你和你的笔记相处得不错的时候，你可以保存你的更改到Github。首先，确保你[已经准备了Github仓库](https://quartz.jzhao.xyz/setting-up-your-GitHub-repository)，然后运行 `npx quartz sync`。