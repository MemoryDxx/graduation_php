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

    $rname = $_POST['relname'];
    $rtype = $_POST['reltype'];
    $rarea = $_POST['relarea'];
    $rfloor = $_POST['relfloor'];
    $rori = $_POST['relori'];
    $rloc = $_POST['relloc'];
    $rpri = $_POST['relpri'];
    $rpicname = $_FILES['relpic']['name'];
    $rpictmp = $_FILES['relpic']['tmp_name'];
    $picpath = 'photos/';

    echo $rpicname;
    echo $rpictmp;
    if (move_uploaded_file($rpictmp,$picpath.$rpicname.".png")) {
        # code...
        echo "success";

    }

    echo $_POST['relname'];
    echo $_FILES['relpic']['name'];


    $conn->close();
?>