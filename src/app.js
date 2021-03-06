//app.js

var size;

var mylabel;
//背景スクロールで追加した部分
var gameLayer;
var background;
var ceiling;
var land;
var rock_above;
var rock_under;
var zanki;
var score;

var scrollSpeed = 0.5;
var scoreText;
var poitText;
var point = 0;
var miss = 3;
//宇宙船で追加した部分　重力
var ship;
var gameGravity = -0.05;
//宇宙船を操作するで追加した部分 エンジンの推進力
var gameThrust = 0.1;
//パーティクル
var emitter;
var　 audioEngine;


var gameScene = cc.Layer.extend({

  onEnter: function() {
    this._super();

    gameLayer = new game();
    gameLayer.init();
    this.addChild(gameLayer);
    //音楽再生エンジン
    audioEngine = cc.audioEngine;
    //bgm再生
    if (!audioEngine.isMusicPlaying()) {
      //audioEngine.playMusic("res/bgm_main.mp3", true);
      audioEngine.playMusic(res.umi_mp3, true);
    }
  },

});


var game = cc.Layer.extend({
  init: function() {
    this._super();
    size = cc.director.getWinSize();

    //BGMと効果音のエンジンを追加

    //宇宙船を操作するで追加した部分
    cc.eventManager.addListener({
      event: cc.EventListener.MOUSE,
      onMouseDown: function(event) {
        ship.engineOn = true;
      },
      onMouseUp: function(event) {
        ship.engineOn = false;
      }
    }, this)

    //スクロールする背景スプライトをインスタンス　スクロール速度:scrollSpeed
    background = new ScrollingBGM();
    this.addChild(background);

    rock_above = new ScrollingRA();
    this.addChild(rock_above);

    rock_under = new ScrollingRU();
    this.addChild(rock_under);

    ceiling = new ScrollingCL();
    this.addChild(ceiling);

    land = new ScrollingLD();
    this.addChild(land);

    zanki = new Zanki();
    this.addChild(zanki);

    score = new Score();
    this.addChild(score);

    ship = new Ship();
    this.addChild(ship);

    //scheduleUpdate関数は、描画の都度、update関数を呼び出す
    this.scheduleUpdate();
    //小惑星の生成で追加
    this.schedule(this.addAsteroid, 0.9);
    this.schedule(this.addAsteroid2, 3);
    this.schedule(this.addAsteroid3, 6);
    this.schedule(this.addEnemy, 4);
    this.schedule(this.addEnemy2, 5);
    //ここからパーティクルの設定
    emitter = cc.ParticleSun.create();
    this.addChild(emitter, 1);
    var myTexture = cc.textureCache.addImage(res.awa_png);
    emitter.setTexture(myTexture);
    emitter.setStartSize(2);
    emitter.setEndSize(5);

  },
  update: function(dt) {
    //backgroundのscrollメソッドを呼び出す
    background.scroll();
    rock_above.scroll();
    rock_under.scroll();
    ceiling.scroll();
    land.scroll();
    ship.updateY();
  },
  //小惑星の生成で追加
  addAsteroid: function(event) {
    var asteroid = new Asteroid();
    this.addChild(asteroid);
  },
  removeAsteroid: function(asteroid) {
    this.removeChild(asteroid);
  },

  addAsteroid2: function(event) {
    var asteroid2 = new Asteroid2();
    this.addChild(asteroid2);
  },
  removeAsteroid2: function(asteroid2) {
    this.removeChild(asteroid2);
  },

  addAsteroid3: function(event) {
    var asteroid3 = new Asteroid3();
    this.addChild(asteroid3);
  },
  removeAsteroid3: function(asteroid3) {
    this.removeChild(asteroid3);
  },

  addEnemy: function(event) {
    var enemy = new Enemy();
    this.addChild(enemy);
  },
  removeEnemy: function(enemy) {
    this.removeChild(enemy);
  },

  addEnemy2: function(event) {
    var enemy2 = new Enemy2();
    this.addChild(enemy2);
  },
  removeEnemy2: function(enemy2) {
    this.removeChild(enemy2);
  },
  //BGMと効果音の関数を追加
  /*
  playSe: function() {
    this.audioEngine.playEffect(res.se_surprize);
  },
  playBgm: function() {
    if (!this.audioEngine.isMusicPlaying()) {
      this.audioEngine.playMusic(res.bgm_main, true);
    }
  },
  stopBgm: function() {
    if (this.audioEngine.isMusicPlaying()) {
      this.audioEngine.stopMusic();
    }
  },
  bgmUp: function() {
    this.audioEngine.setMusicVolume(this.audioEngine.getMusicVolume() + 0.1);
  },
  bgmDown: function() {
    this.audioEngine.setMusicVolume(this.audioEngine.getMusicVolume() - 0.1);
  },
  seUp: function() {
    this.audioEngine.setEffectsVolume(this.audioEngine.getEffectsVolume() + 0.1);
  },
  seDown: function() {
    this.audioEngine.setEffectsVolume(this.audioEngine.getEffectsVolume() - 0.1);
  }*/

});

