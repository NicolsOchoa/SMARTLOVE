<?php
session_start();
include('conexion.php');  

if (isset($_POST['Usuario']) && isset($_POST['Contraseña'])) {
    // Función para limpiar los datos de entrada
    function validate($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    $Usuario = validate($_POST['Usuario']);
    $Contraseña = validate($_POST['Contraseña']);

    // Verificar que los campos no estén vacíos
    if (empty($Usuario)) {
        header("Location: index.html?error=El usuario es requerido");
        exit();
    } else if (empty($Contraseña)) {
        header("Location: index.html?error=La contraseña es requerida");
        exit();
    } else {
        // Preparar la consulta para verificar el usuario
        $stmt = $conexion->prepare("SELECT * FROM usuarios WHERE Usuario = ?");
        if ($stmt === false) {
            die('Error al preparar la consulta: ' . $conexion->error);
        }

        $stmt->bind_param("s", $Usuario);
        $stmt->execute();
        $result = $stmt->get_result();

        // Verificar si se encontró el usuario
        if ($result->num_rows === 1) {
            $row = $result->fetch_assoc();

            // Compara la contraseña ingresada con la almacenada en la base de datos
            // Si las contraseñas están en texto plano en la BD
            if ($Contraseña === $row['Contraseña']) {
                // Si coinciden, crear la sesión y redirigir al usuario
                $_SESSION['Usuario'] = $row['Usuario'];
                $_SESSION['Nombre_completo'] = $row['Nombre_completo'];
                $_SESSION['Id'] = $row['Id'];
                
                // Cambiar la redirección a una página principal en lugar de cerrarsesion.html
                header("Location: ../principal.html");  // Asegúrate de que principal.html existe en esta ruta
                exit();
            } else {
                // Contraseña incorrecta
                header("Location: IniciaSesion.html?error=El usuario o la contraseña son incorrectos");
                exit();
            }
        } else {
            // Usuario no encontrado
            header("Location: IniciaSesion.html?error=El usuario o la contraseña son incorrectos");
            exit();
        }

        $stmt->close();
    }
} else {
    // Si no se recibieron datos, redirige al inicio de sesión
    header("Location: IniciaSesion.html");
    exit();
}
?>
