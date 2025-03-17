//detecta cuando pulsa una tecla
window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case ' ':
    case 'w':
    case 'W':
      player.jump();
      keys.w.pressed = true;
      break;
    case 'a':
    case 'A':
      keys.a.pressed = true;
      break;
    case 'd':
    case 'D':
      keys.d.pressed = true;
      break;
    case 'r':
    case 'R':
      init();
      keys.r.pressed = true;
      break;
    case 'Escape':
      window.location = 'menu.html';
      break;
    case 'o':
    case 'O':
      teleport();
      keys.o.pressed = true;
      break;
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'a':
    case 'A':
    keys.a.pressed = false;
    break;
    case 'd':
    case 'D':
    keys.d.pressed = false;
    break;
  }
})


document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
  }
})