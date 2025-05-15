let tiempoRef = Date.now()
let cronometrar = false
let acumulado = 0
//Inicia el contador
function iniciar() {
    cronometrar = true
}
//Pausa el contador
function pausar() {
    cronometrar = false
}
//Reinicia el contador
function reiniciar() {
    acumulado = 0
}
//Conteo del cronometro
setInterval(() => {
    let tiempo = document.getElementById("time")
    if (cronometrar) {
        acumulado += Date.now() - tiempoRef
    }
    tiempoRef = Date.now()
    tiempo.innerHTML = formatearMS(acumulado)
}, 1000 / 60);
//Estructura del cronometro
function formatearMS(tiempo_ms) {
    let MS = tiempo_ms % 100
    
   
    let St = Math.floor(((tiempo_ms - MS) / 1000))
    
    let S = St%60
    let M = Math.floor((St / 60) % 60)
    let H = Math.floor((St/60 / 60))
    Number.prototype.ceros = function (n) {
        return (this + "").padStart(n, 0)
    }

    return M.ceros(1) + ":" + S.ceros(2)
        + "." + MS.ceros(2)
}