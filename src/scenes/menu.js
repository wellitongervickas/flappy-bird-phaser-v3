import Phaser from "phaser";

class Menu extends Phaser.Scene {
  config;

  constructor(config) {
    super("menu");
    this.config = config;
  }

  preload() {
    this.loadAssets();
  }

  create() {
    this.createBackground();
  }

  update() {}

  loadAssets() {
    this.load.image("sky", "assets/sky.png");
  }

  createBackground() {
    this.add.image(0, 0, "sky").setOrigin(0, 0);
  }
}

export default Menu;
