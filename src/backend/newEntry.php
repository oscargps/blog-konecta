<?php
include('conexion.php');

error_reporting(E_ALL ^ E_NOTICE);
if (!$con) {
    echo "Ocurrió un error.\n";
    exit;
}

$response = false;

switch ($method) {
    case 'POST':
        $data = json_decode($_POST['data']);
        
        if (createEntry($con, $data)) {
            echo "ok";
            return true;
        } else {
            http_response_code(404);
            die(mysqli_error($con));
            exit;
        }
        break;
}



function createEntry($con, $data)
{
    
    $category   = $data->{'category'};
    $author= $data->{'author'};
    $title    = $data->{'title'};
    $slug = $data->{'slug'};
    $shortText = $data->{'shortText'};
    $largeText = $data->{'largeText'};
    $pic = $data->{'pic'};
    $sql      = "INSERT INTO blogs(blog_category,blog_author,blog_title,blog_slug,blog_short,blog_large,blog_pic)values('$category','$author','$title','$slug','$shortText','$largeText','$pic')";
    $res      = mysqli_query($con, $sql);
    if (!$res) {
        http_response_code(404);
        die(mysqli_error($con));
        exit;
    }
    return true;
}



?> 