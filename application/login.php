<?php
    $servername = "localhost";
    $username = "root";
    $password = "mysql";
    $bdname = "graduation";
    $conn = mysqli_connect($servername, $username, $password, $bdname);
    if (!$conn)
      {
        echo "error";
        die('Could not connect: ' . mysqli_connect_error());
      }
    
    
    $post_array = $_POST["user"];
    var_dump($post_array);
    // 解析json
    $obj = json_decode($post_array);
    
    var_dump($obj);

    $uname = $obj->user_name;
    var_dump($uname);
    $uemail = $obj->user_email;
    $uphone = $obj->user_phone;
    $upwd = $obj->user_pwd;

    $sql = "INSERT INTO user (uemail, uname, uphone, upwd)
    VALUES
    ('$uemail','$uname','$uphone','$upwd')";
    
    $sqlsel = "SELECT * FROM user
    WHERE uphone = '$uphone'";

    $result = mysqli_query($conn,$sqlsel);
    echo $result;

    if ($result) {
      # code...
      echo $result;
      echo "exist";
    }else if(mysqli_query($conn,$sql) === TRUE){
      # code...
      echo "success";
    }else{
      echo "error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
?>
