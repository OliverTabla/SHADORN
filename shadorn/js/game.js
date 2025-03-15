
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const dpr = window.devicePixelRatio || 1;

const gameWidth = 6480; // Ancho del mapa original
const gameHeight = 2580; // Altura del mapa original

function resizeCanvas() {

  const scaleX = window.innerWidth / gameWidth;
  const scaleY = window.innerHeight / gameHeight;

  // Usar el menor factor de escala para mantener la proporción
  const scale = Math.min(scaleX, scaleY);

  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;

  canvas.style.width = '100%';
  canvas.style.height = '100%';

  c.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0);
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const oceanLayerData = {
  l_fondo: l_fondo,
};

const BrambleLayerData = {
  l_Bramble: l_Bramble,
};

const layersData = {
  //l_fondo: l_fondo,
  //l_Bramble: l_Bramble,
  l_fondo_cueva: l_fondo_cueva,
  //l_vacio: l_vacio,
  l_lava: l_lava,
  l_suelo: l_suelo,
  l_pinchos: l_pinchos,
  l_entrada_cueva: l_entrada_cueva,
  //l_Gems: l_Gems,
  l_colisiones: l_colisiones,
  //l_META: l_META,
};

const tilesets = {
  l_fondo: { imageUrl: './images/decorations.png', tileSize: 16 },
  l_Bramble: { imageUrl: './images/decorations.png', tileSize: 16 },
  l_fondo_cueva: { imageUrl: './images/public', tileSize: 16 },
  l_vacio: { imageUrl: './images/public', tileSize: 16 },
  l_suelo: { imageUrl: './images/public', tileSize: 16 },
  l_lava: { imageUrl: './images/public', tileSize: 16 },
  l_pinchos: { imageUrl: './images/public', tileSize: 16 },
  l_Gems: { imageUrl: './images/decorations.png', tileSize: 16 },
  l_colisiones: { imageUrl: './images/public', tileSize: 16 },
  l_META: { imageUrl: './images/decorations.png', tileSize: 16 },
  l_entrada_cueva: { imageUrl: './images/public', tileSize: 16 },
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
          y: y * blockSize,
          size: blockSize,
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
          tilesetImage, // resolucio de imagen
          srcX,
          srcY, // resolucion x y
          tileSize,
          tileSize, // resolucion anchura y altura
          x * blockSize,
          y * blockSize, // destino de x y
          blockSize,
          blockSize // destino de anchura y altura
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
//posicion de la lava
let lava1 = []
let lavas1 = []
l_lava.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 153) {
      lavas1.push(
        new Explosion({
          x: x * 16, 
          y: y * 16, 
          width:  32,
          height: 32,
  
          spriteCropbox: {
            x: 0,
            y: 0,
            width: 32,
            height: 32,
            frames: 1,
          },
          hitbox: {
            x: x * 16, 
            y: y * 16, 
            width:  24,
            height: 32,
          },
        },
      ),
    )
    }
  });
});

