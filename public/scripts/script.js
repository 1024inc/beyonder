PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Graphics = PIXI.Graphics,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle;


const app = new PIXI.Application({
  width: 840,
  height: 680,
  antialiasing: true,
  transparent: false,
  resolution: 1
});

let appContainer = document.getElementById('app');
let productImageContainer = document.getElementsByClassName('product-image');
let productDescriptionContainer = document.getElementById('product-description');
let productLabelContainer = document.getElementById('product-label');
let productCreditContainer = document.getElementById('product-credit');
let blobContainer = document.getElementById('blob-icon');
let blobDescriptionContainer = document.getElementById('blob-description');
let pricingContainer = document.getElementById('p');
let insightsContainer = document.getElementById('i');
let signalContainer = document.getElementById('s');
let relayContainer = document.getElementById('r');
let guidanceContainer = document.getElementById('g');
appContainer.appendChild(app.view);
app.view.setAttribute('tabindex', 0);


function loadProgressHandler(e) {
  console.log('Loading', e.progress);
}

function completeLoadingHandler(e) {
  console.log('Done loading');
}

function loadErrorHandler(e) {
  console.error('Error ' + e.message);
}

//Product Description
function updateProductInfo(type) {
  productDescriptionContainer.innerHTML = products[type].description;
  productLabelContainer.innerHTML = products[type].label;
  blobContainer.innerHTML = `<img src=${products[type].blobIcon} width="32" height="32"/>`;
  blobDescriptionContainer.innerHTML = products[type].blobLabel;
  for (let e of productImageContainer) {
    e.innerHTML = `<img src=${products[type].imageIcon} width="64" height="64"/>`;
  }
}

//Treasure
function updateTreasure(type){
  let imageIcon = products[type].imageIcon.split('.');
  let image64Icon = `${imageIcon[0]}_64.${imageIcon[1]}`
  let iconTexture = new PIXI.Texture(resources[image64Icon].texture, new PIXI.Rectangle(0, 0, 64, 64));
  treasure = new Sprite(iconTexture);
  treasure.x = gameScene.width - treasure.width - 26;
  treasure.y = gameScene.height / 2 - treasure.height / 2;
  gameScene.addChild(treasure);
}

//Blobs
function updateBlobs(type) {
  let imageIcon = products[type].blobIcon;
  // let image64Icon = `${imageIcon[0]}_64.${imageIcon[1]}`

  let numberOfBlobs = products[type].blobConfig.count,
      spacing = products[type].blobConfig.spacing,
      xOffset = products[type].blobConfig.xOffset,
      speed = products[type].blobConfig.speed,
      direction = products[type].blobConfig.direction

  //An array to store all the blob monsters
  blobs = [];

  //Make as many blobs as there are `numberOfBlobs`
  for (let i = 0; i < numberOfBlobs; i++) {

    //Make a blob
    let blobC = new PIXI.Texture(resources[imageIcon].texture, new PIXI.Rectangle(0, 0, 150, 150));
    let blob = new Sprite(blobC);
    blob.width = 64;
    blob.height = 64;

    //Space each blob horizontally according to the `spacing` value.
    //`xOffset` determines the point from the left of the screen
    //at which the first blob should be added
    let x = spacing * i + xOffset;

    //Give the blob a random y position
    let y = randomInt(0, app.stage.height - blob.height);

    //Set the blob's position
    blob.x = x;
    blob.y = y;

    //Set the blob's vertical velocity. `direction` will be either `1` or
    //`-1`. `1` means the enemy will move down and `-1` means the blob will
    //move up. Multiplying `direction` by `speed` determines the blob's
    //vertical direction
    blob.vy = speed * direction;

    //Reverse the direction for the next blob
    direction *= -1;

    //Push the blob into the `blobs` array
    blobs.push(blob);

    //Add the blob to the `gameScene`
    gameScene.addChild(blob);
  }
}

// Restart Game
// function restartGame() {
//   let iconTexture = new PIXI.Texture(resources['images/reload_64.gif'].texture, new PIXI.Rectangle(0, 0, 64, 64));
//   let sReload = new Sprite(iconTexture);
//   gameOverScene.addChild(sReload);
// }


