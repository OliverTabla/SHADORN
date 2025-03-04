<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES["video"])) {
    $emailDestino = "shadornrecords@gmail.com"; // Cambia esto por el correo al que quieres enviar el archivo
    $emailRemitente = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);

    // Verificar si el archivo se subió sin errores
    if ($_FILES["video"]["error"] == UPLOAD_ERR_OK) {
        $archivoTmp = $_FILES["video"]["tmp_name"];
        $nombreArchivo = $_FILES["video"]["name"];
        $tipoArchivo = $_FILES["video"]["type"];

        // Leer el contenido del archivo
        $archivoContenido = file_get_contents($archivoTmp);
        $archivoContenido = chunk_split(base64_encode($archivoContenido));

        // Generar un boundary único
        $boundary = md5(uniqid(time()));

        // Encabezados del correo
        $headers = "From: $emailRemitente\r\n";
        $headers .= "Reply-To: $emailRemitente\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

        // Cuerpo del mensaje
        $mensaje = "--$boundary\r\n";
        $mensaje .= "Content-Type: text/plain; charset=\"utf-8\"\r\n";
        $mensaje .= "Content-Transfer-Encoding: 7bit\r\n";
        $mensaje .= "Hola, aquí tienes el video adjunto.\r\n";
        $mensaje .= "--$boundary\r\n";
        $mensaje .= "Content-Type: $tipoArchivo; name=\"$nombreArchivo\"\r\n";
        $mensaje .= "Content-Transfer-Encoding: base64\r\n";
        $mensaje .= "Content-Disposition: attachment; filename=\"$nombreArchivo\"\r\n";
        $mensaje .= "\r\n$archivoContenido\r\n";
        $mensaje .= "--$boundary--";

        // Enviar correo
        if (mail($emailDestino, "Nuevo video enviado", $mensaje, $headers)) {
            echo "El video se envió correctamente.";
        } else {
            echo "Hubo un error al enviar el correo.";
        }
    } else {
        echo "Error al subir el archivo.";
    }
} else {
    echo "No se ha enviado ningún archivo.";
}
?>
