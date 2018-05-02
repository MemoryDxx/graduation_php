// 跳转
function turn() {
    window.location.href = "http://123.207.141.123/public/pages/pc.html";
}

// Cookie操作
var CookieUtil = {
    get: function (name) {
        var cookieName = encodeURIComponent(name) + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null;
        
        if (cookieStart > -1) {
            var cookieEnd = document.cookie.indexOf(";", cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));

            return cookieValue;
        }
    },

    set: function (name, value, expires, path, domain, secure) {
        var cookieText = encodeURIComponent(name) + "=" +
                         encodeURIComponent(value);
        if (expires instanceof Date) {
            cookieText += "; expires=" + expires.toGMTString();
        }

        if(path){
            cookieText += "; path=" + path;
        }

        if(domain){
            cookieText += "; domain=" + domain;
        }

        if(secure){
            cookieText += "; secure";
        }

        document.cookie = cookieText;
    },

    unset: function (name, path, domain, secure) {
        this.set(name, "", new Date(0), path, domain, secure);
    }
};

// 检测cookie
function checkCookie() {
    if (CookieUtil.get("name")) {
        var btn = document.getElementById("lrbtn");
        var pcen = document.getElementById("pcenter");
        console.log(pcen);
        btn.style.display = "none";
        pcen.style.display = "block";
        CookieUtil.set("name",CookieUtil.get("name"),"/public/pages");
    }
}

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

