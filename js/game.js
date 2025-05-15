
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const dpr = window.devicePixelRatio || 1;
const gameWidth = 13000; // Ancho del mapa original
const gameHeight = 1080; // Altura del mapa original
//Tamaño de la pantalla del juego
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
//Capas de las imagenes
const oceanLayerData = {
  l_fondo: l_fondo,
};
const BrambleLayerData = {
  l_Bramble: l_Bramble,
};
const sakuLayerData = {
  l_fondo_saku: l_fondo_saku,
};
const tuberiaLayerData = {
  l_tuberia: l_tuberia,
};
const arbols1LayerData = {
  l_arbols1: l_arbols1,
};
const entradaLayerData = {
  l_entrada_cueva: l_entrada_cueva,
}



const layersData = {
  //l_fondo: l_fondo,
  //l_Bramble: l_Bramble,
  l_fondo_cueva: l_fondo_cueva,
  //l_fondo_saku: l_fondo_saku,
  //l_teleport: l_teleport,
  //l_caidasaku: l_caidasaku,
  //l_vacio: l_vacio,
  l_lava: l_lava,
  l_arbols3: l_arbols3,
  l_arbols2: l_arbols2,
  //l_arbols1: l_arbols1,
  l_arbols: l_arbols,
  l_suelo: l_suelo,
  l_pinchos: l_pinchos,
  l_tuberia: l_tuberia,
  l_entrada_cueva: l_entrada_cueva,
  //l_Gems: l_Gems,
  //l_colisiones: l_colisiones,
  //l_META: l_META,
  l_decoracion1: l_decoracion1,
};
//Leer las fotos de las texturas
const tilesets = {
 l_fondo: { imageUrl: './images/decorations.png', tileSize: 16 },
 l_Bramble: { imageUrl: './images/decorations.png', tileSize: 16 },
 l_fondo_cueva: { imageUrl: './images/tileset.png', tileSize: 16 },
 l_fondo_saku: { imageUrl: './images/skura.png', tileSize: 16 },
 l_teleport: { imageUrl: './images/vacio.png', tileSize: 16 },
 l_caidasuku: { imageUrl: './images/tileset.png', tileSize: 16 },
 l_vacio: { imageUrl: './images/vacio.png', tileSize: 16 },
 l_lava: { imageUrl: './images/tileset.png', tileSize: 16 },
 l_arbols3: { imageUrl: './images/skuraos.png', tileSize: 16 },
 l_arbols2: { imageUrl: './images/skuraos.png', tileSize: 16 },
 l_arbols1: { imageUrl: './images/skura.png', tileSize: 16 },
 l_arbols: { imageUrl: './images/skura.png', tileSize: 16 },
 l_suelo: { imageUrl: './images/tileset.png', tileSize: 16 },
 l_pinchos: { imageUrl: './images/tileset.png', tileSize: 16 },
 l_tuberia: { imageUrl: './images/tuberia.png', tileSize: 16 },
 l_entrada_cueva: { imageUrl: './images/tileset.png', tileSize: 16 },
 l_Gems: { imageUrl: './images/decorations.png', tileSize: 16 },
 l_colisiones: { imageUrl: './images/public', tileSize: 16 },
 l_META: { imageUrl: './images/decorations.png', tileSize: 16 },
 l_decoracion1: { imageUrl: './images/decorations.png', tileSize: 16 },
};

//Tamaño del bloque
const collisionBlocks = [];
const platforms = [];
const blockSize = 16;
//Colisiones para los bloques
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
      //Colisiones para las plataformas
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
//Resolucion de las imagenes
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
//reproduce la cancion de fondo del nivel en bucle
const cancionP = new Audio ('./sonidos/cancionNivel.mp3');
cancionP.loop = true;
cancionP.volume = 0.15;

  //sonido de daño
  const dañoSonido = new Audio ('./sonidos/daño.mp3')
  cancionP.play();

  const enemydie = new Audio ('./sonidos/dañoEne.mp3')
  //Cracion de la lava
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
//Bloque oculto que te teletransporta
let tubo = []
let tubos = []
l_teleport.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 83) {
      tubos.push(
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
            width:  24,
            height: 12,
          },
        },
      ),
    )
    }
  });
});

