import Base from "./base";

class Menu extends Base {
  menus = [
    { scene: "play", text: "Play" },
    { scene: "score", text: "Score" },
    { scene: null, text: "Exit" },
  ];

  constructor(config) {
    super(config, "menu");
  }

  create() {
    super.create();
    this.createMenu(this.menus);
  }
}

export default Menu;
