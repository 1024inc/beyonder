// ;(function() {
//
//   var app, displacementSprite, displacementFilter;
//   const startingWidth = window.innerWidth
//   const startingHeight = window.innerHeight
//
//   function initPixi() {
//     app = new PIXI.Application({
//       width: window.innerWidth,
//       height: window.innerHeight,
//       // resizeTo: window,
//     });
//     let waterContainer = document.getElementById('water');
//
//
//
//   waterContainer.appendChild(app.view);
//     var image = new PIXI.Sprite.from("scripts/home/water.jpeg");
//     image.width = window.innerWidth;
//     image.height = window.innerHeight;
//     app.stage.addChild(image);
//     displacementSprite = new PIXI.Sprite.from("scripts/home/bw.png");
//     displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
//     displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
//     app.stage.addChild(displacementSprite);
//     app.stage.filters = [displacementFilter];
//     app.renderer.view.style.transform = 'scale(1.02)';
//     displacementSprite.scale.x = 4;
//     displacementSprite.scale.y = 4;
//     animate();
//   }
//
//   function animate() {
//     displacementSprite.x += 10;
//     displacementSprite.y += 6;
//     requestAnimationFrame(animate);
//   }
//
//   function resize() {
//     app.stage.scale.x = window.innerWidth / startingWidth;
//     app.stage.scale.y = window.innerHeight / startingHeight;
//     app.renderer.resize(window.innerWidth, window.innerHeight);
//   }
//
//   initPixi();
//   // window.addEventListener('resize', resize);
//
// })();