// 获取json长度
function getJsonLen(params) {
    var len = 0;
    for(var item in params){
        len++;
    }
    return len-1;
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
function datapost(data,url,datatype) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        // readystate为4，请求已完成
        if (xhr.readyState ==4) {
            if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                // 解析请求返回的JSON数据
                if(datatype == "text"){
                    return xhr.responseText;
                }else{
                    var data = JSON.parse(xhr.responseText);
                    return data;
                }
                
                
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
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            // readystate为4，请求已完成
            if (xhr.readyState ==4) {
                if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                    // 解析请求返回的JSON数据
                    //var data = JSON.parse(xhr.responseText);
                    console.log(xhr.responseText);
                    if (xhr.responseText === "exist") {
                        alert("用户已存在");
                    }else if(xhr.responseText === "success"){
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
    var pc = document.getElementById("pcenter");
    var bt = document.getElementById("lrbtn");
    var user = new Object();
    user.user_name = document.getElementById("inputUsername4").value;
    user.user_pwd = document.getElementById("inputPassword4").value;
    // 序列化参数
    var data = JSON.stringify(user);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        // readystate为4，请求已完成
        if (xhr.readyState ==4) {
            if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                // 解析请求返回的JSON数据
                var text = xhr.responseText;
                console.log(text);
                console.log(text == "success");
                if (xhr.responseText === "success") {
                    pc.style.display = "block";
                    bt.style.display = "none";
                    closepop();
                    CookieUtil.set("name",user.user_name);
                }
                // var xhrres = JSON.parse(xhr.responseText);
                
                // if (xhrres.msg === "regsc") {
                //     pc.style.display = "block";
                //     bt.style.display = "none";
                //     closepop();
                //     CookieUtil.set("name",xhrres.name);
                // }
            }
        }
    };
    xhr.open("post","http://123.207.141.123/application/reg.php",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("reguser=" + data);
}

// 发布房源
function rel() {
    var xqm = document.getElementById("relname").value; //小区名
    var hx = document.getElementById("reltype").value;  //户型
    var mj = document.getElementById("relarea").value;  //面积
    var lc = document.getElementById("relfloor").value; //楼层
    var cx = document.getElementById("relori").value;   //朝向
    var wz = document.getElementById("relloc").value;   //楼栋号
    var jg = document.getElementById("relpri").value;   //价格
    var pic = document.getElementById("relpic").files[0];  //图片
    var person = CookieUtil.get("name");    //发布者用户名
    var bz = document.getElementById("relbei").value;   //备注

    var formdata = new FormData();
    formdata.append("relname",xqm);
    formdata.append("reltype",hx);
    formdata.append("relarea",mj);
    formdata.append("relfloor",lc);
    formdata.append("relori",cx);
    formdata.append("relloc",wz);
    formdata.append("relpri",jg);
    formdata.append("relperson",person);
    formdata.append("relpic",pic);
    formdata.append("relbei",bz);

    $.ajax({
        url: 'http://123.207.141.123/application/realse.php',
        type: 'POST',
        data: formdata,
        dataType: 'text',
        cache: false,
        processData: false,
        contentType: false,
        error: function (XMLHttpRequest, ) {
            
        },
        success: function (data) {
            console.log(data);
            var hid = data;
            window.location.href = "http://123.207.141.123/public/pages/house.html?hid=" + hid;
        }
    });
}

// 创建房源列表
function createHouseLst(data,dataLength) {
    // 创建列表
    for(var i = 0; i < dataLength; i++){
        // 创建节点
        var ul = document.getElementById("lst-ul");
        var ls = document.createElement("li");
        var div_col = document.createElement("div");
        var div_picp = document.createElement("div");
        var div_infop = document.createElement("div");
        var picp_a = document.createElement("a");
        var picp_img = document.createElement("img");
        var infop_a = document.createElement("a");
        var infop_h = document.createElement("h2");
        var infop_div = document.createElement("div");
        var infop_span1 = document.createElement("span");
        var infop_span2 = document.createElement("span");
        var infop_span3 = document.createElement("span");
        var div_pri = document.createElement("div");
        var pri_span = document.createElement("span");
        // 设置节点
        ls.className = "list-group-item";
        div_col.className = "col-1";
        div_picp.className = "pic-panel";
        picp_a.className = "house-pic";
        picp_img.className = "house-img";
        picp_img.id = "houseimg";
        div_infop.className = "info-panel";
        infop_div.className = "where";
        infop_span1.className = "locat";
        infop_span2.className = "huxing";
        infop_span3.className = "chaoxiang";
        div_pri.className = "price";
        pri_span.className = "pri-num";

        picp_img.src = data[i].house_pic;
        picp_a.href = "http://123.207.141.123/public/pages/house.html?hid="+data[i].house_id;
        infop_a.href = "http://123.207.141.123/public/pages/house.html?hid="+data[i].house_id;
        infop_a.innerHTML = data[i].house_name;
        infop_span1.innerHTML = data[i].house_loc;
        infop_span2.innerHTML = data[i].house_type;
        infop_span3.innerHTML = data[i].house_ori;
        pri_span.innerHTML = data[i].house_pri;
        // 建立节点结构
        picp_a.appendChild(picp_img);
        div_picp.appendChild(picp_a);

        infop_h.appendChild(infop_a);
        infop_div.appendChild(infop_span1);
        infop_div.appendChild(infop_span2);
        infop_div.appendChild(infop_span3);
        div_infop.appendChild(infop_h);
        div_infop.appendChild(infop_div);

        div_pri.appendChild(pri_span);
        div_pri.innerHTML += "\"元/月\"";

        div_col.appendChild(div_picp);
        div_col.appendChild(div_infop);
        div_col.appendChild(div_pri);

        ls.appendChild(div_col);
        ul.appendChild(ls);
    }
}

// 获取范围内房屋列表
function getHouseLst(start) {
    var ele = document.getElementById("lst-ul");
    while(ele.hasChildNodes()){
        ele.removeChild(ele.firstChild);
    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        // readystate为4，请求已完成
        if (xhr.readyState ==4) {
            if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                // 解析请求返回的JSON数据
                var data = JSON.parse(xhr.responseText);
                console.log(data);
                createHouseLst(data,data.length);
            }
        }
    };
    xhr.open("post","http://123.207.141.123/application/housepage.php",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("start=" + start);
}

// 获取首页房屋列表
function getlst() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        // readystate为4，请求已完成
        if (xhr.readyState ==4) {
            if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                // 解析请求返回的JSON数据
                var data = JSON.parse(xhr.responseText);
                console.log(data.length);
                console.log(xhr.responseText);
                var fenyeul = document.getElementById("fenye");
                var page = Math.ceil(data.length/5);
                if(page > 1){
                    for(var j = 0; j < page - 1; j++){
                        var pageli = document.createElement("li");
                        var pagelia = document.createElement("a");
                        pagelia.innerHTML = 2 + j;
                        pageli.className = "pageli";
                        pageli.appendChild(pagelia);
                        fenyeul.insertBefore(pageli, fenyeul.childNodes[5 + j]);
                    }
                    var pli = document.getElementsByClassName("pageli");
                    for(k in pli){
                        pli[k].onclick = function () {
                            var act = document.getElementsByClassName("pageli active");
                            act[0].className = "pageli";
                            this.className = "pageli active";
                            getHouseLst(this.childNodes[0].innerHTML);
                        }
                    }
                    getHouseLst(1);
                }else{
                    getHouseLst(1);
                }
            }
        }
    };
    xhr.open("post","http://123.207.141.123/application/houlst.php",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send();
}

// 列表分页跳转
function jmppage(ele,data) {
    var act = document.getElementsByClassName("active");
    act[0].childNodes[0].className = "";
    this.className = "active";
    getHouseLst(data);
}

