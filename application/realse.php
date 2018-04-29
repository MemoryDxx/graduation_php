<?php
    header("Content-Type:multipart/form-data")
    $servername = "localhost";
    $username = "root";
    $password = "mysql";
    $bdname = "graduation";
    $conn = mysqli_connect($servername, $username, $password, $bdname);
    if (!$conn){
        echo "error";
        die('Could not connect: ' . mysqli_connect_error());
    }

    $filename = $_FILES['relpic']['name'];
    var_dump($filename);
    var_dump($_FILES['relpic']);
    var_dump($_POST['relname']);
    var_dump(file_get_contents($_FILES["relpic"]["name"]));
    var_dump($_POST["relhouse"]);
    var_dump($_FILES['relpic']['name']);
    var_dump($_FILES["relpic"]["name"]);


    $conn->close();
?>