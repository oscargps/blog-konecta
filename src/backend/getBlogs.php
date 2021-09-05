<?php
include('conexion.php');
$blog=array();
$blogs=array();
    $sql = "select * from blogs";
    $result = mysqli_query($con,$sql) or die ("error en la consulta");
    if(!$result){
        http_response_code(404);
        die(mysqli_error($con));
        exit;
    }
    if(mysqli_num_rows($result) != '0'){
        while($row = mysqli_fetch_assoc($result))
        {
            foreach($row as $key => $value) {
                if($key == "blog_author"){
                    $blog['author'] = getAuthor($con,$value);
                }elseif($key == "blog_category"){
                    $blog['category'] = getCategory($con,$value);
                
                }else{
                $blog[explode('_',$key)[1]] = $value;
                }
            }
             $blogs[]=$blog;
        }

     $jsons=json_encode($blogs);
    echo $jsons;
    }else{
        echo array();
    }

function getAuthor($con,$id){
    $sql = "select user_name from users where user_id = '$id'";
    $result = mysqli_query($con,$sql) or die ("error en la consulta");
    while ($res = mysqli_fetch_assoc($result)) {
       $name=$res['user_name'];
     }
    return $name;
}
function getCategory($con,$id){
    $sql = "select category_name from categories where category_id = '$id'";
    $result = mysqli_query($con,$sql) or die ("error en la consulta");
    while ($res = mysqli_fetch_assoc($result)) {
       $cat=$res['category_name'];
     }
    return $cat;
}


?>