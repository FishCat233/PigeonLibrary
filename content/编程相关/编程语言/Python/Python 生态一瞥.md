---
created: 2026-03-27
updated: 2026-03-27
---
## 语言标准
*准确说，Python 是一种语言规范。*

Python 标准由 Python 标准委员会（PEP 流程）维护。版本号很好区分：`python 3.7`、`python 3.12`、`python 3.14` 等。

通常，Python 的新功能通过 **Python 增强提案（PEP）** 提出、讨论并落地。比如：
- PEP 8：代码风格指南
- PEP 484：类型提示
- PEP 572：海象运算符 `:=`
- PEP 703：移除 GIL（正在进行）

*Python 3.14 王朝了。*

## 解释器

Python 是一种语言规范，不同的解释器都实现了这个规范。

常见的 Python 实现如下：

- CPython：C 语言实现的 Python 解释器，能调用 C 扩展库。**这是绝大多数情况下讨论所指的解释器**。CPython 将 Python 源码编译成字节码（`.pyc`），由虚拟机执行。
- PyPy：通过 JIT（即时编译）技术，将 Python 代码在运行时编译成机器码，适合长时间运行的 CPU 密集型程序，但对 C 扩展兼容性稍差。
- Jython：运行在 JVM 上，可直接调用 Java 类库，适合与 Java 生态集成。
- IronPython：运行在 .NET 上，与 C# 互操作。
- MicroPython：精简实现，专为微控制器和嵌入式设备设计。
- RustPython：原神，启动。

一般开发直接用 CPython 就够了，除非有特殊生态或性能需求。

## 包管理

- pip：官方包管理工具，从 PyPI（Python Package Index）安装包。
- conda：跨语言包管理器，尤其在数据科学领域流行，可管理非 Python 依赖（如 C 库）。
- uv：新兴的极速工具链（Rust 编写），可替代 pip、virtualenv、pip-tools 等，速度极快，支持项目依赖和工作区管理。

日常开发用 pip + venv 够用，数据科学用户 conda 够用，追求速度和现代化体验或者不懂选什么可以尝试 uv。

*大赞 uv。*

## 格式化器
*我说版本答案是 ruff*

- black：号称“不妥协的代码格式化器”，自动统一风格。
- ruff：用 Rust 编写的极速 linter + 格式化器，可替代 flake8、isort、black 等，集成了大量规则。

*评价是 black 太死板了，ruff 买格式化器送代码提示是神，版本答案是 ruff 我说。*

## 项目和依赖管理
*可以用地狱来形容。还是那句，版本答案是 uv!*

Python 在这方面的完善速度能和 C++ 现代化的速度又得一拼（都很慢！）。

- 古法：`pip install -r requirements.txt` + 手动 `venv`。优点是简单直接，缺点是**无法锁定传递依赖的精确版本**（除非用 `pip freeze` 生成 `requirements.txt`），也没有项目元数据标准。***（其实锁定也没用，如果版本撤回了就找不到兼容的版本了嘻嘻）***
- pyproject.toml：PEP 518 / PEP 621 定义的元数据标准，现在已成为主流。许多现代工具都围绕它工作。
- 现代工具链：
    - poetry：较早的统一工具，集依赖解析、构建、发布于一体，使用 `pyproject.toml` 和 `poetry.lock`。
    - pdm：PEP 582 的实践者，支持无虚拟环境模式。
    - uv：作为新一代工具链，可以一键完成创建虚拟环境、添加依赖、锁定版本、运行脚本等，速度极快，且兼容 pip 和 requirements.txt。


*事到如今还是推 uv 感觉已经让人难以相信，但是 uv 确实是现在最通用又完美的方案之一了。反正不论如何尽量避免用 `requirements.txt` 就好。*

## 环境管理

一般正常一个项目都专门配一个 Python 虚拟环境。否则不同的 Python 版本或者库版本就会产生冲突。

- venv（Python 内置）：轻量级虚拟环境，最常用。
- virtualenv：venv 的前身，功能更丰富。
- conda：独立于 Python 的环境管理，可创建隔离的 Python 版本和包集合。
- uv venv：uv 内置的虚拟环境创建，速度极快。

避免全局污染，做好环境管理。

*版本答案依旧是 uv。*

