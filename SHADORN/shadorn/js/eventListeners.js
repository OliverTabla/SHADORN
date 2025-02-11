

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case ' ':
    case 'w':
    case 'W':
      player.jump();
      iniciar();
      keys.w.pressed = true;
      break;
    case 'a':
    case 'A':
      iniciar();
      keys.a.pressed = true;
      break;
    case 'd':
    case 'D':
      iniciar();
      keys.d.pressed = true;
      break;
    case 'r':
    case 'R':
      init();
      reiniciar();
      pausar();
      keys.r.pressed = true;
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

// On return to game's tab, ensure delta time is reset
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {

  }
})