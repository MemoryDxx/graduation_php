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
    $cou = $conn->query("SELECT COUNT(*) FROM house");
    $res1 = $conn->query("SELECT * FROM house LIMIT {$inde},5");
    // $res1 = $conn->query("SELECT * FROM house LIMIT {$inde},5");  顺序取数据
    // if($inde == 0){
    //     $res1 = $conn->query("SELECT * FROM house LIMIT {$inde},5");
    // }
    $result = array();
    while ($row1 = mysqli_fetch_assoc($res1)) {
        # code...
        $result[] = $row1;
    }
    // 逆序
    $res = array_reverse($result);
    echo json_encode($res);
    // echo $row['upic'];

    $conn->close($inde);
?>