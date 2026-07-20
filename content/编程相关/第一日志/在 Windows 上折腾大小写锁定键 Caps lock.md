---
created: "2026-07-20"
updated: "2026-07-20"
---
现在要来折腾键盘了。

我在某篇 Emacs 教程里面看到有人吐槽 `Caps Lock` 平时没什么用，被这独特的观点惊讶了一下，然后仔细一想还真是：长篇的大写字母很少会需要打，而单词的大写字母一般都会使用 `Shift` 去打，总的来看 Caps lock 确实没有什么是高频使用的，还占着最好碰到的位置。

于是就怎么再利用这个没什么用的按键，我开始倒腾键盘。

## 思路

Caps lock 虽然很冷门，但是 **把思路逆转过来吧**，这会成为它的优势：在`Alt` 键成为快捷键冲突重灾区，是个程序就注册一大坨，而 `windows` 键又被微软系占领得满满当当注销不了，`ctrl` 键更是成了各种程序心头好的时候，Caps lock 的存在如同一片净土，不论是单按还是组合键，Caps lock 都不会冲突。

但也只是想想，实际上 Caps lock 因为不是特殊键而导致拿去打组合键的结果是不会被拦截，比如说 `Caps lock + l` 打出的话，`l` 是真的会被打出来的，并不能像 `alt + l` 那样拦截住。

不过天无绝人之路，正如通往新大陆的人们不是游泳过去而是造了艘船开过去一样，在我研究下，通过大名鼎鼎的 AutoHotKey 也就是 AHK 可以让 Caps lock 变成能成为组合键一样的存在。

## 键位设置

既然手握新的神键 Caps lock，当然是设置一些常用但是又很尴尬的按键来改变游戏规则！

我做的第一件事就是把 Caps lock 单击映射成了 ctrl space ——没错，一键切换输入法。虽然肌肉记忆来说按两个键已经不成什么问题了，但是对我来说 ctrl 按多了手指头还是会酸的。

接着便是组合键。

平时经常在必要时候按不到 home / end？所以我把 caps + a 和 caps + e 映射成了 home 和 end

平时找小箭头很麻烦，笔记本用半截上下箭头？我把 caps + h/j/k/l 映射成了 左下上右 箭头。

可能有人察觉到了，你这键位怎么有股味？——没错，我就是参考了 emacs 和 vim 的键位去弄了一个，下面是 AutoHotKey 的脚本。

`vimacows.ahs`

```ahs
#Requires AutoHotkey v2.0
#SingleInstance Force

A_MenuMaskKey := "vkE8" ; 防止 Alt 菜单干扰

; 1. 彻底死死拦截物理 CapsLock 的按下事件，不向系统和 Rime 透露半点风声
SetCapsLockState "AlwaysOff"
*CapsLock::Return

; 2. 在物理 CapsLock 释放时进行判定
*CapsLock Up:: {
    ; 如果按住期间没有触发过任何其他按键（说明是纯粹的短按）
    if (A_PriorKey = "CapsLock") {
        Send "^{Space}"  ; 向系统发送 Ctrl + Space，由 Rime 精准接盘切换中英
    }
}

; ==============================================================================
; 【终极导航层】
; * 前缀表示通配任意修饰键（Ctrl/Shift/Alt）
; {Blind} 表示发送按键时，不要释放当前已经按下的修饰键，原封不动传过去
; ==============================================================================
#HotIf GetKeyState("CapsLock", "P")

*a::Send "{Blind}{Home}"
*e::Send "{Blind}{End}"
*s::Send "{Blind}{Insert}"
*h::Send "{Blind}{Left}"
*j::Send "{Blind}{Down}"
*k::Send "{Blind}{Up}"
*l::Send "{Blind}{Right}"

#HotIf
```

## 结尾

懒得写尾巴了，一套折腾下来感觉还挺爽的，虽然 home / end 这两个功能还是没怎么用，但是左右箭头简直能帮上大忙，现在两只手基本上都可以在 26 字母上了，而不是去翻我的小箭头。

