---
created: "2026-06-24"
updated: "2026-06-24"
---
其实早就想写这篇了，但是一直一直一直一直一直没有时间和精力去盘点我的 VS Code 插件——因为上一次捣鼓 VS Code 插件还是几年前的事情。

在这篇文章中，我会从我用的 VS Code 插件中找到那些我认为不错可以 **强烈推荐的好用插件** 进行推荐。

*非常遗憾，主题并没有被算在内，但是之后有空的时候会考虑写一篇。*

## 这些插件改变了 VS Code 体验

### 在 VSCode 中享受 Vim / Nvim

第一个当然是 [Vim](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim) 和 [VSCode Neovim](https://marketplace.visualstudio.com/items?itemName=asvetliakov.vscode-neovim) ！！！

这两个插件对我的用处都差不多，那就是在 VSCode 中使用 Vim 的模式进行输入和控制。

第一个 Vim 插件的实现原理是通过模拟器来实现的。而 VSCode Neovim 插件则是真的开了一个 Nvim 来运行，所以是支持 Nvim 的一些插件的。

不过最后我选择了 Vim，具体原因我已经不记得了，好像是 VSCode Neovim 那个插件有点复杂。

而另一个实用的则是 [Vim Cheatsheet](https://marketplace.visualstudio.com/items?itemName=AndenetAlexander.vim-cheatsheet)

这个插件能够在 VSCode 内打开一张 Vim 小抄，可以在刚学 Vim 的时候随手打开来查键位。

不过现在我都是直接问 AI 了，这个插件就没怎么用到了。

### Error Lens: 行内显示代码错误

**强烈推荐！！！**

[Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens) 提供了行内的代码错误显示，直接看图就懂了。

![[Pasted image 20260624222918.png]]

当 LSP 语法检查发现有错的时候，会直接把错误和警告放在行内，这样就能不鼠标悬停也能看到错误内容了，并且翻代码的时候也不会漏看。

自从装了这个插件后，我几乎没有再打开 VSCode 的错误面板了。

### background: 给 VSCode 添加背景

[background](https://marketplace.visualstudio.com/items?itemName=shalldie.background) 能够给编辑器添加背景，属于是美化插件。

*虽然我已经不用了，因为感觉花里胡哨，但是有时候给 IDE 加个背景养眼也挺不错的。*

### VSCode Animations: UI 动画

也是一个美化插件。

[VSCode Animations](https://marketplace.visualstudio.com/items?itemName=BrandonKirbyson.vscode-animations) 装起来稍微麻烦点，需要阅读说明。

**但是装上后效果相当不错，很长一段时间内我都沉迷没事随便拖两下光标，就为了看那个动画。**

这个插件添加了相当多的动画，比如说分屏时的、打开设置列表时的、移动光标时的、打开命令窗口时的……

可以去看看插件介绍的示例 gif，我就懒得录图了。

### Toggle Boolean: 一键切换布尔值

[Toggle Boolean](https://marketplace.visualstudio.com/items?itemName=silesky.toggle-boolean) 是一个简单但是相当有用的插件，特别是用上 Vim 之后。

这个插件可以通过一个快捷键直接切换光标处的布尔值，而不用每次都删了重新打。

默认是用 `alt+b`。

甚至还支持自定义映射，比如说定义 `"yes":"no"` 到配置文件中后，一键就可以切换 `"yes"` 和 `"no"`.

### Wakatime: 编码计时器

[Wakatime](https://marketplace.visualstudio.com/items?itemName=WakaTime.vscode-wakatime) 其实是一家公司的服务产品，能够从统计相当详细的编码用时，比如说 AI 率、编码用时、文件编码用时。

这个用途非常多，比如说光是直接看编码时间就能反应出到底泡在代码里多久了，通过官网的免费周报可以看到每周的编码时间。

另一个用途则是用来进行项目管理。比如说我之前通过 Wakatime 来收集数据，通过数据来估算完成一个 Issue 或者一个功能需要多少时间，然后根据估算结果调整每周的开发计划。

并且还具有相当的可玩性。比如说我通过 Wakatime 的官方 API 进行开发，配置了一个 Cloudflare Worker 读取时间并调用 [Moe Counter](https://count.getloli.com/) 来包装 Wakatime 的总共代码时间，然后放到 Github 展示，效果大概就是下面这样：

![[Pasted image 20260624214952.png]]

当然如果只是简单显示时间也不用这么麻烦，Wakatime 实际上有自带的 Badget 小物件，可以上网搜搜就能找到教程。

### VS Code Counter: %% 代码计数器 %%

Wakatime 是计时，而 [VS Code Counter](https://marketplace.visualstudio.com/items?itemName=uctakeoff.vscode-counter) 则是行数计数。

通过 VS Code Counter 可以直观看到某个文件夹或者当前项目有多少行代码，甚至详细到有各个语言文件的分类。

虽然有人可能会觉得没什么用，但是我认为在学习的时候反复开发一个项目，不断数行数看着项目壮大还是很不错的。而我对其的另一个用途是拿来衡量其他人开发的项目量级，结合开发时间可以对项目复杂度和成本有个比较直观的感受。

*虽然数代码确实不会多赚米。*

![[Pasted image 20260624220555.png]]

### TODO Highlight: 高光 TODO 等关键字

[TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight) 插件能够高光代码中的 `TODO:` 和 `FIXME:` 这样的字眼。（*默认的颜色真的是特别高光，相当显眼以至于可能会触发强迫症的那种*）

![[Pasted image 20260624220526.png]]

### Rainbow Brackets: 彩虹括号

[Rainbow Brackets](https://marketplace.visualstudio.com/items?itemName=tal7aouy.rainbow-bracket) 插件给不同对的括号增加了颜色，这样能够在 `[[[[[[[[[]]]]]]]` 等这样的致命多重大中小括号中比较好的找到另一半。*是括号的另一半，不是用户的。*

![[Pasted image 20260624220404.png]]

### Indent-rainbow: 彩虹缩进

*哦，我的上帝啊，又一款彩虹插件！*

有人可能喜欢，有人可能讨厌的插件。[Indent-rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow) 给缩进染上了彩虹色，并且我试过了，不管是 2 空格缩进还是 4 空格缩进都能正常工作。

![[Pasted image 20260624221744.png]]

感觉对 Python / Flutter 效果出奇的好，特别是有一大长串垃圾 Python 嵌套的时候。

### colorize: 编辑器内可视化颜色

[colorize](https://marketplace.visualstudio.com/items?itemName=kamikillerto.vscode-colorize) 能够解决在写 CSS 时配置颜色 RGB / HEX / HSL 等格式后，完全看不见配了什么颜色的问题。

这个插件会在 RGB 或者 HEX 旁边直接显示出色块，甚至还能点一下打开调色板来选颜色，相当好用。

### Gitmoji: 给 git commit 用的 emoji 小选单

[Gitmoji](https://marketplace.visualstudio.com/items?itemName=seatonjiang.gitmoji-vscode) 在 git 面板加了一个 emoji 菜单，能够根据 [git emoji 指南]((https://gitmoji.js.org/) 来给 git commit 信息快速添加 emoji。

以前还挺喜欢用的，但是后来感觉花里胡哨就没用过了——而且每次提交都选 emoji 多少有点累。

### expand-region: 一键扩大缩小选区

[expand-region](https://marketplace.visualstudio.com/items?itemName=letrieu.expand-region) 这个插件能够一键扩大和缩小鼠标选中的区域，比如说从选中词扩大到句子、方括号、表达式、行、代码块之类的。

**不过非常遗憾，这个插件支持 JavaScript 和 HTML。**

## 面向特定领域的好帮手

### Rainbow CSV: 彩虹 CSV, TSV

[Rainbow CSV](https://marketplace.visualstudio.com/items?itemName=mechatroner.rainbow-csv) 类似于彩虹括号，这个插件在浏览 CSV 文件的时候会根据 CSV 列的不同给文本染上不同的颜色。

除此外好像还有其他功能，比如说 TSV 之类的支持，不过我没用到。

**这个插件极大改善了浏览 CSV 文件的体验，如果有需求，强烈推荐！**

![[Pasted image 20260624220700.png]]

### json

[json](https://marketplace.visualstudio.com/items?itemName=ZainChen.json) 能够在 VSCode 的工具栏中新增一个 json 界面，在那个界面上能够展示当前打开 `.json` 文件的树。

对翻找大型 json 文件的时候挺有用的。

### LeetCode: 刷力扣

[LeetCode 插件](https://marketplace.visualstudio.com/items?itemName=LeetCode.vscode-leetcode) 能够在 VS Code 里面去刷力扣题。

体验感觉其实也一般（因为想要补全还得调一些设置），但是总比没有好。

