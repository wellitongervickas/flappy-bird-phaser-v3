import Phaser from "phaser";

const config = {
  // WebGL (Web graphics library) API form rendering 2 and 3D graphics
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    // Arcade physics plugin, anages physics simulation
    default: "arcade",
    arcade: {
      debug: true,
      gravity: {
        /**
         * time 0 = 0px/s
         * time 1 = 200px/s
         * it double after every time update
         */
        // y: 600,
      },
    },
  },
  scene: {
    preload,
    update,
    create,
  },
};

new Phaser.Game(config);

let bird, upperPipe, lowerPipe;

const pipeVeticalDistanceRange = [150, 200];
const pipeVerticalDistance = Phaser.Math.Between(...pipeVeticalDistanceRange);
const pipeVerticalPosition = Phaser.Math.Between(
  20,
  config.height - 20 - pipeVerticalDistance
);

const FLAP_VELOCITY = 300;
const INITIAL_BIRD_POSITION = {
  y: config.height / 2,
  x: config.width * 0.1,
};

// loading assets, such as image, music, animations
function preload() {
  // 'this' context = scene
  // contains functions and properties we can use
  this.load.image("sky", "assets/sky.png");
  this.load.image("bird", "assets/bird.png");
  this.load.image("pipe", "assets/pipe.png");
}

// create instance objects, interactions, basic setup
function create() {
  // this.add.image(config.width / 2, config.height / 2, "sky");
  // or change the origin

  // origin canvas middle= x, y
  this.add.image(0, 0, "sky").setOrigin(0, 0); // origin of image middle y , x
  /**
   * y/x
   * |x=0.0|||||||x=0.5|||||||x=1.0|
   * |y=0.0|||||||y=0.0|||||||y=0.0|
   * |||||||||||||||||||||||||||||||
   * |||||||||||||||||||||||||||||||
   * |x=0.0|||||||x=0.5|||||||x=1.0|
   * |y=0.5|||||||y=0.5|||||||y=0.5|
   * |||||||||||||||||||||||||||||||
   * |||||||||||||||||||||||||||||||
   * |x=0.0|||||||x=0.5|||||||x=1.0|
   * |y=1.0|||||||y=1.0|||||||y=1.0|
   */

  // add(x, y)
  bird = this.physics.add
    .sprite(INITIAL_BIRD_POSITION.x, INITIAL_BIRD_POSITION.y, "bird")
    .setOrigin(0);

  bird.body.gravity.y = 600;

  upperPipe = this.physics.add
    .sprite(400, pipeVerticalPosition, "pipe")
    .setOrigin(0, 1);

  lowerPipe = this.physics.add
    .sprite(upperPipe.x, upperPipe.y + pipeVerticalDistance, "pipe")
    .setOrigin(0, 0);

  this.input.on("pointerdown", flat);
  this.input.keyboard.on("keydown-SPACE", flat);
}

// animaton loop
// 60fps times per second
// delta = time of last frame
// 60 * 16 = 1000ms

function update(time, delta) {
  if (bird.y >= config.height || bird.y <= 0 - bird.height) {
    restartBirdPosition();
  }
}

function restartBirdPosition() {
  bird.x = INITIAL_BIRD_POSITION.x;
  bird.y = INITIAL_BIRD_POSITION.y;
  bird.body.velocity.y = 0;
}

function flat() {
  bird.body.velocity.y = -FLAP_VELOCITY;
}