loader
    .add('images/treasureHunter.json')
    .add('images/narwhal_right.png')
    .add('images/tropic0.png')
    .add('images/tropic2.png')
    .add('images/beach_theme.png')
    .add('images/cabin_theme.png')
    .add('images/treasure.png')
    .add('images/products/guidance_64.png')
    .add('images/products/insights_64.png')
    .add('images/products/pricing_64.png')
    .add('images/products/relay_64.png')
    .add('images/products/signal_64.png')
    .add('images/blobs/guidance_64.png')
    .add('images/blobs/low_bookings.svg')
    .add('images/blobs/low_occupancy.svg')
    .add('images/blobs/double_bookings.svg')
    .add('images/blobs/bad_guests.svg')
    .add('images/title_screen.png')
    .on('progress', loadProgressHandler)
    .on('complete', completeLoadingHandler)
    .on('error', loadErrorHandler)
    .load(setup);

let state, explorer, treasure, blobs, exit, player,
    sPricing, sInsights, sSignal, sRelay, sGuidance,
    exitDoor, healthBar, message, gameScene, gameOverScene, id,
    mapPricing, mapInsights, mapSignal, mapRelay, mapGuidance,
    currentState, productDescription, sCoverTitle;

let beyondCreditsTotal=0;
let beyondCreditsThisRound=0;
let products = {
  Pricing: {
    description: 'Dynamic & Demand-Driven Pricing: The tool you need to maximize revenue and drive occupancy',
    imageIcon: 'images/products/pricing.png',
    level: 1,
    label: 'Pricing',
    blobIcon: 'images/blobs/low_bookings.svg',
    blobLabel: 'low bookings',
    blobConfig: {count:12, spacing: 48, speed: 2, xOffset: 100, direction:1 },
  },
  Insights: {
    description: 'Insights: Free performance metrics for your entire portfolio',
    imageIcon: 'images/products/insights.png',
    level: 2,
    label: 'Insights',
    blobIcon: 'images/blobs/low_occupancy.svg',
    blobLabel: 'low occupancy',
    blobConfig: {count:12, spacing: 48, speed: 2, xOffset: 100, direction:2 },
  },
  Relay: {
    description: 'Relay: Automatically sync your listings across OTAs',
    imageIcon: 'images/products/relay.png',
    level: 3,
    label: 'Relay',
    blobIcon: 'images/blobs/double_bookings.svg',
    blobLabel: 'low double bookings',
    blobConfig: {count:15, spacing: 48, speed: 3, xOffset: 100, direction:1 },
  },
  Signal:{
    description: 'Signal: Direct Booking Engine & Website with No Upfront Costs',
    imageIcon: 'images/products/signal.png',
    level: 4,
    label: 'Signal',
    blobIcon: 'images/blobs/bad_guests.svg',
    blobLabel: 'bad guests',
    blobConfig: {count:15, spacing: 48, speed: 3, xOffset: 100, direction:1 },
  },
  Guidance: {
    description: 'Guidance: Personalized revenue management by local market experts',
    imageIcon: 'images/products/guidance.png',
    level: 5,
    label: 'Guidance',
    blobIcon: 'images/blobs/guidance_64.png',
    blobLabel: 'low revenue',
    blobConfig: {count:15, spacing: 48, speed: 5, xOffset: 100, direction:1 },
  },
}

