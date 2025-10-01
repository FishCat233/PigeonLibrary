## 第一回 Unity 2022.3.62fc1c1 与 Rider 2025.2
Cinemachine Virtual Camera 的 inspector 打开就能报错。触发原因是用了 Rider 2025.2 作为 External Tools

## 第二回 Header Attribute 与变量命名这块

```cs
    [Header("重力缩放")]
    public float onGroundGravityScale = 1.0f;
    public float jumpTopGravityScale = 0.7f;
    public float jumpTopVelocityRange = 0.2f;
    public float fallGravityScale = 1.2f;
```

然后你就会发现后面的变量都不会在 Inspector 看见了，除非你 Inspector 切成 Debug mode 然后又切回 Normal mode。

后面调来调去，发现是变量命名onGround有坑，on开头就有问题，改成Ground开头就没有。

```cs
    [Header("重力缩放")]
    public float GroundGravityScale = 1.0f;
    public float jumpTopGravityScale = 0.7f;
    public float jumpTopVelocityRange = 0.2f;
    public float fallGravityScale = 1.2f;
```

