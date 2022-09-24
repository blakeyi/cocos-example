import { _decorator, Component, Node, SpriteFrame, Prefab, find, Label, log, director, Sprite, Tween, tween, Vec2, Vec3, instantiate, AudioSource  } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('game')
export class game extends Component {
    @property({type:Node})
    private rope_node = null

    @property({type:Node})
    private cow_node = null

    @property({type:[SpriteFrame]})
    private rope_image = []

    @property({type:Prefab})
    private cow_prefab = null

    @property({type:Number})
    private time_left = 60

    private success:boolean = false
    private score_number = 0


    start() {
        let countDownLabel = find("Canvas/BgSprite/Time/Number").getComponent(Label);
        countDownLabel.string = this.time_left.toString() + " s";
        this.schedule(function () {
            this.time_left --;
            countDownLabel.string = this.time_left + " s";
            if (this.time_left == 0) {
                log("游戏结束！");
                // 获取弹窗节点
                let resultNode = find("Canvas/BgSprite/Result");
                // 获取title和content两个节点
                let titleNode = resultNode.getChildByName("Title");
                let contentNode = resultNode.getChildByName("Content");
                // 展示分数
                titleNode.getComponent(Label).string = "最终得分 " + this.score_number;
                // 获取组件
                let contentLabel = contentNode.getComponent(Label);
                switch (true) {
                    case this.score_number <= 10:
                        contentLabel.string = "套牛青铜";
                        break;
                    case this.score_number < 30:
                        contentLabel.string = "套牛高手";
                        break;
                    case this.score_number >= 60:
                        contentLabel.string = "套牛王者";
                        break;

                }
                // 移除正在奔跑的牛儿
                let bgNode = this.node.getChildByName("BgSprite")
                bgNode.removeChild(this.cow_node)
                resultNode.active = true;

                director.pause();

            }

        },1);
    }

    update(deltaTime: number) {
        
    }

    onCaptureClick(event, customEventData){
        log("onCaptureClick")
        log("pre:", this.rope_node)
        log("pre1:", this.cow_node)
        this.rope_node.active = true
        let curPosition = this.rope_node.getPosition()
        this.rope_node.setPosition(curPosition.x, -460, 0)
        this.rope_node.setSiblingIndex(100)
        log("now:", this.rope_node.getPosition())
        
        const t = tween(this.rope_node)
        t.to(0.5, {position:new Vec3(curPosition.x, -156, 0)})

        // 判定结果
        let that = this
        t.call(function(){
            log(that)
            let currentX = that.cow_node.getPosition().x
            log("currentX:", currentX)
            if (currentX > -100 && currentX < 100) {
                log("捕捉成功")
                // 播放音效
                let audio = find("Canvas/BgSprite/Gain").getComponent(AudioSource)
                audio.play()

                // 移除正在奔跑的牛儿
                let bgNode = that.node.getChildByName("BgSprite")
                bgNode.removeChild(that.cow_node)
                
                // 替换rope_node
                let ropeType = that.cow_node.getComponent("cow").randomType + 1
                that.rope_node.getComponent(Sprite).spriteFrame = that.rope_image[ropeType]
                
                // 生成新的牛节点
                that.cow_node = instantiate(that.cow_prefab)
                that.cow_node.y = 0
                bgNode.addChild(that.cow_node)
                that.success = true
                that.score_number += ropeType
                that.time_left += ropeType // 套中一个加10s
            } else {
                log("捕捉失败")
                that.success = false
            }
        })

        t.to(0.5, {position:new Vec3(curPosition.x, -460, 0)})

        t.call(function(){
            that.rope_node.getComponent(Sprite).spriteFrame = that.rope_image[0]
            if (that.success) {
                let scoreLabel = find("Canvas/BgSprite/Score/Number").getComponent(Label)
                scoreLabel.string = that.score_number.toString()
            }
            that.rope_node.active = false
        })

    
        t.start()
    }

    // 关闭按钮，继续游戏
    closeBtn() {
        log("继续游戏");
        director.resume();
        director.loadScene("main");
    }
}

