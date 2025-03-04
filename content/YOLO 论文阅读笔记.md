[[1506.02640v5] You Only Look Once: Unified, Real-Time Object Detection](https://arxiv.org/abs/1506.02640v5)

没想到yolo竟然是2015年的技术。

作者是Joseph Redmon、Santosh Divvala、Ross Girshick、Ali Farhadi
## Abstarct
Unified是说结构统一——一个网络就可以做到检测和分类。

YOLO很快，更快的速度换来的是更多的定位错误——但是很少定位到背景上。

有一定的开放性（比DPM和R-CNN更能表示图像）

## Conclusion
结构简单。可以直接在整张图上训练。检测和分类直接在一个损失函数上训练。Fast YOLO很快，模型推广性很好。