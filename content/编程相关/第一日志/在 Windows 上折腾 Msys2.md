---
created: "2026-07-15"
updated: "2026-07-15"
---
由于 Powershell 是世界上最好用的 Shell，能够和 PHP 比肩的存在，因此我决定折腾*不那么好用*的 msys2。

另外，当你看到这篇文章的时候，我肯定尝试在 Windows 上折腾 msys2，而且还遇到了困难。

## Windows Terminal 配置 msys2

因为 msys2 安装时附带的 Mintty 很好，但是 Windows Terminal 更炫酷更好用，~~而且用 Windows Terminal 来打开 msys2 而不是 Powershell 会很有趣。~~

不过直接在 terminal 的选项里点点点选可执行文件是不行的，msys2 会默认启动 mintty。但 [msys2 的文档](https://www.msys2.org/docs/terminals/) 很完善，里面写了如何配置 Windows Terminal，跟着就能配好了。

省流说就是使用 `C:/msys64/msys2_shell.cmd -defterm -here -no-start -ucrt64`.

甚至 `.cmd` 还支持使用 `-shell zsh` 这样的选项来指定启动的 shell。*不过我不会用，因为会让配置很难找。*

## 参考资料

- [Terminals - MSYS2](https://www.msys2.org/docs/terminals/)
- [Arch Linux 手册](https://man.archlinux.org/)