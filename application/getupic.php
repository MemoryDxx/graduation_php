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

    $name = $_POST['uname'];
    var_dump($name);
    $sql = "SELECT upic FROM user WHERE uname=$name";
    var_dump($sql);
    $res = $conn->query($sql);

    $row = mysqli_fetch_assoc($res);
    $res1 = $conn->query("SELECT * FROM house WHERE uname='$name'");

    $result = array();
    $result = $row;
    while ($row1 = mysqli_fetch_assoc($res1)) {
        # code...
        $result[] = $row1;
    }
    echo json_encode($result);
    // echo $row['upic'];

    $conn->close();
?>