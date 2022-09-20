const cow_skin = cc.Class({
    name:"cow_skin",
    properties: {
        cows:{
            default:[],
            type:[cc.SpriteFrame]
        }
    }
});


cc.Class({
    extends: cc.Component,

    properties: {
        cow_sets:{
            default:[],
            type:[cow_skin]
        }
    },

    // use this for initialization
    onLoad: function () {
        this.intervalTime = 0
        this.randomType = Math.floor(Math.random()*3)
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.intervalTime += dt
        let index = Math.floor(this.intervalTime / 0.2)
        index = index % 3
        
        let cowSet = this.cow_sets[this.randomType]
        let sprite = this.node.getComponent(cc.Sprite)
        sprite.spriteFrame = cowSet.cows[index]
        
    },
    
    runCallback:function() {
        this.randomType = Math.floor(Math.random()*3)
    }
});
