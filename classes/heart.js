//Creacion del elemento corazon
class Corazon {
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
      this.currentFrame = 0
      this.currentSprite = spriteCropbox 
      this.depleted = false
      
    }
  
      draw(c) {
      // CUADRADO ROJO PARA PRUEBAS
      //c.fillStyle = 'rgba(255, 0, 0, 0.5)'
      //c.fillRect(this.x, this.y, this.width, this.height)
  //Cambia el frame del corazon
      if (this.imageLoaded === true) {
        let xScale = 1
        let x = this.x

        if (this.depleted) {
            this.currentFrame = 1
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
  
    
    
}
  