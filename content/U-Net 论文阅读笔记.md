[[1505.04597] U-Net: Convolutional Networks for Biomedical Image Segmentation](https://arxiv.org/abs/1505.04597)

## 开篇吐槽
这么巧，unet也是2015年5月的——跟YOLO同一个月发啊www。

还有怎么那么多缩写。`i.e.`、`et al.`、`e.g.` ——不知道啊我只知道`etc.`。谁来救救我喂！

作者是 Olaf Ronneberger, Philipp Fischer, and Thomas Brox.

## Abstract

当时的背景是这样的——「大家对于『一个成功的神经网络需要成千上万的样本』这点有着共同的赞同」

所以在这篇论文里，他们提出了一种能够更加有效地使用标签数据的新网络和新训练策略。他们的结构由一条用来捕获上下文的压缩路径和对称的扩展路径组成。（这里还说了一个 **that enable precise localization** 不懂指的是什么意思）

作者拿出了一个可以端到端训练的网络，并且这个网络只用了很少的图片训练就能表现出非常好的性能，在ISBI语义分割的某个挑战中打败了当时最强的方法（滑动窗口+卷积网络）    *没读懂，反正知道很厉害就对了*

同时这个新网络也比原来的老网络有着更快的运行速度

## Introduction
深度卷积网络很好用。但是深度卷积网络也是有极限的——因数据集的大小和设计的网络大小而受制。有人开了个头之后，越来越大的数据集、越来越深的网络都被陆续推出。

典型的卷积网络执行的图像分类任务都是给一张图片一个类标签。但是呢，在某些领域，比如说生物图像处理领域，所需要的是精确到像素级别的分类。并且，在生物医学领域想要搞到成千上万的训练图几乎是不可能的。

	First, this network can localize. Secondly, the training data in terms
	of patches is much larger than the number of training images. The resulting
	network won the EM segmentation challenge at ISBI 2012 by a large margin.
	Obviously, the strategy in Ciresan et al. [1] has two drawbacks. First, it
	is quite slow because the network must be run separately for each patch, and
	there is a lot of redundancy due to overlapping patches. Secondly, there is a
	trade-off between localization accuracy and the use of context. Larger patches
	require more max-pooling layers that reduce the localization accuracy, while
	small patches allow the network to see only little context. More recent approches proposed a classifier output that takes into account the features from
	multiple layers. Good localization and the use of context are possible at the
	same time.

随后就有人使用了滑动窗口+卷积网络来进行像素级别的分类。*（此处没读懂）*

这个网络有两个缺点：速度慢，在定位的时候没有很好的利用图片上下文（也就是局部的图片信息，因为用了池化层，导致全局信息不能和局部信息连接，同时局部信息也不能和全局信息连接）

