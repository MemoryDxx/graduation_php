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
    $name = $row['uname'];
    $res1 = $conn->query("SELECT uphone FROM user WHERE uname='$name'");
    $row1 = mysqli_fetch_assoc($res1);
    $res2 = $conn->query("SELECT upic FROM user WHERE uname='$name'");
    $row2 = mysqli_fetch_assoc($res2);
    $row['uphone'] = $row1['uphone'];
    $row['upic'] = $row2['upic'];
    
    echo json_encode($row);
    // echo json_encode($row1);

    $conn->close();
?>