

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
  if (!document.hidden) {
    lastTime = performance.now();
  }
})