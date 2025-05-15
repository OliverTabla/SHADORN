// Función para detectar si es un dispositivo móvil
function isMobileDevice() {
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth <= 1024
  )
}

// Función para crear los controles móviles
function createMobileControls() {
  // Solo crear los controles si es un dispositivo móvil
  if (!isMobileDevice()) return

  // Declarar las variables keys y player
  const keys = {
    a: {
      pressed: false,
    },
    d: {
      pressed: false,
    },
    w: {
      pressed: false,
    },
    esc: {
      pressed: false,
    },
  }

  // Crear el contenedor principal para los controles
  const controlsContainer = document.createElement("div")
  controlsContainer.id = "mobile-controls"
  controlsContainer.style.cssText = `
  position: fixed;
  bottom: 10px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
  z-index: 1000;
  pointer-events: none;
`

  // Crear contenedor para el botón de pausa en la parte superior central
  const pauseButtonContainer = document.createElement("div")
  pauseButtonContainer.id = "pause-button-container"
  pauseButtonContainer.style.cssText = `
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  pointer-events: none;
`

  // Crear el contenedor para los botones de movimiento (izquierda y derecha)
  const movementControls = document.createElement("div")
  movementControls.style.cssText = `
    display: flex;
    gap: 20px;
    pointer-events: auto;
  `

  // Crear el botón de salto
  const jumpButton = document.createElement("div")
  jumpButton.style.cssText = `
    pointer-events: auto;
  `
  // Crear el botón de pausa
  const pauseButton = document.createElement("div")
  pauseButton.style.cssText = `
  pointer-events: auto;
`

  // Crear el botón izquierdo
  const leftButton = document.createElement("img")
  leftButton.src = "./assets/entities/BotonIz.png"
  leftButton.alt = "Izquierda"
  leftButton.style.cssText = `
    width: 60px;
    height: 60px;
    user-select: none;
    -webkit-user-drag: none;
  `

  // Crear el botón derecho
  const rightButton = document.createElement("img")
  rightButton.src = "./assets/entities/BotonDer.png"
  rightButton.alt = "Derecha"
  rightButton.style.cssText = `
    width: 60px;
    height: 60px;
    user-select: none;
    -webkit-user-drag: none;
  `

  // Crear el botón de salto
  const jumpButtonImg = document.createElement("img")
  jumpButtonImg.src = "./assets/entities/BotonSal.png"
  jumpButtonImg.alt = "Saltar"
  jumpButtonImg.style.cssText = `
    width: 120px;
    height: 120px;
    user-select: none;
    -webkit-user-drag: none;
  `
  // Crear el boton de pausa
  const pauseButtonImg = document.createElement("img")
  pauseButtonImg.src = "./assets/entities/BotonPau.png"
  pauseButtonImg.alt = "Pausa"
  pauseButtonImg.style.cssText = `
  width: 60px;
  height: 60px;
  user-select: none;
  -webkit-user-drag: none;
`
  // Añadir los botones a sus contenedores
  movementControls.appendChild(leftButton)
  movementControls.appendChild(rightButton)
  jumpButton.appendChild(jumpButtonImg)
  pauseButton.appendChild(pauseButtonImg)

  // Añadir los contenedores al contenedor principal
  controlsContainer.appendChild(movementControls)
  controlsContainer.appendChild(jumpButton)

  // Añadir el botón de pausa a su contenedor
  pauseButtonContainer.appendChild(pauseButton)

  // Añadir los contenedores al body
  document.body.appendChild(controlsContainer)
  document.body.appendChild(pauseButtonContainer)

  // Eventos táctiles para el botón izquierdo
  leftButton.addEventListener("touchstart", (e) => {
    e.preventDefault()
    keys.a.pressed = true
    // Simular evento de teclado para la tecla 'a'
    const keyEvent = new KeyboardEvent("keydown", {
      key: "a",
      code: "KeyA",
      bubbles: true,
    })
    window.dispatchEvent(keyEvent)
  })

  leftButton.addEventListener("touchend", (e) => {
    e.preventDefault()
    keys.a.pressed = false
    // Simular evento de teclado para soltar la tecla 'a'
    const keyEvent = new KeyboardEvent("keyup", {
      key: "a",
      code: "KeyA",
      bubbles: true,
    })
    window.dispatchEvent(keyEvent)
  })

  // Eventos táctiles para el botón derecho
  rightButton.addEventListener("touchstart", (e) => {
    e.preventDefault()
    keys.d.pressed = true
    // Simular evento de teclado para la tecla 'd'
    const keyEvent = new KeyboardEvent("keydown", {
      key: "d",
      code: "KeyD",
      bubbles: true,
    })
    window.dispatchEvent(keyEvent)
  })

  rightButton.addEventListener("touchend", (e) => {
    e.preventDefault()
    keys.d.pressed = false
    // Simular evento de teclado para soltar la tecla 'd'
    const keyEvent = new KeyboardEvent("keyup", {
      key: "d",
      code: "KeyD",
      bubbles: true,
    })
    window.dispatchEvent(keyEvent)
  })

  jumpButtonImg.addEventListener("touchstart", (e) => {
    e.preventDefault()
    keys.w.pressed = true
    // Simular evento de teclado para la tecla 'w'
    const keyEvent = new KeyboardEvent("keydown", {
      key: "w",
      code: "KeyW",
      bubbles: true,
    })
    window.dispatchEvent(keyEvent)
  })

  jumpButtonImg.addEventListener("touchend", (e) => {
    e.preventDefault()
    keys.w.pressed = false
    // Simular evento de teclado para soltar la tecla 'w'
    const keyEvent = new KeyboardEvent("keyup", {
      key: "w",
      code: "KeyW",
      bubbles: true,
    })
    window.dispatchEvent(keyEvent)
  })

  // Eventos táctiles para el botón de pausa
  pauseButtonImg.addEventListener("touchstart", (e) => {
    e.preventDefault()
    pauseButtonImg.style.transform = "scale(0.9)"
    pauseButtonImg.style.opacity = "0.8"

    // Simular evento de teclado para la tecla 'Escape'
    const escapeEvent = new KeyboardEvent("keydown", {
      key: "Escape",
      code: "Escape",
      bubbles: true,
    })
    window.dispatchEvent(escapeEvent)
  })

  pauseButtonImg.addEventListener("touchend", (e) => {
    e.preventDefault()
    pauseButtonImg.style.transform = "scale(1)"
    pauseButtonImg.style.opacity = "1"
  })

  // Ajustar el tamaño de los botones según el tamaño de la pantalla
  function adjustButtonSizes() {
    const screenWidth = window.innerWidth

    if (screenWidth <= 480) {
      leftButton.style.width = leftButton.style.width = "70px"
      leftButton.style.height = leftButton.style.height = "50px"
      rightButton.style.height = rightButton.style.height = "50px"
      rightButton.style.width = rightButton.style.width = "70px"
      jumpButtonImg.style.width = jumpButtonImg.style.width = "120px"
      jumpButtonImg.style.height = jumpButtonImg.style.height = "70px"
      pauseButtonImg.style.width = pauseButtonImg.style.width = "60px"
      pauseButtonImg.style.height = pauseButtonImg.style.height = "30px"
    } else if (screenWidth <= 1024) {
      leftButton.style.width = leftButton.style.width = "100px"
      leftButton.style.height = leftButton.style.height = "80px"
      rightButton.style.height = rightButton.style.height = "80px"
      rightButton.style.width = rightButton.style.width = "100px"
      jumpButtonImg.style.width = jumpButtonImg.style.width = "200px"
      jumpButtonImg.style.height = jumpButtonImg.style.height = "130px"
      pauseButtonImg.style.width = pauseButtonImg.style.width = "80px"
      pauseButtonImg.style.height = pauseButtonImg.style.height = "40px"
    } else {
      leftButton.style.width = leftButton.style.width = "250px"
      leftButton.style.height = leftButton.style.height = "200px"
      rightButton.style.height = rightButton.style.height = "200px"
      rightButton.style.widht = rightButton.style.width = "250px"
      jumpButtonImg.style.width = jumpButtonImg.style.width = "400px"
      jumpButtonImg.style.height = jumpButtonImg.style.height = "250px"
      pauseButtonImg.style.width = pauseButtonImg.style.width = "150px"
      pauseButtonImg.style.height = pauseButtonImg.style.height = "80px"
    }
  }

  // Ajustar tamaños inicialmente
  adjustButtonSizes()

  // Ajustar tamaños cuando cambie el tamaño de la ventana
  window.addEventListener("resize", adjustButtonSizes)

  // Añadir estilos CSS para los controles móviles
  const mobileControlsStyle = document.createElement("style")
  mobileControlsStyle.textContent = `
    @media (max-width: 768px) {
      #mobile-controls {
        bottom: 15px;
      }
    }
    
    @media (max-width: 480px) {
      #mobile-controls {
        bottom: 10px;
      }
    }
    
    /* Efecto de pulsación */
    #mobile-controls img:active {
      transform: scale(0.9);
      opacity: 0.8;
    }
    
    /* Efecto de pulsación para el botón de pausa */
    #pause-button-container img:active {
      transform: scale(0.9);
      opacity: 0.8;
    }
  `

  document.head.appendChild(mobileControlsStyle)
}

// Inicializar los controles móviles cuando se cargue la página
window.addEventListener("load", () => {
  // Esperar a que se carguen todas las variables del juego
  setTimeout(createMobileControls, 500)
})
