---
created: 2026-07-29
updated: 2026-07-29
---
最近准备认真阅读一下 Unity 用户手册，以加深对 Unity 的了解。由于文档本身是非线性的，因此本文也是非线性的，我会按主题或者层次进行整组。

## 基础

### 绑在战车上

首先，虽然用户手册没有写，但是我们必然需要知道的是，Unity 在代码上是侵入性的框架，就像 IOC（控制反转）一样，我们写的代码由 Unity 负责调用，我们不知道 Unity 会做什么，代码的掌控权在 Unity 身上。

或者更加通俗地说，我们被绑在了 Unity 的战车上，必须按照 Unity 的开法去开车，这是使用侵入性代码框架导致的必然结果。

但不幸的是，我认为 Unity 作为一个侵入性框架，并没有完全做到抽象隔离，在涉及一些边角的时候，我们往往需要相当可观的隐藏知识，这是 Unity 的设计败笔。最典型的例如 Unity 的组件式架构，OnStart/OnUpdate 等方法需要对底层游戏循环有必要的了解，需要知道引擎会不断在一个大循环中执行代码，甚至在部分时刻，我们还要理解「帧」这个概念，知道更新时机……甚至连销毁时，也可能因为「假空」问题而犯错误——假空背后又暴露了 Unity 的内部架构和 C#/C++ 的内存管理。

因此，了解 Unity 的思想和架构对使用 Unity 来说重要，尽管这并不能改变其抽象泄露的事实，但可以让我们在开发建议下避免直接触碰到那恐怖的深渊边界，或者因为设计不容而加剧自身工作量。

### GameObject 与 组件架构

[Create Gameplay - Unity 手册](https://docs.unity3d.com/cn/2022.3/Manual/CreatingGameplay.html)

Unity 分出了场景、组件、预制体这几个概念，与 godot 那种统一成节点的思想不太相同，尤其是组件。

Unity 有很多组件，而 GameObject（以下简称 GO）是组件的容器——这本质上是一个经典的组件架构（可以参考 [游戏设计模式：组件模式](https://gpp.tkchu.me/component.html#%E7%A4%BA%E4%BE%8B%E4%BB%A3%E7%A0%81)）。例如，GO 本身只有 Transform 属性（虽然 Unity 管这叫组件，但是从组件架构看本质上是将高频常用的共享属性强行绑定到 GO 上了，即便是用不到 Transform 的 GO 也要持有 GO）。

## 有用的链接
- [Unity User Manual 2022.3 (LTS) - Unity 手册](https://docs.unity3d.com/cn/2022.3/Manual/UnityManual.html)

