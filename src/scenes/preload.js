import Phaser from "phaser";

class Preload extends Phaser.Scene {
  config;

  constructor() {
    super("preload");
  }

  preload() {
    this.loadAssets();
  }

  create() {
    this.scene.start("menu");
  }

  loadAssets() {
    this.load.image("sky", "assets/sky.png");
    this.load.image("bird", "assets/bird.png");
    this.load.image("pipe", "assets/pipe.png");
    this.load.image("pause", "assets/pause.png");
  }
}

export default Preload;
