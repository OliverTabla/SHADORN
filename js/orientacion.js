// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // Función para verificar la orientación
  function checkOrientation() {
    const isPortrait = window.innerHeight > window.innerWidth;
    const rotateWarning = document.getElementById('rotate-warning');
    const mainContent = document.getElementById('main-content');
    
    // Verificar que los elementos existan
    if (!rotateWarning || !mainContent) return;
    
    if (isPortrait) {
      rotateWarning.style.display = 'flex';
      mainContent.style.display = 'none';
    } else {
      rotateWarning.style.display = 'none';
      mainContent.style.display = 'grid';
    }
  }

  // Detectar si es un dispositivo móvil
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Cambiar el mensaje en dispositivos móviles si existe
  const messageElement = document.getElementById('message');
  if (isMobile && messageElement) {
    messageElement.innerText = 'Toca la pantalla para empezar';
  }

  // Intenta bloquear la orientación si el navegador lo soporta
  if (isMobile) {
    try {
      if ('orientation' in screen) {
        screen.orientation.lock('landscape').catch(() => {
          console.log("No se pudo bloquear la orientación a nivel del sistema");
        });
      }
    } catch (error) {
      console.log("API de orientación no soportada");
    }
  }

  // Verificar orientación al cargar
  checkOrientation();
  
  // Verificar orientación cuando cambie
  window.addEventListener('resize', checkOrientation);
  window.addEventListener('orientationchange', function() {
    setTimeout(checkOrientation, 100);
  });
});