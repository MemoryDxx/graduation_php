<?php
    $servername = "localhost";
    $username = "ubuntu";
    $password = "kangxinyuan";
    $bdname = "graduation";
    $conn = mysqli_connect($servername, $username, $password, $bdname);
    if (!$conn)
      {
        echo "error";
        die('Could not connect: ' . mysqli_connect_error());
      }
        
    $sql="INSERT INTO user (user_name, user_email, user_phone, user_pwd)
    VALUES
    ('$_POST[user_name]','$_POST[user_email]','$_POST[user_phone]','$_POST[user_pwd]')";
    
    if ($conn->query($sql) === TRUE){
      echo "success";
    }else{
      echo "error: " . $sql . "<br>" . $conn->error;
    }
    
    $conn->close();
?>