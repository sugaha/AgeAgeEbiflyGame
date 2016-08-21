//thirdScene.js
//nextScene.js
var ThirdLayer = cc.Layer.extend({
    ctor: function() {
        this._super();

        var size = cc.director.getWinSize();

        //音楽再生エンジン
        audioEngine = cc.audioEngine;
        //bgm再生
        if (!audioEngine.isMusicPlaying()) {
          //audioEngine.playMusic("res/bgm_main.mp3", true);
          audioEngine.playMusic(res.umi2_mp3, true);
        }


                var OverBG = cc.Sprite.create(res.GOBG_png);
                OverBG.setPosition(size.width / 2, size.height /3.3);
                OverBG.setScale(1.3);
                this.addChild(OverBG, 0);

                var result = cc.Sprite.create(res.gameover_png);
                result.setPosition(size.width / 2, size.height /1.5);
                result.setScale(1.3);
                this.addChild(result, 0);

                var replay = cc.Sprite.create(res.replay_button_pressed_png);
                replay.setPosition(size.width / 2, size.height /3.3);
                replay.setScale(1.3);
                this.addChild(replay, 0);


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
        if (audioEngine.isMusicPlaying()) {
          audioEngine.stopMusic();
        }
    },
});

var thirdScean = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer3 = new ThirdLayer();
        this.addChild(layer3);
    }
});