// 房子详情页面
function house() {
    if (CookieUtil.get("name") !== null) {
        var pcen = document.getElementById("pcenter");
        var btn = document.getElementById("lrbtn");
        btn.style.display = "none";
        pcen.style.display = "block";
    }

    var ttl = document.getElementById("httl");  //标题
    var pic = document.getElementById("picid"); //图片
    var pri = document.getElementById("hpri");  //价格
    var area = document.getElementById("harea");    //面积
    var tp = document.getElementById("htype");  //户型
    var ori = document.getElementById("hori");  //朝向
    var fl = document.getElementById("hfloor"); //楼层
    var xq = document.getElementById("hname");  //小区
    var loc = document.getElementById("hloc");  //楼栋号
    var uer = document.getElementById("huname");//发布者姓名
    var uerphone = document.getElementById("huphone");  //发布者电话
    var uerpic = document.getElementById("upic");   //发布者头像
    var bz = document.getElementById("hbeizhu");    //备注

    var h_idurl = location.search;
    var res = new Object();
    //如果?位置不为-1
    if(h_idurl.indexOf("?")!=-1){
        //记录从1开始到结束的字符串
        var str = h_idurl.substr(1);
        var strs = str.split("=");
        var h_id = strs[1];
        
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            // readystate为4，请求已完成
            if (xhr.readyState ==4) {
                if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                    // 解析请求返回的JSON数据
                    var data = JSON.parse(xhr.responseText);
                    console.log(data);
                    ttl.innerHTML = data.house_name;
                    pic.src = data.house_pic.substr(17);
                    uerpic.src = data.upic.substr(17);
                    var reg = "pages";
                    var src = pic.src.replace(new RegExp(reg),"photos");
                    var src1 = uerpic.src.replace(new RegExp(reg),"photos");
                    pic.src = src;
                    uerpic.src = src1;
                    console.log(src);
                    console.log(data.house_pic);
                    console.log(pic.src);
                    pri.innerHTML = data.house_pri;
                    area.innerHTML += data.house_area;
                    tp.innerHTML += data.house_type;
                    ori.innerHTML += data.house_ori;
                    fl.innerHTML += data.house_floor;
                    xq.innerHTML += data.house_name;
                    loc.innerHTML += data.house_loc;
                    uer.innerHTML = data.uname;
                    uerphone.innerHTML = data.uphone;
                    bz.innerHTML = data.beizhu;
                }
            }
        };
        xhr.open("post","http://123.207.141.123/application/house.php",true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send("hid=" + h_id);
    }
}

// 获取头像
function getupic(uname) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        // readystate为4，请求已完成
        if (xhr.readyState ==4) {
            if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                // 解析请求返回的JSON数据
                // var data = JSON.parse(xhr.responseText);
                console.log(xhr.responseText);
                return xhr.responseText;
            }
        }
    };
    xhr.open("post","http://123.207.141.123/application/getupic.php",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("uname=" + uname);
}

// 修改房源信息
function editHouse(data) {
    var hli = data.parentNode;
    var hid = hli.lastChild.innerHTML;
    window.location.href = "http://123.207.141.123/public/pages/edit.html?hid=" + hid;
}
function edi() {
    var xqm = document.getElementById("relname").value; //小区名
    var hx = document.getElementById("reltype").value;  //户型
    var mj = document.getElementById("relarea").value;  //面积
    var lc = document.getElementById("relfloor").value; //楼层
    var cx = document.getElementById("relori").value;   //朝向
    var wz = document.getElementById("relloc").value;   //楼栋号
    var jg = document.getElementById("relpri").value;   //价格
    var person = CookieUtil.get("name");    //发布者用户名
    var bz = document.getElementById("relbei").value;   //备注

    var formdata = new FormData();
    formdata.append("relname",xqm);
    formdata.append("reltype",hx);
    formdata.append("relarea",mj);
    formdata.append("relfloor",lc);
    formdata.append("relori",cx);
    formdata.append("relloc",wz);
    formdata.append("relpri",jg);
    formdata.append("relperson",person);
    formdata.append("relbei",bz);

    $.ajax({
        url: 'http://123.207.141.123/application/realse.php',
        type: 'POST',
        data: formdata,
        dataType: 'text',
        cache: false,
        processData: false,
        contentType: false,
        error: function (XMLHttpRequest, ) {
            
        },
        success: function (data) {
            console.log(data);
            var hid = data;
            window.location.href = "http://123.207.141.123/public/pages/pc.html?hid="+hid;
        }
    });
}

// 删除房源
function delhouse(data) {
    console.log(data);
    var hli = data.parentNode;
    console.log(hli);
    var hid = hli.lastChild.innerHTML;
    console.log(hid);
    datapost("hid=" + hid,"http://123.207.141.123/application/delhouse.php");
}

