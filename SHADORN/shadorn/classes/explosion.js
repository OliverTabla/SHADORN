class Explosion {
  constructor({ 
    x, 
    y, 
    width, 
    height, 
    imageSrc, 
    spriteCropbox = {
        x: 0,
        y: 0,
        width: 36,
        height: 28,
        frames: 6,
    },
    hitbox = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    }

}) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.isImageLoaded = false
    this.image = new Image()
    this.image.onload = () => {
      this.imageLoaded = true
    }
    this.image.src = imageSrc
    this.elapsedTime = 0
    this.currentFrame = 0
    
    this.currentSprite = spriteCropbox 
    this.iteration = 0
    this.hitbox = hitbox
  }

    draw(c) {
    // CUADRADO ROJO PARA PRUEBAS
    //c.fillStyle = 'rgba(255, 0, 0, 0.5)'
    //c.fillRect(this.x, this.y, this.width, this.height)

    if (this.imageLoaded === true) {
      let xScale = 1
      let x = this.x

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

  update(deltaTime) {
    if (!deltaTime) return
  
    //Actualizar frames
    this.elapsedTime += deltaTime
    const secondsInterval = 0.12
    if (this.elapsedTime > secondsInterval) {
      this.currentFrame = (this.currentFrame +1) % this.currentSprite.frames
      this.elapsedTime -= secondsInterval

      if (this.currentFrame === 0) {
        this.iteration++
      }
    }

  }
  
}
