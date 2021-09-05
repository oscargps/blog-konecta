 <?php
include('conexion.php');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, PUT, DELETE");
error_reporting(E_ALL ^ E_NOTICE);
if (!$con) {
    echo "Ocurrió un error.\n";
    exit;
}

$response = false;

switch ($method) {
    case 'POST':
        $data = json_decode($_POST['data']);
        
        if (createUser($con, $data)) {
            echo "ok";
            return true;
        } else {
            http_response_code(404);
            die(mysqli_error($con));
            exit;
        }
        break;
}



function createUser($con, $data)
{
    
    $nombre   = $data->{'userName'};
    $password = $data->{'password1'};
    $email    = $data->{'userMail'};
    $contacto = $data->{'userPhone'};
    $sql      = "INSERT INTO users(user_name,user_password,user_mail,user_phone,user_type) values('$nombre','$password','$email','$contacto','user')";
    $res      = mysqli_query($con, $sql);
    if (!$res) {
        http_response_code(404);
        die(mysqli_error($con));
        exit;
    }
    return true;
}



?> 