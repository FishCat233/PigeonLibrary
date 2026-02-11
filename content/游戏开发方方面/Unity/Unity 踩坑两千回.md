---
created: 2025-10-01
updated: 2026-02-11
---
慢慢踩吧，边踩边记。

## 第一回 Unity 2022.3.62fc1c1 与 Rider 2025.2
Cinemachine Virtual Camera 的 inspector 打开就能报错。触发原因是用了 Rider 2025.2 作为 External Tools

## 【已解决】第二回 Inspector 不显示变量

```cs
    [Header("重力缩放")]
    public float onGroundGravityScale = 1.0f;
    public float jumpTopGravityScale = 0.7f;
    public float jumpTopVelocityRange = 0.2f;
    public float fallGravityScale = 1.2f;
```

然后你就会发现后面的变量都不会在 Inspector 看见了，除非你 Inspector 切成 Debug mode 然后又切回 Normal mode。

后面调来调去，各种姿势和猜测，最后发现，**把 Script 脚本组件删了重新装就行了，如果还不行，就改名后再删再装**。

## 【已解决】第三回 RequireComponent 属性不支持3个以上的组件

```csharp
[RequireComponent(typeof(Collider2D),typeof(Rigidbody2D),typeof(Transform),typeof(CustomComponent))]
public class SomeComponent : MonoBehaviour {
}
```

这样是不行的，因为 `RequireComponent` 的重载最多只能塞三个 `type`。

在写的时候这个属性的重载很神秘，可能是为了兼容，总之重载只能支持一到三个 `type` .

如果要用更多的 `type` ，可以这么写

```csharp
[RequireComponent(typeof(Collider2D)]
[RequireComponent(typeof(Rigidbody2D)]
[RequireComponent(typeof(Transform)]
[RequireComponent(typeof(CustomComponent)]
public class SomeComponent : MonoBehaviour {
}
```

这样就可以了。

*上面的重载限制数量让人以为有什么架构问题不能重复用属性修饰，结果实际上可以重复用属性修饰，只能说误解人的一坨\*\*。*

## 【已解决】第四回 在脚本中引用 TextMeshPro 的 Text

不是引用 `Text` 也不是 `TextMeshPro` 而是 `TextMeshProUGUI`

```csharp
using TMPro;

TextMeshProUGUI currentTurnText
```

完。