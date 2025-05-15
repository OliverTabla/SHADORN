//detecta cuando pulsa una tecla
window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case ' ':
    case 'w':
    case 'W':
    case 'ArrowUp':
      player.jump();
      keys.w.pressed = true;
      break;
    case 'a':
    case 'A':
    case 'ArrowLeft':
      keys.a.pressed = true;
      break;
    case 'd':
    case 'D':
    case 'ArrowRight':
      keys.d.pressed = true;
      break;
  }
  

})

document.addEventListener('mousedown', (event) => {
    player.jump();
});

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'a':
    case 'A':
    case 'ArrowLeft':
    keys.a.pressed = false;
    break;
    case 'd':
    case 'D':
    case 'ArrowRight':
    keys.d.pressed = false;
    break;
  }
})


document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
  }
})


