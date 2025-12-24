---
created: 2025-09-26
updated: 2025-12-24
---
Mono 和 IL2Cpp 是 Unity 实现跨平台使用的两种不同的技术，目的都是为了让游戏能够顺利的在不同平台运行。

## Mono

mono 是一个由Xamarin公司所主持的自由开放源码项目。是C# CLI 的一种实现，其主要由 C# 编译器、CLR虚拟机、核心类别程序库三个组件组成。

mono 实现跨平台的办法是这样的：Mono C# 编译器把代码编译成 CIL (中间语言)，然后通过CLR虚拟机（类似Java的JVM，虚拟机是可以跨平台运行的）来运行CIL，达到代码跨平台的效果。

```mermaid
flowchart LR
    A["开发者编写Unity C#代码<br/>(游戏业务逻辑)"] --> B["Mono C#编译器<br/>(核心组件1)"]
    B --> C["编译生成CIL中间语言<br/>(Common Intermediate Language)"]
    C --> D["不同平台的CLI虚拟机<br/>(核心组件2，适配Windows/Android/iOS等)"]
    D --> E["CLI虚拟机运行CIL代码<br/>(依赖Mono核心类别程序库/核心组件3)"]
    E --> F["最终效果：Unity游戏跨平台运行"]
    
    classDef coreComponent fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    class B,D,E coreComponent
    classDef endNode fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    class F endNode
```

## IL2CPP

