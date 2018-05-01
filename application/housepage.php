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

    $start = $_POST['start'];
    $page = $start;
    $inde = ($page-1)*5;
    if($inde == 1){
        $res1 = $conn->query("SELECT * FROM house LIMIT 0,5");
    }
    $result = array();
    while ($row1 = mysqli_fetch_assoc($res1)) {
        # code...
        $result[] = $row1;
    }

    echo json_encode($result);
    // echo $row['upic'];

    $conn->close($inde);
?>