import Base from "./base";

class Score extends Base {
  constructor(config) {
    super(config, "score");
  }

  create() {
    super.create();
    this.createBestScoreText();
    this.createBackButton();
  }

  createBestScoreText() {
    const bestScore = localStorage.getItem("bestScore");

    this.add
      .text(
        this.config.width * 0.5,
        this.config.height * 0.5,
        `Best score: ${bestScore || 0}`,
        {
          fontSize: 32,
        }
      )
      .setOrigin(0.5);
  }
}

export default Score;
