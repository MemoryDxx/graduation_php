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

    $hid = $_POST['hid'];
    $res = $conn->query("SELECT * FROM house WHERE house_id='$hid'");
    $row = mysqli_fetch_assoc($res);
    $name = $res['uname'];
    $res1 = $conn->query("SELECT uphone FROM user WHERE uname='$name'");
    $row1 = mysqli_fetch_assoc($res1);
    $row['uphone'] = $res1['uphone'];
    
    echo $row1['uphone'];
    echo json_encode($row);

    $conn->close();
?>