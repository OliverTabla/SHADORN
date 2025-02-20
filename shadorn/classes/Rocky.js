const ROCKY_X_VELOCITY = 40
const ROCKY_JUMP_POWER = 350
const ROCKY_GRAVITY = 580

class Rocky {
  constructor({ x, y, width, height, velocity = { x: ROCKY_X_VELOCITY, y: 0 } },
    turningDistance = 170,) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.velocity = velocity
    this.isOnGround = false
    this.isImageLoaded = false
    this.image = new Image()
    this.image.onload = () => {
      this.imageLoaded = true
    }
    this.image.src = './assets/entities/rockysheet.png'
    this.elapsedTime = 0
    this.currentFrame = 0
    this.sprites = {
      run: {
        x: -30,
        y: -43,
        width: 120,
        height: 116,
        frames: 3,
      },
    }
    this.currentSprite = this.sprites.run
    this.facing = 'left'
    this.hitbox = {
      x: 0,
      y: 0,
      width: 25,
      height: 32,
    }
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

    if (this.imageLoaded === true) {
      let xScale = 1
      let x = this.x

      if (this.facing === 'right') {
        xScale = -1
        x = -this.x - this.width
      }

      c.save()
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

    this.elapsedTime += deltaTime
    const secondsInterval = 0.17
    if (this.elapsedTime > secondsInterval) {
      this.currentFrame = (this.currentFrame +1) % this.currentSprite.frames
      this.elapsedTime -= secondsInterval
    }

    //Posicion de la hitbox
    this.hitbox.x = this.x + 7
    this.hitbox.y = this.y + 8

    this.applyGravity(deltaTime)

    // Update horizontal position and check collisions
    this.updateHorizontalPosition(deltaTime)
    this.checkForHorizontalCollisions(collisionBlocks)

    // Check for any platform collisions
    this.checkPlatformCollisions(platforms, deltaTime)

    // Update vertical position and check collisions
    this.updateVerticalPosition(deltaTime)
    this.checkForVerticalCollisions(collisionBlocks)
    this.determineDirection()
  }
  
  determineDirection() {
    if (this.velocity.x > 0) {
      this.facing = 'right'
    } else if (this.velocity.x < 0) {
      this.facing = 'left'
    }
  }


  
    
  jump() {
    if(!this.isOnGround)
      return;
    this.velocity.y = -ROCKY_JUMP_POWER
    this.isOnGround = false
  }

  updateHorizontalPosition(deltaTime) {
    if (Math.abs(this.distanceTraveled) > this.turningDistance) {
        this.velocity.x = -this.velocity.x
        this.distanceTraveled = 0
    }
    this.x += this.velocity.x * deltaTime
    this.hitbox.x += this.velocity.x * deltaTime
    this.distanceTraveled += this.velocity.x * deltaTime
  }

  updateVerticalPosition(deltaTime) {
    this.y += this.velocity.y * deltaTime
    this.hitbox.y += this.velocity.y * deltaTime
    
  }

  applyGravity(deltaTime) {
    this.velocity.y += ROCKY_GRAVITY * deltaTime
  }

  handleInput(keys) {
    this.velocity.x = 0

    if (keys.d.pressed) {
      this.velocity.x = ROCKY_X_VELOCITY
    } else if (keys.a.pressed) {
      this.velocity.x = -ROCKY_X_VELOCITY
    }
  }

  checkForHorizontalCollisions(collisionBlocks) {
    const buffer = 0.0001
    for (let i = 0; i < collisionBlocks.length; i++) {
      const collisionBlock = collisionBlocks[i]

      // Check if a collision exists on all axes
      if (
        this.hitbox.x <= collisionBlock.x + collisionBlock.width &&
        this.hitbox.x + this.hitbox.width >= collisionBlock.x &&
        this.hitbox.y + this.hitbox.height >= collisionBlock.y &&
        this.hitbox.y <= collisionBlock.y + collisionBlock.height
      ) {
        // Check collision while player is going left
        if (this.velocity.x < -0) {
          this.hitbox.x = collisionBlock.x + collisionBlock.width + buffer
          this.x = this.hitbox.x - 7
        }

        // Check collision while player is going right
        if (this.velocity.x > 0) {
          this.hitbox.x = collisionBlock.x - this.hitbox.width - buffer
          this.x = this.hitbox.x - 7
          break
        }
      }
    }
  }

  checkForVerticalCollisions(collisionBlocks) {
    const buffer = 0.0001
    for (let i = 0; i < collisionBlocks.length; i++) {
      const collisionBlock = collisionBlocks[i]

      // If a collision exists
      if (
        this.hitbox.x <= collisionBlock.x + collisionBlock.width &&
        this.hitbox.x + this.hitbox.width >= collisionBlock.x &&
        this.hitbox.y + this.hitbox.height >= collisionBlock.y &&
        this.hitbox.y <= collisionBlock.y + collisionBlock.height
      ) {
        // Check collision while player is going up
        if (this.velocity.y < 0) {
          this.velocity.y = 0
          this.hitbox.y = collisionBlock.y + collisionBlock.height + buffer
          this.y = this.hitbox.y - 20
          break
        }

        // Check collision while player is going down
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