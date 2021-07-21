// let state, explorer, treasure, blobs, chimes, exit, player, dungeon,
//     door, healthBar, message, gameScene, gameOverScene, enemies, id;
//
// export function setup(app, statsContainer, loader, resources) {
//       //Make the game scene and add it to the stage
//   gameScene = new Container();
//   app.stage.addChild(gameScene);
//
//   //Make the sprites and add them to the `gameScene`
//   //Create an alias for the texture atlas frame ids
//   id = resources["images/treasureHunter.json"].textures;
//
//   //Dungeon
//   dungeon = new Sprite(id["dungeon.png"]);
//   gameScene.addChild(dungeon);
//
//   //Door
//   door = new Sprite(id["door.png"]);
//   door.position.set(32, 0);
//   gameScene.addChild(door);
//
//   //Explorer
//   explorer = new Sprite(id["explorer.png"]);
//   explorer.x = 68;
//   explorer.y = gameScene.height / 2 - explorer.height / 2;
//   explorer.vx = 0;
//   explorer.vy = 0;
//   gameScene.addChild(explorer);
//
//   //Treasure
//   treasure = new Sprite(id["treasure.png"]);
//   treasure.x = gameScene.width - treasure.width - 48;
//   treasure.y = gameScene.height / 2 - treasure.height / 2;
//   gameScene.addChild(treasure);
//
//   //Make the blobs
//   let numberOfBlobs = 6,
//       spacing = 48,
//       xOffset = 150,
//       speed = 2,
//       direction = 1;
//
//   //An array to store all the blob monsters
//   blobs = [];
//
//   //Make as many blobs as there are `numberOfBlobs`
//   for (let i = 0; i < numberOfBlobs; i++) {
//
//     //Make a blob
//     let blob = new Sprite(id["blob.png"]);
//
//     //Space each blob horizontally according to the `spacing` value.
//     //`xOffset` determines the point from the left of the screen
//     //at which the first blob should be added
//     let x = spacing * i + xOffset;
//
//     //Give the blob a random y position
//     let y = randomInt(0, app.stage.height - blob.height);
//
//     //Set the blob's position
//     blob.x = x;
//     blob.y = y;
//
//     //Set the blob's vertical velocity. `direction` will be either `1` or
//     //`-1`. `1` means the enemy will move down and `-1` means the blob will
//     //move up. Multiplying `direction` by `speed` determines the blob's
//     //vertical direction
//     blob.vy = speed * direction;
//
//     //Reverse the direction for the next blob
//     direction *= -1;
//
//     //Push the blob into the `blobs` array
//     blobs.push(blob);
//
//     //Add the blob to the `gameScene`
//     gameScene.addChild(blob);
//   }
//
//   //Create the health bar
//   healthBar = new Container();
//   healthBar.position.set(app.stage.width - 170, 4)
//   gameScene.addChild(healthBar);
//
//   //Create the black background rectangle
//   let innerBar = new Graphics();
//   innerBar.beginFill(0x000000);
//   innerBar.drawRect(0, 0, 128, 8);
//   innerBar.endFill();
//   healthBar.addChild(innerBar);
//
//   //Create the front red rectangle
//   let outerBar = new Graphics();
//   outerBar.beginFill(0xFF3300);
//   outerBar.drawRect(0, 0, 128, 8);
//   outerBar.endFill();
//   healthBar.addChild(outerBar);
//
//   healthBar.outer = outerBar;
//
//   //Create the `gameOver` scene
//   gameOverScene = new Container();
//   app.stage.addChild(gameOverScene);
//
//   //Make the `gameOver` scene invisible when the game first starts
//   gameOverScene.visible = false;
//
//   //Create the text sprite and add it to the `gameOver` scene
//   let style = new TextStyle({
//     fontFamily: "Futura",
//     fontSize: 64,
//     fill: "white"
//   });
//   message = new Text("The End!", style);
//   message.x = 120;
//   message.y = app.stage.height / 2 - 32;
//   gameOverScene.addChild(message);
//
//   //Capture the keyboard arrow keys
//   let left = keyboard(37),
//       up = keyboard(38),
//       right = keyboard(39),
//       down = keyboard(40);
//
//   //Left arrow key `press` method
//   left.press = function() {
//
//     //Change the explorer's velocity when the key is pressed
//     explorer.vx = -5;
//     explorer.vy = 0;
//   };
//
//   //Left arrow key `release` method
//   left.release = function() {
//
//     //If the left arrow has been released, and the right arrow isn't down,
//     //and the explorer isn't moving vertically:
//     //Stop the explorer
//     if (!right.isDown && explorer.vy === 0) {
//       explorer.vx = 0;
//     }
//   };
//
//   //Up
//   up.press = function() {
//     explorer.vy = -5;
//     explorer.vx = 0;
//   };
//   up.release = function() {
//     if (!down.isDown && explorer.vx === 0) {
//       explorer.vy = 0;
//     }
//   };
//
//   //Right
//   right.press = function() {
//     explorer.vx = 5;
//     explorer.vy = 0;
//   };
//   right.release = function() {
//     if (!left.isDown && explorer.vy === 0) {
//       explorer.vx = 0;
//     }
//   };
//
//   //Down
//   down.press = function() {
//     explorer.vy = 5;
//     explorer.vx = 0;
//   };
//   down.release = function() {
//     if (!up.isDown && explorer.vx === 0) {
//       explorer.vy = 0;
//     }
//   };
//
//   //Set the game state
//   state = play;
//
//   //Start the game loop
//   app.ticker.add(delta => gameLoop(delta));
//
//
//
// };
