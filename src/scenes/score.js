import Base from "./base";

class Score extends Base {
  constructor(config) {
    super(config, "score");
  }

  create() {
    this.createBackground();
  }
}

export default Score;