//Barrera invisible de la caida
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
            width:  24,
            height: 12,
          },
        },
      ),
    )
    }
  });
});
//barrera invisible de la caida del bioma de arboles sakura
let caidasa = []
let caidasas = []
l_caidasaku.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 7) {
      caidasas.push(
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
            width:  24,
            height: 12,
          },
        },
      ),
    )
    }
  });
});

//Creacion de los pinchos
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
//Creacion de la meta
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
//Coloca las entidades a base de coordenadas
let player = new Player({
  x: 64,
  y: 10,
  size: 60,
  velocity: { x: 0, y: 0 },
});


let rockys =  [
  new Rocky({
    x: 160,
    y: 144,
    width: 40,
    height: 40,
  }),
  new Rocky({
    x: 496,
    y: 144,
    width: 40,
    height: 40,
  }),
  new Rocky({
    x: 752,
    y: 176,
    width: 40,
    height: 40,
  }),
  new Rocky({
    x: 3344,
    y: 160,
    width: 40,
    height: 40,
  }),
  new Rocky({
    x: 3472,
    y: 160,
    width: 40,
    height: 40,
  }),
  new Rocky({
    x: 4256,
    y: 192,
    width: 40,
    height: 40,
  }),
  new Rocky({
    x: 5040,
    y: 208,
    width: 40,
    height: 40,
  }),
  new Rocky({
    x: 6016,
    y: 368,
    width: 40,
    height: 40,
  }),
  new Rocky({
    x: 7104,
    y: 366,
    width: 40,
    height: 40,
  }),
  new Rocky({
    x: 7024,
    y: 496,
    width: 40,
    height: 40,
  }),
  new Rocky({
    x: 7792,
    y: 496,
    width: 40,
    height: 40,
  }),
  new Rocky({
    x: 8032,
    y: 576,
    width: 40,
    height: 40,
  }),
  new Rocky({
    x: 7760,
    y: 496,
    width: 40,
    height: 40,
  }),
  new Rocky({
    x: 9472,
    y: 192,
    width: 40,
    height: 40,
  }),
  new Rocky({
    x: 9952,
    y: 192,
    width: 40,
    height: 40,
  }),
  new Rocky({
    x: 10523,
    y: 192,
    width: 40,
    height: 40,
  }),
  new Rocky({
    x: 11200,
    y: 192,
    width: 40,
    height: 40,
  }),
  new Rocky({
    x: 11632,
    y: 144,
    width: 40,
    height: 40,
  }),
]

let jurks =  [
  new Jurk({
    x: 1504,
    y: 192,
    width: 50,
    height: 50,
  }),
  new Jurk({
    x: 3392,
    y: 160,
    width: 50,
    height: 50,
  }),
  new Jurk({
    x: 7392,
    y: 256,
    width: 50,
    height: 50,
  }),
  new Jurk({
    x: 7472,
    y: 256,
    width: 50,
    height: 50,
  }),
  new Jurk({
    x: 7568,
    y: 256,
    width: 50,
    height: 50,
  }),
  new Jurk({
    x: 9296,
    y: 192,
    width: 50,
    height: 50,
  }),
  new Jurk({
    x: 9584,
    y: 192,
    width: 50,
    height: 50,
  }),
  new Jurk({
    x: 9632,
    y: 192,
    width: 50,
    height: 50,
  }),
]




let gorks = [
  new Gork({
    x: 1072,
    y: 80,
    width: 50,
    height: 50,
  }),
  new Gork({
    x: 1552,
    y: 192,
    width: 50,
    height: 50,
  }),
  new Gork({
    x: 2288,
    y: 176,
    width: 50,
    height: 50,
  }),
  new Gork({
    x: 3920,
    y: 128,
    width: 50,
    height: 50,
  }),
  new Gork({
    x: 4400,
    y: 192,
    width: 50,
    height: 50,
  }),
  new Gork({
    x: 7024,
    y: 496,
    width: 50,
    height: 50,
  }),
  new Gork({
    x: 8096,
    y: 112,
    width: 50,
    height: 50,
  }),
  new Gork({
    x: 7968,
    y: 336,
    width: 50,
    height: 50,
  }),
  new Gork({
    x: 7040,
    y: 192,
    width: 50,
    height: 50,
  }),
  new Gork({
    x: 9504,
    y: 192,
    width: 50,
    height: 50,
  }),
  new Gork({
    x: 9776,
    y: 192,
    width: 50,
    height: 50,
  }),
  new Gork({
    x: 11488,
    y: 160,
    width: 50,
    height: 50,
  }),
]

