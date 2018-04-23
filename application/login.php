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
    
    var_dump($_POST['data']);
    var_dump($_POST['array(1)']);
    var_dump($_POST['user']);
    $post_array = $_POST[''];
    var_dump($post_array);
    var_dump($_POST);
    // 解析json
    $k = preg_replace('/\s+/','',$post_array);
    $obj = json_decode($k);
    
    var_dump($obj);

    $uname = $obj['user_name'];
    $uemail = $obj['user_email'];
    $uphone = $obj['user_phone'];
    $upwd = $obj['user_pwd'];
    $sql="INSERT INTO user (uemail, uname, uphone, upwd)
    VALUES
    ('$uname','$uphone','$uemail','$upwd')";
    
    if ($conn->query($sql) === TRUE){
      echo $_POST;
    }else{
      echo "error: " . $sql . "<br>" . $conn->error;
    }
    
    $conn->close();
?>
