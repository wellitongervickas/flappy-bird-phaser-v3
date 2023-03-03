import Base from "./base";

class Menu extends Base {
  constructor(config) {
    super(config, "menu");
  }

  create() {
    this.createBackground();
  }
}

export default Menu;
