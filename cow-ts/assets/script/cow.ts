import { _decorator, Component, Node, SpriteFrame, Sprite, log } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('cow_skin')
class cow_skin {
    @property({type:[SpriteFrame]})
    private cows = []
}


@ccclass('cow')
export class cow extends Component {
    // 属性定义
    @property({type: [cow_skin]})
    private cow_sets = []

    private intervalTime:number = 0
    private randomType:number = 0 // 通过randomType控制牛的种类

    start() {

    }

    onLoad() {
        this.intervalTime = 0
        this.randomType = Math.floor(Math.random() * 3)

    }

    update(dt: number) {
        this.intervalTime += dt
        let index = Math.floor(this.intervalTime / 0.2)
        index = index % 3
        let cowSet = this.cow_sets[this.randomType]
        let sprite = this.node.getComponent(Sprite)
        sprite.spriteFrame = cowSet.cows[index]
    }

    runCallback() {
        this.randomType = Math.floor(Math.random()*3)
    }
}

