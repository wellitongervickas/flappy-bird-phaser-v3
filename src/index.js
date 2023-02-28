import Phaser from "phaser";

const config = {
  // WebGL (Web graphics library) API form rendering 2 and 3D graphics
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    // Arcade physics plugin, anages physics simulation
    default: "arcade",
  },
  scene: {
    preload,
    update,
    create,
  },
};

new Phaser.Game(config);

// loading assets, such as image, music, animations
function preload() {
  // 'this' context = scene
  // contains functions and properties we can use
  this.load.image("sky", "assets/sky.png");
}

// create instance objects, interactions, basic setup
function create() {
  // this.add.image(config.width / 2, config.height / 2, "sky");
  // or change the origin

  // origin canvas middle= x, y
  this.add.image(0, 0, "sky").setOrigin(0, 0); // origin of image middle y , x
  /**
   * 
   * x=0.0-------x=0.5-------x=1.0
   * y=0.0-------y=0.0-------y=0.0
   * 
   * 
   * x=0.0-------x=0.5-------x=1.0
   * y=0.5-------y=0.5-------y=0.5
   * 
   * 
   * x=0.0-------x=0.5-------x=1.0
   * y=1.0-------y=1.0-------y=1.0

   */
}

// animaton loop
function update() {}