//colocar caida
let caida = []
let caidas = []
l_vacio.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 145) {
      caidas.push(
        new Explosion({
          x: x * 16, 
          y: y * 16, 
          width:  33,
          height: 32,
          imageSrc: './images/vacio.png',
          spriteCropbox: {
            x: 0,
            y: 0,
            width: 31,
            height: 31,
            frames: 1,
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
//colocar pinchos
let pincho = []
let pinchos = []
l_pinchos.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 157) {
      pinchos.push(
        new Explosion({
          x: x * 16, 
          y: y * 16, 
          width:  32,
          height: 32,
          imageSrc: './assets/entities/pincho.png',
          spriteCropbox: {
            x: 0,
            y: 0,
            width: 31,
            height: 31,
            frames: 1,
          },
          hitbox: {
            x: x * 16, 
            y: y * 16, 
            width:  9,
            height: 18,
          },
        },
      ),
    )
    }
  });
});
//colocar la meta
let meta = []
let metas = []
l_META.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 52) {
      metas.push(
        new Explosion({
          x: x * 16, 
          y: y * 16, 
          width:  32,
          height: 32,
          imageSrc: './assets/entities/meta.png',
          spriteCropbox: {
            x: 0,
            y: 0,
            width: 31,
            height: 31,
            frames: 1,
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

let player = new Player({
  x: 64,
  y: 64,
  size: 60,
  velocity: { x: 0, y: 0 },
});

let rockys =  [
  new Rocky({
    x: 446,
    y: 128,
    width: 40,
    height: 40,
  }),
  new Rocky({
    x: 896,
    y: 160,
    width: 40,
    height: 40,
  }),
  new Rocky({
    x: 1520,
    y: 160,
    width: 40,
    height: 40,
  }),
  new Rocky({
    x: 2480,
    y: 192,
    width: 40,
    height: 40,
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
function teleport(){
  player = new Player({
    x: 6112,
    y: 352,
    size: 16,
    velocity: { x: 0, y: 0 },
  });
  camera = { x: 4800, y: 0 };
}
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
  
let meta = []
let metas = []
l_META.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 52) {
      meta.push(
        new Explosion({
          x: x * 16, 
          y: y * 16, 
          width:  128,
          height: 128,
          imageSrc: './assets/entities/meta.png',
          spriteCropbox: {
            x: 0,
            y: 0,
            width: 31,
            height: 31,
            frames: 1,
          },
          hitbox: {
            x: x * 16, 
            y: y * 16, 
            width:  128,
            height: 128,
          },
        },
      ),
    )
    }
  });
});

  player = new Player({
    x: 64,
    y: 112,
    size: 16,
    velocity: { x: 0, y: 0 },
  });
  
  rockys =  [
    new Rocky({
      x: 446,
      y: 128,
      width: 40,
      height: 40,
    }),
    new Rocky({
      x: 896,
      y: 160,
      width: 40,
      height: 40,
    }),
    new Rocky({
      x: 1520,
      y: 160,
      width: 40,
      height: 40,
    }),
    new Rocky({
      x: 2272,
      y: 160,
      width: 40,
      height: 40,
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
          width: 40,
          height: 40,
          imageSrc: './assets/entities/explosion.png',
          spriteCropbox: {
            x: 0,
            y: -10,
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

  for (let i = lavas1.length - 1; i >= 0;  i--) {
    const lava1 = lavas1[i]
    lava1.update(deltaTime)

    
    const collisionDirection = checkCollision (player, lava1)  
    if (collisionDirection) {
      //al tocar la lava1 te hace daño
      if (collisionDirection === 'left' || 
        collisionDirection === 'right' || 
        collisionDirection === 'top' || 
        collisionDirection === 'bottom') {
          init()
        }
      else {
        init()
      }
    }
  }


  for (let i = caidas.length - 1; i >= 0;  i--) {
    const caida = caidas[i]
    caida.update(deltaTime)

    
    const collisionDirection = checkCollision (player, caida)  
    if (collisionDirection) {
      //al tocar la caida te hace daño
      if (collisionDirection === 'left' || 
        collisionDirection === 'right' || 
        collisionDirection === 'top' || 
        collisionDirection === 'bottom') {
          init()
        }
      else {
        init()
      }
    }
  }

  for (let i = pinchos.length - 1; i >= 0;  i--) {
    const pincho = pinchos[i]
    pincho.update(deltaTime)

    
    const collisionDirection = checkCollision (player, pincho)  
    if (collisionDirection) {
      //al tocar el pincho te hace daño
      if (collisionDirection === 'left' || 
        collisionDirection === 'right' || 
        collisionDirection === 'top' || 
        collisionDirection === 'bottom') {
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

  for (let i = metas.length - 1; i >= 0;  i--) {
    const meta = metas[i]
    meta.update(deltaTime)

    
    const collisionDirection = checkCollision (player, meta)  
    if (collisionDirection) {
      //al tocar la meta acaba el contador
      if (collisionDirection === 'left' || 
        collisionDirection === 'right' || 
        collisionDirection === 'top' || 
        collisionDirection === 'bottom') {
        pausar();
      }
    }
  }
  

  if (player.x > SCROLL_POST_RIGHT && player.x < 6224) {
    camera.x = player.x - SCROLL_POST_RIGHT;
  }

  if (player.y < SCROLL_POST_TOP && camera.y > 0) {
    camera.y = SCROLL_POST_TOP - player.y;
  }

  if (player.y > SCROLL_POST_BOTTOM && camera.y < 20) {
    camera.y = -(player.y - SCROLL_POST_BOTTOM);
  }

  c.save();
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.scale(dpr + 8, dpr + 7)
  c.translate(-camera.x, camera.y);
  c.drawImage(oceanbackgroundCanvas, camera.x * 0.32, 0);
  c.drawImage(bramblebackgroundCanvas, camera.x * 0.25, 0);
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

  

  for (let i = caidas.length - 1; i >= 0;  i--) {
    const caida = caidas [i]
    caida.draw(c)
  }
  
  for (let i = pinchos.length - 1; i >= 0;  i--) {
    const pincho = pinchos [i]
    pincho.draw(c)
  }

  for (let i = lavas1.length - 1; i >= 0;  i--) {
    const lava1 = lavas1 [i]
    lava1.draw(c)
  }


  for (let i = metas.length - 1; i >= 0;  i--) {
    const meta = metas [i]
    meta.draw(c)
  }

  

  
  c.restore();

  //UI guardar y restaurar
  c.save();
  c.scale(dpr + 6, dpr + 5);
  for (let i = corazones.length - 1; i >= 0;  i--) {
    const corazon = corazones [i]
    corazon.draw(c)
  }
  document.getElementById('tiempo');
  gemUI.draw(c);
  c.fillText(gemCount, 40, 67 );
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


init();
iniciar();
startRendering();
