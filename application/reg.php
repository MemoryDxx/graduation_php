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

    $post_array = $_POST["reguser"];
    $obj = json_decode($post_array);
    $uname = $obj->user_name;
    $upwd = $obj->user_pwd;

    $res = $conn->query("SELECT upwd FROM user WHERE uname='$uname'");
    if(!$res){
        die('无法读取数据: ' . mysqli_error($conn));
    }
    var_dump($res);
    $row=mysqli_fetch_assoc($result);
    var_dump($row);
    // $row = mysqli_fetch_array($res, MYSQLI_ASSOC);
    // if($row['upwd'] === $upwd){
    //     class jmsg {
    //         public $msg = "";
    //         public $name  = "";
    //     }
    //     $j = new jmsg();
    //     $j->msg = "regsc";
    //     $j->name = $uname;
    //     echo $j;
    // }

    $conn->close();
?>