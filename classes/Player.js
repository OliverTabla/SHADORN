const X_VELOCITY = 185
const JUMP_POWER = 285
const GRAVITY = 580
const sonidoJump = new Audio('./sonidos/salto.mp3')

class Player {
  constructor({ x, y, size, velocity = { x: 0, y: 0 } }) {
    this.x = x
    this.y = y
    this.width = 38
    this.height = 38
    this.velocity = velocity
    this.isOnGround = false
    this.isImageLoaded = false
    this.image = new Image()
    this.congelado = false;
    this.image.onload = () => {
      this.imageLoaded = true
    }
    this.image.src = './assets/entities/shadornsheet.png'
    this.elapsedTime = 0
    this.currentFrame = 0
    this.sprites = {
      idle: {
        x: -20,
        y: -6,
        width: 150,
        height: 150,
        frames: 1,
      },
      run: {
        x: -13,
        y: 158,
        width: 150,
        height: 150,
        frames: 4,
      },
      jump: {
        x: 0,
        y: 162 * 2,
        width: 155,
        height: 155,
        frames: 1,
      },
      fall: {
        x: 150,
        y: 160 * 2,
        width: 160,
        height: 160,
        frames: 1,
      },
    }
    this.currentSprite = this.sprites.idle
    this.facing = 'right'
    this.hitbox = {
      x: 0,
      y: 0,
      width: 10,
      height: 28,
    }
    this.isInvincible = false
  }

  setIsInvincible() {
    this.isInvincible = true
    setTimeout(() => {
      this.isInvincible = false
    }, 1000)
  }

  draw(c) {
    //CUADRADO ROJO PARA PRUEBAS
    //c.fillStyle = 'rgba(255, 0, 0, 0.5)'
    //c.fillRect(this.x, this.y, this.width, this.height)
    //hitbox
    //c.fillStyle = 'rgba(2, 0, 126, 0.5)'
    //c.fillRect(this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height)

    if (this.imageLoaded === true) {
      let xScale = 1
      let x = this.x

      if (this.facing === 'left') {
        xScale = -1
        x = -this.x - this.width
      }

      c.save()
      if (this.isInvincible) {
        c.globalAlpha = 0.5
      } else {
        c.globalAlpha = 1
      }
      c.scale(xScale, 1)
      c.drawImage(
        this.image, 
        this.currentSprite.x +  this.currentSprite.width * this.currentFrame, 
        this.currentSprite.y,
        this.currentSprite.height,
        this.currentSprite.width, 
        x, 
        this.y, 
        this.width, 
        this.height,
      )
      c.restore()
    }
  }

  update(deltaTime, collisionBlocks) {
    if (!deltaTime) return
    if (this.congelado) return;
    this.elapsedTime += deltaTime
    const secondsInterval = 0.13
    if (this.elapsedTime > secondsInterval) {
      this.currentFrame = (this.currentFrame +1) % this.currentSprite.frames
      this.elapsedTime -= secondsInterval
    }
    // Limita el valor para evitar caídas bruscas
    if (deltaTime > 0.1) deltaTime = 0.1; 

    //Posicion de la hitbox
    if (this.facing === "right") {
      this.hitbox.x = this.x + 14
    } else {
      this.hitbox.x = this.x + (this.width - this.hitbox.width - 14)
    }
    
    this.hitbox.y = this.y + 10

    this.applyGravity(deltaTime)

    // Actualiza la posicion horizontal y revisa las colisiones
    this.updateHorizontalPosition(deltaTime)
    this.checkForHorizontalCollisions(collisionBlocks)

    // mira si detecta colisiones con las plataformas
    this.checkPlatformCollisions(platforms, deltaTime)

    // actualiza la posicion vertical y revisa las colisiones
    this.updateVerticalPosition(deltaTime)
    this.checkForVerticalCollisions(collisionBlocks)
    this.determineDirection()
    this.switchSprites()
  }

  congelar() {
    this.congelado = true;
    this.velocity.x = 0;  // Detiene el movimiento horizontal
    this.velocity.y = 0;  // Detiene el movimiento vertical
  }

  reanudar() {
    this.congelado = false;
  }
  
  determineDirection() {
    if (this.velocity.x > 0) {
      this.facing = 'right'
    } else if (this.velocity.x < 0) {
      this.facing = 'left'
    }
  }


