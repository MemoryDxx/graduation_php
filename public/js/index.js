// 手机号检测
function phoneCheck(params) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(params)) {
        var wrong = document.getElementById("wrong-msg2");
        wrong.style.display = "block";
        document.getElementById("inputPhone3").value = "";
        return false;  
    }else{
        return true;
    }
}

// 邮箱号验证
function emailCheck(params) {
    var myreg = /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/;
    if (!myreg.test(params)) {
        var wrong = document.getElementById("wrong-msg3");
        wrong.style.display = "block";
        document.getElementById("inputEmail3").value = "";
        return false;
    }else{
        return true;
    }
}

// 用户名验证
function unameCheck(params) {
    var myreg = /^[a-z0-9_-]{2,12}$/;
    if (!myreg.test(params)) {
        var wrong = document.getElementById("wrong-msg1");
        wrong.style.display = "block";
        document.getElementById("inputUsername3").value = "";
        return false;
    }else{
        return true;
    }
}

// 点击注册登录
function lrbtn() {
    var logwindow = document.getElementsByClassName("reg-login-panel");
    logwindow[0].style.display = "block";
}

// 关闭注册登录面板
function closepop() {
    var popup = document.getElementsByClassName("reg-login-panel");
    popup[0].style.display = "none";
}

// 登录切换至注册
function swlog() {
    var navtab = document.getElementById("lognav");
    var parent = navtab.parentNode;
    var panel = document.getElementById("login-form");
    var panel1 = document.getElementById("reg-form");
    navtab.className = "active";
    parent.childNodes[3].className = "";
    panel.style.display = "block";
    panel1.style.display = "none";
}

// 注册切换至登录
function swreg() {
    var navtab = document.getElementById("regnav");
    var parent = navtab.parentNode;
    var panel = document.getElementById("login-form");
    var panel1 = document.getElementById("reg-form");
    navtab.className = "active";
    parent.childNodes[1].className = "";
    panel.style.display = "none";
    panel1.style.display = "block";
}

// 数据提交
function datapost(data,url) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        // readystate为4，请求已完成
        if (xhr.readyState ==4) {
            if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                // 解析请求返回的JSON数据
                //var data = JSON.parse(xhr.responseText);
                console.log(xhr.responseText);
            }
        }
    };
    xhr.open("post",url,true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send(data);
}

// 注册
function login() {
    // flag判断输入是否合法
    var flag = new Object();
    flag.phoneflag = false;
    flag.emailflag = false;
    flag.unameflag = false;
    flag.upwdflag = false;

    // 控制注册登录按钮改变为个人中心
    var navright = document.getElementById("lrbtn");
    var navright1 = document.getElementById("pcenter");

    // 获取表单数据
    var user = new Object();
    user.user_name = document.getElementById("inputUsername3").value;
    user.user_phone = document.getElementById("inputPhone3").value;
    user.user_email = document.getElementById("inputEmail3").value;
    user.user_pwd = document.getElementById("inputPassword2").value;

    // 验证用户输入
    flag.phoneflag = phoneCheck(user.user_phone);
    flag.emailflag = emailCheck(user.user_email);
    flag.unameflag = unameCheck(user.user_name);
    if (user.user_pwd == document.getElementById("inputPassword3").value) {
        flag.upwdflag = true;
    }
    console.log(flag);
    
    var wrong1 = document.getElementById("wrong-msg1");
    var wrong2 = document.getElementById("wrong-msg2");
    var wrong3 = document.getElementById("wrong-msg3");
    var wrong4 = document.getElementById("wrong-msg4");

    // flag皆为真
    if (flag.phoneflag && flag.emailflag && flag.unameflag && flag.upwdflag) {
        // 序列化参数
        var data = JSON.stringify(user);
        console.log(data);
        console.log(user);

        // 发送数据
        var ex = "exist";
        var su = "success";
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            // readystate为4，请求已完成
            if (xhr.readyState ==4) {
                if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                    // 解析请求返回的JSON数据
                    //var data = JSON.parse(xhr.responseText);
                    console.log(typeof(xhr.responseText));
                    if (ex === "exist") {
                        alert("用户已存在");
                    }else if(su === "success"){
                        alert("注册成功");
                        // 切换至登录面板
                        swreg();
                    }
                }
            }
        };
        xhr.open("post","http://123.207.141.123/application/login.php",true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send("user=" + data);

        // 输入框置空
        document.getElementById("inputUsername3").value = "";
        document.getElementById("inputPhone3").value = "";
        document.getElementById("inputEmail3").value = "";
        document.getElementById("inputPassword3").value = "";
        document.getElementById("inputPassword2").value = "";
        
    }else{
        if (flag.unameflag == false) {
            wrong1.style.display = "block";
            document.getElementById("inputUsername3").value = "";
        }
        if (flag.phoneflag == false) {
            wrong2.style.display = "block";
            document.getElementById("inputPhone3").value = "";
        }
        if (flag.emailflag == false) {
            wrong3.style.display = "block";
            document.getElementById("inputEmail3").value = "";
        }
        if (flag.upwdflag == false) {
            wrong4.style.display = "block";
            document.getElementById("inputPassword3").value = "";
            document.getElementById("inputPassword2").value = "";
        }
    }
}

// 登录
function reg() {
    var user = new Object();
    user.user_name = document.getElementById("inputUsername4").value;
    user.user_pwd = document.getElementById("inputPassword4").value;
    // 序列化参数
    var data = JSON.stringify(user);
    datapost(data,"http://123.207.141.123/application/reg.php");
}
