// Función para añadir botón de pantalla completa para móviles
function addMobileFullscreenButton() {
  // Crear el botón de pantalla completa
  const fullscreenButton = document.createElement("button")
  fullscreenButton.id = "mobile-fullscreen-btn"
  fullscreenButton.innerHTML = "⛶"

  // Estilos base del botón (se ajustarán con media queries)
  fullscreenButton.style.cssText = `
    position: fixed;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    border: 1px solid black;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  `

  // Añadir el botón al body
  document.body.appendChild(fullscreenButton)

  // Añadir evento de clic al botón
  fullscreenButton.addEventListener("click", toggleFullscreen)

  // Añadir estilos CSS con media queries
  const style = document.createElement("style")
  style.textContent = `
    #mobile-fullscreen-btn {
      top: 15px;
      right: 240px;
      width: 40px;
      height: 40px;
      font-size: 25px;
    }
    
    #mobile-fullscreen-btn:active {
      transform: scale(0.95);
      background-color: rgba(0, 0, 0, 0.9);
    }
    
    /* Ocultar el botón cuando estamos en pantalla completa */
    :fullscreen #mobile-fullscreen-btn {
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.5s ease;
    }
    
    /* Para Safari */
    :-webkit-full-screen #mobile-fullscreen-btn {
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.5s ease;
    }
    
    @media (min-width: 1367px) {
      #mobile-fullscreen-btn {
        top: 20px;
        right: 350px;
        width: 50px;
        height: 50px;
        font-size: 40px;
        align-items: center;
        justify-content: center;
      }
    }

    @media (max-width: 1366px) and (min-width: 1025px) {
      #mobile-fullscreen-btn {
        top: 20px;
        right: 220px;
        width: 40px;
        height: 40px;
        font-size: 30px;
        align-items: center;
        justify-content: center;
      }
    }

    /* Pantallas medianas (1024px - 769px) */
    @media (max-width: 1024px) and (min-width: 769px) {
      #mobile-fullscreen-btn {
        top: 15px;
        right: 180px;
        width: 35px;
        height: 35px;
        font-size: 22px;
      }
    }
    
    /* Tablets (768px - 481px) */
    @media (max-width: 768px) and (min-width: 481px) {
      #mobile-fullscreen-btn {
        top: 15px;
        right: 120px;
        width: 30px;
        height: 30px;
        font-size: 20px;
      }
    }
    
    /* Móviles (480px y menos) */
    @media (max-width: 480px) {
      #mobile-fullscreen-btn {
        top: 15px;
        right: 80px;
        width: 25px;
        height: 25px;
        font-size: 16px;
      }
    }
  `
  document.head.appendChild(style)

  // Ajustar el botón según el tamaño de la ventana
  adjustButtonPosition()

  // Ajustar cuando cambie el tamaño de la ventana
  window.addEventListener("resize", adjustButtonPosition)
}

// Función para ajustar la posición del botón según el tamaño de la ventana
function adjustButtonPosition() {
  const fullscreenButton = document.getElementById("mobile-fullscreen-btn")
  if (!fullscreenButton) return

  const windowWidth = window.innerWidth

  // Los estilos se aplicarán automáticamente a través de las media queries en el CSS
  // Esta función puede usarse para ajustes adicionales si es necesario
}

// Función para alternar el modo pantalla completa
function toggleFullscreen() {
  const doc = window.document
  const docEl = doc.documentElement

  // Verificar si ya estamos en pantalla completa
  const isFullscreen =
    doc.fullscreenElement || doc.mozFullScreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement

  if (!isFullscreen) {
    // Entrar en modo pantalla completa
    if (docEl.requestFullscreen) {
      docEl.requestFullscreen()
    } else if (docEl.mozRequestFullScreen) {
      // Firefox
      docEl.mozRequestFullScreen()
    } else if (docEl.webkitRequestFullscreen) {
      // Chrome, Safari y Opera
      docEl.webkitRequestFullscreen()
    } else if (docEl.msRequestFullscreen) {
      // IE/Edge
      docEl.msRequestFullscreen()
    }

    // Intentar bloquear la orientación en landscape si es posible
    if (screen.orientation && screen.orientation.lock) {
      screen.orientation.lock("landscape").catch((error) => {
        // No hacer nada si falla, simplemente continuar
        console.log("No se pudo bloquear la orientación: ", error)
      })
    }
  } else {
    // Salir del modo pantalla completa
    if (doc.exitFullscreen) {
      doc.exitFullscreen()
    } else if (doc.mozCancelFullScreen) {
      // Firefox
      doc.mozCancelFullScreen()
    } else if (doc.webkitExitFullscreen) {
      // Chrome, Safari y Opera
      doc.webkitExitFullscreen()
    } else if (doc.msExitFullscreen) {
      // IE/Edge
      doc.msExitFullscreen()
    }
  }
}

// Inicializar cuando se cargue la página
window.addEventListener("load", () => {
  addMobileFullscreenButton()

  // Escuchar cambios en el estado de pantalla completa
  document.addEventListener("fullscreenchange", handleFullscreenChange)
  document.addEventListener("webkitfullscreenchange", handleFullscreenChange)
  document.addEventListener("mozfullscreenchange", handleFullscreenChange)
  document.addEventListener("MSFullscreenChange", handleFullscreenChange)
})

// Manejar cambios en el estado de pantalla completa
function handleFullscreenChange() {
  const isFullscreen =
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement

  const fullscreenButton = document.getElementById("mobile-fullscreen-btn")

  if (fullscreenButton) {
    if (isFullscreen) {
      fullscreenButton.innerHTML = "⛶"

      // Ocultar el botón después de un tiempo
      setTimeout(() => {
        fullscreenButton.style.opacity = "0"
      }, 2000)
    } else {
      fullscreenButton.innerHTML = "⛶"
      fullscreenButton.style.opacity = "1"
    }
  }
}
