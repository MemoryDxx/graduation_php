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
    $row=mysqli_fetch_assoc($res);
    echo json_encode($row);

    $conn->close();
?>