function startLevel(label) {
  //beyond Credits
  beyondCreditsTotal += beyondCreditsThisRound;
  productCreditContainer.innerHTML = beyondCreditsTotal;
  beyondCreditsThisRound = 0;


  //exitDoor
  exitDoor = new PIXI.Text('EXIT',{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
  exitDoor.position.set(32, 32);
  gameScene.addChild(exitDoor);

  //Explorer
  let char = new PIXI.Texture(resources["images/narwhal_right.png"].texture, new PIXI.Rectangle(0, 0, 64, 64));
  explorer = new Sprite(char);
  explorer.x = 15;
  explorer.y = gameScene.height / 2 - explorer.height / 2;
  explorer.y = 50;
  explorer.vx = 0;
  explorer.vy = 0;
  gameScene.addChild(explorer);

  //Update Treasure, Blobs, Product Description
  if (label === products.Pricing.label) {
    updateProductInfo(products.Pricing.label);
    updateTreasure(products.Pricing.label);
    updateBlobs(products.Pricing.label);
  } else if (label === products.Insights.label) {
    updateProductInfo(products.Insights.label);
    updateTreasure(products.Insights.label);
    updateBlobs(products.Insights.label);
  } else if (label === products.Relay.label) {
    updateProductInfo(products.Relay.label);
    updateTreasure(products.Relay.label);
    updateBlobs(products.Relay.label);
  } else if (label === products.Signal.label) {
    updateProductInfo(products.Signal.label);
    updateTreasure(products.Signal.label);
    updateBlobs(products.Signal.label);
  } else if (label === products.Guidance.label) {
    updateProductInfo(products.Guidance.label);
    updateTreasure(products.Guidance.label);
    updateBlobs(products.Guidance.label);
  } else {
    updateProductInfo(products.Pricing.label);
    updateBlobs(products.Pricing.label);
  }

  //Make the blobs


  //Create the health bar
  healthBar = new Container();
  healthBar.position.set(app.stage.width - 170, 4)
  gameScene.addChild(healthBar);

  //Create the black background rectangle
  let innerBar = new Graphics();
  innerBar.beginFill(0x000000);
  innerBar.drawRect(0, 0, 128, 8);
  innerBar.endFill();
  healthBar.addChild(innerBar);

  //Create the front red rectangle
  let outerBar = new Graphics();
  outerBar.beginFill(0xFF3300);
  outerBar.drawRect(0, 0, 128, 8);
  outerBar.endFill();
  healthBar.addChild(outerBar);

  healthBar.outer = outerBar;

  //Create the `gameOver` scene
  gameOverScene = new Container();

  var bg = new PIXI.Sprite(PIXI.Texture.WHITE);
  bg.width = 840;
  bg.height = 680;
  bg.tint = 0xffffff;
  gameOverScene.addChild(bg);

  /**
   * Order of operations matters for rendering objects in Pixi.  e.g. if this code block
   * precedes the `bg` related codeblock above, our `narwhalSprite` is not visible
   * TODO: Determine if there is a z-index equivalent to use.
   */
  var narwhalLoserAnimationTexture = new PIXI.Texture(resources["images/narwhal_right.png"].texture, new PIXI.Rectangle(0, 0, 64, 64));
  var narwhalSprite = new PIXI.Sprite(narwhalLoserAnimationTexture);
  narwhalSprite.width = 512;
  narwhalSprite.height = 512;
  narwhalSprite.x = 460;
  narwhalSprite.y = 320;
  gameOverScene.addChild(narwhalSprite);

  app.stage.addChild(gameOverScene);

  //Make the `gameOver` scene invisible when the game first starts
  gameOverScene.visible = false;

  //Create the text sprite and add it to the `gameOver` scene
  let style = new TextStyle({
    fontFamily: "Futura",
    fontSize: 64,
    fill: "#24CBD2"
  });
  message = new Text("The End!", style);
  message.x = 120;
  message.y = app.stage.height / 2 - 32;
  gameOverScene.addChild(message);

  //Capture the keyboard arrow keys
  let left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40);

  //Left arrow key `press` method
  left.press = function() {

    //Change the explorer's velocity when the key is pressed
    explorer.vx = -5;
    explorer.vy = 0;
  };

  //Left arrow key `release` method
  left.release = function() {

    //If the left arrow has been released, and the right arrow isn't down,
    //and the explorer isn't moving vertically:
    //Stop the explorer
    if (!right.isDown && explorer.vy === 0) {
      explorer.vx = 0;
    }
  };

  //Up
  up.press = function() {
    explorer.vy = -5;
    explorer.vx = 0;
  };
  up.release = function() {
    if (!down.isDown && explorer.vx === 0) {
      explorer.vy = 0;
    }
  };

  //Right
  right.press = function() {
    explorer.vx = 5;
    explorer.vy = 0;
  };
  right.release = function() {
    if (!left.isDown && explorer.vy === 0) {
      explorer.vx = 0;
    }
  };

  //Down
  down.press = function() {
    explorer.vy = 5;
    explorer.vx = 0;
  };
  down.release = function() {
    if (!up.isDown && explorer.vx === 0) {
      explorer.vy = 0;
    }
  };

  //Set the game state
  state = play;
}

function startGame() {

  //Make the sprites and add them to the `gameScene`
  //Create an alias for the texture atlas frame ids
  id = resources["images/treasureHunter.json"].textures;
  //Dungeon
  mapPricing = new PIXI.Texture(resources["images/beach_theme.png"].texture, new PIXI.Rectangle(0, 0, 840, 680));
  mapInsights = new PIXI.Texture(resources["images/cabin_theme.png"].texture, new PIXI.Rectangle(0, 0, 840, 680));
  mapSignal = new PIXI.Texture(resources["images/beach_theme.png"].texture, new PIXI.Rectangle(0, 0, 840, 680));
  mapRelay = new PIXI.Texture(resources["images/cabin_theme.png"].texture, new PIXI.Rectangle(0, 0, 840, 680));
  mapGuidance = new PIXI.Texture(resources["images/beach_theme.png"].texture, new PIXI.Rectangle(0, 0, 840, 680));

  currentState = products.Pricing.label;
  sPricing = new Sprite(mapPricing);
  sInsights = new Sprite(mapInsights);
  sSignal = new Sprite(mapSignal);
  sRelay = new Sprite(mapRelay);
  sGuidance = new Sprite(mapGuidance);

  gameScene.addChild(sPricing);

  startLevel(products.Pricing.label)
   sCoverTitle.interactive = false;
  //Start the game loop
  app.ticker.add(delta => gameLoop(delta));
}



function setup() {
  //Make the game scene and add it to the stage
  //Cover map
  let cover= new PIXI.Texture(resources["images/title_screen.png"].texture, new PIXI.Rectangle(0, 0, 840, 680));
  sCoverTitle = new Sprite(cover);
  gameScene = new Container();
  app.stage.addChild(gameScene);
  gameScene.addChild(sCoverTitle);
  sCoverTitle.interactive = true;
  sCoverTitle.on('mousedown', startGame);
  sCoverTitle.on('touchstart', startGame);
  beyondCreditsTotal=0;
  beyondCreditsThisRound=0;
  productCreditContainer.innerHTML = beyondCreditsTotal;
}


function gameLoop(delta){

  //Update the current game state:
  state(delta);
}

function onDown () {
  gameScene.removeChildren()
  start()
  startLevel(products.Pricing.label)
  state = play
}

function play(delta) {


  //use the explorer's velocity to make it move
  explorer.x += explorer.vx;
  explorer.y += explorer.vy;

  //Contain the explorer inside the area of the dungeon
  contain(explorer, {x: 5, y: 5, width: 850, height: 680});
  //contain(explorer, stage);

  //Set `explorerHit` to `false` before checking for a collision
  let explorerHit = false;

  //Loop through all the sprites in the `enemies` array
  blobs.forEach(function(blob) {

    //Move the blob
    blob.y += blob.vy;

    //Check the blob's screen boundaries
    let blobHitsWall = contain(blob, {x: 5, y: 5, width: 850, height: 680});

    //If the blob hits the top or bottom of the stage, reverse
    //its direction
    if (blobHitsWall === "top" || blobHitsWall === "bottom") {
      blob.vy *= -1;
    }

    //Test for a collision. If any of the enemies are touching
    //the explorer, set `explorerHit` to `true`
    if(hitTestRectangle(explorer, blob)) {
      explorerHit = true;
    }
  });

  //If the explorer is hit...
  if(explorerHit) {

    //Make the explorer semi-transparent
    explorer.alpha = 0.5;

    //Reduce the width of the health bar's inner rectangle by 1 pixel
    healthBar.outer.width -= 1;

  } else {

    //Make the explorer fully opaque (non-transparent) if it hasn't been hit
    explorer.alpha = 1;
  }

  //Check for a collision between the explorer and the treasure
  if (hitTestRectangle(explorer, treasure)) {
    beyondCreditsThisRound = 5;
    console.log(beyondCreditsThisRound)
    //If the treasure is touching the explorer, center it over the explorer
    treasure.x = explorer.x + 8;
    treasure.y = explorer.y + 8;
  }

  //Does the explorer have enough health? If the width of the `innerBar`
  //is less than zero, end the game and display "You lost!"
  if (healthBar.outer.width < 0) {
    state = end;
    message.text = "Try again!";
    message.interactive = true;
    message.on('mousedown', onDown);
    message.on('touchstart', onDown);
    currentState = '';
    beyondCreditsTotal=0;
    beyondCreditsThisRound=0;
    productCreditContainer.innerHTML = beyondCreditsTotal;
    pricingContainer.classList.add("opacity-3");
    insightsContainer.classList.add("opacity-3");
    signalContainer.classList.add("opacity-3");
    relayContainer.classList.add("opacity-3");
    guidanceContainer.classList.add("opacity-3");
  }


  //If the explorer has brought the treasure to the exit,
  //end the game and display "You won!"
  if (hitTestRectangle(treasure, exitDoor)) {
    if (currentState === products.Pricing.label) {
      currentState = products.Insights.label;
      gameScene.addChild(sInsights);
      pricingContainer.classList.remove("opacity-3");
      startLevel(products.Insights.label)
    } else if (currentState === products.Insights.label) {
      gameScene.addChild(sSignal);
      currentState = products.Signal.label;
      insightsContainer.classList.remove("opacity-3");
      startLevel(products.Signal.label)
    } else if (currentState === products.Signal.label) {
      gameScene.addChild(sRelay);
      currentState = products.Relay.label;
      signalContainer.classList.remove("opacity-3");
      startLevel(products.Relay.label)
    } else if (currentState === products.Relay.label) {
      gameScene.addChild(sGuidance);
      currentState = products.Guidance.label;
      relayContainer.classList.remove("opacity-3");
      startLevel(products.Guidance.label)
    } else if (currentState === products.Guidance.label) {
      productCreditContainer.innerHTML = beyondCreditsTotal +5;
      guidanceContainer.classList.remove("opacity-3");
      message.text = "You won!";
      state = end
      // message.interactive = true;
      // message.on('mousedown', onDown);
      // message.on('touchstart', onDown);
      // currentState = ''
    } else {
      beyondCreditsTotal=0;
      beyondCreditsThisRound=0;
      currentState = products.Pricing.label;
      gameScene.addChild(sPricing);
      startLevel(products.Pricing.label)
    }
  }
}

function end() {
  gameScene.visible = false;
  gameOverScene.visible = true;
}

function start() {
  gameScene.visible = true;
  gameOverScene.visible = false;
}

/* Helper functions */

function contain(sprite, container) {

  let collision = undefined;

  //Left
  if (sprite.x < container.x) {
    sprite.x = container.x;
    collision = "left";
  }

  //Top
  if (sprite.y < container.y) {
    sprite.y = container.y;
    collision = "top";
  }

  //Right
  if (sprite.x + sprite.width > container.width) {
    sprite.x = container.width - sprite.width;
    collision = "right";
  }

  //Bottom
  if (sprite.y + sprite.height > container.height) {
    sprite.y = container.height - sprite.height;
    collision = "bottom";
  }

  //Return the `collision` value
  return collision;
}

//The `hitTestRectangle` function
function hitTestRectangle(r1, r2) {

  //Define the variables we'll need to calculate
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

  //hit will determine whether there's a collision
  hit = false;

  //Find the center points of each sprite
  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;

  //Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {

    //A collision might be occurring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {

      //There's definitely a collision happening
      hit = true;
    } else {

      //There's no collision on the y axis
      hit = false;
    }
  } else {

    //There's no collision on the x axis
    hit = false;
  }

  //`hit` will be either `true` or `false`
  return hit;
};


//The `randomInt` helper function
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//The `keyboard` helper function
function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
      "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
      "keyup", key.upHandler.bind(key), false
  );
  return key;
}


