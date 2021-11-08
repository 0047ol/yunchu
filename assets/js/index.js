/**
   常量
 **/
var yc_app_ajax_header = {
	'app': 'true'
};
var captcha_code_token;
var QRcodeLoginInterval;
var Qrcode_token;
var AppLoginInterval;
var AppLogin_token;
var is_logining_now = false;
var AppLoginTimeout;
if (!isYunChuApp()) {
	yc_app_ajax_header = {};
}
window.onload = function() {
	if ((isWechat() || isMQQ()) && getParam('action') != 'reset') {
		showAlert('温馨提示', '因QQ和微信过于限制，为保证用户体验，建议使用外部浏览器访问云储。', '我知道了');
		hideChild('.dialog-login-applogin');
		removeClass('.mc-login-menu', 'mdui-menu-closing');
		removeClass('.dialog-login', 'mdui-hidden-sm-up');
		setStyle('.mc-login', 'top:79.1px;height:571.8px');
		
		showChild('.dialog-login');
		hideChild('.dialog-login-applogin-btn');
	}
	if (isEmpty(getSession('show-ad')) || getSession('show-ad') == 'true') {
showChild('.content-index-list-top-ad');
addClass('.top-div', 'recycle-list-padding-top');
addClass('.top-background', 'recycle-list-padding-top');
}
}
//登陆状态
if (!isEmpty(getCookie('user_token')) && !isEmpty(getCookie('user_name'))) {
	showChild('.toolbar-user-btn');
	setValue('.dialog-report-user-email-input', '');
	hideChild('.dialog-report-user-email-div');
	if (getParam('from') != 'home' && getParam('action') != 'report') {
		showToast('欢迎回到云储');
	} else {
		setChildText('.mdui-drawer-open-icon', 'arrow_back');
		hideChild('.toolbar-user-btn');
		setStyle('.top-image', 'height:220px');
		hideChild('.index-app-down');
	}
} else {
	showChild('.toolbar-register-btn');
	showChild('.toolbar-login-btn');
	hideChild('.toolbar-user-btn');
	if (getParam('from') == 'home') {
		setChildText('.mdui-drawer-open-icon', 'arrow_back');
		setStyle('.top-image', 'height:220px');
		hideChild('.index-app-down');
	}
	showChild('.dialog-report-user-email-div');
	sendYunChuAPP("noLogin", 0);
}
//首页广告关闭
$('.content-index-list-top-ad-close-btn').on('click',
function(event) {
hideChild('.content-index-list-top-ad');
removeClass('.top-div', 'recycle-list-padding-top');
removeClass('.top-background', 'recycle-list-padding-top');
removeClass('.mdui-appbar-fixed', 'content-top-tips-box-shadow');
setSession('show-ad', 'false');
});
//首页广告点击事件
$('.content-index-list-top-ad-action-btn').on('click',
function(event) {
	openUrl('https://curl.qcloud.com/lcCtM180',false)
});
//打开注册对话框
var dialog_register = new mdui.Dialog('.mc-register', {
	history: false
});
//打开登录对话框
var dialog_login = new mdui.Dialog('.mc-login', {
	history: false
});
//打开举报对话框
var dialog_report = new mdui.Dialog('.mc-report', {
	history: false
});
/**
   事件
 **/
