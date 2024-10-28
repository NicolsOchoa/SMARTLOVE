/* DAO */
<?php
    $host = "localhost";
    $user = "root";
    $password = "";

    $db = "iniciosesiondb";

    $conexion = mysqli_connect($host, $user, $password, $db);

    if (!$conexion) {
        echo "conexion fallida";
    }
?>