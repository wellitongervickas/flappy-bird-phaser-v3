import Phaser from "phaser";

class Play extends Phaser.Scene {
  score;
  scoreText;
  bird;
  flapVelocity = 300;
  pipes;
  pipesToRender = 4;
  pipeVerticalDistanceRange = [150, 200];
  pipeHorizontalDistanceRange = [450, 550];
  pipeMinVerticalDistanceGap = 20;
  config;

  constructor(config) {
    super("play");
    this.config = config;
  }

  preload() {
    this.loadAssets();
  }

  create() {
    this.createBackground();
    this.createBird();
    this.createPipes();
    this.createColliders();
    this.createScore();
    this.createPause();
    this.applyEvents();
  }

  update() {
    this.checkBirdStatus();

    this.recyclePipes();
  }

  loadAssets() {
    this.load.image("sky", "assets/sky.png");
    this.load.image("bird", "assets/bird.png");
    this.load.image("pipe", "assets/pipe.png");
    this.load.image("pause", "assets/pause.png");
  }

  createBackground() {
    this.add.image(0, 0, "sky").setOrigin(0, 0); // origin of image middle y , x
  }

  createPause() {
    const pauseButton = this.add
      .image(this.config.width - 16, this.config.height - 16, "pause")
      .setInteractive()
      .setScale(3)
      .setOrigin(1, 1);

    pauseButton.on("pointerdown", this.pauseGame.bind(this));
  }

  createBird() {
    this.bird = this.physics.add
      .sprite(this.config.startPosition.x, this.config.startPosition.y, "bird")
      .setOrigin(0);

    this.bird.body.gravity.y = 600;

    this.bird.setCollideWorldBounds(true);
  }

  checkBirdStatus() {
    if (
      this.bird.getBounds().bottom >= this.config.height ||
      this.bird.y <= 0
    ) {
      this.gameOver();
    }
  }

  createPipes() {
    this.pipes = this.physics.add.group();

    for (let i = 0; i < this.pipesToRender; i++) {
      const upperPipe = this.pipes
        .create(0, 0, "pipe")
        .setImmovable(true)
        .setOrigin(0, 1);
      const lowerPipe = this.pipes
        .create(0, 0, "pipe")
        .setImmovable(true)
        .setOrigin(0, 0);

      this.placePipe(upperPipe, lowerPipe);
    }

    this.pipes.setVelocityX(-200);
  }

  createColliders() {
    this.physics.add.collider(this.bird, this.pipes, this.gameOver.bind(this));
  }

  createScore() {
    this.score = 0;
    this.scoreText = this.add.text(16, 16, `Score: ${0}`, {
      fontSize: "32px",
      fill: "#000",
    });

    this.createBestScore();
  }

  createBestScore() {
    const bestScore = localStorage.getItem("bestScore");

    this.add.text(16, 52, `Best score: ${bestScore || 0}`, {
      fontSize: "18px",
      fill: "#000",
    });
  }

  applyEvents() {
    this.input.on("pointerdown", this.flat.bind(this));
    this.input.keyboard.on("keydown-SPACE", this.flat.bind(this));
  }

  placePipe(upperPipe, lowerPipe) {
    const rightMostX = this.getRightMostPipe();

    const pipeVerticalDistance = Phaser.Math.Between(
      ...this.pipeVerticalDistanceRange
    );

    const pipeHorizontalDistance = Phaser.Math.Between(
      ...this.pipeHorizontalDistanceRange
    );

    const pipeVerticalPosition = Phaser.Math.Between(
      this.pipeMinVerticalDistanceGap,
      this.config.height -
        this.pipeMinVerticalDistanceGap -
        pipeVerticalDistance
    );

    upperPipe.x = rightMostX + pipeHorizontalDistance;
    upperPipe.y = pipeVerticalPosition;

    lowerPipe.x = upperPipe.x;
    lowerPipe.y = upperPipe.y + pipeVerticalDistance;
  }

  recyclePipes() {
    const tempPipes = [];

    this.pipes.getChildren().forEach((pipe) => {
      if (pipe.getBounds().right <= 0) {
        tempPipes.push(pipe);
        if (tempPipes.length === 2) {
          this.placePipe(...tempPipes);
          this.increaseScore();
          this.checkBestScoreStatus();
        }
      }
    });
  }

  getRightMostPipe() {
    let rightMostX = 0;

    this.pipes.getChildren().forEach((pipe) => {
      rightMostX = Math.max(pipe.x, rightMostX);
    });

    return rightMostX;
  }

  flat() {
    this.bird.body.velocity.y = -this.flapVelocity;
  }

  gameOver() {
    this.physics.pause();
    this.bird.setTint("0xFF0000");

    this.checkBestScoreStatus();

    this.time.addEvent({
      delay: 1000,
      loop: false,
      callback: this.restartGame.bind(this),
    });
  }

  increaseScore() {
    this.score += 1;
    this.scoreText.setText(`Score: ${this.score}`);
  }

  checkBestScoreStatus() {
    const bestScoreText = localStorage.getItem("bestScore");
    const bestScore = bestScoreText && parseInt(bestScoreText, 10);

    if (!bestScore || this.score > bestScore) {
      localStorage.setItem("bestScore", this.score);
    }
  }

  restartGame() {
    this.scene.restart();
  }

  pauseGame() {
    this.physics.pause();
    this.scene.pause();
  }
}

export default Play;
