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

// const canvas = document.querySelector("#canvas")
//
// const app = new PIXI.Application({
//   view: canvas,
//   width: 400,
//   height: 713,
//   transparent: true
// });
//
// var container = new PIXI.Container();
// app.stage.addChild(container);
//
//
// var renderer = new PIXI.autoDetectRenderer();
//
// const bg = PIXI.Sprite.fromImage('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1600187/federico-gutierrez-670926-unsplash.jpg');
//
// var ripples = [];
//
//
// const displacementSprite = PIXI.Sprite.fromImage('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1600187/waterTemp.jpg');
//
//
//
// displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
// displacementSprite.scale.set(1);
// displacementSprite.anchor.set(0);
//
// const loadSprite = PIXI.Sprite.fromImage('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1600187/waterTemp.jpg');
// loadSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
// loadSprite.scale.set(0.99);
// loadSprite.anchor.set(0.2);
//
// const loadFilter = new PIXI.filters.DisplacementFilter(loadSprite)
// loadFilter.scale.x = 0;
// loadFilter.scale.y = 0;
//
// container.filters = [loadFilter]
//
//
// var displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
// displacementFilter.scale.x = 10;
// displacementFilter.scale.y = 10;
// const filters = []
//
// filters.push(displacementFilter);
//
// for (let i = 0; i < 10; i++) {
//
//   const ripple = new PIXI.Sprite.fromImage('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1600187/ripple.png');
//
//   ripple.anchor.set(0.5);
//
//   ripple.scale.set(0);
//
//   app.stage.addChild(ripple);
//
//   const filter = new PIXI.filters.DisplacementFilter(ripple)
//   filters.push(filter)
//   ripples.push(ripple)
// }
//
// app.stage.filters = filters;
//
// bg.anchor.set(0.5);
// bg.position.set(200, 356.5);
// bg.width = app.renderer.width;
// bg.height = app.renderer.height;
//
// container.addChild(bg);
//
//
// const waves = TweenMax.to(displacementSprite.anchor, 44, {
//   y: "-2",
//   x: "-1",
//   ease: Power0.easeNone,
//   repeat: -1,
//   paused: true
// })
//
//
// let i = -1;
// app.view.addEventListener('mouseover', function(ev) {
//   i++
//   if (i > 9) {
//     i = 0;
//   }
//   MakeWaves((ev.clientX - canvas.offsetLeft), (ev.clientY - canvas.offsetTop), i);
// }, false)
//
// let runTweens = (ripple, filter) => {
//   TweenMax.fromTo(ripple.scale, 4,{ x: .1, y: .1 }, { x: 1.5, y: 1.5 })
//   TweenMax.fromTo(filter.scale, 4, { x: 50, y: 50 },{ x: 0, y: 0 })
// }
//
// function MakeWaves(x, y, i) {
//
//   ripples[i].position.set(x, y);
//   runTweens(ripples[i], filters[i + 1]);
// }
//
//
//
// TweenMax.from(container, 1, {
//   alpha: 0,
//   repeatDelay: 4,
//   ease: Power3.easeOut,
//   yoyo: true,
//   delay: 2,
// })
//
// TweenMax.from(loadSprite.anchor, 1, {
//   y: 0.35,
//   x: 0.25,
//   ease: Power1.easeOut,
//   repeatDelay: 4,
//   yoyo: true,
//   delay: 2,
//   onComplete: () => {waves.play()}
// })
// TweenMax.from(loadFilter.scale, 1, {
//   x: 900,
//   y: 9500,
//   ease: Power1.easeOut,
//   delay: 2,
// })
