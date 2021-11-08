parallaxMouse();
if (isPC()) {
	showToast('晃动鼠标，会有奇妙的事情发生哦~');
}
$(document).on('click', '.content-support-list li',
function(event) {
	showToast('你的支持是我们最大的动力');
});
function parallaxMouse() {
	if ($('#parallax').length) {
		var scene = document.getElementById('parallax');
		var parallax = new Parallax(scene);
	}
}
function counts(o) {　　
	var t = typeof o;　　
	if (t == 'string') {　　　　
		return o.length;　　
	} else if (t == 'object') {　　　　
		var n = 0;　　　　　　
		for (var i in o) {
			n++;　　　　
		}　　　　
		return n;　　
	}　　
	return false;
}
var zong = 0;
var zoile = 1;
var isDaodi = false;
function test() {
	zoiles = zoile + 5;
	for (let i = zoile; i < zoiles; i++) {
	if (isDaodi || i > zong) {
		break;
	}
		let qq = getChildText('.suppport-' + i + '-nickname-div');
		$.ajax({
				method: 'GET',
				url: 'https://0047ol.cn/api/v1/qq/?id=' + qq,
				success: function(data) {
					var json1 = JSON.parse(data);
					var json1_state = json1['code'];
					if (json1_state == 200) {
						var nickname = json1['data']['name'];
						if (!isEmpty(nickname)) {
							$('.suppport-' + i + '-nickname-div').text(nickname);
						}
					}
				}
			});
	}
	zoile += 5;
}
$.ajax({
	method: 'GET',
	url: 'https://wd.cn.ecsxs.com/api/v1/yunchu/ponsor.php?data=qq',
	success: function(data) {
		var json = JSON.parse(data);
		var data = json['data']['items']['qq'];
		zong = counts(data);
		let _is = 0;
		for (var key in data) {
			_is = _is + 1;
			var qq = data[key][0]['qq'];
			var source = data[key][0]['source'];
			var amount = data[key]['tatol']['amount'];
			var _ys = String(amount).indexOf(".") + 1;
			var count = String(amount).length - _ys;
			if (_ys > 0) {
				if (count < 2) {
					amount = amount + '0';
				}
			} else {
				amount = amount + '.00';
			}
			var info = data[key][0]['content'];
			var hiddedd = '';

			var nickname = '<div class="mdui-list-item-title mdui-text-truncate suppport-' + _is + '-nickname-div" style="max-width:180px;">' + qq + '</div>';;
			if (source == '微信扫码' || source == '私聊红包' || source == '二维码/转账' || source == '转账' || source == '群专属红包' || source == 'QQ红包' || source == 'QQ转账' || source == 'QQ转账/红包' || source == '微信支付') {
				if (regYuanToFen(amount,1) >= 10) {
					nickname = '<div class="mdui-list-item-title mdui-text-truncate suppport-' + _is + '-nickname-div mdui-text-color-red" style="max-width:180px;">' + qq + '</div>';
					info = '累计赞助<font class="mdui-text-color-red">' + amount + '</font>元';
				} else {
					info = '累计赞助' + amount + '元';
				}
			} else {
				info = source;
			}
			if ((source == '微信扫码' || source == '私聊红包' || source == '二维码/转账' || source == '转账' || source == '群专属红包' || source == 'QQ红包' || source == 'QQ转账' || source == 'QQ转账/红包' || source == '微信支付') && regYuanToFen(amount,1) < 1) {
				hiddedd = ' mdui-hidden';
			}
			var time = stampToDate(data[key][0]['ponsortime'], true).replace(new Date().getFullYear() + '-', '');
			appendChild('.content-support-list', '<li class="mdui-list-item mdui-ripple' + hiddedd + '"><div class="mdui-list-item-avatar"><img class="suppport-' + _is + '-avatar-img" src="https://q1.qlogo.cn/headimg_dl?dst_uin=' + qq + '&spec=640"></div><div class="mdui-list-item-content">' + nickname + '<div class="mdui-list-item-text mdui-list-item-one-line">' + info + '</div> </div>' + time + '</li>');
		}
	}
});
function regYuanToFen(yuan,digit) {
    var m = 0;
    var s1 = yuan.toString();
    var s2 = digit.toString();
    try{
		m += s1.split(".")[1].length;
	}catch(e){
		
	};
    try{
		m += s2.split(".")[1].length;
	}catch(e){
		
	};
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
}
var isScrollTop = 0;
window.addEventListener('scroll',
function(event) {
	if (isScrollTop < getScrollTop()) {
		if ((getWindowHeight() + getScrollTop()) < getScrollHeight()) {
		isScrollTop = getScrollTop();
		test();
		} else {
			isDaodi = true;
		}
	}
});