if (getParam('action') == 'regist') {
	/*if (isYunChuApp()) {
    showChild('.mc-register');
    addClass('.mc-register','mdui-dialog-open');
    setStyle('.mc-register','display:block!important;position:sticky;transform:scale(1)!important;opacity:1!important;top:0;width:100%;min-width:100%;min-height:100%;height:100%;border-radius:0;');
	setCaptcha_code();
	showChild('.dialog-register-step-one-captcha-code');
	}*/
	dialog_register.open();
	var InvitCode = getParam('invitCode');
	if (!isEmpty(InvitCode)) {
		setHeadTitle('注册云储');
		setHeadMeta('description', '简便高效的服务端在线文档托管');
		setValue('.dialog-register-step-one-invitation-code-input', InvitCode);
		mdui.updateTextFields();
	}
} else if (getParam('action') == 'login') {
	setHeadMeta('description', '简便高效的服务端在线文档托管');
	if (getParam('type') == 'scanCode') {
		locaUrl('yunchu://login/?data=' + getParam('data') + '&type=qr', false)
	} else if (getParam('type') == 'appLogin' && !isEmpty(getParam('from'))) {
		var login_username = getParam('username');
		var login_token = getParam('token');
		setCookie('yunchu', login_token, 3600);
		setCookie('user_name', login_username, 3600);
		setCookie('user_token', login_token, 3600);
		showToast('登录成功');
		locaUrl('./home/#' + getHash(), true);
	} else {
		dialog_login.open();
	}
} else if (getParam('action') == 'reset') {
	setHeadMeta('description', '简便高效的服务端在线文档托管');
	/*if (isYunChuApp()) {
	 showChild('.mc-login');
	 addClass('.mc-login','mdui-dialog-open');
	 setStyle('.mc-login','display:block!important;position:sticky;transform:scale(1)!important;opacity:1!important;top:0;width:100%;min-width:100%;min-height:100%;height:100%;border-radius:0;');
	setCaptcha_code();
	showChild('.dialog-reset-password-captcha-code');
	}*/
	dialog_login.open();
	hideChild('.dialog-login');
	hideChild('.dialog-login-scanQRcode');
	hideChild('.dialog-login-applogin');
	setStyle('.mc-login', 'top:63.4px;height:603.2px');
	setCaptcha_code();
	showChild('.dialog-reset-password');
	mdui.updateTextFields();
	scrollIntoView('.dialog-reset-password-step', 'end');
} else if (getParam('action') == 'report') {
	setHeadMeta('description', '简便高效的服务端在线文档托管');
	var report_url = getParam('url');
	if (!isEmpty(report_url)) {
	setValue('.dialog-report-doc-id-input', report_url);
	}
	open_dialog_report();
	mdui.updateTextFields();
}
function open_dialog_report() {
	hideChild('.dialog-report-text-pwd-div');
	dialog_report.open();
}
var click = 'click';
//举报提交
$('.dialog-report-send-btn').on(click,
function(event) {
	var report_type = getParam('type');
	var report_from = getParam('from');
	var report_url = getValue('.dialog-report-url-input');
	var report_url_domain = getUrlDomain(report_url);
	var report_id = report_url.replace(/[^0-9]/ig, "");
	var user_email = getValue('.dialog-report-user-email-input');
	var user_token = getCookie('user_token');
	var report_captcha_code = getValue('.dialog-report-captcha-code-input');
	if (isEmpty(user_token)) {
		user_token = '';
	}
	if (isEmpty(report_type)) {
		report_type = getReportDocType(report_url);
	}
	if (isEmpty(report_from)) {
		report_from = 'official';
	}
	var ifPwd = false;
	if (!isUrl(report_url)) {
		showToast('请填写要投诉举报的链接地址');
	} else if (!isExist(report_url_domain, 'ecsxs.com') && !isExist(report_url_domain, 'cxoip.com')) {
		showToast('该链接暂不在举报受理范围内');
	} else if (isEmpty(getValue('.dialog-report-doc-id-input'))) {
		showToast('请填写文档ID');
	} else if (!checkedSelectRadio("category") && isEmpty(getValue('.dialog-report-content-input'))) {
		showToast('请选择违规类型');
	} else if ($("input[name='category']:checked").val() == 0 && isEmpty(getValue('.dialog-report-content-input'))) {
		showToast('请填写违规内容');
	} else if (isEmpty(report_captcha_code)) {
		showToast('请输入图形验证码');
	} else if (isEmpty(getCookie('user_token')) && isEmpty(user_email)) {
		showToast('请填写你的邮箱');
	} else if (ifPwd && isEmpty(getValue('.dialog-report-text-pwd-input'))) {
		showToast('请填写该文档密码');
	} else if (!isEmpty(user_email) && !isEmails(user_email)) {
		showToast('请填写正确的邮箱');
	} else {
		//showToast('code:'+report_captcha_code+'token:'+captcha_code_token);
		//if (checkCaptcha_code(report_captcha_code,captcha_code_token)) {
		$.ajax({
			method: 'POST',
			url: 'https://wd.cn.ecsxs.com/api/v1/report/report.php',
			data: 'id=' + report_id + '&' + $('.dialog-report-form').serialize() + '&token=' + user_token + '&type=' + report_type + '&from=' + report_from + '&types=' + getReportProductTypes(report_url) + '&code=' + encodeURIComponent(report_captcha_code) + '&codetoken=' + captcha_code_token,
			headers: yc_app_ajax_header,
			success: function(data) {
				var json = JSON.parse(data);
				var json_state = json['state'];
				var json_msg = json['msg'];
				if (json_state == 200) {
					showToast('已提交举报，请等待审核');
					dialog_report.close();
				} else if (json_state == 230) {
					setCaptcha_code();
					showToast(json_msg);
				} else if (json_state == 248) {
					showToast('该文档已被举报，请耐心等待审核');
				} else if (json_state == 221 && !isExist(json_msg, '数据不能空')) {
					showToast('请填写该文档的访问密码');
					ifPwd = true;
					showChild('.dialog-report-text-pwd-div');
				} else {
					showToast(json_msg);
				};
			},
			error: function(msg) {
				showToast('举报失败');
			}
		});
		/*} else {
		setCaptcha_code();
		showToast('图形验证码错误');
	}*/
	}
});
//
$(document).on(click, '.dialog-report-list-item',
function(event) {
	addClass('.dialog-report-content-input-textfield-error', 'mdui-hidden');
	addClass('.dialog-report-content-input-textfield-helper', 'mdui-hidden');
	removeClass('.dialog-report-content-div', 'mdui-textfield-invalid-html5');
	setValue('.dialog-report-content-input', '');
	event['srcElement'].parentElement.firstElementChild.checked = true;
});
//
$('.dialog-report-content-input').on(click,
function(event) {
	removeClass('.dialog-report-content-input-textfield-error', 'mdui-hidden');
	removeClass('.dialog-report-content-input-textfield-helper', 'mdui-hidden');
	event['srcElement'].parentElement.parentElement.firstElementChild.firstElementChild.checked = true;
});
//点击注册
$('.toolbar-register-btn').on(click,
function(event) {
	dialog_register.open();
});
//点击登录
$('.toolbar-login-btn').on(click,
function(event) {
	dialog_login.open();
});
//回到个人主页
$('.toolbar-user-btn').on(click,
function(event) {
	locaUrl('./home/#' + getHash(), false);
});
//打开注册对话框完毕
$('.mc-register').on('opened.mdui.dialog',
function(event) {
	scrollIntoView('.dialog-register-step-one', 'end');
	setTimeout(function() {
		//scrollIntoView('.dialog-register-step-one', 'start');
	},
	500);
	setCaptcha_code();
	showChild('.dialog-register-step-one-captcha-code');
	mdui.updateTextFields();
});
//开始打开登录对话框
$('.mc-login').on('opened.mdui.dialog',
function(event) {
	scrollIntoView('.dialog-login', 'end');
	setTimeout(function() {
		//scrollIntoView('.dialog-login', 'start');
	},
	800);
	if (isPC()) {
		refreshQRcode();
	}
	mdui.updateTextFields();
});
document.querySelector('.mc-register').addEventListener('open.mdui.dialog',
function() {
	sendYunChuAPP("openRegistDlg", 0);
	//window.location.hash = 'dialog';
});
document.querySelector('.mc-register').addEventListener('close.mdui.dialog',
function() {
	sendYunChuAPP("closeRegistDlg", 0);
	//window.location.hash = '';
});
document.querySelector('.mc-report').addEventListener('opened.mdui.dialog',
function() {
	setCaptcha_code();
	showChild('.dialog-report-captcha-code');
});
document.querySelector('.mc-login').addEventListener('open.mdui.dialog',
function() {
	sendYunChuAPP("openLoginDlg", 0);
	//window.location.hash = 'dialog';
});
document.querySelector('.mc-login').addEventListener('close.mdui.dialog',
function() {
	sendYunChuAPP("closeLoginDlg", 0);
	clearInterval(QRcodeLoginInterval);
	clearInterval(AppLoginInterval);
	//window.location.hash = '';
});
var is_open_app_onclick = false;
var is_hidden_document = false;
var open_app_logined = 0;
$('.dialog-login-app-login-btn').on(click,
function(event) {
	if (isMQQ()) {
		showToast('暂不支持手机QQ，请使用外部浏览器');
	} else if (isWechat()) {
		showToast('暂不支持手机微信，请使用外部浏览器');
	} else {
		if (!is_open_app_onclick) {
			is_logining_now = true; //开始登录
			setChildHtml('.dialog-login-app-login-btn', '正在打开APP&nbsp;&nbsp;&nbsp;&nbsp;<i class="sp-3balls"></i>');
			is_open_app_onclick = true; //已点击登录
			getAppLoginData(); //获取Adata
			AppLoginTimeout = setTimeout(function() {
				if (!is_hidden_document) {
					//未离开网页
					setChildHtml('.dialog-login-app-login-btn', '打开APP登录');
					is_open_app_onclick = false;
					is_logining_now = false;
					clearInterval(AppLoginInterval);
					showToast('唤起失败或未安装APP，请下载最新版本云储APP');
				}
			},
			3500);
		}
	}
});
//获取App登录data
function getAppLoginData() {
	$.ajax({
		method: 'POST',
		url: 'https://wd.cn.ecsxs.com/api/v1/user/applogin/appcode.php?uuid=' + getUUID(),
		success: function(data) {
			var json = JSON.parse(data);
			var json_state = json['state'];
			if (json_state == 200) {
				AppLogin_token = json['data']['token'];
				if (!isPC()) {
					locaUrl('yunchu://login/?data=' + json['data']['appdata'] + '&type=app', false);
				}
			}
		}
	});
};
document.addEventListener("visibilitychange",
function() {
	if (!document.hidden) {
		is_hidden_document = false;
		if (is_logining_now) {
			$.ajax({
				method: 'POST',
				url: 'https://wd.cn.ecsxs.com/api/v1/user/applogin/apptoken.php?token=' + AppLogin_token,
				success: function(data) {
					var json = JSON.parse(data);
					var json_state = json['state'];
					if (json_state == 255) {
						setChildHtml('.dialog-login-app-login-btn', '已唤起APP，请确认登录');
						is_open_app_onclick = true;
						showToast('打开APP成功，请继续授权');
					} else if (json_state == 200) {
						setChildHtml('.dialog-login-app-login-btn', '登录完成');
						is_logining_now = false;
						is_open_app_onclick = true;
						showToast('APP授权登录成功');
					} else {
						setChildHtml('.dialog-login-app-login-btn', '重试拉起登录');
						is_logining_now = false;
						is_open_app_onclick = false;
						showToast('APP授权登录未成功，请下载最新云储APP后重试');
					}
				}
			});
		}
	} else {
		is_hidden_document = true;
		if (is_logining_now) {
			clearTimeout(AppLoginTimeout);
		}
	}
});
//刷新登录二维码
function refreshQRcode() {
	$.ajax({
		method: 'POST',
		url: 'https://wd.cn.ecsxs.com/api/v1/user/qrcode/qrcode.php?uuid=' + getUUID(),
		success: function(data) {
			var json = JSON.parse(data);
			var json_state = json['state'];
			if (json_state == 200) {
				Qrcode_token = json['data']['token'];
				setSrc('.qrcode-box', 'data:image/png;base64,' + json['data']['image']);
				setStyle('.qrcode-box', 'opacity: 1;');
				removeClass('.dialog-login-scanQRcode-issao', 'mdui-text-color-red');
				setChildText('.dialog-login-scanQRcode-issao', '');
				setChildHtml('.dialog-login-scanQRcode-tips', '扫码有问题？<a class="mdui-text-color-theme-accent cursor-pointer" onclick="refreshQRcode();">点击刷新>></a>');
				getQRcode_Login();
			}
		}
	});
};
//获取登录状态
function getQRcode_Login() {
	clearInterval(QRcodeLoginInterval);
	QRcodeLoginInterval = setInterval(function() {
		$.ajax({
			method: 'POST',
			url: 'https://wd.cn.ecsxs.com/api/v1/user/qrcode/qrtoken.php?token=' + Qrcode_token,
			success: function(data) {
				var json = JSON.parse(data);
				var json_state = json['state'];
				if (json_state == 235) {
					setStyle('.qrcode-box', 'opacity: 0.03;');
					addClass('.dialog-login-scanQRcode-issao', 'mdui-text-color-blue');
					setChildText('.dialog-login-scanQRcode-issao', 'check_circle');
					setChildText('.dialog-login-scanQRcode-tips', '已扫描，请在APP确认');
				} else if (json_state == 200) {
					var json_username = json['data']['username'];
					if (!isEmpty(json_username)) {
					setStyle('.qrcode-box', 'opacity: 0.03;');
					addClass('.dialog-login-scanQRcode-issao', 'mdui-text-color-orange');
					setChildText('.dialog-login-scanQRcode-issao', 'check_circle');
					setChildText('.dialog-login-scanQRcode-tips', '登录完成');
					clearInterval(QRcodeLoginInterval);
					setCookie('yunchu', json['data']['token'], 3600);
					setCookie('user_name', json_username, 3600);
					setCookie('user_token', json['data']['token'], 3600);
					showToast('登陆成功');
					locaUrl('./home/#' + getHash(), true);
					}
				}
			}
		});
	},
	800);
	setTimeout(function() {
		clearInterval(QRcodeLoginInterval);
		setStyle('.qrcode-box', 'opacity: 0.03;');
		addClass('.dialog-login-scanQRcode-issao', 'mdui-text-color-red');
		setChildText('.dialog-login-scanQRcode-issao', 'error');
		setChildHtml('.dialog-login-scanQRcode-tips', '二维码已过期，<a class="mdui-text-color-theme-accent cursor-pointer" onclick="refreshQRcode();">重新获取</a>');
	},
	300000);
};
//刷新图形验证码
$('.captcha-image').on(click,
function(event) {
	setCaptcha_code();
});
//刷新图形验证码
function setCaptcha_code() {
	$.ajax({
		method: 'POST',
		url: 'https://wd.cn.ecsxs.com/api/v1/user/imagecode/',
		success: function(data) {
			var json = JSON.parse(data);
			var json_state = json['state'];
			if (json_state == 200) {
				captcha_code_token = json['data']['token'];
				setSrc('.captcha-image', 'data:image/png;base64,' + json['data']['image']);
				setValue('.captcha-field input', '');
			}
		}
	});
}
//注册对话框准备
$('.dialog-register-step-one-next-step-btn').on(click,
function(event) {
	var register_invitation_code = getValue('.dialog-register-step-one-invitation-code-input');
	var register_email = getValue('.dialog-register-step-one-email-input');
	var register_email_code = getValue('.dialog-register-step-one-email-code-input');
	var register_privacy_agreement_checkbox = getChecked('.dialog-register-step-one-privacy-agreement-checkbox');
	var register_captcha_code = getValue('.dialog-register-step-one-captcha-code-input');
	if (!register_privacy_agreement_checkbox) {
		showToast('请先阅读用户协议');
	} else if (isEmpty(register_invitation_code)) {
		showToast('请输入邀请码');
	} else if (isEmpty(register_email)) {
		showToast('请输入邮箱');
	} else if (!isEmpty(register_email) && !isEmails(register_email)) {
		showToast('请输入正确的邮箱');
	} else if (isEmpty(register_captcha_code)) {
		showToast('请输入图形验证码');
	} else if (isEmpty(register_email_code)) {
		showToast('请输入邮箱验证码');
	} else {
		hideChild('.dialog-register-step-one');
		showChild('.dialog-register-step-two');
		scrollIntoView('.dialog-register-step-two', 'end');
		setTimeout(function() {
			//scrollIntoView('.dialog-register-step-two', 'start');
		},
		200);
	}
});
//获取注册邀请码
$('.dialog-register-step-one-get-invitation-code-btn').on(click,
function(event) {
	var str = '新版云储已经开启邀请注册机制！你可以让你的好友登录云储后进入我的云储查看自己的专属邀请码。赶快让你的好友来分享他的邀请码给你注册云储吧~';
	if (!isYunChuApp()) {
		//dialog_register.close();
		//showAlert('如何获得邀请码？',str,'我知道了');
		openUrl('https://jq.qq.com/?_wv=1027&k=6BRhA9ZI', false);
	}
	sendYunChuAPP("getInvitCode", 0);
});
//注册对话框用户协议
$('.dialog-register-step-one-privacy-agreement-btn').on(click,
function(event) {
	if (!isYunChuApp()) {
		hideChild('.dialog-register-step-one');
		showChild('.dialog-register-privacy-agreement');
		addClass('.mc-register', 'mc-dialog-full');
		setChecked('.dialog-register-step-one-privacy-agreement-checkbox', false);
		scrollIntoView('.dialog-register-privacy-agreement-flag', 'start');
		setTimeout(function() {
			scrollIntoView('.dialog-register-privacy-agreement', 'start');
		},
		200);
		verification_countdown('.dialog-register-privacy-agreement-submit-btn', '同意', 60);
	}
	sendYunChuAPP("showPrivacyAgreement", 0);
});
//验证发送倒计时
function verification_countdown(selector, btn_text, countdown_second) {
	if (countdown_second == 0) {
		setEnabled(selector);
		setChildText(selector, btn_text);
		return false;
	} else {
		setDisabled(selector);
		setChildText(selector, countdown_second + 's');
		countdown_second--;
	}
	setTimeout(function() {
		verification_countdown(selector, btn_text, countdown_second);
	},
	1000);
};
//读完注册用户协议
$('.dialog-register-privacy-agreement-submit-btn').on(click,
function(event) {
	removeClass('.mc-register', 'mc-dialog-full');
	hideChild('.dialog-register-privacy-agreement');
	showChild('.dialog-register-step-one');
	setChecked('.dialog-register-step-one-privacy-agreement-checkbox', true);
	setTimeout(function() {
		dialog_register.open();
	},
	500);
	setCaptcha_code();
	showChild('.dialog-register-step-one-captcha-code');
});
//校检验证码
function checkCaptcha_code(input_code) {
	var isTrue = false;
	$.ajax({
		method: 'POST',
		async: false,
		url: 'https://wd.cn.ecsxs.com/api/v1/user/imagecode/?token=' + captcha_code_token + '&code=' + encodeURIComponent(input_code),
		success: function(data) {
			var json = JSON.parse(data);
			var json_state = json['state'];
			if (json_state == 200) {
				isTrue = true;
			}
		}
	});
	return isTrue;
};
//勾选用户协议
function setPrivacyAgreementCheckBox(bool) {
	setChecked('.dialog-register-step-one-privacy-agreement-checkbox', bool);
}
//用户协议勾选事件
$('.dialog-register-step-one-privacy-agreement-checkbox').on('change',
function(event) {
	if (getChecked('.dialog-register-step-one-privacy-agreement-checkbox')) {
		sendYunChuAPP("privacyAgreementCheckBox", '{"checked":true}');
	} else {
		sendYunChuAPP("privacyAgreementCheckBox", '{"checked":false}');
	}
});
//注册准备 验证
var register_token;
$('.dialog-register-step-one-send-email-btn').on(click,
function(event) {
	var register_invitation_code = getValue('.dialog-register-step-one-invitation-code-input');
	var register_email = getValue('.dialog-register-step-one-email-input');
	var register_privacy_agreement_checkbox = getChecked('.dialog-register-step-one-privacy-agreement-checkbox');
	var register_captcha_code = getValue('.dialog-register-step-one-captcha-code-input');
	if (!register_privacy_agreement_checkbox) {
		showToast('请先阅读用户协议');
	} else if (isEmpty(register_invitation_code)) {
		showToast('请输入邀请码');
	} else if (isEmpty(register_email)) {
		showToast('请输入邮箱');
	} else if (!isEmpty(register_email) && !isEmails(register_email)) {
		showToast('请输入正确的邮箱');
	} else if (isEmpty(register_captcha_code)) {
		showToast('请输入图形验证码');
	} else {
		if (checkCaptcha_code(register_captcha_code, captcha_code_token)) {
			$.ajax({
				method: 'POST',
				url: 'https://wd.cn.ecsxs.com/api/v1/user/code/',
				data: 'invitationcode=' + encodeURIComponent(register_invitation_code) + '&email=' + encodeURIComponent(register_email),
				success: function(data) {
					var json = JSON.parse(data);
					var json_state = json['state'];
					if (json_state == 200) {
						showToast('已发送，有效期为5分钟');
						register_token = json['token'];
					} else if (json_state == 205) {
						showToast('该邮箱已注册，如忘记密码请找回');
						dialog_register.close();
						dialog_login.open();
					} else {
						showToast(json['msg']);
					}
					verification_countdown('.dialog-register-step-one-send-email-btn', '发送验证码', 300);
				},
				error: function(msg) {
					showToast('发送失败');
				}
			});
		} else {
			setCaptcha_code();
			showToast('图形验证码错误');
		}
	}
});
//完善注册 提交
$('.dialog-register-step-two-submit-btn').on(click,
function(event) {
	var register_invitation_code = getValue('.dialog-register-step-one-invitation-code-input');
	var register_email = getValue('.dialog-register-step-one-email-input');
	var register_email_code = getValue('.dialog-register-step-one-email-code-input');
	var register_user_name = getValue('.dialog-register-step-two-username-input');
	var register_password_one = getValue('.dialog-register-step-two-password-one-input');
	var register_password_two = getValue('.dialog-register-step-two-password-two-input');
	var register_user_phone = getValue('.dialog-register-step-two-userphone-input');
	var register_user_qq = getValue('.dialog-register-step-two-userqq-input');
	if (isEmpty(register_user_name)) {
		showToast('请设置用户名');
	} else if (!isEmpty(register_user_name) && !checkUserName(register_user_name)) {
		showToast('用户名不少于5位并以字母开头');
	} else if (isEmpty(register_password_one)) {
		showToast('请设置密码');
	} else if (!isEmpty(register_password_one) && !checkPassword(register_password_one)) {
		showToast('密码不少于6位，须包含字母、数字');
	} else if (isEmpty(register_password_two)) {
		showToast('请再次输入确认密码');
	} else if (register_password_one != register_password_two) {
		showToast('两次输入的密码不一致');
	/*} else if (isEmpty(register_user_phone)) {
		showToast('请绑定手机号');*/
	} else if (!isEmpty(register_user_phone) && !isPhoneNum(register_user_phone)) {
		showToast('请输入正确的手机号');
	/*} else if (isEmpty(register_user_qq)) {
		showToast('请绑定QQ号');*/
	} else if (!isEmpty(register_user_qq) && !isQQNum(register_user_qq)) {
		showToast('请输入正确的QQ号');
	} else {
		$.ajax({
			method: 'POST',
			url: 'https://wd.cn.ecsxs.com/api/v1/user/register/?token=' + register_token,
			data: 'username=' + register_user_name + '&password=' + encodeURIComponent(register_password_two) + '&invitationcode=' + encodeURIComponent(register_invitation_code) + '&email=' + encodeURIComponent(register_email) + '&code=' + encodeURIComponent(register_email_code) + '&mobile=' + register_user_phone + '&qq=' + register_user_qq,
			success: function(data) {
				var json = JSON.parse(data);
				var json_state = json['state'];
				if (json_state == 200) {
					showToast('注册成功');
					if (!isYunChuApp()) {
						dialog_register.close();
						dialog_login.open();
					}
					sendYunChuAPP("registSuccess", 0);
				} else if (json_state == 204) {
					showToast('用户名已存在');
				} else if (json_state == 209) {
					showToast('邮箱验证码错误');
					hideChild('.dialog-register-step-two');
					showChild('.dialog-register-step-one');
				} else if (json_state == 241) {
					showToast('注册超时，验证码已过期，请刷新重试');
				} else {
					showToast(json['msg']);
				}
			},
			error: function(msg) {
				showToast('注册失败');
			}
		});
	}
});
//扫码登录返回账号登录
$('.dialog-login-scanQRcode-return-login-btn').on(click,
function(event) {
	dialog_return_login(0);
});
//账号登录返回扫码登录
$('.dialog-login-return-login-scanQRcode-btn').on(click,
function(event) {
	hideChild('.dialog-login');
	removeClass('.dialog-login-scanQRcode', 'mdui-hidden-xs-down');
	removeClass('.mc-login-scanQRcode-menu', 'mdui-menu-closing');
	setStyle('.mc-login', 'top:90.7px;height:553.6px');
	showChild('.dialog-login-scanQRcode');
});
//账号登录返回App登录
$('.dialog-login-applogin-btn').on(click,
function(event) {
	hideChild('.dialog-login');
	removeClass('.dialog-login-applogin', 'mdui-hidden-xs-down');
	removeClass('.mc-login-applogin-menu', 'mdui-menu-closing');
	setStyle('.mc-login', 'top:90.7px;height:553.6px');
	showChild('.dialog-login-applogin');
});
//返回登录
function dialog_return_login(type) {
	if (type == 0) {
		hideChild('.dialog-login-scanQRcode');
	} else {
		hideChild('.dialog-reset-password');
	}
	hideChild('.dialog-login-applogin');
	removeClass('.mc-login-menu', 'mdui-menu-closing');
	removeClass('.dialog-login', 'mdui-hidden-sm-up');
	setStyle('.mc-login', 'top:79.1px;height:571.8px');
	showChild('.dialog-login');
	scrollIntoView('.dialog-login', 'end');
	setTimeout(function() {
		//scrollIntoView('.dialog-login', 'start');
	},
	800);
};
//登录对话框
var failure = 0;
$('.dialog-login-btn').on(click,
function(event) {
	var login_username = getValue('.dialog-login-username-input');
	var login_password = getValue('.dialog-login-password-input');
	var login_captcha_code = getValue('.dialog-login-captcha-code-input');
	var login_3_days = getChecked('.dialog-login-3-day-login-checkbox');
	if (isEmpty(login_username)) {
		showToast('请输入账号');
	} else if (isEmpty(login_password)) {
		showToast('请输入密码');
	} else if (failure == 1 && isEmpty(login_captcha_code)) {
		showToast('请输入图形验证码');
	} else {
		if (failure >= 1 && !isEmpty(login_captcha_code) && !checkCaptcha_code(login_captcha_code)) {
			setCaptcha_code();
			showToast('图形验证码错误');
		} else {
			var login_type = 'login/';
			var login_method = 'username=' + login_username;
			var login_date = 3600;
			if (isEmails(login_username)) {
				login_type = 'emaillogin/';
				login_method = 'email=' + login_username;
			}
			if (login_3_days) {
				login_date = 259199;
			}
			$.ajax({
				method: 'POST',
				url: 'https://wd.cn.ecsxs.com/api/v1/user/' + login_type,
				data: login_method + '&password=' + encodeURIComponent(login_password) + '&date=' + login_date,
				headers: yc_app_ajax_header,
				crossDomain: true,
				success: function(data) {
					var json = JSON.parse(data);
					var json_state = json['state'];
					if (json_state == 200) {
						var json_username = json['data']['username'];
						var json_token = json['data']['token'];
						setCookie('yunchu', json_token, login_date); 
						setCookie('user_name', json_username, login_date);
						setCookie('user_token', json_token, login_date);
						showToast('欢迎回来，' + json_username);
						dialog_login.close();
						locaUrl('./home/#' + getHash(), true);
					} else {
						showToast(json['msg']);
						failure++;
						if (failure >= 1) {
							setCaptcha_code();
							showChild('.dialog-login-captcha-code');
						}
					}
				},
				error: function(msg) {
					showToast('登录失败');
				}
			});
		}
	}
});
//刷新登录二维码
$('.dialog-login-scanQRcode-step-refresh-btn').on(click,
function(event) {
	refreshQRcode();
});
//重置密码对话框
$('.dialog-reset-password-btn').on(click,
function(event) {
	hideChild('.dialog-login');
	hideChild('.dialog-login-scanQRcode');
	hideChild('.dialog-login-applogin');
	setStyle('.mc-login', 'top:63.4px;height:603.2px');
	setCaptcha_code();
	showChild('.dialog-reset-password');
	scrollIntoView('.dialog-reset-password-step', 'end');
});
//重置密码输入邮箱
$('.dialog-reset-password-email-input').on('keyup',
function(event) {
	if (isEmails(event['srcElement'].value)) {
		showChild('.dialog-reset-password-captcha-code');
	}
});
//找回用户名
$('.dialog-reset-password-retrieve-email-btn').on(click,
function(event) {
	var reset_password_email = getValue('.dialog-reset-password-email-input');
	var login_captcha_code = getValue('.dialog-reset-password-captcha-code-input');
	if (isEmpty(reset_password_email)) {
		showToast('请先输入邮箱');
	} else if (!isEmpty(reset_password_email) && !isEmails(reset_password_email)) {
		showToast('请输入正确的邮箱');
	} else if (failure == 1 && isEmpty(login_captcha_code)) {
		showToast('请输入图形验证码');
	} else {
		if (checkCaptcha_code(login_captcha_code)) {
			$.ajax({
				method: 'POST',
				url: 'https://wd.cn.ecsxs.com/api/v1/user/code/',
				data: 'type=retrieve&email=' + encodeURIComponent(reset_password_email),
				success: function(data) {
					var json = JSON.parse(data);
					var json_state = json['state'];
					if (json_state == 200) {
						setDisabled('.dialog-reset-password-retrieve-email-btn');
						verification_countdown('.dialog-reset-password-retrieve-email-btn', '已经忘记？', 300);
						verification_countdown('.dialog-reset-password-send-email-btn', '发送验证码', 300);
						showToast('用户名已发送到你的邮箱');
					} else {
						showToast(json['msg']);
					}
				},
				error: function(msg) {
					showToast('发送失败');
				}
			});
		} else {
			setCaptcha_code();
			showToast('图形验证码错误');
		}
	}
});
var reset_password_token;
//重置密码 验证
$('.dialog-reset-password-send-email-btn').on(click,
function(event) {
	var reset_password_email = getValue('.dialog-reset-password-email-input');
	var reset_password_username = getValue('.dialog-reset-password-username-input');
	var login_captcha_code = getValue('.dialog-reset-password-captcha-code-input');
	if (isEmpty(reset_password_email)) {
		showToast('请输入邮箱');
	} else if (!isEmpty(reset_password_email) && !isEmails(reset_password_email)) {
		showToast('请输入正确的邮箱');
	} else if (isEmpty(reset_password_username)) {
		showToast('请输入用户名');
	} else if (failure == 3 && isEmpty(login_captcha_code)) {
		showToast('请输入图形验证码');
	} else {
		if (checkCaptcha_code(login_captcha_code)) {
			$.ajax({
				method: 'POST',
				url: 'https://wd.cn.ecsxs.com/api/v1/user/code/',
				data: 'type=reset&username=' + encodeURIComponent(reset_password_username) + '&email=' + encodeURIComponent(reset_password_email),
				success: function(data) {
					var json = JSON.parse(data);
					var json_state = json['state'];
					if (json_state == 200) {
						showToast('已发送，有效期为5分钟');
						reset_password_token = json['token'];
						verification_countdown('.dialog-reset-password-retrieve-email-btn', '已经忘记？', 300);
						verification_countdown('.dialog-reset-password-send-email-btn', '发送验证码', 300);
					} else {
						showToast(json['msg']);
					}
				},
				error: function(msg) {
					showToast('发送失败');
				}
			});
		} else {
			setCaptcha_code();
			showToast('图形验证码错误');
		}
	}
});
//重置密码 提交
$('.dialog-reset-password-submit-btn').on(click,
function(event) {
	var reset_password_email = getValue('.dialog-reset-password-email-input');
	var reset_password_username = getValue('.dialog-reset-password-username-input');
	var reset_password_email_code = getValue('.dialog-reset-password-email-code-input');
	var reset_password_captcha_code = getValue('.dialog-reset-password-captcha-code-input');
	if (isEmpty(reset_password_email)) {
		showToast('请输入邮箱');
	} else if (!isEmpty(reset_password_email) && !isEmails(reset_password_email)) {
		showToast('请输入正确的邮箱');
	} else if (isEmpty(reset_password_username)) {
		showToast('请输入用户名');
	} else if (isEmpty(reset_password_captcha_code)) {
		showToast('请输入图形验证码');
	} else if (isEmpty(reset_password_email_code)) {
		showToast('请输入邮箱验证码');
	} else {
		$.ajax({
			method: 'POST',
			url: 'https://wd.cn.ecsxs.com/api/v1/user/resetpassword/?token=' + reset_password_token,
			data: 'username=' + encodeURIComponent(reset_password_username) + '&email=' + encodeURIComponent(reset_password_email) + '&code=' + encodeURIComponent(reset_password_email_code),
			success: function(data) {
				var json = JSON.parse(data);
				var json_state = json['state'];
				if (json_state == 200) {
					showToast('密码已发送到你的邮箱');
					dialog_return_login(1);
					if (isYunChuApp()) {
						sendYunChuAPP("resetFinish", 0);
					}
				} else {
					showToast(json['msg']);
				}
			},
			error: function(msg) {
				showToast('发送失败');
			}
		});
	}
});
//重置密码返回登录对话框
$('.dialog-reset-password-return-login-btn').on(click,
function(event) {
	if (isYunChuApp()) {
		sendYunChuAPP("resetBack", 0);
	} else {
		dialog_return_login(1);
	}
});
//注册对话框用户协议滚动
function dialog_register_privacy_agreement_onscroll(obj) {
	var dialog_register_privacy_agreement_toolbar_title = setQuerySelector('.dialog-register-privacy-agreement-toolbar-title');
	if (obj.scrollTop > 137) {
		removeClass('.dialog-register-privacy-agreement-toolbar', 'mc-dialog-toolbar');
		dialog_register_privacy_agreement_toolbar_title.style.opacity = 1;
		dialog_register_privacy_agreement_toolbar_title.style.transform = 'translateY(0)';
	} else {
		addClass('.dialog-register-privacy-agreement-toolbar', 'mc-dialog-toolbar');
		dialog_register_privacy_agreement_toolbar_title.style.opacity = Number(((0.019230769230769232 * obj.scrollTop) - 1.5384615384615385).toFixed(1));
		dialog_register_privacy_agreement_toolbar_title.style.transform = 'translateY(' + Math.abs(((0.7884615384615384 * obj.scrollTop) + ( - 104.07692307692308)).toFixed(2)) + 'px)';
	}
};//