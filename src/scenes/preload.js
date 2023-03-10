import Phaser from "phaser";
import Base from "./base";

class Preload extends Base {
  constructor(config) {
    super(config, "preload");
  }

  preload() {
    this.loadAssets();
  }

  create() {
    this.scene.start("menu");
  }

  loadAssets() {
    this.load.image("sky", "assets/sky.png");
    // this.load.image("bird", "assets/bird.png");

    this.load.spritesheet("bird", "assets/birdSprite.png", {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.image("pipe", "assets/pipe.png");
    this.load.image("pause", "assets/pause.png");
    this.load.image("back", "assets/back.png");
  }
}

export default Preload;
