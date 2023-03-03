import Phaser from "phaser";

class Base extends Phaser.Scene {
  config;

  constructor(config, name) {
    super(name);
    this.config = config;
  }

  createBackground() {
    this.add.image(0, 0, "sky").setOrigin(0, 0); // origin of image middle y , x
  }
}

export default Base;
