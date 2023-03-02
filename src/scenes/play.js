import Phaser from "phaser";

class Play extends Phaser.Scene {
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
  }

  createBackground() {
    this.add.image(0, 0, "sky").setOrigin(0, 0); // origin of image middle y , x
  }

  createBird() {
    this.bird = this.physics.add
      .sprite(this.config.startPosition.x, this.config.startPosition.y, "bird")
      .setOrigin(0);

    this.bird.body.gravity.y = 600;
  }

  checkBirdStatus() {
    if (
      this.bird.y >= this.config.height ||
      this.bird.y <= 0 - this.bird.height
    ) {
      this.restartBirdPosition();
    }
  }

  createPipes() {
    this.pipes = this.physics.add.group();

    for (let i = 0; i < this.pipesToRender; i++) {
      const upperPipe = this.pipes.create(0, 0, "pipe").setOrigin(0, 1);
      const lowerPipe = this.pipes.create(0, 0, "pipe").setOrigin(0, 0);

      this.placePipe(upperPipe, lowerPipe);
    }

    this.pipes.setVelocityX(-200);
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

  restartBirdPosition() {
    this.bird.x = this.config.startPosition.x;
    this.bird.y = this.config.startPosition.y;
    this.bird.body.velocity.y = 0;
  }
}

export default Play;
