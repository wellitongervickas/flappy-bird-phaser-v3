import Base from "./base";

class Menu extends Base {
  constructor(config) {
    super(config, "menu");
  }

  create() {
    super.create();
    this.createMenu(this.menus);
  }

  get menus() {
    return [
      { scene: "play", text: "Play" },
      { scene: "score", text: "Score" },
      { scene: null, text: "Exit" },
    ];
  }
}

export default Menu;