let guards = [
  new Guard({
    x: 6576,
    y: 160,
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
]

const keys = {
  w: { pressed: false },
  a: { pressed: false },
  d: { pressed: false },
};

let lastTime = performance.now();
let camera = { x: 0, y: 0 };
//Cuando el jugador pasa ese limite empieza el scroll
const SCROLL_POST_RIGHT = 220;
const SCROLL_POST_TOP = 100; 
const SCROLL_POST_BOTTOM = 150; 

let oceanbackgroundCanvas = null;
let bramblebackgroundCanvas = null;
let sakubackgroundCanvas = null;
let tuberiaFrontCanvas = null;
let arbols1FrontCanvas = null;
let entradaFrontCanvas = null;
//Creacion de la moneda
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
//Teletransporta al jugador a una posicion especifica del mapa a base de coordenadas
function teleport(){
  player = new Player({
    x: 8096,
    y: 556,
    size: 16,
    velocity: { x: 0, y: 0 },
  });
  camera = { x: 12000, y: 0 };
}
function teletubo(){
  player = new Player({
    x: 9205,
    y: 16,
    size: 16,
    velocity: { x: 0, y: 0 },
  });
  camera = { x: 9200, y: 0 };
}
//Cuando el jugador es eliminado o le da a reiniciar recoloca todo
function init() {
  iniciar()
  reiniciar()
  cancionP.currentTime = 0;
  cancionP.play();
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
          width:  45,
          height: 45,
          imageSrc: './assets/entities/meta.png',
          spriteCropbox: {
            x: 0,
            y: 0,
            width: 45,
            height: 45,
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
      x: 160,
      y: 144,
      width: 40,
      height: 40,
    }),
    new Rocky({
      x: 496,
      y: 144,
      width: 40,
      height: 40,
    }),
    new Rocky({
      x: 752,
      y: 176,
      width: 40,
      height: 40,
    }),
    new Rocky({
      x: 3344,
      y: 160,
      width: 40,
      height: 40,
    }),
    new Rocky({
      x: 3472,
      y: 160,
      width: 40,
      height: 40,
    }),
    new Rocky({
      x: 4256,
      y: 192,
      width: 40,
      height: 40,
    }),
    new Rocky({
      x: 5040,
      y: 208,
      width: 40,
      height: 40,
    }),
    new Rocky({
      x: 6016,
      y: 368,
      width: 40,
      height: 40,
    }),
    new Rocky({
      x: 7104,
      y: 366,
      width: 40,
      height: 40,
    }),
    new Rocky({
      x: 7024,
      y: 496,
      width: 40,
      height: 40,
    }),
    new Rocky({
      x: 7792,
      y: 496,
      width: 40,
      height: 40,
    }),
    new Rocky({
      x: 8032,
      y: 576,
      width: 40,
      height: 40,
    }),
    new Rocky({
      x: 7760,
      y: 496,
      width: 40,
      height: 40,
    }),
    new Rocky({
      x: 9472,
      y: 192,
      width: 40,
      height: 40,
    }),
    new Rocky({
      x: 9952,
      y: 192,
      width: 40,
      height: 40,
    }),
    new Rocky({
      x: 10523,
      y: 192,
      width: 40,
      height: 40,
    }),
    new Rocky({
      x: 11200,
      y: 192,
      width: 40,
      height: 40,
    }),
    new Rocky({
      x: 11632,
      y: 144,
      width: 40,
      height: 40,
    }),
  ]
  
  jurks = [
    new Jurk({
      x: 1504,
      y: 192,
      width: 50,
      height: 50,
    }),
    new Jurk({
      x: 3392,
      y: 160,
      width: 50,
      height: 50,
    }),
    new Jurk({
      x: 7392,
      y: 256,
      width: 50,
      height: 50,
    }),
    new Jurk({
      x: 7472,
      y: 256,
      width: 50,
      height: 50,
    }),
    new Jurk({
      x: 7568,
      y: 256,
      width: 50,
      height: 50,
    }),
    new Jurk({
      x: 9296,
      y: 192,
      width: 50,
      height: 50,
    }),
    new Jurk({
      x: 9584,
      y: 192,
      width: 50,
      height: 50,
    }),
    new Jurk({
      x: 9632,
      y: 192,
      width: 50,
      height: 50,
    }),
  ]

  gorks = [
    new Gork({
      x: 1072,
      y: 80,
      width: 50,
      height: 50,
    }),
    new Gork({
      x: 1552,
      y: 192,
      width: 50,
      height: 50,
    }),
    new Gork({
      x: 2288,
      y: 176,
      width: 50,
      height: 50,
    }),
    new Gork({
      x: 3920,
      y: 128,
      width: 50,
      height: 50,
    }),
    new Gork({
      x: 4400,
      y: 192,
      width: 50,
      height: 50,
    }),
    new Gork({
      x: 7024,
      y: 496,
      width: 50,
      height: 50,
    }),
    new Gork({
      x: 8096,
      y: 112,
      width: 50,
      height: 50,
    }),
    new Gork({
      x: 7968,
      y: 336,
      width: 50,
      height: 50,
    }),
    new Gork({
      x: 7040,
      y: 192,
      width: 50,
      height: 50,
    }),
    new Gork({
      x: 9504,
      y: 192,
      width: 50,
      height: 50,
    }),
    new Gork({
      x: 9776,
      y: 192,
      width: 50,
      height: 50,
    }),
    new Gork({
      x: 11488,
      y: 160,
      width: 50,
      height: 50,
    }),
  ]

  guards = [
    new Guard({
      x: 6576,
      y: 160,
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
    
  ]

  camera = { x: 0, y: 0 };
}
//Funcion que hace que aparezcan las imagenes en el mapa
function animate(backgroundCanvas) {

  const currentTime = performance.now();
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  //actualizar posicion jugador
  player.handleInput(keys);
  player.update(deltaTime, collisionBlocks);

  //Daña al jugador o el jugador elimina a la entidad rocky
  for (let i = rockys.length - 1; i >= 0;  i--) {
    const rocky = rockys[i]
    rocky.update(deltaTime, collisionBlocks);
    
    // Salta en un enemigo
    const collisionDirection = checkCollision (player, rocky)
    if (collisionDirection) {
      if (collisionDirection === 'bottom' && !player.isOnGround) {
      enemydie.volume = 0.1
      enemydie.play()
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
          dañoSonido.volume = 0.1
          dañoSonido.play()
      } else if (fullCorazones.length === 0) {
        init()
      }

      player.setIsInvincible()
    }
  }
}

  //Daña al jugador o el jugador elimina a la entidad jurk
  for (let i = jurks.length - 1; i >= 0;  i--) {
    const jurk = jurks[i]
    jurk.update(deltaTime, collisionBlocks);
    
    // Salta en un enemigo
    const collisionDirection = checkCollision (player, jurk)
    if (collisionDirection) {
      if (collisionDirection === 'bottom' && !player.isOnGround) {
      enemydie.volume = 0.1
      enemydie.play()
      player.velocity.y = -150
      explosiones.push(
        new Explosion({
          x: jurk.x, 
          y: jurk.y, 
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
      
      jurks.splice(i, 1)
    } else if (collisionDirection === 'left' || 
      collisionDirection === 'right'
    ) {
      const fullCorazones = corazones.filter((corazon) => {
        return !corazon.depleted
      })

      if (!player.isInvincible && fullCorazones.length > 0) {
        fullCorazones[fullCorazones.length - 1].depleted = true
          dañoSonido.volume = 0.1
          dañoSonido.play()
      } else if (fullCorazones.length === 0) {
        init()
      }

      player.setIsInvincible()
    }
  }
  }

    //Daña al jugador o el jugador elimina a la entidad gork
   for (let i = gorks.length - 1; i >= 0;  i--) {
    const gork = gorks[i]
    gork.update(deltaTime, collisionBlocks);
    
    // Salta en un enemigo
    const collisionDirection = checkCollision (player, gork)
    if (collisionDirection) {
      if (collisionDirection === 'bottom' && !player.isOnGround) {
      enemydie.volume = 0.1
      enemydie.play()
      player.velocity.y = -150
      explosiones.push(
        new Explosion({
          x: gork.x, 
          y: gork.y, 
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
      
      gorks.splice(i, 1)
    } else if (collisionDirection === 'left' || 
      collisionDirection === 'right'
    ) {
      const fullCorazones = corazones.filter((corazon) => {
        return !corazon.depleted
      })

      if (!player.isInvincible && fullCorazones.length > 0) {
        fullCorazones[fullCorazones.length - 1].depleted = true
          dañoSonido.volume = 0.1
          dañoSonido.play()
      } else if (fullCorazones.length === 0) {
        init()
      }

      player.setIsInvincible()
    }
  }
  }

  //Daña al jugador al tocar a la entidad guard
  for (let i = guards.length - 1; i >= 0;  i--) {
    const guard = guards[i]
    guard.update(deltaTime, collisionBlocks);
    
    // Salta en un enemigo
    const collisionDirection = checkCollision (player, guard)
    if (collisionDirection) {
      if (collisionDirection === 'left' || 
        collisionDirection === 'right' || 
        collisionDirection === 'top' || 
        collisionDirection === 'bottom'
    ) {
      const fullCorazones = corazones.filter((corazon) => {
        return !corazon.depleted
      })
      //Quita un corazon al jugador
      if (!player.isInvincible && fullCorazones.length > 0) {
        fullCorazones[fullCorazones.length - 1].depleted = true
          dañoSonido.volume = 0.1
          dañoSonido.play()
      } else if (fullCorazones.length === 0) {
        init()
      }

      player.setIsInvincible()
    }
  }
  }
//Hace que desaparezca el efecto de las explisiones 
  for (let i = explosiones.length - 1; i >= 0;  i--) {
    const explosion = explosiones[i]
    explosion.update(deltaTime)
      
    if (explosion.iteration === 1) {
      explosiones.splice(i, 1)
    }
  }
//Cuando el jugador toca una moneda
  for (let i = gems.length - 1; i >= 0;  i--) {
    const gem = gems[i]
    gem.update(deltaTime)
    
    const collisionDirection = checkCollision (player, gem)  
    if (collisionDirection) {
      //reproduce un sonido al agarrar una moneda 
      const sonidoMoneda = new Audio('./sonidos/moneda.mp3');
      sonidoMoneda.volume = 0.1;
      sonidoMoneda.play();
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
//Reinicia la partida al tocar la lava
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
          dañoSonido.volume = 0.1
          dañoSonido.play()
          init()
        }
      else {
        dañoSonido.volume = 0.1
        dañoSonido.play()
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
          dañoSonido.volume = 0.1
          dañoSonido.play()
          init()
        }
      else {
        dañoSonido.play()
        init()
      }
    }
  }
//Reinicia la partida al tocar la barrera invisible al caer del mapa
  for (let i = caidasas.length - 1; i >= 0;  i--) {
    const caidasa = caidasas[i]
    caidasa.update(deltaTime)

    
    const collisionDirection = checkCollision (player, caidasa)  
    if (collisionDirection) {
      //al tocar la caida te hace daño
      if (collisionDirection === 'left' || 
        collisionDirection === 'right' || 
        collisionDirection === 'top' || 
        collisionDirection === 'bottom') {
          dañoSonido.volume = 0.1
          dañoSonido.play()
          init()
        }
      else {
        dañoSonido.volume = 0.1
        dañoSonido.play()
        init()
      }
    }
  }
//Teletransporta al jugador cuando toca el bloque oculto de la tuberia
  for (let i = tubos.length - 1; i >= 0;  i--) {
    const tubo = tubos[i]
    tubo.update(deltaTime)

    
    const collisionDirection = checkCollision (player, tubo)  
    if (collisionDirection) {
      const telesound = new Audio ('./sonidos/teleport.mp3')
      telesound.volume = 0.2
      //al tocar la caida te teletransporta
      if (collisionDirection === 'left' || 
        collisionDirection === 'right' || 
        collisionDirection === 'top' || 
        collisionDirection === 'bottom') {
          telesound.play()
          teletubo()
        }
      else {
        telesound.play()
        teletubo()
      }
    }
  }

//Daña al jugador al toca la entidad pincho
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
          dañoSonido.play()
          fullCorazones[fullCorazones.length - 1].depleted = true
        } else if (fullCorazones.length === 0) {
          dañoSonido.play()
          init()
        }
  
        player.setIsInvincible()
      }
    }
  }
//Cuando el jugador y la meta interactuan activa la pantalla de resultado
  for (let i = metas.length - 1; i >= 0;  i--) {
    const meta = metas[i]
    meta.update(deltaTime)

    
    const collisionDirection = checkCollision (player, meta)  
    if (collisionDirection) {
      const victorySound = new Audio ('./sonidos/victoria.mp3')
      victorySound.volume = 0.1
      victorySound.play()
      //al tocar la meta acaba el contador
      if (collisionDirection === 'left' || 
        collisionDirection === 'right' || 
        collisionDirection === 'top' || 
        collisionDirection === 'bottom') {
        
        resultadoFinal();
        pausar();
      }
    }
  }
  

//Limite de la camara
  if (player.x > SCROLL_POST_RIGHT && player.x < 12288) {
    camera.x = player.x - SCROLL_POST_RIGHT;
  }

  if (player.y < SCROLL_POST_TOP && camera.y > 0) {
    camera.y = SCROLL_POST_TOP - player.y;
  }

  if (player.y > SCROLL_POST_BOTTOM && camera.y < 224) {
    camera.y = -(player.y - SCROLL_POST_BOTTOM);
  }

  
//Dibuja las entidades y movimiento de la camara
  c.save();
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.scale(dpr + 20, dpr + 19)
  c.translate(-camera.x, camera.y);
  //Hace que las imagenes del fondo se desplazen de manera mas lenta
  c.drawImage(oceanbackgroundCanvas, camera.x * 0.32, 0);
  c.drawImage(sakubackgroundCanvas, camera.x * 0.15, 0);
  c.drawImage(bramblebackgroundCanvas, camera.x * 0.4, 0);
  c.drawImage(backgroundCanvas, 0, 0);
  
  for (let i = explosiones.length - 1; i >= 0;  i--) {
    const explosion = explosiones [i]
    explosion.draw(c)
  }
  
  for (let i = gems.length - 1; i >= 0;  i--) {
    const gem = gems [i]
    gem.draw(c)
  }

  player.draw(c);
  c.drawImage(tuberiaFrontCanvas, 0, 0);
  
  for (let i = rockys.length - 1; i >= 0;  i--) {
    const rocky = rockys[i]
    rocky.draw(c)
  }

  for (let i = jurks.length - 1; i >= 0;  i--) {
    const jurk = jurks[i]
    jurk.draw(c)
  }

  for (let i = gorks.length - 1; i >= 0;  i--) {
    const gork = gorks[i]
    gork.draw(c)
  }

  for (let i = guards.length - 1; i >= 0;  i--) {
    const guard = guards[i]
    guard.draw(c)
  }

  c.drawImage(arbols1FrontCanvas, 0, 0);
  c.drawImage(entradaFrontCanvas, 0, 0);

  for (let i = caidas.length - 1; i >= 0;  i--) {
    const caida = caidas [i]
    caida.draw(c)
  }

  for (let i = caidasas.length - 1; i >= 0;  i--) {
    const caidasa = caidasas [i]
    caidasa.draw(c)
  }
  
  for (let i = tubos.length - 1; i >= 0;  i--) {
    const tubo = tubos [i]
    tubo.draw(c)
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
  c.scale(dpr + 15, dpr + 14);
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



//Renderizar texturas
const startRendering = async () => {
  try {
    
    oceanbackgroundCanvas = await renderStaticLayers(oceanLayerData);
    bramblebackgroundCanvas = await renderStaticLayers(BrambleLayerData);
    sakubackgroundCanvas = await renderStaticLayers(sakuLayerData);
    tuberiaFrontCanvas = await renderStaticLayers(tuberiaLayerData);
    arbols1FrontCanvas = await renderStaticLayers(arbols1LayerData);
    entradaFrontCanvas = await renderStaticLayers(entradaLayerData);
    
    const backgroundCanvas = await renderStaticLayers(layersData);
    animate(backgroundCanvas);
  } catch (error) {
    console.error('Error during rendering:', error);
  }
};

init();
iniciar();
startRendering();
