<?php
require 'PHPMailer/src/PHPMailer.php'; 
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verificar que los campos necesarios están siendo enviados
    if(isset($_POST["nombre"]) && isset($_POST["correo"]) && isset($_POST["mensaje"]) && isset($_FILES["video"])) {
        $nombre = $_POST["nombre"];  // Nombre del remitente
        $correo = $_POST["correo"];  // Correo del remitente
        $mensaje = $_POST["mensaje"];  // Mensaje del remitente
        $opinion = isset($_POST["opinion"]) ? $_POST["opinion"] : '';  // Opinión del remitente (opcional)
        $video = $_FILES["video"];  // Video adjunto

        // Crear una instancia de PHPMailer
        $mail = new PHPMailer(true);
        
        try {
            // Configurar SMTP
            $mail->isSMTP();
            $mail->Host       = 'smtp.gmail.com'; 
            $mail->SMTPAuth   = true;
            $mail->Username   = 'shadornrecords@gmail.com'; // Tu correo de Gmail
            $mail->Password   = 'mozw xftq chdm nvhf'; // Contraseña de aplicación
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; 
            $mail->Port       = 587;

            // Configurar el correo
            $mail->setFrom($correo, $nombre); // Correo del remitente
            $mail->addReplyTo($correo);  // Dirección de respuesta
            $mail->addAddress('shadornrecords@gmail.com');  // Dirección de destino
            $mail->Subject = 'Nuevo record enviado: ' . $nombre;  // Asunto

            // Cuerpo del mensaje sin HTML
            $mail->isHTML(false);  // No usar HTML
            $mail->Body = "Nuevo record enviado por {$nombre}!\n\n";
            $mail->Body .= "Nombre: {$nombre}\n";
            $mail->Body .= "Correo: {$correo}\n";
            $mail->Body .= "Mensaje: {$mensaje}\n";
            $mail->Body .= "Opinión sobre la web: {$opinion}\n";
            $mail->Body .= "Video enviado: {$video['name']}\n";  // Detalles del video adjunto

            // Adjuntar video si no hay errores
            if ($video["error"] == 0) {  
                $mail->addAttachment($video["tmp_name"], $video["name"]);  // Adjuntar el archivo
            }

            // Enviar el correo
            if ($mail->send()) {
                // Mensaje de éxito
                echo '¡Gracias por darnos tu opinion y tu record sera revisado!.';
            } else {
                // Mensaje de error
                echo 'Error al enviar el formulario.';
            }

        } catch (Exception $e) {
            // Mensaje de error si ocurre una excepción
            echo 'Error: ' . $mail->ErrorInfo;
        }
    } else {
        // Si faltan campos en el formulario
        echo 'Faltan campos en el formulario.';
    }
} else {
    echo 'Método no permitido.';
}
?>


