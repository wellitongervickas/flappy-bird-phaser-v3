import Phaser from "phaser";

class Base extends Phaser.Scene {
  config;

  constructor(config, sceneName) {
    super(sceneName);
    this.config = config;
  }

  create() {
    this.createBackground();
  }

  createBackground() {
    this.add.image(0, 0, "sky").setOrigin(0, 0); // origin of image middle y , x
  }

  createMenu(menus = []) {
    const fontSize = 32;
    const fontGap = 32;
    const fontSpace = fontSize + fontGap;

    for (const index in menus) {
      const menuItem = this.add
        .text(
          this.config.width * 0.5,
          this.config.height / menus.length + index * fontSpace,
          menus[index].text,
          {
            fontSize,
          }
        )
        .setInteractive()
        .setOrigin(0.5, 0);

      menuItem.on("pointerup", () => {
        if (menus[index].pointerup) {
          menus[index].pointerup();
        } else {
          this.scene.start(menus[index].scene);
        }
      });

      menuItem.on("pointerover", () => {
        menuItem.setStyle({ fill: "#FF0" });
      });

      menuItem.on("pointerout", () => {
        menuItem.setStyle({ fill: "#FFF" });
      });
    }
  }

  createBackButton() {
    const backButton = this.add
      .image(this.config.width * 0.9, this.config.height * 0.9, "back")
      .setInteractive()
      .setScale(2)
      .setOrigin(1);

    backButton.on("pointerup", () => {
      this.scene.start("menu");
    });
  }
}

export default Base;
