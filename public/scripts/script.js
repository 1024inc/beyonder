PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;


const app = new PIXI.Application({
  width: 480,
  height: 360
});

let appContainer = document.getElementById('app');
let statsContainer = document.getElementById('stats');
appContainer.appendChild(app.view);
// statsContainer.appendChild(stats.view);
app.view.setAttribute('tabindex', 0);

