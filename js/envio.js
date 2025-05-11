const formVideo = document.querySelector("#formVideo");

formVideo.addEventListener("submit", e => {
    e.preventDefault();

    const formData = new FormData(formVideo);

    fetch("enviarvideo.php", {
        method: "POST",
        body: formData
    })
        .then(respuesta => {
            if (!respuesta.ok) throw new Error("Error en la respuesta");
            return respuesta.text(); // el PHP actual NO devuelve JSON, sino texto
        })
        .then(result => {
            alert("correct", result);
        })
        .catch(e => {
            alert("error", "Error al enviar el formulario.");
            console.error(e);
        });
});

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
