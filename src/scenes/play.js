import Phaser from "phaser";
import Base from "./base";
class Play extends Base {
  score;
  scoreText;
  countdownInitial = 3;
  countdownText;
  countdownEvent;
  resumeEvent;
  isPaused = false;
  currentDifficulty = "easy";
  difficulties = {
    easy: {
      pipeHorizontalDistanceRange: [300, 350],
      pipeVerticalDistanceRange: [150, 200],
    },
    normal: {
      pipeHorizontalDistanceRange: [280, 330],
      pipeVerticalDistanceRange: [140, 190],
    },
    harder: {
      pipeHorizontalDistanceRange: [250, 310],
      pipeVerticalDistanceRange: [100, 150],
    },
  };
  bird;
  flapVelocity = 300;
  pipes;
  pipesToRender = 4;

  pipeMinVerticalDistanceGap = 20;

  constructor(config) {
    super(config, "play");
  }

  get difficultyOptions() {
    return this.difficulties[this.currentDifficulty];
  }

  create() {
    this.currentDifficulty = "easy";
    super.create();
    this.createBird();
    this.createPipes();
    this.createColliders();
    this.createScore();
    this.createPause();
    this.applyEvents();

    this.animeFly();
  }

  update() {
    this.checkBirdStatus();
    this.recyclePipes();
  }

  createBird() {
    this.bird = this.physics.add
      .sprite(this.config.startPosition.x, this.config.startPosition.y, "bird")
      .setScale(2.2)
      .setFlipX(true)
      .setOrigin(0);

    this.bird.body.gravity.y = 600;
    this.bird.setBodySize(this.bird.width, this.bird.height - 4);
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

  createPause() {
    this.isPaused = false;
    const pauseButton = this.add
      .image(this.config.width - 16, this.config.height - 16, "pause")
      .setInteractive()
      .setScale(3)
      .setOrigin(1, 1);

    pauseButton.on("pointerdown", this.pauseGame.bind(this));
  }

  applyEvents() {
    this.input.on("pointerdown", this.flat.bind(this));
    this.input.keyboard.on("keydown-SPACE", this.flat.bind(this));
    if (!this.resumeEvent) {
      this.resumeEvent = this.events.on("resume", this.resumeGame.bind(this));
    }
  }

  placePipe(upperPipe, lowerPipe) {
    const rightMostX = this.getRightMostPipe();

    const pipeVerticalDistance = Phaser.Math.Between(
      ...this.difficultyOptions.pipeVerticalDistanceRange
    );

    const pipeHorizontalDistance = Phaser.Math.Between(
      ...this.difficultyOptions.pipeHorizontalDistanceRange
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
          this.increaseDifficulty();
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
    if (this.isPaused) return;
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

  increaseDifficulty() {
    if (this.score <= 5) {
      this.currentDifficulty = "easy";
    }

    if (this.score > 5 && this.score <= 10) {
      this.currentDifficulty = "normal";
    }

    if (this.score > 10) {
      this.currentDifficulty = "harder";
    }
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
    this.isPaused = true;
    this.physics.pause();
    this.scene.pause();
    this.scene.launch("pause");
  }

  resumeGame() {
    this.countdownText = this.add
      .text(
        this.centerPosition.x,
        this.centerPosition.y,
        `Fly in: ${this.countdownInitial}`,
        {
          fontSize: 32,
        }
      )
      .setOrigin(0.5);

    this.countdownEvent = this.time.addEvent({
      delay: 1000,
      callback: this.setCountdown,
      callbackScope: this,
      loop: true,
    });
  }

  setCountdown() {
    this.countdownInitial--;
    this.countdownText.setText(`Fly in: ${this.countdownInitial}`);

    if (this.countdownInitial <= 0) {
      this.countdownText.setText("");
      this.physics.resume();
      this.countdownEvent.remove();
      this.countdownInitial = 3;
      this.isPaused = false;
    }
  }

  animeFly() {
    this.anims.create({
      key: "fly",
      frames: this.anims.generateFrameNumbers("bird", {
        start: 9,
        end: 16,
      }),
      frameRate: 8,
      repeat: -1, //infinity
    });

    this.bird.play("fly");
  }
}

export default Play;
