<?php
    header("Content-Type: text/html;charset=utf-8");
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
    $rbei = $_POST['relbei'];
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
        mysqli_query("set names 'utf8'");
        if ($conn->query("INSERT INTO house (house_name, house_type, house_area, house_floor, house_ori, house_loc, house_pri, house_pic, uname, beizhu)
        VALUES
        ('$rname','$rtype','$rarea','$rfloor','$rori','$rloc','$rpri','$picpath','$rperson','$rbei')")) {
            # code...
            $res = $conn->query("SELECT * FROM house LIMIT 1");
            $row=mysqli_fetch_assoc($res);
            echo $row['house_id'];
        }else{
            echo "error: " . $sql . "<br>" . $conn->error;
        }
    }

    

    // echo $_POST['relname'];
    // echo $_FILES['relpic']['name'];


    $conn->close();
?>