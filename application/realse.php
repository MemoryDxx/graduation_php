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
    $picpath = '/public/photos/';

    echo $rpicname;
    echo $rpictmp;
    if (file_exists("photos/".$_FILES['relpic']['name'])) {
        # code...
        echo $_FILES['relpic']['name']."exist";
    }else{
        move_uploaded_file($_FILES['relpic']['tmp_name'],"photos/".$_FILES['relpic']['name']);
        echo "success";
    }

    echo $_POST['relname'];
    echo $_FILES['relpic']['name'];


    $conn->close();
?>