import Phaser from "phaser";
import PreloadScene from "./scenes/preload";
import ScenePlay from "./scenes/play";
import SceneMenu from "./scenes/menu";

const WIDTH = 800;
const HEIGHT = 600;

const BIRD_POSITION = {
  x: WIDTH * 0.1,
  y: HEIGHT / 2,
};

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: BIRD_POSITION,
};

const config = {
  // WebGL (Web graphics library) API form rendering 2 and 3D graphics
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
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
  scene: [
    PreloadScene,
    new SceneMenu(SHARED_CONFIG),
    new ScenePlay(SHARED_CONFIG),
  ],
  // scene: {
  //   preload,
  //   update,
  //   create,
  // },
};

new Phaser.Game(config);

// let bird, pipes;

// const PIPE_VERTICAL_DISTANCE_RANGE = [150, 200];
// const PIPE_HORIZONTAL_DISTANCE_RANGE = [450, 550];

// const PIPES_TO_RENDER = 4;
// const FLAP_VELOCITY = 300;
// const INITIAL_BIRD_POSITION = {
//   y: config.height / 2,
//   x: config.width * 0.1,
// };

// loading assets, such as image, music, animations
// function preload() {
//   // 'this' context = scene
//   // contains functions and properties we can use
//   this.load.image("sky", "assets/sky.png");
//   this.load.image("bird", "assets/bird.png");
//   this.load.image("pipe", "assets/pipe.png");
// }

// create instance objects, interactions, basic setup
// function create() {
//   // this.add.image(config.width / 2, config.height / 2, "sky");
//   // or change the origin
//   // origin canvas middle= x, y
//   this.add.image(0, 0, "sky").setOrigin(0, 0); // origin of image middle y , x
//   /**
//    * y/x
//    * |x=0.0|||||||x=0.5|||||||x=1.0|
//    * |y=0.0|||||||y=0.0|||||||y=0.0|
//    * |||||||||||||||||||||||||||||||
//    * |||||||||||||||||||||||||||||||
//    * |x=0.0|||||||x=0.5|||||||x=1.0|
//    * |y=0.5|||||||y=0.5|||||||y=0.5|
//    * |||||||||||||||||||||||||||||||
//    * |||||||||||||||||||||||||||||||
//    * |x=0.0|||||||x=0.5|||||||x=1.0|
//    * |y=1.0|||||||y=1.0|||||||y=1.0|
//    */
//   // add(x, y)
//   bird = this.physics.add
//     .sprite(INITIAL_BIRD_POSITION.x, INITIAL_BIRD_POSITION.y, "bird")
//     .setOrigin(0);
//   bird.body.gravity.y = 600;
//   pipes = this.physics.add.group();
//   for (let i = 0; i < PIPES_TO_RENDER; i++) {
//     const upperPipe = pipes.create(0, 0, "pipe").setOrigin(0, 1);
//     const lowerPipe = pipes.create(0, 0, "pipe").setOrigin(0, 0);
//     placePipe(upperPipe, lowerPipe);
//   }
//   pipes.setVelocityX(-200);
//   this.input.on("pointerdown", flat);
//   this.input.keyboard.on("keydown-SPACE", flat);
// }

// function placePipe(upperPipe, lowerPipe) {
//   const rightMostX = getRightMostPipe();

//   const pipeVerticalDistance = Phaser.Math.Between(
//     ...PIPE_VERTICAL_DISTANCE_RANGE
//   );

//   const pipeHorizontalDistance = Phaser.Math.Between(
//     ...PIPE_HORIZONTAL_DISTANCE_RANGE
//   );

//   const pipeVerticalPosition = Phaser.Math.Between(
//     20,
//     config.height - 20 - pipeVerticalDistance
//   );

//   upperPipe.x = rightMostX + pipeHorizontalDistance;
//   upperPipe.y = pipeVerticalPosition;

//   lowerPipe.x = upperPipe.x;
//   lowerPipe.y = upperPipe.y + pipeVerticalDistance;
// }

// function recyclePipes() {
//   const tempPipes = [];

//   pipes.getChildren().forEach((pipe) => {
//     if (pipe.getBounds().right <= 0) {
//       tempPipes.push(pipe);
//       if (tempPipes.length === 2) {
//         placePipe(...tempPipes);
//         // pipes.setVelocityX(p);
//         console.log(pipes);
//       }
//     }
//   });
// }

// function getRightMostPipe() {
//   let rightMostX = 0;

//   pipes.getChildren().forEach(function (pipe) {
//     rightMostX = Math.max(pipe.x, rightMostX);
//   });

//   return rightMostX;
// }

// animaton loop
// 60fps times per second
// delta = time of last frame
// 60 * 16 = 1000ms

// function update(time, delta) {
//   if (bird.y >= config.height || bird.y <= 0 - bird.height) {
//     restartBirdPosition();
//   }

//   recyclePipes();
// }

// function restartBirdPosition() {
//   bird.x = INITIAL_BIRD_POSITION.x;
//   bird.y = INITIAL_BIRD_POSITION.y;
//   bird.body.velocity.y = 0;
// }

// function flat() {
//   bird.body.velocity.y = -FLAP_VELOCITY;
// }
