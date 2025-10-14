---
created: 2025-10-08
updated: 2025-10-08
---
Unity 有自己的物理引擎，虽然可以不用。

表现为当你挂载 Rigidbody 后，Unity 的物理引擎就会通过 Rigidbody 来控制 Transform 组件（这是 Rigidbody 组件的功能）。还有不少物理引擎的特性都与 Rigidbody 有关比如说 `AddForce` 、`velocity` 这种概念。

如果要将 GameObject 加入物理引擎的控制目标，就需要 Rigidbody 或者相关物理引擎的组件。

总而言之，**这类组件就是包装了底层的物理引擎后的组件，其底层实现依赖于 Unity 的物理引擎**。

相似的还有 Physic Material、Collider