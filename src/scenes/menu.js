import Phaser from "phaser";

class Menu extends Phaser.Scene {
  config;

  constructor(config) {
    super("menu");
    this.config = config;
  }

  preload() {}

  create() {
    this.createBackground();
  }

  update() {}

  createBackground() {
    this.add.image(0, 0, "sky").setOrigin(0, 0); // origin of image middle y , x
  }
}

export default Menu;
