const formVideo = document.querySelector("#formVideo");
//Comprobar envio del formulario
formVideo.addEventListener("submit", e => {
    e.preventDefault();

    const formData = new FormData(formVideo);

    fetch("enviarvideo.php", {
        method: "POST",
        body: formData
    })
        .then(respuesta => {
            if (!respuesta.ok) throw new Error("Error en la respuesta");
            return respuesta.text(); 
        })
        .then(result => {
            alert("correct", result);
        })
        .catch(e => {
            alert("error", "Error al enviar el formulario.");
            console.error(e);
        });
});
//Funcion que hace que salte la notificacion de que se a enviado el formulario
function alert(type, text) {
    const alert = document.createElement("DIV");
    alert.classList.add("alert");
    alert.classList.add(type === "error" ? "error" : "correct");
    alert.textContent = text;
    document.body.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 3000);
}
