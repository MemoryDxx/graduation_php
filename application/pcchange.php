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

    $olduname = $_POST['olduname'];
    $newuname = $_POST['newuname'];
    $oldpwd = $_POST['oldupwd'];
    $newpwd = $_POST['newupwd'];
    $imgname = $_FILES['pic']['name'];
    $imgtmp = $_FILES['pic']['tmp_name'];
    $picpath = '../public/photos/upic/'.$_FILES['pic']['name'];

    if($oldpwd){
        $res = $conn->query("SELECT upwd FROM user WHERE uname='$olduname'");
        if(!$res){
            die('无法读取数据: ' . mysqli_error($conn));
        }
        $row=mysqli_fetch_assoc($res);
        if ($row["upwd"] === $oldpwd) {
            # code...
            $conn->query("UPDATE user SET upwd='$newpwd' WHERE uname='$olduname'");
        }
    }
    
    $res1 = $conn->query("SELECT uid FROM user WHERE uname='$olduname'");
    $row1 = mysqli_fetch_assoc($res);
    $userid = $row1['uid'];
    $conn->query("UPDATE user SET uname='$newuname' WHERE uid='$userid'");

    // 上传头像
    if (file_exists("../public/photos/upic/".$_FILES['pic']['name'])) {
        # code...
        echo $_FILES['pic']['name']."exist";
    }else{
        // 移动临时文件到photos文件夹下
        move_uploaded_file($_FILES['pic']['tmp_name'],"../public/photos/upic/".$_FILES['pic']['name']);
        mysqli_query("set names 'utf8'");
        if ($conn->query("UPDATE user SET upic='$picpath' WHERE uid='$userid'")) {
            # code...
            var_dump($picpath);
        }else{
            echo "error: " . $sql . "<br>" . $conn->error;
        }
    }

    $conn->close();
?>