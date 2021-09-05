<?php
include('conexion.php');

$json = array();
$sql = "select * from categories";
$result = mysqli_query($con,$sql) or die ("error en la consulta");
    while ($fila = mysqli_fetch_assoc($result)) {
    
                $json[] = array(
        'id' => $fila['category_id'],
        'name' => $fila['category_name'],
        'desc' => $fila['category_description']
        );
        
    }
    $jsons=json_encode($json);
    echo $jsons;


?>