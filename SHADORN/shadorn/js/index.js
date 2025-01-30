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
  //l_Gems: { imageUrl: './images/decorations.png', tileSize: 16 },
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

let player = new Player({
  x: 70,
  y: 200,
  size: 60,
  velocity: { x: 0, y: 0 },
});

let rockys =  [
  new Rocky({
    x: 528,
    y: 224,
    width: 50,
    height: 50,
  }),
]

let explosiones = []
let corazones = [
  new Corazon({
    x: 10, 
    y: 10, 
    width: 35, 
    height: 35, 
    imageSrc: './assets/entities/corazon.png', 
    spriteCropbox: {
      x: 0,
      y: 0,
      width: 80,
      height: 80,
      frames: 6,
    },
  }),
  new Corazon({
    x: 45, 
    y: 10, 
    width: 35, 
    height: 35, 
    imageSrc: './assets/entities/corazon.png', 
    spriteCropbox: {
      x: 0,
      y: 0,
      width: 80,
      height: 80,
      frames: 6,
    },
  }),
  new Corazon({
    x: 80, 
    y: 10, 
    width: 35, 
    height: 35, 
    imageSrc: './assets/entities/corazon.png', 
    spriteCropbox: {
      x: 0,
      y: 0,
      width: 80,
      height: 80,
      frames: 6,
    },
  })
]

const keys = {
  w: { pressed: false },
  a: { pressed: false },
  d: { pressed: false },
};

let lastTime = performance.now();
let camera = { x: 0, y: 0 };
const SCROLL_POST_RIGHT = 220;
const SCROLL_POST_TOP = 100;
const SCROLL_POST_BOTTOM = 200;

let oceanbackgroundCanvas = null;
let bramblebackgroundCanvas = null;
let gems = []
let gemUI = new Explosion ({
  x: 18, 
  y: 55, 
  width:  18,
  height: 18,
  imageSrc: './assets/entities/perla.png',
  spriteCropbox: {
    x: 0,
    y: 0,
    width: 31,
    height: 31,
    frames: 5,
  },
})
let gemCount = 0

function init() {
  gems = []
  gemCount = 0
  gemUI = new Explosion ({
    x: 18, 
    y: 55, 
    width:  18,
    height: 18,
    imageSrc: './assets/entities/perla.png',
    spriteCropbox: {
      x: 0,
      y: 0,
      width: 31,
      height: 31,
      frames: 5,
    },
  })

  l_Gems.forEach((row, y) => {
    row.forEach((symbol, x) => {
      if (symbol === 18) {
        gems.push(
          new Explosion({
            x: x * 16, 
            y: y * 16, 
            width:  18,
            height: 18,
            imageSrc: './assets/entities/perla.png',
            spriteCropbox: {
              x: 0,
              y: 0,
              width: 31,
              height: 31,
              frames: 5,
            },
            hitbox: {
              x: x * 16, 
              y: y * 16, 
              width:  32,
              height: 32,
            },
          },
        ),
      )
      }
    });
  });


  player = new Player({
    x: 70,
    y: 140,
    size: 16,
    velocity: { x: 0, y: 0 },
  });
  
  rockys =  [
    new Rocky({
      x: 528,
      y: 224,
      width: 50,
      height: 50,
    }),
  ]
  
  explosiones = []
  corazones = [
    new Corazon({
      x: 10, 
      y: 10, 
      width: 35, 
      height: 35, 
      imageSrc: './assets/entities/corazon.png', 
      spriteCropbox: {
        x: 0,
        y: 0,
        width: 80,
        height: 80,
        frames: 6,
      },
    }),
    new Corazon({
      x: 45, 
      y: 10, 
      width: 35, 
      height: 35, 
      imageSrc: './assets/entities/corazon.png', 
      spriteCropbox: {
        x: 0,
        y: 0,
        width: 80,
        height: 80,
        frames: 6,
      },
    }),
    new Corazon({
      x: 80, 
      y: 10, 
      width: 35, 
      height: 35, 
      imageSrc: './assets/entities/corazon.png', 
      spriteCropbox: {
        x: 0,
        y: 0,
        width: 80,
        height: 80,
        frames: 6,
      },
    })
  ]

  camera = { x: 0, y: 0 };
}
function animate(backgroundCanvas) {
  const currentTime = performance.now();
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  //actualizar posicion jugador
  player.handleInput(keys);
  player.update(deltaTime, collisionBlocks);

  //actualizar posicion rocky
  for (let i = rockys.length - 1; i >= 0;  i--) {
    const rocky = rockys[i]
    rocky.update(deltaTime, collisionBlocks);

    // Salta en un enemigo
    const collisionDirection = checkCollision (player, rocky)
    if (collisionDirection) {
      if (collisionDirection === 'bottom' && !player.isOnGround) {
      player.velocity.y = -150
      explosiones.push(
        new Explosion({
          x: rocky.x, 
          y: rocky.y, 
          width: 32,
          height: 32,
          imageSrc: './assets/entities/explosion.png',
          spriteCropbox: {
            x: 0,
            y: 0,
            width: 52,
            height: 51,
            frames: 6,
          },
        }),
      )
      
      rockys.splice(i, 1)
    } else if (collisionDirection === 'left' || 
      collisionDirection === 'right'
    ) {
      const fullCorazones = corazones.filter((corazon) => {
        return !corazon.depleted
      })

      if (!player.isInvincible && fullCorazones.length > 0) {
        fullCorazones[fullCorazones.length - 1].depleted = true
      } else if (fullCorazones.length === 0) {
        init()
      }

      player.setIsInvincible()
    }
  }
}

  for (let i = explosiones.length - 1; i >= 0;  i--) {
    const explosion = explosiones[i]
    explosion.update(deltaTime)
      
    if (explosion.iteration === 1) {
      explosiones.splice(i, 1)
    }
  }

  for (let i = gems.length - 1; i >= 0;  i--) {
    const gem = gems[i]
    gem.update(deltaTime)

    
    const collisionDirection = checkCollision (player, gem)  
    if (collisionDirection) {
      //crea una animacion al agarrar la perla
      explosiones.push(
        new Explosion({
          x: gem.x, 
          y: gem.y, 
          width: 18,
          height: 18,
          imageSrc: './assets/entities/perlaex.png',
          spriteCropbox: {
            x: 0,
            y: 0,
            width: 31,
            height: 31,
            frames: 5,
          },
        }),
      )
      //quita la perla del juego
      gems.splice(i, 1)
      gemCount++
    }
  }
  

  

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

  for (let i = rockys.length - 1; i >= 0;  i--) {
    const rocky = rockys[i]
    rocky.draw(c)
  }

  for (let i = explosiones.length - 1; i >= 0;  i--) {
    const explosion = explosiones [i]
    explosion.draw(c)
  }

  for (let i = gems.length - 1; i >= 0;  i--) {
    const gem = gems [i]
    gem.draw(c)
  }

  

  
  c.restore();

  //UI guardar y restaurar
  c.save();
  c.scale(dpr + 2, dpr + 2);
  for (let i = corazones.length - 1; i >= 0;  i--) {
    const corazon = corazones [i]
    corazon.draw(c)
  }

  gemUI.draw(c)
  c.fillText(gemCount, 40, 67)
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

init()
startRendering();