//スクロール移動する背景クラス
var ScrollingBGM = cc.Sprite.extend({
  //ctorはコンストラクタ　クラスがインスタンスされたときに必ず実行される
  ctor: function() {
    this._super();
    this.initWithFile(res.background_png);
  },
  //onEnterメソッドはスプライト描画の際に必ず呼ばれる
  onEnter: function() {
    //背景画像の描画開始位置 横960の画像の中心が、画面の端に設置される
    this.setPosition(size.width, size.height / 2);
    //  this.setPosition(480,160);
  },
  scroll: function() {
    //座標を更新する
    this.setPosition(this.getPosition().x - scrollSpeed, this.getPosition().y);
    //画面の端に到達したら反対側の座標にする
    if (this.getPosition().x < 0) {
      this.setPosition(this.getPosition().x + 480, this.getPosition().y);
    }
  }
});

var ScrollingRA = cc.Sprite.extend({
  //ctorはコンストラクタ　クラスがインスタンスされたときに必ず実行される
  ctor: function() {
    this._super();
    this.initWithFile(res.rock_above_png);
  },
  //onEnterメソッドはスプライト描画の際に必ず呼ばれる
  onEnter: function() {
    //背景画像の描画開始位置 横960の画像の中心が、画面の端に設置される
    this.setPosition(size.width, size.height / 1.1);
    //  this.setPosition(480,160);
  },
  scroll: function() {
    //座標を更新する
    this.setPosition(this.getPosition().x - scrollSpeed - 0.2, this.getPosition().y);
    //画面の端に到達したら反対側の座標にする
    if (this.getPosition().x < 0) {
      this.setPosition(this.getPosition().x + 480, this.getPosition().y);
    }
  }
});

var ScrollingRU = cc.Sprite.extend({
  //ctorはコンストラクタ　クラスがインスタンスされたときに必ず実行される
  ctor: function() {
    this._super();
    this.initWithFile(res.rock_under_png);
  },
  //onEnterメソッドはスプライト描画の際に必ず呼ばれる
  onEnter: function() {
    //背景画像の描画開始位置 横960の画像の中心が、画面の端に設置される
    this.setPosition(size.width, size.height / 14);
    //  this.setPosition(480,160);
  },
  scroll: function() {
    //座標を更新する
    this.setPosition(this.getPosition().x - scrollSpeed - 0.2, this.getPosition().y);
    //画面の端に到達したら反対側の座標にする
    if (this.getPosition().x < 0) {
      this.setPosition(this.getPosition().x + 480, this.getPosition().y);
    }
  }
});

var ScrollingCL = cc.Sprite.extend({
  //ctorはコンストラクタ　クラスがインスタンスされたときに必ず実行される
  ctor: function() {
    this._super();
    this.initWithFile(res.ceiling_png);
  },
  //onEnterメソッドはスプライト描画の際に必ず呼ばれる
  onEnter: function() {
    //背景画像の描画開始位置 横960の画像の中心が、画面の端に設置される
    this.setPosition(size.width, size.height / 1);
    //  this.setPosition(480,160);
  },
  scroll: function() {
    //座標を更新する
    this.setPosition(this.getPosition().x - scrollSpeed - 0.5, this.getPosition().y);
    //画面の端に到達したら反対側の座標にする
    if (this.getPosition().x < 0) {
      this.setPosition(this.getPosition().x + 480, this.getPosition().y);
    }
  }
});

var ScrollingLD = cc.Sprite.extend({
  //ctorはコンストラクタ　クラスがインスタンスされたときに必ず実行される
  ctor: function() {
    this._super();
    this.initWithFile(res.land_png);
  },
  //onEnterメソッドはスプライト描画の際に必ず呼ばれる
  onEnter: function() {
    //背景画像の描画開始位置 横960の画像の中心が、画面の端に設置される
    this.setPosition(size.width, 0.5);
    //  this.setPosition(480,160);
  },
  scroll: function() {
    //座標を更新する
    this.setPosition(this.getPosition().x - scrollSpeed - 0.5, this.getPosition().y);
    //画面の端に到達したら反対側の座標にする
    if (this.getPosition().x < 0) {
      this.setPosition(this.getPosition().x + 480, this.getPosition().y);
    }
  }
});

