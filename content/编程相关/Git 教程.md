---
created: "2025-11-07"
updated: "2025-11-07"
---
git 是绕不开的，毫无疑问的，能够简化开发工作的工具。

> [!WARNING]
> Github 的教程另外说。

## 版本控制系统 Version Control System

缩写是 VCS 。意思很简单，代码写一版用一版，比如说0.1版本、1.0版、5.14版本等等。写代码的时候会产生很多修改，产生很多版本。

VCS 的作用就是管理各种不同的版本。常见的用法例如写错了，回滚版本到上一次开始修改前的代码，这样可以给现在的代码兜底。

当然也可以说手动复制一份代码文件当作备份，需要的时候自己手动恢复，但是那样显然会遇到问题：
- 你用的框架或者IDE偷偷改了文件，但是你不知道，你只是恢复了自己写的文件到上一版，结果发现运行不了了。
- 明明改了一个空格，结果需要复制一整个文件，占位置。
- 有些文件需要备份，有些不需要，一个个选，麻烦。
- 懒得编了。

所以为什么不用 VCS 呢？VCS 除了提供回滚功能，还能帮忙管理多人协作的情况。

## Git 是什么

> Git is a [free and open source](https://git-scm.com/about/#free-and-open-source) distributed version control system designed to handle everything from small to very large projects with speed and efficiency.
> 
> Git 是一个免费的开源分布式版本控制系统，旨在快速高效地处理从小到大的项目。

上面这句是 Git 主页写的。显然 Git 就是一种 VCS。

注意到话里面说了「分布式」，可以理解成「可以到处都有 Git 仓库，它们相互连接」的意思。

> [!WARNING]
> Git 和 Github 不是一个东西！！！Git 和 Github 不是一个东西！！！Git 和 Github 不是一个东西！！！
> 
> Github 只是一个 Git 仓库托管平台，也就是说你可以把 Git 仓库放到 Github 上面。类似的还有国内的 Gitee。

[150秒学会Git！最好用的项目版本控制工具 前端后端编程开发必会技能](https://www.bilibili.com/video/BV1Eu4y1N78p/)

光速介绍 Git.

## 安装

[给傻子的Git教程_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Hkr7YYEh8/?vd_source=0065f6d72283dbbfeb8c4fb57774ef48)

## 学习使用 Git

[30分钟弄懂所有工作Git必备操作 / Git 入门教程](https://www.bilibili.com/video/BV1pX4y1S7Dq/)

[Learn Git Branching](https://learngitbranching.js.org/?locale=zh_CN)

图形化的 Git 教程。

## Git 基本知识自检列表

可以对照这个表看看有没有遗漏的。
- Git 概念
	- Git 和 Github、Gitee 关系
	- Commit 是什么
	- HEAD 是什么
	- 分支、远程分支
	- 工作区、暂存区、仓库
- Git 功能 **（会命令行或者用 gui 操作都可以，没写的就是建议了解一下命令行怎么写）**
	- 添加追踪、移除追踪
	- 新建分支、删除分支、合并分支merge、变基分支rebase
	- 切换到分支
	- 回退到 Commit（会gui操作就行）
	- 远程相关操作
		- 添加远程仓库 `git add remote xx url`
		- `fetch`
		- `pull`
		- `push`
		- 
 
## Git 使用相关工具和建议

### Git 用户名和邮箱

**不要和 Github 用户名邮箱搞混了。**

前面说到 Git 是 **分布式** 的版本管理系统，所以如果一个人在仓库交了 Commit，可能能在很远的地方看到（比如说你把 Gitee 的仓库搬到 Github，结果发现 Git 日志里面有以前本地 Git 的 Commit）。

所以给 Git 配置正确的用户名和邮箱很有必要，因为 Git 在提交 Commit 的时候会附上 Git
配置的邮箱和用户名。打比方就是 Commit 的时候顺手签了个名。

如果不知道配什么，就把 Git 的用户名和邮箱设置为和 Github 一样。这样其他人就可以在 Commit 那里顺着找到你的 Github，不论这个仓库是否在 Github 上。

正确的配置也能让你的 Github 头像在支持的 Git GUI 工具里面显示。

[git配置用户名和邮箱 - guanyubo - 博客园](https://www.cnblogs.com/yubo-guan/p/18079217)

![[89df8f89-fecc-4755-9a99-d639ce05008f.png]]

### 用 SSH 登录 Github

是关于 Github 的建议。

网上关于这个的攻略到处都是了。

[Github配置ssh | Alpen](https://alpenl.github.io/posts/2025/02/Github%E9%85%8D%E7%BD%AEssh)

注意在 clone 仓库的时候选择 ssh 的链接。也就是 `git@github.com/xxx.git`

### 为什么不用图形化呢

首推 Sourcegit。

各个 IDE 给得也挺好用，Github Desktop也不是不行。

但是 Sourcegit 中英文双语，在选项旁边还会有英文提示。看多了会顺便把命令行的英文也记住了。

### 讲几条常用的 git 命令

`git remote add origin xxx.git`

意思是给当前仓库添加远程仓库。注意是 **远程仓库** 而不是远程分支，这里的 `origin`是本地给远程仓库命名，而实际上连到哪里看的是后面的 `xxx.git` （实际上就是地址）。你不写 `origin` 也可以。

`git push --force`

强制推送，会直接覆盖掉远程仓库的 commit 记录，这也是少有能够彻底删除 commit 的办法（因为实际上回退也会产生 commit）

*不要随便 --force，如果能随便删除历史记录，还要 VCS 干什么。*

### 不会用 rebase 就用 merge

如题

## 各种资料

哪里不懂专门看哪里。

- [给傻子的Git教程_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Hkr7YYEh8/?vd_source=0065f6d72283dbbfeb8c4fb57774ef48)
- [Learn Git Branching](https://learngitbranching.js.org/?locale=zh_CN)
- [Git 教程 | 菜鸟教程](https://www.runoob.com/git/git-tutorial.html)
- [【GeekHour】一小时Git教程](https://www.bilibili.com/video/BV1HM411377j/)