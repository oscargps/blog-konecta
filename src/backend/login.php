<?php
include('conexion.php');

$credenciales = json_decode($_GET['credenciales'])or die ('Error obteniendo las credenciales');

$usuario = $credenciales->{'user'};
$pw = $credenciales->{'pw'};
$json=array();
$sql = "select * from users where user_mail = '$usuario'";
$result = mysqli_query($con,$sql) or die ("error en la consulta");
if(mysqli_num_rows($result) != '0'){
    while ($fila = mysqli_fetch_assoc($result)) {
        if($fila['user_password'] === $pw){
                 $json[] = array(
        'id' => $fila['user_id'],
        'name' => $fila['user_name'],
        'mail' => $fila['user_mail'],
        'phone' => $fila['user_phone'],
        'type' => $fila['user_type'],
 
        );
        }else{
            http_response_code(404);
            die(mysqli_error($con));
            exit;
        }
    }
    $jsons=json_encode($json);
    echo $jsons;
}else{
              http_response_code(404);
            die(mysqli_error($con));
            exit;  
}

?>