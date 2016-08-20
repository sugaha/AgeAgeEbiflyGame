//thirdScene.js
//nextScene.js
var ThirdLayer = cc.Layer.extend({
    ctor: function() {
        this._super();

        var size = cc.director.getWinSize();

                var result = cc.Sprite.create(res.gameover_png);
                result.setPosition(size.width / 2, size.height /1.5);
                result.setScale(1.3);
                this.addChild(result, 0);

        var label = cc.LabelTTF.create("もう一度遊ぶ？", "Arial", 20);
        label.setPosition(size.width / 2, size.height / 3.5);
        this.addChild(label, 1);


        // タップイベントリスナーを登録する
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);

        return true;
    },

    onTouchBegan: function(touch, event) {
        return true;
    },
    onTouchMoved: function(touch, event) {},
    onTouchEnded: function(touch, event) {
        // 次のシーンに切り替える
        cc.director.runScene(new NextScene());
    },
});

var thirdScean = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer3 = new ThirdLayer();
        this.addChild(layer3);
    }
});
