<?php
header('Access-Control-Allow-Origin:*');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") {
    die();
}
error_reporting(E_ALL ^ E_NOTICE);
date_default_timezone_set('America/Bogota');

$host = "localhost";
$baseDatos = "id17533982_konectablog";
$usuario = "id17533982_admin";
$contraseña = "0rZ4^mp}#6>d{3G*"; 
$con = mysqli_connect($host,$usuario,$contraseña) or die ("Error en la conexion al host");
mysqli_select_db ($con,$baseDatos) or die ("Error en la conexion al base datos");

?>