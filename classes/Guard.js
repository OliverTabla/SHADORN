//Estadisticas del personaje
const GUARD_X_VELOCITY = 2
const GUARD_JUMP_POWER = 450
const GUARD_GRAVITY = 580
//Creacion del elemento guard
class Guard {
  constructor({ x, y, width, height, velocity = { x: GUARD_X_VELOCITY, y: 0 } }, turningDistance = 100) {
    this.x = x
    this.y = y
    this.width = width * 1.6
    this.height = height * 1.6
    this.velocity = velocity
    this.isOnGround = false
    this.isImageLoaded = false
    this.isFrozen = false
    this.image = new Image()
    this.image.onload = () => {
      this.imageLoaded = true
    }
    this.image.src = "./assets/entities/guardsheet.png"
    this.elapsedTime = 0
    this.currentFrame = 0
    //Animacion del personaje
    this.sprites = {
      run: {
        x: -10,
        y: -11,
        width: 120,
        height: 110,
        frames: 4,
      },
    }
    //Sprite predeterminado del personaje
    this.currentSprite = this.sprites.run
    //Cambia el sentido del personaje
    this.previousFacingfacing = "right"
    //Hitbox del personaje
    this.hitbox = {
      x: 0,
      y: 0,
      width: 30,
      height: 45,
    }
    //cuanta distacia recorre el personaje
    this.distanceTraveled = 0
    this.turningDistance = turningDistance
  }

  draw(c) {
    // CUADRADO ROJO PARA PRUEBAS
    //c.fillStyle = 'rgba(255, 0, 0, 0.5)'
    //c.fillRect(this.x, this.y, this.width, this.height)
    //hitbox
    //c.fillStyle = 'rgba(2, 0, 126, 0.5)'
    //c.fillRect(this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height)
//Cambia el sentido del personaje
    if (this.imageLoaded === true) {
      let xScale = 1
      let x = this.x

      if (this.facing === "right") {
        xScale = -1
        x = -this.x - this.width
      }

      c.save()
      c.scale(xScale, 1)
      c.drawImage(
        this.image,
        this.currentSprite.x + this.currentSprite.width * this.currentFrame,
        this.currentSprite.y,
        this.currentSprite.width,
        this.currentSprite.height,
        x,
        this.y,
        this.width,
        this.height,
      )
      c.restore()
    }
  }
//Pausa la animacion del personaje
  congelar() {
    this.isFrozen = true
    this.previousFacing = this.facing
    this.velocity.x = 0 // Detiene el movimiento horizontal
    this.velocity.y = 0 // Detiene el movimiento vertical
  }
//Reanuda la animacion del personaje
  reanudar() {
    this.isFrozen = false
    this.facing = this.previousFacing
    this.velocity.x = this.previousFacing === "left" ? -GUARD_X_VELOCITY : GUARD_X_VELOCITY
  }
//funcion que actualiza las acciones del personaje
  update(deltaTime, collisionBlocks) {
    if (!deltaTime || this.isFrozen) return
    this.elapsedTime += deltaTime
    const secondsInterval = 0.4
    if (this.elapsedTime > secondsInterval) {
      this.currentFrame = (this.currentFrame + 1) % this.currentSprite.frames
      this.elapsedTime -= secondsInterval
    }

    // Limita el valor para evitar caídas bruscas
    if (deltaTime > 0.1) deltaTime = 0.1
    //posicion de la hitbox
    
    if (this.facing === "right") {
      this.hitbox.x = this.x + 30
    } else {
      this.hitbox.x = this.x + (this.width - this.hitbox.width - 30)
    }
      this.hitbox.y = this.y + 35

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
  }
//Determina la direccion del personaje  
  determineDirection() {
    if (this.isFrozen) return
    if (this.velocity.x < 0) {
      this.facing = "left"
    } else if (this.velocity.x > 0) {
      this.facing = "right"
    }
  }
//Hace que el entidad salte (sin usar)
  jump() {
    if (!this.isOnGround) return
    this.velocity.y = -GUARD_JUMP_POWER
    this.isOnGround = false
  }
//Actualiza la posicion horizontal del personaje
  updateHorizontalPosition(deltaTime) {
    if (Math.abs(this.distanceTraveled) > this.turningDistance) {
      this.velocity.x = -this.velocity.x
      this.distanceTraveled = 0
    }
    this.x += this.velocity.x * deltaTime
    this.hitbox.x += this.velocity.x * deltaTime
    this.distanceTraveled += this.velocity.x * deltaTime
  }
//Actualiza la posicion vertical del personaje
  updateVerticalPosition(deltaTime) {
    this.y += this.velocity.y * deltaTime
    this.hitbox.y += this.velocity.y * deltaTime
  }
//Aplica la gravedad del personaje
  applyGravity(deltaTime) {
    this.velocity.y += GUARD_GRAVITY * deltaTime
  }
//Cuando pulsas una tecla activa el movimiento
  handleInput(keys) {
    this.velocity.x = 0

    if (keys.d.pressed) {
      this.velocity.x = GUARD_X_VELOCITY
    } else if (keys.a.pressed) {
      this.velocity.x = -GUARD_X_VELOCITY
    }
  }
//Detecta las colisiones horizontales de la hitbox
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
        if (this.velocity.x < 0) {
          this.hitbox.x = collisionBlock.x + collisionBlock.width + buffer
          this.x = this.hitbox.x - 25
        }

        // Mira la colision cuando el jugador mira a la derecha
        if (this.velocity.x > 0) {
          this.hitbox.x = collisionBlock.x - this.hitbox.width - buffer
          this.x = this.hitbox.x - 25
          break
        }
      }
    }
  }
//Detecta las colisiones verticales de la hitbox
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
          this.y = this.hitbox.y - 30
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
//Mira la colision con la plataforma
  checkPlatformCollisions(platforms, deltaTime) {
    const buffer = 0.0001
    for (const platform of platforms) {
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

