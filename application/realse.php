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

    $name = isset($_POST['relname']) ? $_POST['relname'] : '';
    $filename = time().substr($_FILES['relpic']['name'], strrpos($_FILES['relpic']['name'], '.'));

    $respon = array();

    if (move_uploaded_file($_FILES['relpic']['tmp_name'],$filename)) {
        # code...
        $respon['name'] = $name;
        $respon['pic'] = $filename;
    }

    echo json_encode($respon);


    $conn->close();
?>