<?php
    session_start();
    //获取到用户提交的验证码
    $captcha = $_POST["captcha"];
    //将session中的验证码和用户提交的验证码进行核对,当成功时提示验证码正确，并销毁之前的session值,不成功则重新提交
    if(strtolower($_SESSION["captchaimg"]) == strtolower($captcha)){
        echo "success";
        $_SESSION["captcha"] = "";
    }else{
        echo "wrong";
}