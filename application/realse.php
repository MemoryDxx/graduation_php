<?php
    $servername = "localhost";
    $username = "root";
    $password = "mysql";
    $bdname = "graduation";
    $conn = mysqli_connect($servername, $username, $password, $bdname);
    if (!$conn){
        echo "error";
        die('Could not connect: ' . mysqli_connect_error());
    }

    $json = file_get_contents("php://input");
    echo $json;
    var_dump($_POST);
    var_dump(file_get_contents($_POST));
    var_dump($_POST["relhouse"]);
    var_dump(file_get_contents($_POST["relhouse"]));
    var_dump(json_decode($_POST));
    var_dump(file_get_contents(json_decode($_POST)));
    var_dump(json_decode($_POST["relhouse"]));
    var_dump($_FILES["relpic"]);
    var_dump(file_get_contents($_FILES));
    var_dump(file_get_contents($_FILES["relhouse"]));


    $conn->close();
?>