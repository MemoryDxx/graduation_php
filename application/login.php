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
        
    $obj = json_decode($_POST,true);
    $uname = $obj->{'user_name'};
    $uemail = $obj->{'user_email'};
    $uphone = $obj->{'user_phone'};
    $upwd = $obj->{'user_pwd'};
    $sql="INSERT INTO user (uname, uphone, uemail, upwd)
    VALUES
    ('$uname','$uphone','$uemail','$upwd')";
    
    if ($conn->query($sql) === TRUE){
      echo $obj;
    }else{
      echo "error: " . $sql . "<br>" . $conn->error;
    }
    
    $conn->close();
?>
