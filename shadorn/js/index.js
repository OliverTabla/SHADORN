          
// Obtener el elemento del mensaje
const messageElement = document.getElementById('message');
let isVisible = true;
let blinkInterval;
 
// Función para alternar la visibilidad
function toggleVisibility() {
   if (isVisible) {
     messageElement.classList.remove('visible');
     messageElement.classList.add('hidden');
   } else {
     messageElement.classList.remove('hidden');
     messageElement.classList.add('visible');
   }
   isVisible = !isVisible;
}
 
 // Iniciar parpadeo
blinkInterval = setInterval(toggleVisibility, 650);
 
 // Escuchar cualquier pulsación de tecla
document.addEventListener('keydown', function() {
   window.location = 'menu.html'
});
document.addEventListener('click', function() {
    window.location = 'menu.html'
 });
