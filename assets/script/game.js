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
        }
    },

    // use this for initialization
    onLoad: function () {

    },

    onCaptureClickk:function(event, customEventData){
        this.rope_node.active = true
        this.rope_node.setSiblingIndex(100)
        this.rope_node.y = -480
        
        const up = cc.moveTo(0.5, this.rope_node.x,  -200)
        
        
        // 判定结果
        let result = cc.callFunc(function(){
            let currentX = this.cow_node.x
            if (currentX > -100 && currentX < 100) {
                cc.log("捕捉成功")
                
                // 替换rope_node
                let ropeType = this.cow_node.getComponent("cow").randomType + 1
                cc.log(ropeType)
                this.rope_node.getComponent(cc.Sprite).spriteFrame = this.rope_image[ropeType]
                
                // 移除正在奔跑的牛儿
                let bgNode = this.node.getChildByName("BgSprite")
                bgNode.removeChild(this.cow_node)
                
                // 生成新的牛节点
                this.cow_node = cc.instantiate(this.cow_prefab)
                this.cow_node.y = 0
                bgNode.addChild(this.cow_node)
            } else {
                cc.log("捕捉失败")
            }
        }, this)
        
        // 绳子收回来
        let down = cc.moveTo(0.5, this.rope_node.x, -750)
        
        let finish = cc.callFunc(function(){
            this.rope_node.getComponent(cc.Sprite).spriteFrame = this.rope_image[0]
        },this)
        let sequence = cc.sequence(up, result, down,finish)
        this.rope_node.runAction(sequence)
    }
});
