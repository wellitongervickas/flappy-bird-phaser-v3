import Base from "./base";

class Pause extends Base {
  constructor(config) {
    super(config, "pause");
  }

  create() {
    super.create();
    this.createMenu(this.menus);
  }

  get menus() {
    return [
      {
        scene: "play",
        text: "Continue",
        pointerup: () => {
          this.scene.stop();
          this.scene.resume("play");
        },
      },
      {
        scene: "menu",
        text: "Exit",
        pointerup: () => {
          this.scene.stop("play");
          this.scene.start("menu");
        },
      },
    ];
  }
}

export default Pause;
