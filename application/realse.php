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
    $rperson = $_POST['relperson'];
    $rpicname = $_FILES['relpic']['name'];
    $rpictmp = $_FILES['relpic']['tmp_name'];
    $picpath = '../public/photos/'.$_FILES['relpic']['name'];

    // echo $rpicname;
    // echo $rpictmp;
    if (file_exists("../public/photos/".$_FILES['relpic']['name'])) {
        # code...
        echo $_FILES['relpic']['name']."exist";
    }else{
        move_uploaded_file($_FILES['relpic']['tmp_name'],"../public/photos/".$_FILES['relpic']['name']);
        echo "success";
        if ($conn->query("INSERT INTO house (house_name, house_type, house_area, house_floor, house_ori, house_loc, house_pri, house_pic)
        VALUES
        ('$rname','$rtype','$rarea','$rfloor','$rori','$rloc','$rpri','$picpath')")) {
            # code...
            echo "insert success";
        }else{
            echo "error: " . $sql . "<br>" . $conn->error;
        }
    }

    

    // echo $_POST['relname'];
    // echo $_FILES['relpic']['name'];


    $conn->close();
?>