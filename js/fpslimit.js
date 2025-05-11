/**
 * FPS Limiter - Limita los FPS solo en dispositivos móviles
 */

;(() => {
  // Detectar si es un dispositivo móvil
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  // Si no es un dispositivo móvil, no hacemos nada
  if (!isMobile) {
    console.log("FPS Limiter: Dispositivo de escritorio detectado, sin limitación de FPS")
    return
  }

  console.log("FPS Limiter: Dispositivo móvil detectado, limitando FPS")

  // Configuración para móviles
  const targetFPS = 120
  const frameInterval = 1000 / targetFPS
  let lastFrameTime = performance.now()

  // Guardar la función original requestAnimationFrame
  const originalRequestAnimationFrame = window.requestAnimationFrame

  // Reemplazar requestAnimationFrame con nuestra versión limitada
  window.requestAnimationFrame = (callback) =>
    originalRequestAnimationFrame((timestamp) => {
      // Verificar si ha pasado suficiente tiempo desde el último frame
      if (timestamp - lastFrameTime < frameInterval) {
        // No ha pasado suficiente tiempo, programar el siguiente frame sin ejecutar el callback
        return window.requestAnimationFrame(callback)
      }

      // Ha pasado suficiente tiempo, actualizar lastFrameTime y ejecutar el callback
      lastFrameTime = timestamp
      return callback(timestamp)
    })


  const showFPSCounter = false

  if (showFPSCounter) {
    const fpsDisplay = document.createElement("div")
    fpsDisplay.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      padding: 5px;
      border-radius: 5px;
      font-family: monospace;
      z-index: 9999;
    `
    document.body.appendChild(fpsDisplay)

    let frameCount = 0
    let lastFpsUpdateTime = performance.now()

    // Función para actualizar el contador de FPS
    function updateFPSCounter() {
      frameCount++
      const now = performance.now()

      if (now - lastFpsUpdateTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (now - lastFpsUpdateTime))
        fpsDisplay.textContent = `FPS: ${fps}`
        frameCount = 0
        lastFpsUpdateTime = now
      }

      requestAnimationFrame(updateFPSCounter)
    }

    updateFPSCounter()
  }
})()
