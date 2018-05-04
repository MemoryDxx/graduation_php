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
    // 尝试
    $cou = $conn->query("SELECT COUNT(*) FROM house");
    $res1 = $conn->query("SELECT * FROM house LIMIT {$inde},5");
    // $res1 = $conn->query("SELECT * FROM house LIMIT {$inde},5");  顺序取数据
    // if($inde == 0){
    //     $res1 = $conn->query("SELECT * FROM house LIMIT {$inde},5");
    // }

    // 取出全部数据逆序
    $res2 = $conn->query("SELECT * FROM house");
    $result = array();
    while ($row1 = mysqli_fetch_assoc($res2)) {
        # code...
        $result[] = $row1;
    }
    // 逆序
    $res = array_reverse($result);
    echo json_encode(array_slice($res,$inde,5));
    // echo $row['upic'];

    $conn->close($inde);
?>