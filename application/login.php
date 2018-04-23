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
        
    $uname = $_POST[user_name];
    $uemail = $_POST[user_email];
    $uphone = $_POST[user_phone];
    $upwd = $_POST[user_pwd];
    $sql="INSERT INTO user (uname, uphone, uemail, upwd)
    VALUES
    ('$uname','$uphone','$uemail','$upwd')";
    
    if ($conn->query($sql) === TRUE){
      echo "success";
      echo $uname;
    }else{
      echo "error: " . $sql . "<br>" . $conn->error;
    }
    
    $conn->close();
?>