  switchSprites() {
    if (
      this.isOnGround && 
      this.velocity.x === 0 && 
      this.currentSprite !== this.sprites.idle 
    ) {
      //Quieto
      this.currentFrame = 0
      this.currentSprite = this.sprites.idle
    } else if (
      this.isOnGround && 
      this.velocity.x !== 0 &&
      this.currentSprite !== this.sprites.run
    ) {
      //Corriendo
      this.currentFrame = 0
      this.currentSprite = this.sprites.run
    } else if (
      !this.isOnGround && 
      this.velocity.y < 0 && 
      this.currentSprite !== this.sprites.jump
    ) {
        //Salto
      this.currentFrame = 0
      this.currentSprite = this.sprites.jump
    } else if (
      !this.isOnGround && this.velocity.y > 0 && 
      this.currentSprite !== this.sprites.fall
    ) {
        //caida
      this.currentFrame = 0
      this.currentSprite = this.sprites.fall
    }
  }
  
    
  jump() {
    if(!this.isOnGround)
      return;
    this.velocity.y = -JUMP_POWER
    this.isOnGround = false
    sonidoJump.volume = 0.08
    sonidoJump.play()
  }

  updateHorizontalPosition(deltaTime) {
    this.x += this.velocity.x * deltaTime
    this.hitbox.x += this.velocity.x * deltaTime
  }

  updateVerticalPosition(deltaTime) {
    this.y += this.velocity.y * deltaTime
    this.hitbox.y += this.velocity.y * deltaTime
    
  }

  applyGravity(deltaTime) {
    this.velocity.y += GRAVITY * deltaTime
  }

  handleInput(keys) {
    this.velocity.x = 0

    if (keys.d.pressed) {
      this.velocity.x = X_VELOCITY
    } else if (keys.a.pressed) {
      this.velocity.x = -X_VELOCITY
    }
  }

  checkForHorizontalCollisions(collisionBlocks) {
    const buffer = 0.0001
    for (let i = 0; i < collisionBlocks.length; i++) {
      const collisionBlock = collisionBlocks[i]

      //Mira si exista una colision en todos los angulos
      if (
        this.hitbox.x <= collisionBlock.x + collisionBlock.width &&
        this.hitbox.x + this.hitbox.width >= collisionBlock.x &&
        this.hitbox.y + this.hitbox.height >= collisionBlock.y &&
        this.hitbox.y <= collisionBlock.y + collisionBlock.height
      ) {
        // Mira la colision cuando el jugador mira a la izquierda
        if (this.velocity.x < -0) {
          this.hitbox.x = collisionBlock.x + collisionBlock.width + buffer
          this.x = this.hitbox.x - 14
          break
        }

        // Mira la colision cuando el jugador mira a la derecha
        if (this.velocity.x > 0) {
          this.hitbox.x = collisionBlock.x - this.hitbox.width - buffer
          this.x = this.hitbox.x - 14
          break
        }
      }
    }
  }

  checkForVerticalCollisions(collisionBlocks) {
    const buffer = 0.0001
    for (let i = 0; i < collisionBlocks.length; i++) {
      const collisionBlock = collisionBlocks[i]

      // Mira si una colision existe
      if (
        this.hitbox.x <= collisionBlock.x + collisionBlock.width &&
        this.hitbox.x + this.hitbox.width >= collisionBlock.x &&
        this.hitbox.y + this.hitbox.height >= collisionBlock.y &&
        this.hitbox.y <= collisionBlock.y + collisionBlock.height
      ) {
        //Mira la colision si el jugador esta subiendo
        if (this.velocity.y < 0) {
          this.velocity.y = 0
          this.hitbox.y = collisionBlock.y + collisionBlock.height + buffer
          this.y = this.hitbox.y - 10 
          break
        }

        //Mira la colision si el jugador esta bajando
        if (this.velocity.y > 0) {
          this.velocity.y = 0
          this.y = collisionBlock.y - this.height - buffer
          this.hitbox.y = collisionBlock.y - this.hitbox.height - buffer
          this.isOnGround = true
          break
        }
      }
    }
  }

  checkPlatformCollisions(platforms, deltaTime) {
    cancionP.play()
    const buffer = 0.0001
    for (let platform of platforms) {
      if (platform.checkCollision(this, deltaTime)) {
        this.velocity.y = 0
        this.y = platform.y - this.height - buffer
        this.isOnGround = true
        return
      }
    }
    this.isOnGround = false
  }
}