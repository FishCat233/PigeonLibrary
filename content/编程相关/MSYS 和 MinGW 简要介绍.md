---
created: "2025-11-12"
updated: "2025-11-12"
---
[MinGW 和 MSYS2 介绍 - 知乎](https://zhuanlan.zhihu.com/p/715975886)

## 省流
MSYS2适用于需要在Windows上编译和运行Unix/Linux程序的场景，MinGW-w64适用于编译Windows本地应用程序的场景，Cygwin适用于需要最完整的Linux/Unix环境的场景。
## MinGW
Minimalist GNU for Windows 是用于 gnu 开发的最小 windows 开发环境

MinGW 有完整的 linux 编译工具链和库，方便进行跨平台开发和移植项目。

## MSYS

Minimal SYStem 提供了完整的开发环境（包括 类似 linux shell 的环境）,

MSYS2 基于 MinGW-w64 平台进行开发，提供了更为完整的环境，包括 gcc make gdb git 等各种工具。

MSYS2 可以用 pacman 直接装包。

## Cygwin

Cygwin 是兼容层，能够将 unix 程序编译成 windows 本地代码。