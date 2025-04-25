const pausaElement = document.getElementById('pausa');
const javaElements = document.getElementsByClassName('java');
const pausaSoni = new Audio('./sonidos/pausaSonido.mp3')
pausaSoni.volume = 0.2
if (pausaElement){
    window.addEventListener('keydown', (event) => {
        if(event.key === 'Escape'){
            //muestra el menu de pausa
            pausaElement.classList.toggle('hidden');
            pausaElement.classList.toggle('visible');
            
            if (pausaElement.classList.contains("visible")) {
            // Congela la página al mostrar el menú de pausa
                for (let el of javaElements) {
                    el.classList.add("no-interaction");
                }
                //reproduce el sonido de pausa
                cancionP.pause()
                pausaSoni.play()
                pausar();
                player.congelar();
                rockys.forEach(rocky => rocky.congelar());
                jurks.forEach(jurk => jurk.congelar());
                gorks.forEach(gork => gork.congelar());
                guards.forEach(guard => guard.congelar());
            } else {
            // Reactiva la página al ocultar el menú de pausa
                for (let el of javaElements) {
                    el.classList.remove("no-interaction");
                }
                iniciar();
                cancionP.play()
                player.reanudar();
                rockys.forEach(rocky => rocky.reanudar());
                jurks.forEach(jurk => jurk.reanudar());
                gorks.forEach(gork => gork.reanudar());
                guards.forEach(guard => guard.reanudar());
            }
        }
    });
}



function Reanudar(){
    //esconde el menu de pausa
    pausaElement.classList.remove('visible');
    pausaElement.classList.add('hidden');
    for (let el of javaElements) {
        el.classList.remove("no-interaction");
    }
    iniciar();
    cancionP.play()
    player.reanudar();
    rockys.forEach(rocky => rocky.reanudar());
    jurks.forEach(jurk => jurk.reanudar());
    gorks.forEach(gork => gork.reanudar());
    guards.forEach(guard => guard.reanudar());
}
