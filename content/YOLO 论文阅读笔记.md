[[1506.02640v5] You Only Look Once: Unified, Real-Time Object Detection](https://arxiv.org/abs/1506.02640v5)

没想到yolo竟然是2015年的技术。

作者是Joseph Redmon、Santosh Divvala、Ross Girshick、Ali Farhadi
## Abstarct
Unified是说结构统一——一个网络就可以做到检测和分类。

YOLO很快，更快的速度换来的是更多的定位错误——但是很少定位到背景上。

有一定的开放性（比DPM和R-CNN更能表示图像）

## Introduction
	Current detection systems repurpose classifiers to per-
	form detection. To detect an object, these systems take a
	classifier for that object and evaluate it at various locations
	and scales in a test image. Systems like deformable parts
	models (DPM) use a sliding window approach where the
	classifier is run at evenly spaced locations over the entire
	image [10].
先前的目标检测有两种办法。一种是以**滑动窗口在均匀间隔上分类**来实现的DPM模型，另一种是以**区域启发算法（region proposal method）** 来实现的R-CNN。

YOLO采用了不同的思路：将目标检测任务看成回归问题，直接从图片像素上定位出边框和类别（而不是采用多个模型）。

## Unified Detection
*simultaneously adv.同时*

妈耶，这么简单，我竟然看懂了。

YOLO的设计是支持[[端到端学习：End To End Learning|端到端学习]]的，并且达到实时的同时还能获得高平均准确度。

YOLO的方法是这样的：

首先将输入图片切分成 $S \times S$ 网格。如果物体的中心落在网格内，则说**物体是落在网格内的**。

其次，对网格中每个单元格都预测$B$个边框和这些边框的可信度(Confidence)。可信度反应了边框中是否有物体（注意和类型无关）以及边框是否和实际的标签的边框相符合。通常将可信度定义为$Pr(Object)*IOU_{pred}^{truth}$。如果单元格没有物体，则可信度应该0。

每个边框可以用五个特征描述：$x,y,w,h$还有可信度。$x,y$代表框中心的坐标，$w,h$代表框的宽度和高度。可信度代表预测框和实际标签框的IOU。

此外，每个单元格还预测了C个类别的概率（分类器）$Pr(Class_i|Object)$。**这些概率都是基于单元格是否含有这个物体这一条件，而不是和上面预测的边框有关。**

在测试时，将连续的某类类别概率$Pr(Class_{i}|Object)$乘上边框的可信度预测$Pr(Object)*IOU_{pred}^{truth}$，可以得到：
$$Pr(Class_{i}|Object) * Pr(Object) * IOU^{truth}_{pred} = Pr(Class_{i}) * IOU^{truth}_{pred}$$

……

## Conclusion
结构简单。可以直接在整张图上训练。检测和分类直接在一个损失函数上训练。Fast YOLO很快，模型推广性很好。