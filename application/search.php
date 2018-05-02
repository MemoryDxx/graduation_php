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

    $msg = $_POST['msg'];
    $sql = "SELECT * FROM house WHERE CONCAT('house_name','house_type','house_loc','house_floor','house_ori') LIKE '".$msg."'";
    $res1 = $conn->query($sql);
    $result = array();

    while ($row1 = mysqli_fetch_assoc($res1)) {
        # code...
        $result[] = $row1;
    }
    echo json_encode($result);
    // echo $row['upic'];

    $conn->close();
?>