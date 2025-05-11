function resultadoFinal() {
  // Registra el tiempo final
  const currentTime = document.getElementById("time").textContent

  // Detectar si es un dispositivo móvil
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth <= 768

  // remplaza todo el contenido de la pagina
  document.body.innerHTML = `
        <style>
            body {
                margin: 0;
                padding: 0;
                overflow: hidden;
            }
            
            #resultado {
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
                background: linear-gradient(135deg, #1565c0, #1e88e5);
            }
            
            .crono {
                color: white;
                font-size: 400px;
                -webkit-text-stroke: 2px black;
                margin: 0;
                line-height: 1;
            }
            
            .menu-links {
                width: 100%;
                display: flex;
                justify-content: center;
                gap: 100px;
                padding: 0;
                margin-top: 20px;
                list-style: none;
                flex-wrap: wrap;
            }
            
            .menu-links li {
                font-size: 48px;
            }
            
            .menu-links a {
                text-decoration: none;
                color: white;
                transition: color 0.3s ease-in-out;
            }
            
            .menu-links a:hover {
                color: rgb(255, 160, 160) !important;
            }
            
            /* Pantallas grandes (1366px - 1025px) */
            @media (max-width: 1366px) and (min-width: 1025px) {
                .crono {
                    font-size: 350px !important;
                }
                
                .menu-links {
                    gap: 80px;
                }
                
                .menu-links li {
                    font-size: 38px;
                }
            }
            
            /* Pantallas medianas (1024px - 769px) */
            @media (max-width: 1024px) and (min-width: 769px) {
                .crono {
                    font-size: 240px;
                }
                
                .menu-links {
                    gap: 60px;
                }
                
                .menu-links li {
                    font-size: 36px;
                }
            }
            
            /* Tablets (768px - 481px) */
            @media (max-width: 768px) and (min-width: 481px) {
                .crono {
                    font-size: 150px;
                }
                
                .menu-links {
                    gap: 40px;
                    margin-top: 30px;
                }
                
                .menu-links li {
                    font-size: 30px;
                }
                
                .ocultar-mobile {
                    display: none !important;
                }
            }
            
            /* Móviles (480px y menos) */
            @media (max-width: 480px) {
                .crono {
                    font-size: 100px;
                }
                
                .menu-links {
                    gap: 20px;
                    margin-top: 40px;
                }
                
                .menu-links li {
                    font-size: 20px;
                }
                
                .ocultar-mobile {
                    display: none !important;
                }
            }
            
            /* Clase específica para ocultar en móviles */
            .ocultar-mobile {
                display: ${isMobile ? "none" : "block"} !important;
            }
        </style>
        <div id="resultado">
            <p class="crono">${currentTime}</p>
            <ul class="menu-links">
                <li>
                    <a href="#" onclick="location.reload()">Volver a jugar</a>
                </li>
                <li class="ocultar-mobile">
                    <a href="enviar.html">Envia tu tiempo</a>
                </li>
                <li>
                    <a href="menu.html">Volver al menu</a>
                </li>
            </ul>
        </div>
    `
}
