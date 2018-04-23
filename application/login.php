<?php
    $con = mysql_connect("localhost","ubuntu","Aq3*l@7QFg");
    if (!$con)
      {
      die('Could not connect: ' . mysql_error());
      }
    
    mysql_select_db("graduation", $con);
    
    $sql="INSERT INTO user (user_name, user_email, user_phone, user_pwd)
    VALUES
    ('$_POST[user_name]','$_POST[user_email]','$_POST[user_phone]','$_POST[user_pwd]')";
    
    if (!mysql_query($sql,$con))
      {
      die('Error: ' . mysql_error());
      }
    echo "1 record added";
    
    mysql_close($con)
?>