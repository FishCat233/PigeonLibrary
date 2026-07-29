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

Unity 有很多组件，而 GameObject（以下简称 GO）是组件的容器——这本质上是一个经典的组件架构（可以参考 [游戏设计模式：组件模式](https://gpp.tkchu.me/component.html#%E7%A4%BA%E4%BE%8B%E4%BB%A3%E7%A0%81)）。例如，Unity 手册说 Transform 组件不能被移除，并且必然存在——用组件架构视角来说，Transform 实质上是 GO 本身的属性，而不是外部添加的组件（因为组件是可选的），对于那些不关心 Transform 的 GO 来说，他们依然要承受 Transform 存在的开销。

引入组件架构的原因在于解耦代码，通过将代码按领域或者工作内容切分成组件，再用组件组合来成为一个整体，从而降低在修改单个组件时需要的知识。因而对于我们自定的组件来说，也应该遵循这个原则，要么选择一个 all in one 的组件，要么选择能拆分干净的小组件团，然而对 Unity 来说，一个 all in one 的组件更划算，因为一个 GO 如果有两个 MonoBehaviour，那么 10 个 GO 就会有 20 个组件，加上 Unity 抽象出组件需要的开销，实际上这会消耗不少性能。

这引出了一条技巧： **尽可能使用单一 MonoBehaviour。如果 MonoBehaviour 需要拆分，优先考虑用 C# 类组合而不是拆分多 MonoBehaviour。**

### 预制件

在预制体一章，Unity 用户手册用的词是 **pack** 和 **unpack** 来形容把一个 GO 变为 Prefab 以及把 Prefab 解关联成为 GO。

这个用词 pack 和 unpack 看起来有点莫名其妙。综合 scene 和 prefab 本质都是文件数据，所以我个人猜测去理解地说，pack 指的是把 GO（本质是 scene 文件下的信息数据）抽离出去成为单个 Prefab 文件，而原来的地方则保留一个引用数据。unpack 则是将 Prefab 数据重新嵌入进 scene 的数据中。

至少我觉得，从文件角度去解释说，pack 和 unpack 这个用词会显得更加自然。



## 有用的链接
- [Unity User Manual 2022.3 (LTS) - Unity 手册](https://docs.unity3d.com/cn/2022.3/Manual/UnityManual.html)