var Zanki = cc.Layer.extend({
    ctor:function () {
        this._super();

        scoreText = cc.LabelTTF.create("残機: 3","Arial","32",cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(scoreText);
        scoreText.setPosition(60,20);

    }
});

var Score = cc.Layer.extend({
    ctor:function () {
        this._super();

        pointText = cc.LabelTTF.create("SCORE: 0","Arial","32",cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(pointText);
        pointText.setPosition(250,20);

    }
});



//重力（仮）で落下する　宇宙船　
var Ship = cc.Sprite.extend({
  ctor: function() {
    this._super();
    this.initWithFile(res.ship_png);
    this.ySpeed = 0; //宇宙船の垂直速度
    //宇宙船を操作するで追加した部分
    this.engineOn = false; //カスタム属性追加　宇宙船のエンジンのON OFF
    this.invulnerability = 0; //無敵モード時間　初期値0
  },
  onEnter: function() {
    this.setPosition(60, 160);
  },
  updateY: function() {
    //宇宙船を操作するで追加した部分
    if (this.engineOn) {
      this.ySpeed += gameThrust;
      //ここでパーティクルエフェクトを宇宙船のすぐ後ろに配置している
      emitter.setPosition(this.getPosition().x - 25, this.getPosition().y);
    } else {
      //エンジンOffのときは画面外に配置
      emitter.setPosition(this.getPosition().x - 250, this.getPosition().y);
    }

    //無敵モード中の視覚効果
    if (this.invulnerability > 0) {
      this.invulnerability--;
      this.setOpacity(255 - this.getOpacity());
    }


    this.setPosition(this.getPosition().x, this.getPosition().y + this.ySpeed);
    this.ySpeed += gameGravity;

    //宇宙船が画面外にでたら、リスタートさせる
    if (this.getPosition().y < 0 || this.getPosition().y > 320) {
      miss--;
      scoreText.setString("残機: "+miss);
      checkMiss();
      restartGame();

    }
  }
});
//小惑星クラス
var Asteroid = cc.Sprite.extend({
  ctor: function() {
    this._super();
    this.initWithFile(res.nagoya4_png);
  },
  onEnter: function() {
    this._super();
    this.setPosition(600, Math.random() * 320);
    var moveAction = cc.MoveTo.create(5.5, new cc.Point(-100, Math.random() * 320));
    this.runAction(moveAction);
    this.scheduleUpdate();
  },
  update: function(dt) {
    //小惑星との衝突を判定する処理
    var shipBoundingBox = ship.getBoundingBox();
    var asteroidBoundingBox = this.getBoundingBox();
    //rectIntersectsRectは２つの矩形が交わっているかチェックする
    if (cc.rectIntersectsRect(shipBoundingBox, asteroidBoundingBox) && ship.invulnerability == 0) {
      gameLayer.removeAsteroid(this); //小惑星を削除する
      //ボリュームを上げる
      audioEngine.setEffectsVolume(audioEngine.getEffectsVolume() + 0.3);

      point = point + 10;
      pointText.setString("SCORE: "+point);


      //効果音を再生する
     //  audioEngine.playEffect("res/se_bang.mp3");
     audioEngine.playEffect(res.se_decide_mp3);

  }

    //画面の外にでた小惑星を消去する処理
    if (this.getPosition().x < -50) {
      gameLayer.removeAsteroid(this)
    }
  }
});

var Asteroid2 = cc.Sprite.extend({
  ctor: function() {
    this._super();
    this.initWithFile(res.nagoya5_png);
  },
  onEnter: function() {
    this._super();
    this.setPosition(600, Math.random() * 320);
    var moveAction = cc.MoveTo.create(5, new cc.Point(-100, Math.random() * 320));
    this.runAction(moveAction);
    this.scheduleUpdate();
  },
  update: function(dt) {
    //小惑星との衝突を判定する処理
    var shipBoundingBox = ship.getBoundingBox();
    var asteroidBoundingBox = this.getBoundingBox();
    //rectIntersectsRectは２つの矩形が交わっているかチェックする
    if (cc.rectIntersectsRect(shipBoundingBox, asteroidBoundingBox) && ship.invulnerability == 0) {
      gameLayer.removeAsteroid(this); //小惑星を削除する
      //ボリュームを上げる
      audioEngine.setEffectsVolume(audioEngine.getEffectsVolume() + 0.3);

      point = point + 20;
      pointText.setString("SCORE: "+point);


      //効果音を再生する
     //  audioEngine.playEffect("res/se_bang.mp3");
     audioEngine.playEffect(res.se_decide_mp3);

  }

    //画面の外にでた小惑星を消去する処理
    if (this.getPosition().x < -50) {
      gameLayer.removeAsteroid(this)
    }
  }
});

var Asteroid3 = cc.Sprite.extend({
  ctor: function() {
    this._super();
    this.initWithFile(res.nagoya6_png);
  },
  onEnter: function() {
    this._super();
    this.setPosition(600, Math.random() * 320);
    var moveAction = cc.MoveTo.create(4.5, new cc.Point(-100, Math.random() * 320));
    this.runAction(moveAction);
    this.scheduleUpdate();
  },
  update: function(dt) {
    //小惑星との衝突を判定する処理
    var shipBoundingBox = ship.getBoundingBox();
    var asteroidBoundingBox = this.getBoundingBox();
    //rectIntersectsRectは２つの矩形が交わっているかチェックする
    if (cc.rectIntersectsRect(shipBoundingBox, asteroidBoundingBox) && ship.invulnerability == 0) {
      gameLayer.removeAsteroid(this); //小惑星を削除する
      //ボリュームを上げる
      audioEngine.setEffectsVolume(audioEngine.getEffectsVolume() + 0.3);

      point = point + 30;
      pointText.setString("SCORE: "+point);


      //効果音を再生する
     //  audioEngine.playEffect("res/se_bang.mp3");
     audioEngine.playEffect(res.se_decide_mp3);

  }

    //画面の外にでた小惑星を消去する処理
    if (this.getPosition().x < -50) {
      gameLayer.removeAsteroid(this)
    }
  }
});



var Enemy = cc.Sprite.extend({
  ctor: function() {
    this._super();
    this.initWithFile(res.coral_above_png);
  },
  onEnter: function() {
    this._super();
    this.setPosition(960, Math.random() * 320);
    var moveAction = cc.MoveTo.create(11.5, new cc.Point(-100, 10 * 45));
    this.runAction(moveAction);
    this.scheduleUpdate();
  },
  update: function(dt) {
    //小惑星との衝突を判定する処理
    var shipBoundingBox = ship.getBoundingBox();
    var asteroidBoundingBox = this.getBoundingBox();
    //rectIntersectsRectは２つの矩形が交わっているかチェックする
    if (cc.rectIntersectsRect(shipBoundingBox, asteroidBoundingBox) && ship.invulnerability == 0) {
      gameLayer.removeAsteroid(this); //小惑星を削除する
      //ボリュームを上げる
      audioEngine.setEffectsVolume(audioEngine.getEffectsVolume() + 0.3);

      miss--;
      scoreText.setString("残機: "+miss);

      checkMiss();
      //効果音を再生する
    //  audioEngine.playEffect("res/se_bang.mp3");
      audioEngine.playEffect(res.butuke_mp3);
      //bgmの再生をとめる

      restartGame();
    }
    //画面の外にでた小惑星を消去する処理
    if (this.getPosition().x < -50) {
      gameLayer.removeAsteroid(this)
    }
  }
});

var Enemy2 = cc.Sprite.extend({
  ctor: function() {
    this._super();
    this.initWithFile(res.coral_under_png);
  },
  onEnter: function() {
    this._super();
    this.setPosition(960, Math.random() * 320);
    var moveAction = cc.MoveTo.create(11.5, new cc.Point(-100, 45 * -5));
    this.runAction(moveAction);
    this.scheduleUpdate();
  },
  update: function(dt) {
    //小惑星との衝突を判定する処理
    var shipBoundingBox = ship.getBoundingBox();
    var asteroidBoundingBox = this.getBoundingBox();
    //rectIntersectsRectは２つの矩形が交わっているかチェックする
    if (cc.rectIntersectsRect(shipBoundingBox, asteroidBoundingBox) && ship.invulnerability == 0) {
      gameLayer.removeAsteroid(this); //小惑星を削除する
      //ボリュームを上げる
      audioEngine.setEffectsVolume(audioEngine.getEffectsVolume() + 0.3);

      miss--;
      scoreText.setString("残機: "+miss);

      checkMiss();
      //効果音を再生する
    //  audioEngine.playEffect("res/se_bang.mp3");
      audioEngine.playEffect(res.butuke_mp3);
      //bgmの再生をとめる

      restartGame();
    }
    //画面の外にでた小惑星を消去する処理
    if (this.getPosition().x < -50) {
      gameLayer.removeAsteroid(this)
    }
  }
});
//宇宙船を元の位置に戻して、宇宙船の変数を初期化する
function restartGame() {
  ship.ySpeed = 0;
  ship.setPosition(ship.getPosition().x, 160);
  ship.invulnerability = 100;
  //bgmリスタート
  /*if (!audioEngine.isMusicPlaying()) {
    audioEngine.resumeMusic();
  }*/
}


function checkMiss(){

            if(miss == -1){
              cc.director.runScene(new thirdScean());
              if (audioEngine.isMusicPlaying()) {
                audioEngine.stopMusic();
              }
              miss = 3;
              point = 0;

            }
}


var NextScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer1 = new gameScene();
        this.addChild(layer1);
        var layer2 = new game();
        this.addChild(layer2);

    }
});
