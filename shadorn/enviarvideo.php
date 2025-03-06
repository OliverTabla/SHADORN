<?php
// Incluir las clases de PHPMailer necesarias
require 'PHPMailer/src/PHPMailer.php'; 
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Verifica que el formulario haya sido enviado por POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibe los datos del formulario
    $emailRemitente = $_POST["email"]; // Correo del remitente
    $archivo = $_FILES["archivo"]; // El archivo que se adjunta

    // Crea una nueva instancia de PHPMailer
    $mail = new PHPMailer(true);
    
    try {
        // Habilitar depuración (opcional para ver detalles de errores)
        $mail->SMTPDebug = 2;  
        $mail->Debugoutput = 'html';

        // Configuración del servidor SMTP
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com'; // El servidor SMTP de Gmail
        $mail->SMTPAuth   = true;
        $mail->Username   = 'shadornrecords@gmail.com'; // TU correo de Gmail
        $mail->Password   = 'mozw xftq chdm nvhf'; // Contraseña de Aplicación generada
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Seguridad TLS
        $mail->Port       = 587; // Puerto para SMTP (587 es el más común)

        // Configuración del correo
        $mail->setFrom('shadornrecords@gmail.com', 'Shadorn'); // Remitente del correo
        $mail->addReplyTo($emailRemitente); // Dirección para respuestas
        $mail->addAddress('shadornrecords@gmail.com'); // Dirección a la que se enviará el correo
        $mail->Subject = 'Nuevo archivo adjunto'; // Asunto del correo
        $mail->Body    = 'Has recibido un archivo adjunto de ' . $emailRemitente; // Cuerpo del mensaje

        // Adjuntar archivo
        if ($archivo["error"] == 0) {  // Verifica si no hubo errores con el archivo
            $mail->addAttachment($archivo["tmp_name"], $archivo["name"]); // Agrega el archivo adjunto
        }

        // Enviar el correo
        if ($mail->send()) {
            echo "Correo enviado con éxito.";
        } else {
            echo "Error al enviar el correo.";
        }

    } catch (Exception $e) {
        // Si hay un error, muestra el detalle
        echo "Error: {$mail->ErrorInfo}";
    }
} else {
    echo "Método no permitido."; // Si no se usó POST
}
?>
