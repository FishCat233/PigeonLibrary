根据神经网络「拟合」的数学本质，随着网络层数的增加，网络的效果应当越来越好，即损失函数会逐渐下降。

但是在现实世界中，由于计算机的物理结构，网络会因为层数的增加产生梯度消失问题。为了解决梯度消失，人们提出了很多技巧。残差神经网络就是其中之一。

残差神经网络结构十分简单，在前向传播的基础上增加跃层连接(Skip Connection)即可。并且这种简单的结构被证明有效改善了深度神经网络的性能。

从参考资料中，我们可以从公式角度解释为什么残差网络有效。

$$
\frac{\partial L}{\partial X_{Aout}} = \frac{\partial L}{\partial X_{Din}}\frac{\partial X_{Din}}{\partial X_{Aout}}
$$
$$而 X_{Din} = X_{Aout}+C(B(X_{Aout}))$$
$$所以 \frac{\partial L}{\partial X_{Aout}} = \frac{\partial L}{\partial X_{Din}}\left( 1+\frac{\partial X_{Din}}{\partial X_{C}} \frac{\partial X_{C}}{\partial X_{B}} \frac{\partial X_{B}}{\partial X_{Aout}} \right)$$

可见，就算在后向传播的时候C-B-A的梯度衰减，但D处的梯度会直接传递到A，所以增强了衰减的
梯度。能够有效增加网络性能，但因为仍是连乘结构，因此依然会受到梯度衰减的影响。

---
## 参考资料
[为什么残差网络(Residual Block)看似简单却极为有效？ - 知乎](https://zhuanlan.zhihu.com/p/123742394)