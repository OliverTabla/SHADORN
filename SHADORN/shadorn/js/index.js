const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const dpr = window.devicePixelRatio || 1;

const gameWidth = 1920; // Ancho del mapa original
const gameHeight = 1080; // Altura del mapa original

function resizeCanvas() {
  const scaleX = window.innerWidth / gameWidth;
  const scaleY = window.innerHeight / gameHeight;

  // Usar el menor factor de escala para mantener la proporción
  const scale = Math.min(scaleX, scaleY);

  canvas.width = gameWidth * scale * dpr;
  canvas.height = gameHeight * scale * dpr;
  canvas.style.width = `${gameWidth * scale}px`;
  canvas.style.height = `${gameHeight * scale}px`;

  c.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0);
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const oceanLayerData = {
  l_Sky_Ocean: l_Sky_Ocean,
};

const BrambleLayerData = {
  l_Bramble: l_Bramble,
};

const layersData = {
  l_Back_Tiles: l_Back_Tiles,
  l_Front_Tiles: l_Front_Tiles,
  l_Decorations: l_Decorations,
  l_Front_Tiles_2: l_Front_Tiles_2,
  l_Gems: l_Gems,
  l_Collisions: l_Collisions,
};

const tilesets = {
  l_Sky_Ocean: { imageUrl: './images/decorations.png', tileSize: 16 },
  l_Bramble: { imageUrl: './images/decorations.png', tileSize: 16 },
  l_Back_Tiles: { imageUrl: './images/tileset.png', tileSize: 16 },
  l_Front_Tiles: { imageUrl: './images/tileset.png', tileSize: 16 },
  l_Decorations: { imageUrl: './images/decorations.png', tileSize: 16 },
  l_Front_Tiles_2: { imageUrl: './images/tileset.png', tileSize: 16 },
  l_Gems: { imageUrl: './images/decorations.png', tileSize: 16 },
  l_Collisions: { imageUrl: './images/decorations.png', tileSize: 16 },
};

const collisionBlocks = [];
const platforms = [];
const blockSize = 16;

collisions.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 1) {
      collisionBlocks.push(
        new CollisionBlock({
          x: x * blockSize,
          y: y * blockSize,
          size: blockSize,
        })
      );
    } else if (symbol === 2) {
      platforms.push(
        new Platform({
          x: x * blockSize,
          y: y * blockSize + blockSize,
          width: 16,
          height: 4,
        })
      );
    }
  });
});

const renderLayer = (tilesData, tilesetImage, tileSize, context) => {
  tilesData.forEach((row, y) => {
    row.forEach((symbol, x) => {
      if (symbol !== 0) {
        const srcX = ((symbol - 1) % (tilesetImage.width / tileSize)) * tileSize;
        const srcY =
          Math.floor((symbol - 1) / (tilesetImage.width / tileSize)) * tileSize;

        context.drawImage(
          tilesetImage, // source image
          srcX,
          srcY, // source x, y
          tileSize,
          tileSize, // source width, height
          x * blockSize,
          y * blockSize, // destination x, y
          blockSize,
          blockSize // destination width, height
        );
      }
    });
  });
};

const renderStaticLayers = async (layersData) => {
  const offscreenCanvas = document.createElement('canvas');
  offscreenCanvas.width = gameWidth;
  offscreenCanvas.height = gameHeight;
  const offscreenContext = offscreenCanvas.getContext('2d');

  for (const [layerName, tilesData] of Object.entries(layersData)) {
    const tilesetInfo = tilesets[layerName];
    if (tilesetInfo) {
      try {
        const tilesetImage = await loadImage(tilesetInfo.imageUrl);
        renderLayer(
          tilesData,
          tilesetImage,
          tilesetInfo.tileSize,
          offscreenContext
        );
      } catch (error) {
        console.error(`Failed to load image for layer ${layerName}:`, error);
      }
    }
  }

  return offscreenCanvas;
};

const player = new Player({
  x: 90,
  y: 230,
  size: 16,
  velocity: { x: 0, y: 0 },
});

const keys = {
  w: { pressed: false },
  a: { pressed: false },
  d: { pressed: false },
};

let lastTime = performance.now();
const camera = { x: 0, y: 0 };
const SCROLL_POST_RIGHT = 220;
const SCROLL_POST_TOP = 100;
const SCROLL_POST_BOTTOM = 200;

let oceanbackgroundCanvas = null;
let bramblebackgroundCanvas = null;

function animate(backgroundCanvas) {
  const currentTime = performance.now();
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  player.handleInput(keys);
  player.update(deltaTime, collisionBlocks);

  if (player.x > SCROLL_POST_RIGHT && player.x < 1485) {
    camera.x = player.x - SCROLL_POST_RIGHT;
  }

  if (player.y < SCROLL_POST_TOP && camera.y > 0) {
    camera.y = SCROLL_POST_TOP - player.y;
  }

  if (player.y > SCROLL_POST_BOTTOM) {
    camera.y = -(player.y - SCROLL_POST_BOTTOM);
  }

  c.save();
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.scale(dpr + 2, dpr + 2)
  c.translate(-camera.x, camera.y);
  c.drawImage(oceanbackgroundCanvas, camera.x * 0.32, 0);
  c.drawImage(bramblebackgroundCanvas, camera.x * 0.16, 0);
  c.drawImage(backgroundCanvas, 0, 0);
  player.draw(c);
  c.restore();

  requestAnimationFrame(() => animate(backgroundCanvas));
}

const startRendering = async () => {
  try {
    oceanbackgroundCanvas = await renderStaticLayers(oceanLayerData);
    bramblebackgroundCanvas = await renderStaticLayers(BrambleLayerData);
    const backgroundCanvas = await renderStaticLayers(layersData);
    animate(backgroundCanvas);
  } catch (error) {
    console.error('Error during rendering:', error);
  }
};

startRendering();
