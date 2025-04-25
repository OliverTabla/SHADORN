function resultadoFinal() {
    // Registra el tiempo final
    const currentTime = document.getElementById('time').textContent;
    
    // remplaza todo el contenido de la pagina
    document.body.innerHTML = `
        <style>
            #resultado a:hover {
                color: #dd00ff !important;
                transition: color 0.3s ease-in-out;
            }
        </style>
        <div id="resultado" style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100vw;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 9999;
            text-align: center;
        ">
            <p class="crono" style="
                color: white;
                font-size: 400px;
                -webkit-text-stroke: 2px black;
                margin: 0;
            ">${currentTime}</p>
            <ul style="
                width: 100%;
                display: flex;
                justify-content: center;
                gap: 100px;
                padding: 0;
                margin-top: 20px;
                list-style: none;
            ">
                <li style="font-size: 48px;">
                    <a href="#" onclick="location.reload()" style="text-decoration: none; color: white;">Volver a jugar</a>
                </li>
                <li style="font-size: 48px;">
                    <a href="enviar.html" style="text-decoration: none; color: white;">Envia tu tiempo</a>
                </li>
                <li style="font-size: 48px;">
                    <a href="menu.html" style="text-decoration: none; color: white;">Volver al menu</a>
                </li>
            </ul>
        </div>
    `;
}