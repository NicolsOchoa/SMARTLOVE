<?php
session_start();
include('conexion.php'); 

$message = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);

    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {

     
        $check_sql = "SELECT * FROM suscripciones WHERE email = '$email'";
        $result = mysqli_query($conexion, $check_sql);

        if (mysqli_num_rows($result) > 0) {
            
            $message = "Este correo ya está suscrito.";
        } else {
            
            $sql = "INSERT INTO suscripciones (email) VALUES ('$email')";

            if (mysqli_query($conexion, $sql)) {
                $message = "¡Te has suscrito exitosamente!";
            } else {
                $message = "Error: " . $sql . "<br>" . mysqli_error($conexion);
            }
        }
    } else {
        $message = "El email no es válido.";
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SUSCRÍBETE</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
    
    
    <link rel="stylesheet" type="text/css" href="../CSS/suscripcion.css">
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
</head>
<body>

    <header>
        <div class="container flex_space">
            <div class="logo">
                <img src="../imagenes/logo.png" alt="Hotel Smart Love">
            </div>
            <div class="navhotel">
                <ul id="indicelist">
                    <li><a href="../principal.html">Inicio</a></li>
                    <li><a href="../evento.html">EVENTOS</a></li>
                    <li><a href="../ofertas.html">OFERTAS</a></li>
                    <li><a href="#contacto">CONTACTO</a></li>
                    <li><a href="../servicios/reservas.html"><button class="primary-btn">RESERVAR</button></a></li>
                </ul>
            </div>  
        </div>
    </header>

    <!-- Formulario de suscripción -->
    <form action="suscripcion.php" method="post">
        <h2>Suscríbete a nuestro boletín</h2>
        <input type="email" id="email" name="email" required>
        <button type="submit">Suscribirse</button>
        <!-- Mostrar mensaje si existe -->
        <?php if (!empty($message)): ?>
            <div class="message <?php echo (strpos($message, 'exitosamente') !== false) ? 'success' : ''; ?>">
                <?php echo $message; ?>
            </div>
        <?php endif; ?>
    </form>

    <a id="floating-chat" onclick="indicetoggle()">
        <i class="fas fa-comments"></i>
    </a>
    
    <div id="chat-box" style="display:none;">
        <div id="messages"></div>
        <input type="text" id="user-input" placeholder="Escribe tu mensaje aquí...">
        <button id="send-btn">Enviar</button>
        <button id="exit-btn">Cerrar</button>
    </div>

    <script src="js/chatbot.js"></script>
</body>
</html>
