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

    var_dump($_FILES);
    var_dump($_POST);
    var_dump(file_get_contents($_FILES["relpic"]["tmp_name"]));
    var_dump($_POST["relhouse"]);
    var_dump($_FILES["relpic"]);


    $conn->close();
?>