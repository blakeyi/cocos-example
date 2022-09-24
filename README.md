# 1 背景
第一次尝试用cocos写小游戏, 这里记录下基本的知识点总结和踩的坑
[黑马课程](https://www.bilibili.com/video/BV1Uy4y1m7fx?p=1&vd_source=988163f0a693a7729ffdceb85af9c854)

这个课程比较基础,而且用的版本比较老了,如果用最新版本的cocos是不行的, 因为最新的cocos creator只能使用ts, 所以这也是为什么我这里有js(creator v1.5.5)和ts(creator v3.6.0)两个版本的


# 2 基础知识

## 2.1
cocos为组件化开发,在实际的使用过程中感觉还是比较容易上手的,基本结构的话就是 Scene(场景) -> Node(节点) -> Component(组件), 组件是需要挂载在node下面的, 而node节点像是链表一样, 层次递进,可以查询子节点

## 2.2
主要开发是在assets目录下,介绍如下
- res目录(资源,图片,音频,字体等等)
- scene(存放场景文件)
- script(控制资源和逻辑) 注意script下的脚本其实也算是组件,需要添加到node节点上
 
## 2.3
脚本内字段和界面上节点和组件的绑定, 比如可以在脚本内定义一些变量, 变量类型可以为Node 和component中的各种类型, 然后在界面上把对应资源拖到右侧属性检查器界面的变量里就行, 脚本挂载在哪个节点, this.node就为哪个节点


# 3 踩坑

- js版的抓住的牛和拉下来的牛会不一致
- js和ts的api变化比较大, 主要是js中的runCallback和moveTo等移动api在ts中被tween替代了, 另外就是对节点暴露属性的方式不太一样
