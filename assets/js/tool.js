/**
  通用逻辑事件
**/
//声明MDUI的JQ
var $ = mdui.$;
//JQ选择器
function setQuerySelector(selector) {
	return document.querySelector(selector);
};
//初始化复制
new ClipboardJS('.clipboard-copy');
//设置版权年份
$('.foot-copyright-year').text(new Date().getFullYear());
if ($('.mc-drawer')[0] != null) {
	//初始化侧滑抽屉
	var mdui_drawer = new mdui.Drawer('.mc-drawer', {
		swipe: true
	});
	//开关侧滑抽屉
	$('.mdui-drawer-opens').on('click',
	function(e) {
		if (getParam('from') == 'home') {
			locaUrl('../home/#' + getHash(), false);
		} else {
			mdui_drawer.toggle();
		}
	});
	//抽屉项目点击
	$('.mdui-drawer-closes').on('click',
	function(e) {
		if (!isPC()) {
			mdui_drawer.close();
		}
	});
	/*$('.mc-drawer').on('open.mdui.drawer',
	function(event) {
		sendYunChuAPP("drawerOpen", 0);
	});
	$('.mc-drawer').on('close.mdui.drawer',
	function(event) {
		sendYunChuAPP("drawerClose", 0);
	});*/
}
if (!isYunChuApp()) {
	if (isExist(window.location.href, 'test')) {
		locaUrl(window.location.href.replace('test.yunchu.cxoip.com', 'yunchu.cxoip.com'), false);
	}
}
//网页加载完毕
$(function() {
	//返回给云储App加载完毕
	sendYunChuAPP("onload", 0);
});
//默认返回给云储App的点击关闭事件
$(document).on('click', '.yunchu-js-interfaces-back-btn',
function(event) {
	if (!isYunChuApp()) {
		if (getParam('from') == 'home') {
			locaUrl('/home/#' + getHash(), false);
		} else {
			locaUrl('/', false);
		}
	}
	sendYunChuAPP("finish", 0);
})
//调用云储App打印日志
function printYCLog(msg) {
	sendYunChuAPP('printLog', '{"msg":"' + msg + '"}');
}
//调用云储App的Toast
function showYunChuAppToast(msg) {
	sendYunChuAPP('toast', '{"msg":"' + msg + '"}');
}
//调用云储App的dialog
function showYunChuAppDialog(msg, action) {
	sendYunChuAPP('dialog', '{"msg":"' + msg + '","action":"' + action + '"}');
}
//发送固定格式数据给云储App的JS接口
function sendYunChuAPP(flag, data) {
	if (isYunChuApp()) {
		yunchuJSInterfaces.execute('{"flag":"' + flag + '","data":' + data + '}');
	}
}
//点击回到顶部
$('.go-top').on('click',
function(e) {
	scrollIntoView('body', 'start');
});
//点击回到底部
$('.go-bottom').on('click',
function(e) {
	scrollIntoView('body', 'end');
});
//通用复制提示
$('.clipboard-copy-toast').on('click',
function(event) {
	showToast('已复制');
});
//Toast
function showToast(msg) {
	if (!isYunChuApp()) {
		mdui.snackbar({
			message: msg,
			position: 'right-top',
			closeOnOutsideClick: false,
			timeout: 1500
		})
	}
	sendYunChuAPP('toast', '{"msg":"' + msg + '"}');
};
//Snackbar
function showSnackbar(msg, callback) {
	if (!isYunChuApp()) {
		if (isPC()) {
			positions = 'right-top'
		} else {
			positions = 'bottom';
		}
		var snackbar = mdui.snackbar({
			message: msg,
			buttonText: '确定',
			position: positions,
			//closeOnOutsideClick: false,
			timeout: 0,
			onButtonClick: function() {
				callback();
			},
			onClick: function() {
				snackbar.close();
			}
		});
	}
	sendYunChuAPP('dialog', '{"tle":"","msg":"' + msg + '","action":""}');
};
//Alert
function showAlert(tle, msg, btn) {
	if (!isYunChuApp()) {
		mdui.alert(msg, tle,
		function() {

},
		{
			confirmText: btn,
			history: false,
			modal: true,
			closeOnEsc: false
		});
	}
	sendYunChuAPP('dialog', '{"tle":"' + tle + '","msg":"' + msg + '","action":""}');
};
//覆写Alert
window.alert = function(msg) {
	if (!isYunChuApp()) {
		mdui.alert(msg, '提示',
		function() {

},
		{
			confirmText: '确定',
			history: false,
			modal: true,
			closeOnEsc: false
		});
	}
	sendYunChuAPP('dialog', '{"tle":"","msg":"' + msg + '","action":""}');
};
//覆写Confirm
window.confirm = function(msg, callback) {
	if (!isYunChuApp()) {
		mdui.confirm(msg, '提示',
		function() {
			return callback(true);
		},
		function() {
			return callback(false);
		},
		{
			confirmText: '确定',
			cancelText: '取消',
			modal: true,
			history: false,
			closeOnEsc: false
		});
	}
	sendYunChuAPP('dialog', '{"tle":"","msg":"' + msg + '","action":""}');
};
/*文档滚动动画*/
window.addEventListener('scroll',
function(event) {
	if ($('.doc-register-privacy-agreement-background')[0] != null && $('.doc-register-privacy-agreement-title')[0] != null) {
		var dialog_register_privacy_agreement_toolbar_title = setQuerySelector('.doc-register-privacy-agreement-title');
		if (window.scrollY > 189) {
			if (window.scrollY > 255) {
				removeClass('.doc-register-privacy-agreement-background', 'mc-dialog-toolbar');
			}
			dialog_register_privacy_agreement_toolbar_title.style.opacity = 1;
			dialog_register_privacy_agreement_toolbar_title.style.transform = 'translateY(0)';
		} else {
			addClass('.doc-register-privacy-agreement-background', 'mc-dialog-toolbar');
			dialog_register_privacy_agreement_toolbar_title.style.opacity = Math.abs(Number(((0.009009009009009009 * window.scrollY) + ( - 0.7027027027027027)).toFixed(1)));
			dialog_register_privacy_agreement_toolbar_title.style.transform = 'translateY(' + (( - 0.36036036036036034 * window.scrollY) + 68.10810810810811).toFixed(2) + 'px)';
		}
	}
	if (getScrollTop() > 100) {
		$('.fab-up-btn').removeClass('mdui-fab-hide');
		$('.fab-down-btn').addClass('mdui-fab-hide');
	} else {
		$('.fab-up-btn').addClass('mdui-fab-hide');
		$('.fab-down-btn').removeClass('mdui-fab-hide');
	}
	//console.log(document.documentElement.scrollTop);
});
//滚动条在Y轴上的滚动距离
function getScrollTop() {　　
	var scrollTop = 0,
	bodyScrollTop = 0,
	documentScrollTop = 0;　　
	if (document.body) {
		bodyScrollTop = document.body.scrollTop;　　
	}　　
	if (document.documentElement) {
		documentScrollTop = document.documentElement.scrollTop;　　
	}
	scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop: documentScrollTop;　　
	return Math.round(scrollTop);
}
//文档的总高度
function getScrollHeight() {　　
	var scrollHeight = 0,
	bodyScrollHeight = 0,
	documentScrollHeight = 0;　　
	if (document.body) {
		bodyScrollHeight = document.body.scrollHeight;　　
	}　　
	if (document.documentElement) {
		documentScrollHeight = document.documentElement.scrollHeight;　　
	}
	scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight: documentScrollHeight;　　
	return Math.round(scrollHeight);
}
//浏览器视口的高度
function getWindowHeight() {　　
	var windowHeight = 0;　　
	if (document.compatMode == "CSS1Compat") {
		windowHeight = document.documentElement.clientHeight;　　
	} else {
		windowHeight = document.body.clientHeight;　　
	}　　
	return Math.round(windowHeight);
}
/**
  常用方法简化
**/
/*事件样式主题类*/
//加载CSS
function loadCSS(css_src) {
	var link_css = document.createElement('link');
	link_css.href = css_src;
	link_css.rel = 'stylesheet';
	link_css.type = 'text/css';
	document.getElementsByTagName('head').item(0).appendChild(link_css);
};
//加载Script
function loadJS(js_src) {
	var script = document.createElement('script');
	script.src = js_src;
	script.type = 'text/javascript';
	document.getElementsByTagName('head').item(0).appendChild(script);
};
//修改网页图标
function setFavicon(url) {
	var favicon = document.querySelector('link[rel="shortcut icon"]');
	if (favicon !== null) {
		favicon.href = url;
	} else {
		favicon = document.createElement('link');
		favicon.rel = 'shortcut icon';
		favicon.href = url;
		document.head.appendChild(favicon);
	}
};
//修改Head标签
function setHeadMeta(tga, value) {
	document.querySelector('meta[name="' + tga + '"]').setAttribute('content', value);
};
//修改网页标题
function setHeadTitle(value) {
	document.title = value;
};
//打开新窗口
function openUrl(url, timeout) {
	if (timeout) {
		setTimeout(function() {
			window.open(url);
		},
		1000);
	} else {
		window.open(url);
	}
};
//重定向网页
function locaUrl(url, timeout) {
	if (timeout) {
		setTimeout(function() {
			window.location.href = url;
		},
		1000);
	} else {
		window.location.href = url;
	}
};
//设置网页锚点
function locaHash(hash) {
	window.location.hash = hash;
};
//返回上一页
function goBack() {
	window.history.go( - 1);
};
//刷新网页
function reLoad(timeout) {
	if (timeout) {
		setTimeout(function() {
			location.reload();
		},
		1000);
	} else {
		location.reload();
	}
};
//平滑的滚动
function scrollIntoView(selector, block) {
	document.querySelector(selector).scrollIntoView({
		behavior: 'smooth',
		block: block
	})
};
//修改节点内容
function setChildHtml(selector, html) {
	document.querySelector(selector).innerHTML = html;
};
//修改节点内容
function setChildText(selector, texts) {
	//document.querySelector(selector).innerText = texts;
	$(selector).text(texts);
};
//隐藏节点
function hideChild(selector) {
	//document.querySelector(selector).style.display = 'none';
	addClass(selector, 'mdui-hidden');

};
//显示节点
function showChild(selector) {
	//document.querySelector(selector).style.display = '';
	removeClass(selector, 'mdui-hidden');

};
//删除节点
function removeChild(selector) {
	var my_removeChild_querySelector = document.querySelector(selector);
	my_removeChild_querySelector.parentNode.removeChild(my_removeChild_querySelector);
};
//追加节点内容
function appendChild(selector, html) {
	$(selector).append(html);
};
//添加类元素
function addClass(selector, class_name) {
	document.querySelector(selector).classList.add(class_name);
};
//替换类元素
function toggleClass(selector, class_name) {
	$(selector).toggleClass(class_name);
};
//删除类元素
function removeClass(selector, class_name) {
	document.querySelector(selector).classList.remove(class_name);
};
//修改节点属性
function setAttribute(selector, attr_name, attr_value) {
	document.querySelector(selector).setAttribute(attr_name, attr_value);
};
//删除节点属性
function removeAttribute(selector, attribute) {
	document.querySelector(selector).removeAttribute(attribute);
};
//设置输入框内容
function setValue(selector, value) {
	$(selector).val(value);
};
//设置选择框状态
function setChecked(selector, is_check) {
	document.querySelector(selector).checked = is_check;
};
//设置禁用状态
function setDisabled(selector) {
	setAttribute(selector, 'disabled', true);
};
//设置启用状态
function setEnabled(selector) {
	removeAttribute(selector, 'disabled');
};
//设置节点SRC
function setSrc(selector, src) {
	$(selector).attr('src', src)
};
//设置节点样式
function setStyle(selector, style) {
	var my_setStyle_querySelector = document.querySelector(selector);
	var my_setStyle_querySelector_newStyle = my_setStyle_querySelector.style.cssText;
	my_setStyle_querySelector.style = my_setStyle_querySelector_newStyle + style;
};
//设置节点宽度
function setWidth(selector, width) {
	document.querySelector(selector).width = width;
};
//设置节点高度
function setHeight(selector, height) {
	document.querySelector(selector).height = height;
};
//设置节点内边距  上 右 下 左
function setPadding(selector, padding_top, padding_right, padding_bottom, padding_left) {
	document.querySelector(selector).style.padding = padding_top + ' ' + padding_right + ' ' + padding_bottom + ' ' + padding_left;
};
//设置节点外边距  上 右 下 左
function setMargin(selector, margin_top, margin_right, margin_bottom, margin_left) {
	document.querySelector(selector).style.margin = margin_top + ' ' + margin_right + ' ' + margin_bottom + ' ' + margin_left;
};
//设置节点偏移  top right bottom left
function setOffset(selector, orientation, offset) {
	document.querySelector(selector).style.orientation = offset;
};
/*数据逻辑类*/
//随机生成UUID
function getUUID() {
	function uuid() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}
	return (uuid() + uuid() + '-' + uuid() + '-' + uuid() + '-' + uuid() + '-' + uuid() + uuid() + uuid());
};
//读取LocalStorage
function getLocalStorage(localStorage_name) {
	return localStorage.getItem(localStorage_name);
};
//修改LocalStorage
function setLocalStorage(localStorage_name, localStorage_value) {
	localStorage.setItem(localStorage_name, localStorage_value);
};
//删除LocalStorage
function removeLocalStorage(localStorage_name) {
	localStorage.removeItem(localStorage_name);
};
//读取COOKIE
function getCookie(cookie_name) {
	return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(cookie_name).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
};
//修改COOKIE
function setCookie(cookie_name, cookie_value, expire_time) {
	var my_setCookies = cookie_name + '=' + escape(cookie_value);
	if (isEmpty(expire_time)) {
		my_setCookies += '; expires=Fri,31 Dec 9999 23:59:59 GMT';
	} else {
		var date = new Date();
		date.setTime(date.getTime() + 1000 * expire_time);
		my_setCookies += '; expires=' + date.toGMTString();
	}
	my_setCookies += '; path=/; domain=cxoip.com; ';
	document.cookie = my_setCookies;
};
//删除COOKIE
function removeCookie(cookie_name) {
	document.cookie = cookie_name + '=; expires=Thu,01 Jan 1970 00:00:00 UTC; path=/; domain=cxoip.com; ';
};
//读取SESSION
function getSession(session_name) {
	return sessionStorage.getItem(session_name);
};
//修改SESSION
function setSession(session_name, session_value) {
	sessionStorage.setItem(session_name, session_value);
};
//Radio是否有遗漏的选择
function checkedSelectRadio(name) {
	var chkObjs = document.getElementsByName(name);
	var isChecked = false;
	for (var i = 0; i < chkObjs.length; i++) {
		if (chkObjs[i].checked) {
			chk = i;
			isChecked = true;
			break;
		}
	}
	return isChecked;
}
//
function getObjectURL(file) {
	var url = null ;
	if (window.createObjectURL!=undefined) {
	url = window.createObjectURL(file) ;
	} else if (window.URL!=undefined) {
		url = window.URL.createObjectURL(file) ;
	} else if (window.webkitURL!=undefined) {
		url = window.webkitURL.createObjectURL(file) ;
	}
    return url ;
}
//
function serializeAllArray(selector) {
	var _obj = {};
	$(selector + " input").each(function() {
		if (this.type != "radio" && this.type != "checkbox") {
			var _val = $(this).val();
			if (!isNaN(_val) && _val.indexOf('.') == -1) {
				_val = parseInt($(this).val());
			}
			_obj[this.name] = _val;
		} else {
			_obj[this.name] = this.checked;
		}
	});
	return _obj;
};
//
function serializeArrayJson(selector, _bol, type) {
	var _obj = {};
	$(selector + " input").each(function() {
		if (this.type != "radio" && this.type != "checkbox") {
			var _val = $(this).val();
			if (!isNaN(_val) && _val.indexOf('.') == -1) {
				_val = parseInt($(this).val());
			}
			_obj[this.name] = _val;
		} else {
			_obj[this.name] = this.checked;
		}
	});
	if (_bol) {
		_obj.time = new Date().getTime();
		_obj['ycTemplate'] = type;
	}
	return JSON.stringify(_obj, null, "\t");
};
//判断是否空
function isEmpty(value) {
	if (value == '' || value == 'undefined' || value == undefined || value == 0 || value == null || value == 'NaN' || value == NaN || value.length == 0) {
		return true;
	}
	return false;
};
//判断内容是否相同
function isSame(value1, value2) {
	if (value1 == value2) {
		return true;
	}
	if ("'" + value1 + "'" == "'" + value2 + "'") {
		return true;
	}
	return false;
};
//是否包含文本
function isExist(txt, str) {
	if (txt.indexOf(str) != -1) {
		return true;
	}
	return false;
}
//是否为云储App
function isYunChuApp() {
	if (navigator.userAgent.indexOf("YC/App") != -1) {
		return true;
	}
	return false;
}
//合并数组去重
function arrMergededup(array, array1) {
	setObj = new Set(array);
	for (i = 0; i < array1.length; i++) {
		setObj.add(array1[i]);
	}
	return Array.from(setObj).sort();
}
//获取类元素
function getClass(selector) {
	return document.querySelector(selector).className;
};
//获取是否包含类元素
function hasClass(selector, class_name) {
	return document.querySelector(selector).className.match(new RegExp('(\\s|^)' + class_name + '(\\s|$)'));
};
//获取节点内容
function getChildText(selector) {
	return document.querySelector(selector).innerText;
};
//获取输入框内容
function getValue(selector) {
	return document.querySelector(selector).value;
};
//获取选择框状态
function getChecked(selector) {
	return document.querySelector(selector).checked;
};
//获取节点SRC
function setScriptResource(selector) {
	return document.querySelector(selector).src;
};
//获取节点属性
function getAttribute(selector, attribute) {
	return document.querySelector(selector).getAttribute(attribute);
};
//获取Head标签
function getHeadMeta(tga, attribute) {
	return document.querySelector('meta[name="' + tga + '"]').getAttribute(attribute);
};
//是否链接url
function isUrl(str) {
	var v = new RegExp('^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$', 'i');
	return v.test(str);
}
//取链接文件类型
function getUrlType(url) {
	var arr = url.split("/");
	var file_name = arr[arr.length - 1];
	return file_name.substr(file_name.lastIndexOf(".") + 1);
}
//取链接域名
function getUrlDomain(url) {
	return url.split("/")[2];
}
//获取网页链接锚点
function getHash() {
	return window.location.hash.substr(1);
};
//获取举报文档类型
function getReportDocType(url) {
	var url_type = getUrlType(url);
	var type = 0;
	var ar1 = ['txt', 'html', 'json', 'css', 'js', 'md5', 'lua', 'password'];
	var ar2 = [0, 1, 4, 7, 8, 9, 10, 11];
	for (var i = 0; i < ar1.length; i++) {
		if (url_type == ar1[i]) {
			type = ar2[i];
		}
	}
	return type;
}
//获取举报产品类型
function getReportProductTypes(url) {
	var url_domain = getUrlDomain(url);
	var types = 'text';
	var ar1 = ['wds.ecsxs.com', 'wds.cxoip.com', 'shared.wd.cn.ecsxs.com', 'filesfx.wd.cn.ecsxs.com'];
	var ar2 = ['text', 'text', 'file', 'file'];
	for (var i = 0; i < ar1.length; i++) {
		if (url_domain == ar1[i]) {
			types = ar2[i];
		}
	}
	return types;
}
//获取网页链接参数
function getParam(name) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == name) {
			return pair[1];
		}
	}
	return (false);
};
//获取现在时间戳
function getTimeStamp() {
	return Date.parse(new Date()).toString().substr(0, 10);;
}
//日期转时间戳
function dateToStamp(time) {
	return new Date(time).getTime() / 1000;
}
//时间戳转日期
function stampToDate(time, isdasc) {
	var time = time * 1000;
	var date = new Date(Number(time));
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var hour = date.getHours().toString();
	var minutes = date.getMinutes().toString();
	var seconds = date.getSeconds().toString();
	if (hour < 10) {
		hour = "0" + hour;
	}
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	if (isdasc) {
		return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d) + " " + hour + ":" + minutes + ":" + seconds;
	} else {
		return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
	}
};
//时间戳是否同一天
function isSameDay(time) {
	return new Date(time).toDateString() === new Date().toDateString();
};
//明文字符串打码
function addStrMosaic(str) {
	if (str != '未绑定') {
		if (str != null && str != undefined) {
			if (isPhoneNum(str)){
			    return regPhoneNum(str);
			} else if (isQQNum(str)) {
				return regQQNum(str);
			} else if (isEmails(str)) {
			    return regEmails(str);
			} else {
				if (str.length <= 3) {
					return "*" + str.substring(1, str.length);
				} else {
					return str.substring(0, 2) + "*****" + str.substr( - 2, 2);
				}
			}
		} else {
			return "";
		}
	} else {
		return str;
	}
}
//邮箱账号打码
function regEmails(email) {
　　if (String(email).indexOf('@') > 0) { 
　　　　var str = email.split('@'),
　　　　　　_s = ''; 
　　　　if (str[0].length > 3) {
　　　　　　for (var i = 0; i < str[0].length - 3; i++) { 
　　　　　　　　_s += '*'; 
　　　　　　}
　　　　}
　　　　var new_email = str[0].substr(0, 3) + _s + '@' + str[1];
　　} 
　　return new_email;
}
//手机号打码
function regPhoneNum(value) {
　　return  value.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}
//QQ号码打码
function regQQNum(value) {
　　return  value.replace(/(\d{3})\d{4,5}(\d{3})/, '$1****$2');
}
//取中文时间间隔
function getTimer(stringTime) {
	var minute = 1000 * 60;
	var hour = minute * 60;
	var day = hour * 24;
	var week = day * 7;
	var month = day * 30;
	var time1 = new Date().getTime();
	var time2 = Date.parse(stringTime);
	var time = time1 - time2;
	var result = '';
	if (time / week < 1) {
		if (time / day >= 1) {
			result = parseInt(time / day) + "天前";
		} else if (time / hour >= 1) {
			result = parseInt(time / hour) + "小时前";
		} else if (time / minute >= 1) {
			result = parseInt(time / minute) + "分钟前";
		} else {
			result = "刚刚";
		}
	}
	return result;
}
//判断是否为电脑
function isPC() {
	var userAgentInfo = navigator.userAgent;
	var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
	var flag = true;
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;
		}
	}
	if (window.screen.width < 599) {
		flag = false;
	}
	return flag;
};
//是否为QQ号
function isQQNum(str) {
	var reg = /^[1-9][0-9]{4,9}$/gim;
	return reg.test(str);
};
//是否为手机号
function isPhoneNum(str) {
	var myreg = /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/;
	return myreg.test(str);
};
//是否为电话号
function isTelNum(str) {
	var reg = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
	return reg.test(str);
};
//是否为邮箱
function isEmails(str) {
	var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	return reg.test(str);
};
//是否有HTML
function isHTML(str) {
	var reg = /<[a-z][\s\S]*>/i;
	return reg.test(str);
};
//是否为IP
function isIPaddress(str) {
	var myreg = /^([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}$/gi;
	return myreg.test(str);
};
//是否为网址链接
function isWebsitelink(str) {
	var myreg = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i;
	return myreg.test(str);
};
//是否为正确的身份证号
function isIDcard(str) {
	var myreg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
	return myreg.test(str);
};
//是否为数字
function isNumberss(str) {
	var myreg = /^\d+$/;
	return myreg.test(str);
};
//是否存在中文
function isChinese_index(str) {
	var myreg = /[\u4e00-\u9fa5]/gm;
	return myreg.test(str);
};
//是否结尾
function validationEnd(str, appoint) {
	str = str.toLowerCase();
	var start = str.length - appoint.length;
	var char = str.substr(start, appoint.length);
	if (char == appoint) {
		return true;
	}
	return false;
}
//是否开头
function validationStart(str, appoint) {
	str = str.toLowerCase();
	var char = str.substr(0, appoint.length);
	if (char == appoint) {
		return true;
	}
	return false;
}
//转义
function addslashes(s) {
	return s.replace(/\\/g, '\\\\').replace(/\u0008/g, '\\b').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\f/g, '\\f').replace(/\r/g, '\\r').replace(/'/g, '\\\'').replace(/"/g, '\\"');
}
//是否为JSON
function isJSON(str) {
	if (typeof str == 'string') {
		try {
			var obj = JSON.parse(str);
			if (typeof obj == 'object' && obj) {
				return true;
			} else {
				return false;
			}

		} catch(e) {
			return false;
		}
	}
};
//去除全部空白
function trim(str) {
	return str.replace(/[\r\n\t]/g, '');
}
//HTML转义
function HtmlDecode(str) {
	var s = '';
	if (str.length == 0) {
		return '';
	}
	s = str.replace(/&/g, "&amp;");
	s = s.replace(/</g, "&lt;");
	s = s.replace(/>/g, "&gt;");
	s = s.replace(/ /g, "&nbsp;");
	s = s.replace(/\'/g, "&#39;");
	s = s.replace(/\"/g, "&quot;");
	s = s.replace(/\n/g, "<br/>");
	return s;
};
//HTML反转义
function HtmlEncode(text) {
	var s = '';
	if (str.length == 0) {
		return '';
	}
	s = str.replace(/&amp;/g, "&");
	s = s.replace(/&lt;/g, "<");
	s = s.replace(/&gt;/g, ">");
	s = s.replace(/&nbsp;/g, " ");
	s = s.replace(/&#39;/g, "\'");
	s = s.replace(/&quot;/g, "\"");
	s = s.replace(/<br\/>/g, "\n");
	return s;
};
//Base64编码
var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function decodeBase64(input) {
	var output = "";
	var chr1, chr2, chr3 = "";
	var enc1, enc2, enc3, enc4 = "";
	var i = 0;
	do {
		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
		chr3 = input.charCodeAt(i++);
		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;
		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}
		output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
		chr1 = chr2 = chr3 = "";
		enc1 = enc2 = enc3 = enc4 = "";
	} while ( i < input . length );
	return output;
};
//Base64解码
function encodeBase64(input) {
	var output = "";
	var chr1, chr2, chr3 = "";
	var enc1, enc2, enc3, enc4 = "";
	var i = 0;
	if (input.length % 4 != 0) {
		return "";
	}
	var base64test = /[^A-Za-z0-9\+\/\=]/g;
	if (base64test.exec(input)) {
		return "";
	}
	do {
		enc1 = keyStr.indexOf(input.charAt(i++));
		enc2 = keyStr.indexOf(input.charAt(i++));
		enc3 = keyStr.indexOf(input.charAt(i++));
		enc4 = keyStr.indexOf(input.charAt(i++));
		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;
		output = output + String.fromCharCode(chr1);
		if (enc3 != 64) {
			output += String.fromCharCode(chr2);
		}
		if (enc4 != 64) {
			output += String.fromCharCode(chr3);
		}
		chr1 = chr2 = chr3 = "";
		enc1 = enc2 = enc3 = enc4 = "";
	} while ( i < input . length );
	return output;
};
//Unicode解码
function encodeUnicode(str) {
	var res = [];
	for (var i = 0; i < str.length; i++) res[i] = ("00" + str.charCodeAt(i).toString(16)).slice( - 4);
	return "\\u" + res.join("\\u");
};
//Unicode编码
function decodeUnicode(str) {
	var str = str.replace(/\\/g, "%");
	return unescape(str);
};
//是否QQ
function isMQQ() {
	var _UA = window.navigator.userAgent;
	if (/QQ\/\d/i.test(_UA)) {
		return true;
	}
	return false;
}
//是否微信
function isWechat() {
	var _UA = window.navigator.userAgent;
	if (/micromessenger/i.test(_UA.match(/MicroMessenger/i))) {
		return true;
	}
	return false;
}
//是否全由数字组成
function isDigit(s) {
	var patrn = /^[0-9]{1,20}$/;
	if (!patrn.exec(s)) {
		return false;
	}
	return true;
}
//校验登录名：只能输入5-20个以字母开头、可带数字、“_”、“.”的字串
function checkUserName(s) {
	var patrn = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
	if (!patrn.exec(s)) {
		return false;
	}
	return true;
}
//校验密码：只能输入8-16个字母、数字
function checkPassword(s) {
	var patrn = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
	if (!patrn.exec(s)) {
		return false;
	}
	return true;
}
//是否相同字符（如111、aaa）连续3位或3位以上
function checkSame(s) {
    var patrn = /(\w)*(\w)\2{2}(\w)*/g;
    if(patrn.test(s)){
        return false;
    }
}
//是否连续字符（如123、abc）连续3位或3位以上
function checkContinuous(s) {
    var arr = s.split('');
    var flag = true;
    for (var i = 1; i < arr.length-1; i++) {
        var firstIndex = arr[i-1].charCodeAt();
        var secondIndex = arr[i].charCodeAt();
        var thirdIndex = arr[i+1].charCodeAt();
        thirdIndex - secondIndex == 1;
        secondIndex - firstIndex==1;
        if((thirdIndex - secondIndex == 1)&&(secondIndex - firstIndex==1)){
            flag =  false;
        }
    }
    return flag;
}
//去掉前后空格
function setTrim(str) {
    var reg = /^\s+|\s+$/g;
    return str.replace(reg, '');
}
//云储App屏蔽长按菜单
if (isYunChuApp()) {
	document.body.style = 'webkit-touch-callout:none;-webkit-user-select:none;user-select:none;';
}
//创建XMLHttpRequest
function createXMLHttpRequest() {
    var xmlHttp;
    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
        if (xmlHttp.overrideMimeType)
            xmlHttp.overrideMimeType('text/xml');
    } else if (window.ActiveXObject) {
        try {
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
            }
        }
    }
    return xmlHttp;
}