simple-snap
=============

A snap extension for simple-dragdrop

###使用方法:
首先，需要在页面里引用相关脚本:
 ```
 <script type="text/javascript" src="path/to/jquery.min.js"></script>
 <script type="text/javascript" src="path/to/module.js"></script>
 <script type="text/javascript" src="path/to/dragdrop.js"></script>
 <script type="text/javascript" src="path/to/snap.js"></script>
```
实例化
```
simple.dragdrop({
    draggable: '.ball',
});
```
####初始化选项

__el__

可选，dragdrop的容器元素，默认为document（dragdrop对象会绑定到el上）。

__draggable__

必选，可以被drag的元素的选择符selector string

__droppable__

必选，可以被drop的元素的选择符selector string

__helper__

可选，拖拽的helper元素，可以是Dom/function，如果为空则为原元素。

__placeholder__

可选，开始拖动之后被拖拽元素会隐藏，显示placeholder，可以是Dom/function，如果为空，则是一个空白的占位元素

__cursorPosition__

可选，确定helper的相对于鼠标的位置，默认为'auto'，还可以为'center'（中心）, 'cornor'（左上角）

__cursorOffset__

可选，对helper位置进行微调，需要传入top以及left

__axis__

可选，拖拽的方向，默认为'both', 可以为'x', 'y'

__align__

可选，是否产生对齐，默认为true

__alignOffset__

可选，发生对齐的最大误差，默认为5

__range__

可选，两个物体产生对齐的最大距离，默认为100

#### 方法

__destroy()__

销毁dragdrop对象，还原初始环境

#### 事件

__dragstart__ opts: dragging, helper, placeholder

当拖拽发生时触发

__dragenter__ opts: dragging, target, helper, placeholder

当被拖拽元素进入可以放置区域时触发

__dragleave__ opts: dragging, target, helper, placeholder

当被拖拽元素离开可以放置区域时触发

__drag__ opts: dragging, helper, placeholder

被拖拽的时候，持续触发

__before-dragend__ opts: dragging, helper, placeholder

当拖拽结束前触发，此时，helper以及placeholder都没有被移除

__dragend__ opts: dragging

当拖拽结束的时候触发，此时，helper以及placeholder已经被移除

__drop__ opts: dragging, target

当拖拽元素放置到可放置区域时触发

__destroy__ 

当组件销毁时触发
