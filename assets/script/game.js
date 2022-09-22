cc.Class({
    extends: cc.Component,

    properties: {
        rope_node:{
            default:null,
            type:cc.Node
        },
        cow_node:{
            default:null,
            type:cc.Node
        },
        rope_image:{
            default:[],
            type:cc.SpriteFrame
        },
        cow_prefab:{
            default:null,
            type:cc.Prefab
        },
        timeLeft:{
            default:60,
            type:Number
        }
    },

    // use this for initialization
    onLoad: function () {
        this.success = false
        this.scoreNum = 0
    },
    
    start(){
        let countDownLabel = cc.find("Canvas/BgSprite/timeLabel/timeNum").getComponent(cc.Label);
        countDownLabel.string = this.timeLeft.toString() + " s";
        this.schedule(function () {
            this.timeLeft --;
            countDownLabel.string = this.timeLeft + " s";
            if (this.timeLeft == 0) {
                cc.log("游戏结束！");
                // 获取弹窗节点
                let resultNode = cc.find("Canvas/BgSprite/result");
                // 获取title和content两个节点
                let titleNode = resultNode.getChildByName("title");
                let contentNode = resultNode.getChildByName("content");
                // 展示分数
                titleNode.getComponent(cc.Label).string = "最终得分 " + this.scoreNum;
                // 获取组件
                let contentLabel = contentNode.getComponent(cc.Label);
                switch (true) {
                    case this.scoreNum <= 3:
                        contentLabel.string = "套牛青铜";
                        break;
                    case this.scoreNum < 6:
                        contentLabel.string = "套牛高手";
                        break;
                    case this.scoreNum >= 6:
                        contentLabel.string = "套牛王者";
                        break;

                }
                resultNode.active = true;
                cc.director.pause();

            }

        },1);
    },

    onCaptureClick:function(event, customEventData){
        this.rope_node.active = true
        this.rope_node.setSiblingIndex(100)
        this.rope_node.y = -480
        
        const up = cc.moveTo(0.5, this.rope_node.x,  -200)
        
        
        // 判定结果
        let result = cc.callFunc(function(){
            let currentX = this.cow_node.x
            if (currentX > -100 && currentX < 100) {
                cc.log("捕捉成功")
                // 移除正在奔跑的牛儿
                let bgNode = this.node.getChildByName("BgSprite")
                bgNode.removeChild(this.cow_node)
                
                // 替换rope_node
                let ropeType = this.cow_node.getComponent("cow").randomType + 1
                cc.log("result: ", this.cow_node.getComponent("cow").randomType)

                this.rope_node.getComponent(cc.Sprite).spriteFrame = this.rope_image[ropeType]
                

                // 生成新的牛节点
                this.cow_node = cc.instantiate(this.cow_prefab)
                this.cow_node.y = 0
                bgNode.addChild(this.cow_node)
                this.success = true
                this.scoreNum++
                this.timeLeft += 10 // 套中一个加10s
            } else {
                cc.log("捕捉失败")
                this.success = false
            }
        }, this)
        
        // 绳子收回来
        let down = cc.moveTo(0.5, this.rope_node.x, -750)
        
        let finish = cc.callFunc(function(){
            this.rope_node.getComponent(cc.Sprite).spriteFrame = this.rope_image[0]
            if (this.success) {
                let scoreLabel = cc.find("Canvas/BgSprite/scoreLabel/scoreNum").getComponent(cc.Label)
                scoreLabel.string = this.scoreNum.toString()
            }
        },this)
        let sequence = cc.sequence(up, result, down, finish)
        this.rope_node.runAction(sequence)
    },
    // 关闭按钮，继续游戏
    closeBtn() {
        cc.log("继续游戏");
        cc.director.resume();
        cc.director.loadScene("main");
    }
});
