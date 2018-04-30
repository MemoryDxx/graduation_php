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
    
    mysqli_query("set names 'utf8'");
    if ($conn->query("UPDATE house SET house_name='$rname', house_type='$rtype', house_area='$rarea', house_floor='$rfloor', house_ori='$rori', house_loc='$rloc', house_pri='$rpri', beizhu='$rbei'")) {
        # code...
        echo "success";
    }else{
        echo "error: " . $sql . "<br>" . $conn->error;
    }

    

    // echo $_POST['relname'];
    // echo $_FILES['relpic']['name'];


    $conn->close();
?>