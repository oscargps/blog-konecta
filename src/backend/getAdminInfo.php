<?php
include('conexion.php');
$json = array();
$sql = "select * from users";
$result = mysqli_query($con,$sql) or die ("error en la consulta");
    while ($fila = mysqli_fetch_assoc($result)) {
    
                $json[] = array(
        'id' => $fila['user_id'],
        'type' => $fila['user_type'],
        'name' => $fila['user_name'],
        'mail' => $fila['user_mail'],
        'phone' => $fila['user_phone']
        );
        
    }
    $jsons=json_encode($json);
    echo $jsons;
?>