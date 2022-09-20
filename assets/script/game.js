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
            } else {
                cc.log("捕捉失败")
            }
        }, this)
        
        let sequence = cc.sequence(up, result)
        this.rope_node.runAction(sequence)
    }
});
