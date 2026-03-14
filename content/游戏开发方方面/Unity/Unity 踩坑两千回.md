---
created: 2025-10-01
updated: 2026-03-14
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

## 【已解决】第五回 C# 中的取余函数会保留负号

虽然跟 Unity 没太大关系，但是也算一个容易错的点吧（因为其他语言比如说Python的取余是不会保留负号的）

在写数组索引回绕的时候遇到了这个问题，解决办法是给计算的值加一个周期上去，这样就不会出现负数了。

完。

## 【已解决】第六回 R3(UniRx) 安装失败

跟着官方教程安装完后发现没有关于 Unity 相关的方法（比如说`AddTo(Component/GameObject)`，但是已经可以看见 Observable 和 Subscribe 之类的方法。

网上也没相关教程，只能自己摸索。琢磨了一会才注意到都是 Unity 相关的方法，所以所幸全部卸载重装然后关闭 Unity 重新打开项目 Play 再停止就解决了。

完。

## 【已解决】第七回 TMP 口口口口口口

在网上没找到解决办法（网上搜出来一大片 Static 静态生成中文字的，但是我用的是 Dynamic），最后在 AI 处找到了。

先从 TMP 字体导入开始列。简单的情况是字体本身就不支持中文，当然这坑比较好想到，按照网上稍微找找都能找到的一大堆教程导入字体就行，包括导入之后 Fallback 字体也一起设置了。

而麻烦一点的就是我这个 WARNING

```
The character with Unicode value \u5668 was not found in the [fusion-pixel-12px-proportional-zh_hans SDF] font asset or any potential fallbacks. It was replaced by Unicode character \u25A1 in text object [Text (TMP)].
```

想了一阵子没想明白怎么回事，字体本身在其他地方是没有问题的，而玄学的还是部分客户端播放器能看到部分看不到（比如说A客户端能看到前半句，B能看到后半句，C看全是口口口，这还随缘来的），以为是中文字以及我之前安装字体操作问题（毕竟口口口也是 Unity 特色），直到后面发现连英文字母都能小概率口口口，给我整不会了。

调成 Static 也没用，依旧是口口口（可能因为没有在 TMP 生成器里面手动生成图集）。

最后还得是 AI 提醒，我才注意到字体资源文件还有 Altas Width 和 Altas Height 这种属性，把生成图集的尺寸调大就能塞下字体了，我还顺便勾上了 Multi Altas Texture，不过不知道有没有用，反正这么一通操作之后就不口口口了。

*我真\*\*服了这个\*\*生成图集满了都不提示一下给人想怎么回事，谁能想到是图集大小问题。*

对中文字可能还是生成图集好用吧，动态生成还是太弱智了。

完。

## 【已解决】第八回 Rigidbody2D OnTriggerStay2D 移动时才触发

一个很莫名奇妙的设计。

表现为 OnTriggerStay2D 只有在区域内移动的时候才会触发，而在静止不动却不会触发——虽然都是在碰撞区域内。

原因是 Rigidbody2D 默认设置的 `Sleeping Mode` 是 `Start Awake`，如果不移动就不会检测碰撞了。

还是感觉莫名其妙，没看懂为什么这么设计。

完。

## 【已解决】第九回 URP 不鼓励写多 Pass

所以用 URP 的话直接写多 Pass 只会渲染第一个 Pass。

坑得一批，AI 也是一个两个全是\*\*问不出来。

完。

## 【已解决】第十回 Inspector 就是没法设置属性值为 0

很常见不过一般问题不大。通常常见于想要设置坐标为 0. 手动拖到了一个 `0.0xxxe-7` 之类的特别小的小数，这个时候 inspector 设置 0 就没办法成功修改数值。

很容易想到原因了……大概是 inspector 判定两个值一样就不修改了，而浮点数因为过于相近判定等于了。

一种解决办法就是 inspector 的输入框里直接把属性删空，然后失去焦距就会设置默认值，从而达到设置为 0 的目的。

完。

