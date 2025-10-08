## GameObject
**GameObject 是 Unity 的基本要素，也是主要的操作对象**。一个GameObject下面可以挂很多个Component来实现将不同功能汇聚在一起，组成一个概念上的「物体」的效果。

## Component
组件是物体功能的拆散和单一职责化。也就是说组件是为了模块化和可复用化而产生。

GameObject是组件的容器，也是GameObject的具体功能实现支撑。

## Transform
可以说是每一个 Gameobject 都会带的组件了。

Transform则描述 Gameobject 的位置、旋转和缩放（也就是 Inspector 上面可以看到的几个字段）

其实不是很懂为什么要抽离出一个 Transform 组件（也许是为了强化Unity「组件-对象」的概念，防止例外），感觉其实更应该是 GameObject 的公开字段。可以肯定的是，引擎全部功能都依赖这个组件，并且将这个组件从GameObject上删除。
