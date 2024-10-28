<?php
session_start();
include('conexion.php');

function validate($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$Nombre_completo = validate($_POST['Nombre_completo']);
$Usuario = validate($_POST['Usuario']);
$Contraseña = validate($_POST['Contraseña']);

if (empty($Nombre_completo) || empty($Usuario) || empty($Contraseña)) {
    echo "Todos los campos son requeridos.";
    exit();
}

$stmt = $conexion->prepare("INSERT INTO usuarios (Nombre_completo, Usuario, Contraseña) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $Nombre_completo, $Usuario, $Contraseña);

if ($stmt->execute()) {
    echo "<!DOCTYPE html>
    <html lang='es'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <link rel='stylesheet' href='../CSS/styleregistro.css'>
        <title>Registro Exitoso</title>
    </head>
    <body>
        <div class='mensaje-exito'>
            <h1>Registro exitoso</h1>
            <a href='IniciaSesion.html'><button>Volver</button></a>
        </div>
    </body>
    </html>";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conexion->close();
?>