// 个人中心初始化
function pc() {
    var pcuname = CookieUtil.get("name");
    var pcunameinput = document.getElementById("pcuname");
    pcunameinput.value = pcuname;
    var pcupic = document.getElementById("nupic");
    var pcupwd = document.getElementById("pcupwd").value;
    var npcupwd = document.getElementById("npcupwd").value;
    var npcupwd1 = document.getElementById("npcupwd1").value;


    // 获取头像及已发布房源
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        // readystate为4，请求已完成
        if (xhr.readyState ==4) {
            if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                // 解析请求返回的JSON数据
                var data = JSON.parse(xhr.responseText);
                // 头像
                // console.log(data);
                // console.log(data[2]);
                // console.log(data[2].house_name);
                // console.log(getJsonLen(data));
                // console.log(data.upic);
                pcupic.src = data.upic;
                console.log(pcupic.src);
                var reg = "public/";
                var src1 = pcupic.src.replace(new RegExp(reg),"");
                pcupic.src = src1;
                // 房源
                var houseul = document.getElementById("hul");
                var housenull = document.getElementById("nlst");
                if (getJsonLen(data) > 0) {
                    housenull.style.display = "none";
                    for(var i = 0;i < getJsonLen(data);i++){
                        // 创建元素
                        var hli = document.createElement("li");
                        var himg = document.createElement("img");
                        var span1 = document.createElement("span");
                        var span2 = document.createElement("span");
                        var span3 = document.createElement("span");
                        // var span4 = document.createElement("span");
                        var span5 = document.createElement("span");
                        // 设置新元素的基本属性
                        hli.className = "list-group-item";
                        himg.className = "pcimglst";
                        span1.className = "pchname";
                        span2.className = "pchloc";
                        span3.className = "glyphicon glyphicon-remove pcdel";
                        // span4.className = "glyphicon glyphicon-pencil pcdel";
                        span5.id = "pchid";
                        span5.style.display = "none";
                        // 填入值
                        himg.src = data[i].house_pic;
                        var reg = "public/";
                        var src1 = himg.src.replace(new RegExp(reg),"");
                        himg.src = src1;
                        span1.innerHTML = data[i].house_name;
                        span2.innerHTML = data[i].house_loc;
                        span5.innerHTML = data[i].house_id;
                        // 建立节点间父子关系
                        hli.appendChild(himg);
                        hli.appendChild(span1);
                        hli.appendChild(span2);
                        hli.appendChild(span3);
                        // hli.appendChild(span4);
                        hli.appendChild(span5);
                        houseul.appendChild(hli);
                        // span4.onclick = function () {
                        //     // 修改房屋信息
                        //     editHouse(this);
                        //     location.reload();
                        // }
                        span3.onclick = function () {
                            // 删除房屋信息
                            delhouse(this);
                            location.reload();
                        }
                    }
                }
            }
        }
    };
    xhr.open("post","http://123.207.141.123/application/getupic.php",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("uname=" + pcuname);
}

// 更改个人信息
function changepc() {
    var olduname = CookieUtil.get("name");
    var uername = document.getElementById("pcuname").value;
    var oldpwd = document.getElementById("pcupwd").value;
    var newpwd = document.getElementById("npcupwd").value;
    var cnewpwd = document.getElementById("npcupwd1").value;
    var touxiang = document.getElementById("InputFile").files[0];

    var formdata = new FormData();
    if(olduname !== uername){
        formdata.append("olduname",olduname);
        formdata.append("newuname",uername);
    }
    formdata.append("oldupwd",oldpwd);
    if(newpwd == cnewpwd){
        formdata.append("newupwd",newpwd);
    }else{
        alert("请确认密码");
    }
    formdata.append("pic",touxiang);

    $.ajax({
        url: 'http://123.207.141.123/application/pcchange.php',
        type: 'POST',
        data: formdata,
        dataType: 'text',
        cache: false,
        processData: false,
        contentType: false,
        error: function (XMLHttpRequest, ) {
            
        },
        success: function (data) {
            console.log(data);
            CookieUtil.unset("name");
            CookieUtil.set("name",uername);
            location.reload();
        }
    });
}

// 注销
function logout() {
    CookieUtil.set("name","");
    var btn = document.getElementById("lrbtn");
    var pcen = document.getElementById("pcenter");
    console.log(pcen);
    btn.style.display = "block";
    pcen.style.display = "none";
    window.location.href = "http://123.207.141.123/";
}

// 搜索
function search() {
    var msg = document.getElementById("search_input").value;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        // readystate为4，请求已完成
        if (xhr.readyState ==4) {
            if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                //解析请求返回的JSON数据
                console.log(xhr.responseText);
                var data = JSON.parse(xhr.responseText);
                console.log(data);
                var ele = document.getElementById("lst-ul");
                while(ele.hasChildNodes()){
                    ele.removeChild(ele.firstChild);
                }
                var fenyeul = document.getElementById("fenye");
                fenyeul.style.display = "none";
                ele.className = "list-group";
                createHouseLst(data,data.length);
            }
        }
    };
    xhr.open("post","http://123.207.141.123/application/search.php",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("msg=" + msg);
}