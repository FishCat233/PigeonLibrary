---
created: "2026-07-08"
updated: "2026-07-08"
---
## 原因

nvim-treesitter 使用的 `cc` 在 Windows 下默认使用 `cl.exe` 进行编译，但环境变量没有。

详细地说，在老版本的时候可以指定 nvim-tree-sitter 使用的编译器来解决，但是新版本不能指定编译器了，官方对此给出的文档是引用了 `cc` 的文档，而 `cc` 的文档写着在 Windows 环境下会自动搜索 Visual Studio 的 `cl.exe` 来进行编译。

但是 `cl.exe` 似乎并不存在于环境变量里面，DeepSeek 给出的建议是使用 `x64 Native Tool Prompt for VS 2022` 来打开命令行，这样就能自动载入 `cl` 系列的环境变量。

## 解决方案

方案就是用 `x64 Native Tool Prompt for VS 2022` 这个 VS 提供的工具来打开带有环境变量的命令行，然后启动 `nvim` 让 nvim-treesitter 编译所需要的 tree-sitter，编译安装好后关闭就行，在其他地方打开也没问题了。

虽然麻烦，但是从某种意义上来说，至少没污染环境变量。
