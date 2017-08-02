function Common() {
	this.imgurl = "/"; //图片根路径
    this.baseurl = "/"; //请求根路径
};
Common.prototype.keyenter = function(ele, call) {
    ele.on("keydown", function(e) {
        if (e.keyCode == 13) {
            call(); //处理事件
        }
    });
};
Common.prototype.addCookie = function(objName, objValue, objSecond) {
    //添加cookie
    // objSecond为0时不设定过期时间，浏览器关闭时cookie自动消失
    var str = objName + "=" + escape(objValue);
    if (objSecond > 0) {
        var date = new Date();
        var ms = objSecond * 1000;
        date.setTime(date.getTime() + ms);
        str += "; expires=" + date.toGMTString();
    }
    document.cookie = str;
};
Common.prototype.getCookie = function(objName) {
    //获取指定名称的cookie的值
    var arrStr = document.cookie.split("; ");
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] == objName) return unescape(temp[1]);
    }
};
Common.prototype.delCookie = function(name) {
    //删除指定Cookie
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    document.cookie = name + "=a; expires=" + date.toGMTString();
};
//ajax
Common.prototype.obtainData = function(url, type, callback, arrayList) {
    var bassPath = this.baseurl,
        flag = false;
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: bassPath + url,
        data: arrayList,
        type: type,
        async: callback ? true : false,
        success: function(data, textStatus, xhr) {
            if (data.status == "error_no_1") {
                location.reload();
                return false;
            }
            if (data.status == "error_no_2") {
                location.href = data.data.url;
                return false;
            }
            flag = data;
            if (typeof callback !== 'undefined') {
                callback(data);
            }
        },
        error: function(data, textStatus, xhr) {
            flag = data;
            common.commonDalog({"dialogBodyText":"网络异常,请稍候重试!"});
        },
        complete: function(xhr) {

        }
    });
    return flag;
};
//滚动条
Common.prototype.scrollBar = function(oImgBox, oSliderWrap, oScrollBar, oWallUl) {
    oScrollBar[0].style.top = 0 + 'px';
    oWallUl[0].style.top = 0 + 'px';
    //图片Ul占图片box的比例
    var scale1 = oImgBox[0].clientHeight / oWallUl[0].scrollHeight;

    if (oWallUl[0].scrollHeight > oImgBox[0].clientHeight) {
        oScrollBar[0].style.height = scale1 * oSliderWrap[0].clientHeight + 'px';
        oScrollBar[0].style.display = 'block';
    } else {
        oScrollBar[0].style.height = 0 + 'px';
        oScrollBar[0].style.display = 'none';
    };

    var oMaxH = oWallUl[0].scrollHeight - oImgBox[0].clientHeight; //图片包能走最大高度

    var oMaxH2 = oSliderWrap[0].clientHeight - oScrollBar[0].offsetHeight; //滚动条最大能走高度
    oScrollBar[0].onmousedown = function(ev) {
        var e = ev || event;
        var disY = e.clientY - oScrollBar[0].offsetTop;
        document.onmousemove = function(ev) {
            var e = ev || event;
            var t = e.clientY - disY;
            if (t <= 0) t = 0;
            if (t >= oMaxH2) t = oMaxH2;
            //滚动条能走比例
            var scale2 = t / oMaxH2;
            oWallUl[0].style.top = -(scale2 * oMaxH) + 'px';
            oScrollBar[0].style.top = t + 'px';
            //console.log(oMaxH)
        };
        document.onmouseup = function() {
            document.onmousemove = document.onmouseup = null;
        };
        return false;
    };
    //滚轮事件
    if (oWallUl[0].scrollHeight > oImgBox[0].clientHeight) {
        oImgBox[0].onmousewheel = wheelWall;
        if (oImgBox[0].addEventListener) {
            oImgBox[0].addEventListener("DOMMouseScroll", wheelWall, false);
        };
    } else {
        oImgBox[0].onmousewheel = null;
    };

    function wheelWall(ev) {

        var e = ev || event;

        var flag = true;
        bOnOff = true;

        //ie和chrome
        if (e.wheelDelta) {
            flag = e.wheelDelta > 0 ? true : false;
        } else {
            flag = e.detail < 0 ? true : false;
        };

        var top = oWallUl[0].offsetTop;

        if (flag) { //向上
            top += 10;
        } else { //向下
            top -= 10;
        };

        if (top >= 0) top = 0;
        if (top <= -oMaxH) top = -oMaxH;

        var bili = Math.abs(top / oMaxH);

        oScrollBar[0].style.top = bili * oMaxH2 + 'px';
        oWallUl[0].style.top = top + 'px';

        bOnoff = false;
        //取消火狐浏览器的默认行为
        if (e.preventDefault) {
            e.preventDefault();
        }
        //取消ie和chrome的默认行为
        return false;
    };
};
//弹出框方法
Common.prototype.commonDalog = function(options){
	var defaults = {		
		closeBool: options.closeBool || false,
		cancelBool: options.cancelBool || false,
		confirmBool: options.confirmBool || false,
		dialogHdText: options.dialogHdText || "提示",
		dialogBodyText: options.dialogBodyText || "",
		cancelBtnText: options.cancelBtnText || "取消",	
		confirmBtnText: options.confirmBtnText || "确定",		
		cancelCall: options.cancelCall || "",
		confirmCall: options.confirmCall || ""				
	};
	var str = '<div class="common_dialog">';
		str += '<div class="mask"></div>';
		str += '<div class="dialog_con">';
		str += '<span class="dialog_close" id="js_dialog_close"></span>';
		str += '<div class="dialog_hd">'+defaults.dialogHdText+'</div>';
		str += '<div class="dialog_body"><div>'+defaults.dialogBodyText+'</div></div>';
		str += '<div class="dialog_ft">';
		str += '<a href="javascript:;" class="dialog_cancel" id="js_dialog_cancel">'+defaults.cancelBtnText+'</a>';
		str += '<a href="javascript:;" class="dialog_affirm" id="js_dialog_affirm">'+defaults.confirmBtnText+'</a>';
		str += '</div>';
		str += '</div>';
		str += '</div>';
	$("body").append(str);
	//取消按钮是否显示
	if(defaults.cancelBool){
		$("#js_dialog_cancel").hide();
	}else{
		$("#js_dialog_cancel").show();
	};
	//确定按钮是否显示
	if(defaults.confirmBool){
		$("#js_dialog_affirm").hide();
	}else{
		$("#js_dialog_affirm").show();
	};
	//关闭按钮是否显示
	if(defaults.closeBool){
		$("#js_dialog_close").hide();
	}else{
		$("#js_dialog_close").show();
	};
	//点击按钮删除弹框
    $("#js_dialog_close").bind("click",function(){
    	$(".common_dialog").remove();
		return false;
    });
    $("#js_dialog_cancel").bind("click",function(){
    	if( typeof defaults.cancelCall === "function" ){
			defaults.cancelCall();
		}
    	$(".common_dialog").remove();
		return false;
    });
    $("#js_dialog_affirm").bind("click",function(){       
        if( typeof defaults.confirmCall === "function" ){
			defaults.confirmCall();
		}
        $(".common_dialog").remove();
        return false;
    });
};
//轮播图
Common.prototype.Slide = function(oWrap, bool) {
    var bool = bool || false;

    var oBannerW = oWrap.find(".slides");
    var oSlide = oWrap.find(".slides_box");
    var aBox = oSlide.find("li");
    var aPoints = oWrap.find(".slides_points li");

    $(window).bind("resize", function() {
        oBannerW.css("width", $(window).width());
    });

    var W = parseInt(oBannerW.css("width"));
    var size = aBox.size();
    var first = aBox.first().clone();
    var last = aBox.last().clone();
    var oTimer = 0;



    oSlide.append(first);
    oSlide.prepend(last);

    oSlide.css("left", -W);
    oSlide.css("width", (size + 2) * W);
    aBox.css("width", W);

    var n = 0;
    oWrap.find(".next").click(function() {
        n++;
        tab(n)

    });
    oWrap.find(".prev").click(function() {
        n--;
        tab(n);
    });

    aPoints.on("click", function() {
        var currentIndex = $(this).index();
        tab(currentIndex);
        n = currentIndex;
    });
    //自动轮播
    if (bool) {
        oTimer = setInterval(autoPlay, 3000);

        oWrap.hover(function() {
            clearInterval(oTimer);
        }, function() {
            oTimer = setInterval(autoPlay, 3000);
        });
    };

    function autoPlay() {
        n++;
        tab(n);
    };

    function tab(m) {

        var onOff = false;
        var result = 0;
        //console.log(m);

        if (m > size - 1) {
            n = 0;
            onOff = true;
            result = 1;
        } else if (m < 0) {
            n = size - 1;
            onOff = true;
            result = size;
        };

        oSlide.stop().animate({
            left: -(m + 1) * W
        }, function() {
            if (onOff) {
                oSlide.css("left", -result * W);
                onOff = false;
            }
        });

        if (m < size) {
            aPoints.removeClass("active").eq(m).addClass("active");

        } else {
            aPoints.removeClass("active").eq(0).addClass("active");

        };

    };
};
var common = new Common();