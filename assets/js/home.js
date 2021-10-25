/*用户页逻辑*/
//
var document_totals = 0;
var document_total_pages = 1;
var document_total_perpage = 0;
var white_list_web_notice = [208153];
var white_list_web_friend = [208150];
var white_list_web_support = [207250,207269];
var white_list_app_update = [207364,491,207363];
var white_list = white_list_web_support.concat(white_list_app_update).concat(white_list_web_friend).concat(white_list_web_notice);
var isInvitCode;
var yc_app_ajax_header = {'app':'true'};
if (!isYunChuApp()) {
yc_app_ajax_header = {};
} else {
	setStyle('.drawer-background','height: 25%!important;');
}
window.onload = function() {
/*if (!isYunChuApp()) {
  //初始化主题
  if (getLocalStorage('theme') == 'dark') {
    setNightTheme();
  } else {
    setLightTheme();
  }
  }*/
  if (isEmpty(getCookie('user_token')) || isEmpty(getCookie('user_name'))) {
	  sendYunChuAPP("noLogin",0);
	showToast('请先登录');
	removeLogin_back();
} else {
	if (getCookie('user_name') == 'require' ||getCookie('user_name') == '0047ol' || getCookie('user_name') == 'Jesse205' || getCookie('user_name') == '318118088') {
		showChild('.drawer-list-item-admin-list');
	}
	show_loading();
  if (getHash() == 'file') {
	  setHeadTitle('我的文件');
	  setChildText('.web-title','我的文件');
    files_click();
  } else if (getHash() == 'app') {
	  setHeadTitle('我的应用');
	  setChildText('.web-title','我的应用');
    application_click();
  } else if (getHash() == 'user') {
	  setHeadTitle('我的云储');
	  setChildText('.web-title','我的云储');
    user_click();
	userlist();
  } else if (getHash() == 'img') {
	  setHeadTitle('我的图片');
	  setChildText('.web-title','我的图片');
    images_click();
  } else if (getHash() == 'admin') {
	   setHeadTitle('管理云储');
	  setChildText('.web-title','管理云储');
	  admin_click();
  } else if (getHash() == 'recycle') {
	  setHeadTitle('回收站');
	  setChildText('.web-title','回收站');
	  setChildText('.content-document-content-list','');
	  textlist(1);
	  hideChild('.content-document-content-top-other');
  recycle_click();
  showChild('.content-recycle-list-top-tips');
  addClass('.content-document-list','recycle-list-padding-top');
  addClass('.mdui-appbar-fixed','content-top-tips-box-shadow');
  } else {
	  setHeadTitle('我的文档');
	  setChildText('.web-title','我的文档');
    document_click();
	removeClass('.content-document-list-create-btn','mdui-fab-hide');
	showChild('.content-document-content-top-other');
	textlist(0);
	if (isEmpty(getHash())) {
		locaHash('text');
	}
  }
  userlist();
};
if (isYunChuApp()) {
showChild('.menu-toolbar-setting');
hideChild('.copyright');
hideChild('.content-user-list-yiyan-div');
hideChild('.content-user-list-user-info-delete-account');
hideChild('.content-user-list-user-regist-date');
hideChild('.content-user-list-login-log-more');
}
};
document.addEventListener("visibilitychange", function() {
	if (!document.hidden) {
		document.title = document.title.replace('(已离开)','');
	} else {
		document.title += '(已离开)';
	}
});
document.querySelector('.mc-drawer').addEventListener('open.mdui.drawer', function () {
  sendYunChuAPP("openDrawer",0);
});
document.querySelector('.mc-drawer').addEventListener('closed.mdui.drawer', function () {
  sendYunChuAPP("closeDrawer",0);
});
document.querySelector('.content-document-edit-dialog').addEventListener('open.mdui.dialog', function () {
  sendYunChuAPP("openEditDlg",0);
});
document.querySelector('.content-document-edit-dialog').addEventListener('closed.mdui.dialog', function () {
  sendYunChuAPP("closeEditDlg",0);
});
document.querySelector('.login-log-more-dialog').addEventListener('open.mdui.dialog', function () {
  sendYunChuAPP("openLoginLogDlg",0);
});
document.querySelector('.login-log-more-dialog').addEventListener('closed.mdui.dialog', function () {
  sendYunChuAPP("closeLoginLogDlg",0);
});
function setNightTheme(){
	setCookie('theme','dark',0);
	setChildText('.toolbar-btn-theme-icon','brightness_7');
    addClass('body','mdui-theme-layout-dark');
	toggleClass('.content-loading','mdui-color-grey-50 mdui-color-grey-800');
}
function setLightTheme(){
	setCookie('theme','light',0);
	setChildText('.toolbar-btn-theme-icon','brightness_4');
    removeClass('body','mdui-theme-layout-dark');
}
//切换主题
function switchTheme() {
  if (getCookie('theme') == 'dark') {
    //setLocalStorage('theme', 'light');
	setCookie('theme','light',0);
    setChildText('.toolbar-btn-theme-icon','brightness_4');
  } else {
    //setLocalStorage('theme', 'dark');
	setCookie('theme','dark',0);
    setChildText('.toolbar-btn-theme-icon','brightness_7');
  }
  toggleClass('body','mdui-theme-layout-dark');
  toggleClass('footer','mdui-color-grey-50 mdui-color-grey-800');
  toggleClass('.content-loading','mdui-color-grey-50 mdui-color-grey-800');
};
//切换主题
$('.toolbar-btn-theme').on('click',function(event) {
  switchTheme();
  sendYunChuAPP("theme",0);
});
//接口文档
$('.drawer-list-item-doc-list').on('click',function(event) {
  if (!isYunChuApp()) {
		openUrl('../doc/?from=home&time=' + getTimeStamp() + '#' + getHash(),false);
	}
	sendYunChuAPP("doc",0);
});
//支持云储
$('.drawer-list-item-support-list').on('click',function(event) {
  if (!isYunChuApp()) {
		openUrl('../support/?from=home&time=' + getTimeStamp() + '#' + getHash(),false);
	}
	sendYunChuAPP("support",0);
});
//关于云储
$('.drawer-list-item-about-list').on('click',function(event) {
  if (!isYunChuApp()) {
		locaUrl('../?from=home&time=' + getTimeStamp() + '#' + getHash(),false);
	}
	sendYunChuAPP("about",0);
});
//打开搜索
$('.toolbar-btn-search').on('click',function(event) {
  open_search();
});
//打开搜索
function open_search() {
    addClass('.toolbar-btn-more','mdui-hidden-xs-down');
    addClass('.toolbar-btn-theme','mdui-hidden-xs-down');
    addClass('.web-title','mdui-hidden-xs-down');
    addClass('.toolbar-btn-menu','mdui-hidden-xs-down');
    hideChild('.content-document-content');
    showChild('.content-document-search');
    addClass('.content-document-list-create-btn','mdui-fab-hide');
	sendYunChuAPP("openSearch",0);
}
//关闭搜索
$('.toolbar-btn-close-search').on('click',function(event) {
	close_search();
});
//关闭搜索
function close_search() {
	removeClass('.toolbar-btn-more','mdui-hidden-xs-down');
	removeClass('.toolbar-btn-theme','mdui-hidden-xs-down');
    removeClass('.web-title','mdui-hidden-xs-down');
    removeClass('.toolbar-btn-menu','mdui-hidden-xs-down');
    removeClass('.toolbar-search-btn','mdui-textfield-expanded');
    hideChild('.content-document-search');
	showChild('.content-document-content');
	removeClass('.content-document-list-create-btn','mdui-fab-hide');
	sendYunChuAPP("closeSearch",0);
}
//搜索触发
$('.toolbar-search-btn input').on('keyup',function(event) {
	search_textlist(event['srcElement']['value']);
});
//搜索文档逻辑
function search_textlist(search_content) {
  $.ajax({
    method: 'POST',
    url: 'https://wd.cn.ecsxs.com/api/v1/text/search/?username=' + getCookie('user_name') + '&page=' + document_total_pages + '&perpage=100&sortname=update&sort=down&token=' + getCookie('user_token') + '&content=' + search_content + '&type=all',
    headers: yc_app_ajax_header,
    success: function(data) {
      var json = JSON.parse(data);
	  var json_state = json['state'];
	  var search_textlist = '';
      if (json_state == 200) {
        var items = json['data']['items'];
        for (var key in items) {
          var document_author = items[key]['author'];
          var create_time = items[key]['create'];
          var document_desc = items[key]['desc'];
          var is_hide = items[key]['hide'];
          var is_html = items[key]['html'];
		  var document_pwd = items[key]['password'];
          var document_id = items[key]['id'];
          var modifications = items[key]['modify'];
          var modify_time = items[key]['modify_time'];
          var view_frequency = items[key]['read'];
          var document_title = items[key]['title'];
		  var document_total = json['data']['total'];
		  var document_key = items[key]['text-key'];
		  var modify_time = stampToDate(modify_time,false);
		  var hide_msg = '是';
		  var html_msg = '是';
		   var is_review = items[key]['review'];
		  if (isEmpty(is_hide)) {
    tag_hide = ' mdui-hidden';
    hide_msg = '否';
	tag_is_hide = '';
  }
  if (isEmpty(is_html)) {
    tag_html = ' mdui-hidden';
    html_msg = '否';
    tag_is_html = '';
  }
  if (isEmpty(document_pwd)) {
    document_pwd = '未设置';
	tag_lock = ' mdui-hidden';
  }
  if (isEmpty(document_key)) {
    document_key = '未启用';
  }
          search_textlist += '<li class="mdui-list-item mdui-ripple" onclick="card_document_info(0,3,\'' + document_author + '\',\'' + create_time + '\',\'' + hide_msg + '\',\'' + html_msg + '\',\'' + document_id + '\',\'' + modifications + '\',\'' + modify_time + '\',\'' + document_pwd + '\',\'' + view_frequency + '\',\'' + document_key + '\',\'' + document_title + '\',' + is_review + ');"><div class="mdui-list-item-content"><div class="mdui-list-item-title mdui-list-item-one-line">' + document_title + '（ID：' + document_id + '）</div><div class="mdui-list-item-text">最后修改于' + modify_time + '</div></div>' + view_frequency + '次浏览</li>';
		}
		setChildHtml('.content-document-search-list',search_textlist);
		if (isEmpty(items) || document_total == 0) {
			hideChild('.content-document-search-list');
			showChild('.content-document-search-list-tips');
		} else {
			hideChild('.content-document-search-list-tips');
			showChild('.content-document-search-list');
		}
      } else {
        //showToast(json['msg']);
		setChildHtml('.content-document-search-list','');
		hideChild('.content-document-search-list');
		showChild('.content-document-search-list-tips');
      }
    },
    error: function(msg) {
      showToast('获取失败');
    }
  });
};
//退出登录
$('.menu-toolbar-logout').on('click',function(event) {
	if (!isYunChuApp()) {
	showSnackbar('确定退出当前账号？',function(){
		logout();
	});
	}
	sendYunChuAPP("logout",0);
});
//打开设置
$('.menu-toolbar-setting').on('click',function(event) {
	sendYunChuAPP("setting",0);
});
function logout(){
	$.ajax({
			method: 'POST',
			url: 'https://wd.cn.ecsxs.com/api/v1/user/logout/?username=' + getCookie('user_name') + '&token=' + getCookie('user_token'),
			headers: yc_app_ajax_header,
			success: function(data) {
				var json = JSON.parse(data);
				var json_state = json['state'];
				if (json_state == 200) {
					showToast('已退出');
					sendYunChuAPP("logout",0);
				} else {
					showToast(json['msg']);
				};
				removeLogin_back();
			},
			error: function(msg) {
				showToast('退出失败');
			}
	});
}
//创建文档dialog
var content_document_edit_dialog = new mdui.Dialog('.content-document-edit-dialog', {
  history: false
});
//文档详情dialog
var content_document_info_dialog = new mdui.Dialog('.content-document-info-dialog', {
  history: false
});
//修改密码dialog
var content_user_list_user_info_change_pwd_dlg = new mdui.Dialog('.content-user-list-user-info-change-pwd-dlg', {
  history: false
});
//登录日志dialog
var content_user_list_login_more_full_dlg = new mdui.Dialog('.login-log-more-dialog', {
  history: false
});
function closeLoginLogDlg() {
	content_user_list_login_more_full_dlg.close();
}
//登录失效
function login_invalid(state) {
	if (state == 228 || state == 229 || state == 230) {
		removeLogin_back();
		sendYunChuAPP("loginFailure",0);
	}
};
//删除返回首页
function removeLogin_back() {
  removeCookie('user_name');
  removeCookie('user_token');
  if (!isYunChuApp()) {
  locaUrl('../?action=login&from=home#' + getHash(),true);
  showToast('登录已失效');
  }
};
//显示加载
function show_loading() {
  showChild('.content-loading');
  //$.lockScreen();
  document.body.style.width = '100%';
  document.body.style.height = '100%';
  document.body.style.position = 'fixed';
};
//隐藏加载
function hide_loading() {
  hideChild('.content-loading');
  //$.unlockScreen();
  document.body.style.width = '';
  document.body.style.height = '';
  document.body.style.position = '';
};
/*侧滑项目点击*/
//文档
$('.drawer-list-item-document-list').on('click',function(event) {
	document_totals = 0;
	document_total_pages = 1;
	document_total_perpage = 0;
  setChildText('.content-document-content-list','');
  hideChild('.content-document-list-tips');
  showChild('.content-document-content-top-other');
  show_loading();
  textlist(0);
  document_click();
  locaHash('text');
  removeClass('.content-document-list-create-btn','mdui-fab-hide');
  setChildText('.web-title','我的文档');
  setHeadTitle('我的文档');
  hideChild('.content-recycle-list-top-tips');
  removeClass('.content-document-list','recycle-list-padding-top');
  removeClass('.mdui-appbar-fixed','content-top-tips-box-shadow');
});
//文件
$('.drawer-list-item-files-list').on('click',function(event) {
  files_click();
  locaHash('file');
  close_search();
  addClass('.content-document-list-create-btn','mdui-fab-hide');
  setChildText('.web-title','我的文件');
  setHeadTitle('我的文件');
  hideChild('.content-recycle-list-top-tips');
  removeClass('.content-document-list','recycle-list-padding-top');
  removeClass('.mdui-appbar-fixed','content-top-tips-box-shadow');
});
//图片
$('.drawer-list-item-images-list').on('click',function(event) {
  images_click();
  locaHash('img');
  close_search();
  addClass('.content-document-list-create-btn','mdui-fab-hide');
  setChildText('.web-title','我的图片');
  setHeadTitle('我的图片');
  hideChild('.content-recycle-list-top-tips');
  removeClass('.content-document-list','recycle-list-padding-top');
  removeClass('.mdui-appbar-fixed','content-top-tips-box-shadow');
});
//应用
$('.drawer-list-item-application-list').on('click',function(event) {
  application_click();
  locaHash('app');
  close_search();
  addClass('.content-document-list-create-btn','mdui-fab-hide');
  setChildText('.web-title','我的应用');
  setHeadTitle('我的应用');
  hideChild('.content-recycle-list-top-tips');
  removeClass('.content-document-list','recycle-list-padding-top');
  removeClass('.mdui-appbar-fixed','content-top-tips-box-shadow');
});
//回收站
$('.drawer-list-item-recycle-list').on('click',function(event) {
  setChildText('.content-document-content-list','');
  hideChild('.content-document-list-tips');
  hideChild('.content-document-content-top-other');
  show_loading();
  document_totals = 0;
  document_total_pages = 1;
	document_total_perpage = 0;
  textlist(1);
  recycle_click();
  locaHash('recycle');
  close_search();
  addClass('.content-document-list-create-btn','mdui-fab-hide');
  setChildText('.web-title','回收站');
  setHeadTitle('回收站');
  showChild('.content-recycle-list-top-tips');
  addClass('.content-document-list','recycle-list-padding-top');
  addClass('.mdui-appbar-fixed','content-top-tips-box-shadow');
});
$('.drawer-list-item-admin-list').on('click',function(event) {
  admin_click();
  close_search();
  locaHash('admin');
  addClass('.content-document-list-create-btn','mdui-fab-hide');
  setChildText('.web-title','管理云储');
  setHeadTitle('管理云储');
  hideChild('.content-recycle-list-top-tips');
  removeClass('.content-document-list','recycle-list-padding-top');
  removeClass('.mdui-appbar-fixed','content-top-tips-box-shadow');
});
//个人
$('.drawer-list-item-user-list').on('click',function(event) {
	show_loading();
  userlist(0);
  user_click();
  locaHash('user');
  close_search();
  addClass('.content-document-list-create-btn','mdui-fab-hide');
  setChildText('.web-title','我的云储');
  setHeadTitle('我的云储');
  hideChild('.content-recycle-list-top-tips');
  removeClass('.content-document-list','recycle-list-padding-top');
  removeClass('.mdui-appbar-fixed','content-top-tips-box-shadow');
});
var document_content_list_sortname = getLocalStorage('document_content_list_sortname');
var document_content_list_sortactoin = getLocalStorage('document_content_list_sortactoin');
//根据标题排序
$('.document-content-list-sortname-title-btn').on('click',function(event) {
	document_content_list_sortname = 'title';
	setLocalStorage('document_content_list_sortname','title');
	removeClass('.document-content-list-sortname-customid-btn','mdui-btn-active');
	removeClass('.document-content-list-sortname-update-btn','mdui-btn-active');
	addClass('.document-content-list-sortname-title-btn','mdui-btn-active');
	setChildText('.content-document-content-list','');
					show_loading();
					document_totals = 0;
					document_total_pages = 1;
	document_total_perpage = 0;
					textlist(0);
});
//根据ID排序
$('.document-content-list-sortname-customid-btn').on('click',function(event) {
	document_content_list_sortname = 'customid';
	setLocalStorage('document_content_list_sortname','customid');
	removeClass('.document-content-list-sortname-title-btn','mdui-btn-active');
	removeClass('.document-content-list-sortname-update-btn','mdui-btn-active');
	addClass('.document-content-list-sortname-customid-btn','mdui-btn-active');
	setChildText('.content-document-content-list','');
					show_loading();
					document_totals = 0;
					document_total_pages = 1;
	document_total_perpage = 0;
					textlist(0);
});
//根据时间排序
$('.document-content-list-sortname-update-btn').on('click',function(event) {
	document_content_list_sortname = 'update';
	setLocalStorage('document_content_list_sortname','update');
	removeClass('.document-content-list-sortname-title-btn','mdui-btn-active');
	removeClass('.document-content-list-sortname-customid-btn','mdui-btn-active');
	addClass('.document-content-list-sortname-update-btn','mdui-btn-active');
	setChildText('.content-document-content-list','');
					show_loading();
					document_totals = 0;
					document_total_pages = 1;
	document_total_perpage = 0;
					textlist(0);
});
//排序升序
$('.document-content-list-sort-rise-btn').on('click',function(event) {
	document_content_list_sortactoin = 'rise';
	setLocalStorage('document_content_list_sortactoin','rise');
	removeClass('.document-content-list-sort-down-btn','mdui-btn-active');
	addClass('.document-content-list-sort-rise-btn','mdui-btn-active');
	setChildText('.content-document-content-list','');
					show_loading();
					document_totals = 0;
					document_total_pages = 1;
	document_total_perpage = 0;
					textlist(0);
});
//排序降序
$('.document-content-list-sort-down-btn').on('click',function(event) {
	document_content_list_sortactoin = 'down';
	setLocalStorage('document_content_list_sortactoin','down');
	removeClass('.document-content-list-sort-rise-btn','mdui-btn-active');
	addClass('.document-content-list-sort-down-btn','mdui-btn-active');
	setChildText('.content-document-content-list','');
					show_loading();
					document_totals = 0;
					document_total_pages = 1;
	document_total_perpage = 0;
					textlist(0);
});
if (document_content_list_sortname == 'title'){
	removeClass('.document-content-list-sortname-customid-btn','mdui-btn-active');
	removeClass('.document-content-list-sortname-update-btn','mdui-btn-active');
	addClass('.document-content-list-sortname-title-btn','mdui-btn-active');
}else if(document_content_list_sortname == 'customid'){
	removeClass('.document-content-list-sortname-title-btn','mdui-btn-active');
	removeClass('.document-content-list-sortname-update-btn','mdui-btn-active');
	addClass('.document-content-list-sortname-customid-btn','mdui-btn-active');
}else if(document_content_list_sortname == 'update'){
	removeClass('.document-content-list-sortname-title-btn','mdui-btn-active');
	removeClass('.document-content-list-sortname-customid-btn','mdui-btn-active');
	addClass('.document-content-list-sortname-update-btn','mdui-btn-active');
}
if (document_content_list_sortactoin == 'rise'){
	removeClass('.document-content-list-sort-down-btn','mdui-btn-active');
	addClass('.document-content-list-sort-rise-btn','mdui-btn-active');
}else if(document_content_list_sortactoin == 'down'){
	removeClass('.document-content-list-sort-rise-btn','mdui-btn-active');
	addClass('.document-content-list-sort-down-btn','mdui-btn-active');
}
if (isEmpty(document_content_list_sortname)){
	document_content_list_sortname = 'update';
}
if (isEmpty(document_content_list_sortactoin)){
	document_content_list_sortactoin = 'down';
}
//我的文档点击
function document_click() {
  hideChild('.content-files-list');
  hideChild('.content-application-list');
  hideChild('.content-user-list');
  showChild('.content-document-list');
  hideChild('.content-images-list');
  hideChild('.content-admin-list');
  showChild('.toolbar-search-btn');
  addClass('.drawer-list-item-document-list','mdui-list-item-active');
  removeClass('.drawer-list-item-files-list','mdui-list-item-active');
  removeClass('.drawer-list-item-application-list','mdui-list-item-active');
  removeClass('.drawer-list-item-user-list','mdui-list-item-active');
  removeClass('.drawer-list-item-images-list','mdui-list-item-active');
  removeClass('.drawer-list-item-recycle-list','mdui-list-item-active');
  removeClass('.drawer-list-item-admin-list','mdui-list-item-active');
};
//获取文档逻辑
function textlist(type) {
	var cust_rep = 'text/textlist/?username=' + getCookie('user_name') + '&page=' + document_total_pages + '&perpage=100&sortname=' + document_content_list_sortname + '&sort=' + document_content_list_sortactoin + '&token=' + getCookie('user_token');
	if(type == 1){
		cust_rep = cust_rep + '&recycle=recycle';
	}else if(type == 2){
		cust_rep = 'report/reportlist.php/';
	}
  $.ajax({
    method: 'POST',
    url: 'https://wd.cn.ecsxs.com/api/v1/' + cust_rep,
    headers: yc_app_ajax_header,
    success: function(data) {
      var json = JSON.parse(data);
	  var json_state = json['state'];
      if (json_state == 200) {
		setChildText('.content-user-list-yiyan',json['data']['word']);
        var items = json['data']['items'];
        for (var key in items) {
          var document_author = items[key]['author'];
          var create_time = items[key]['create'];
          var document_desc = items[key]['desc'];
		  var is_review = items[key]['review'];
          var is_hide = items[key]['hide'];
          var is_html = items[key]['html'];
          var document_id = items[key]['id'];
          var modifications = items[key]['modify'];
          var modify_time = items[key]['modify_time'];
          var document_pwd = items[key]['password'];
          var view_frequency = items[key]['read'];
          var document_key = items[key]['text-key'];
          var document_title = items[key]['title'];
          var url_text = items[key]['url-text'];
		  var document_total = json['data']['total'];
		 //if (white_list.indexOf(parseInt(document_id)) == -1){
			  appendDocumentList(type,document_author, create_time, document_desc, is_review, is_hide, is_html, document_id, modifications, modify_time, document_pwd, view_frequency, document_key, document_title, url_text);
		 //};
		}
		hide_loading(json_state);
		sendYunChuAPP("onload",0);
		if (isEmpty(items)) {
			showChild('.content-document-list-tips');
		} else {
			showChild('.content-document-content');
			showChild('.content-document-content-list');
			if (document_total > 100) {
				document_total_pages = document_total_pages + 1;
			}
		}
		if (document_total_pages == 1) {
			document_total_perpage = items.length;
		} else {
			document_total_perpage = document_total_perpage + items.length;
		}
		document_totals = document_total;
      } else {
        //showToast(json['msg']);
        login_invalid(json_state);
      }
    },
    error: function(msg) {
      showToast('获取失败');
    }
  });
};
//追加文档列表
function appendDocumentList(type,document_author, create_time, document_desc, is_review, is_hide, is_html, document_id, modifications, modify_times, document_pwd, view_frequency, document_key, document_title, url_text) {
  var document_desc = HtmlDecode(trim(document_desc));
  var modify_time = stampToDate(modify_times,true);
  var tag_hide = '';
  var hide_msg = '是';
  var tag_html = '';
  var html_msg = '是';
  var tag_lock = '';
  var tag_locks = ' mdui-hidden';
  var tag_new = ' mdui-hidden';
  var tag_is_html = ' mdui-hidden';
  var tag_is_hide = ' mdui-hidden';
  var copy_type = 0;
  var tag_is_review = '';
  var tag_review = ' mdui-hidden';
  if (isEmpty(is_hide) && isEmpty(is_review)) {
	 if (!isEmpty(is_html) && isEmpty(document_pwd)) {
	  copy_type = 2;
	 } else if (isEmpty(is_html) && !isEmpty(document_pwd)) {
	  copy_type = 3;
	 } else if (!isEmpty(is_html) && !isEmpty(document_pwd)) {
	  copy_type = 4;
	 }
  } else {
	  copy_type = 1;
  }
  if (!isEmpty(is_review)) {
	  tag_is_review = ' mdui-hidden';
	  tag_review = '';
  }
  if (isEmpty(is_html)) {
    tag_html = ' mdui-hidden';
    html_msg = '否';
    tag_is_html = '';
  } 
  if (isEmpty(document_pwd)) {
    document_pwd = '未设置';
	tag_lock = ' mdui-hidden';
	tag_locks = '';
  } 
  if (isEmpty(is_hide)) {
    tag_hide = ' mdui-hidden';
    hide_msg = '否';
	tag_is_hide = '';
  }
  if (isSameDay(modify_time)) {
    tag_new = '';
  }
  if (isEmpty(document_key)) {
    document_key = '未启用';
  }
  var subtext = '<i class="mdui-icon material-icons mdui-text-color-theme-icon subtitle-icon-text">visibility</i>&nbsp;' + view_frequency + '次浏览&nbsp;&nbsp;•&nbsp;&nbsp;创建于' + modify_time.slice(0,16).replace(new Date().getFullYear() + '-','');
  var btn_onClick = 'card_document_edit(' + document_id + ');';
  var btn_text = '编辑';
  var recycle_hide = '';
  var recycle_is_day = ' mdui-hidden';
  if (type == 1) {
	  btn_text = '恢复';
	  recycle_hide = ' mdui-hidden';
	  btn_onClick = 'card_document_delete(' + type + ',' + document_id + ',1);';
	  var _Dates = new Date(modify_times*1000);
_Dates.setDate(_Dates.getDate() + 30);
var day_2 = _Dates.getTime();
var is_days = parseInt(Math.abs(day_2-new Date().getTime())/1000/60/60/24);
	  subtext = '距离删除还剩余' + is_days + '天';
	  if (is_days <= 1) {
		  recycle_is_day = '';
	  }
  }
  var isxtime = getTimer(modify_time);
  var isxtime_tag = ' mdui-hidden';
  if (!isEmpty(isxtime)) {
	  isxtime_tag = '';
  }
  var document_list = '<div class="mdui-container mdui-col" id="textlist_' + document_id + '"><div class="mdui-card mdui-hoverable card-show"><div class="mdui-card-header"><div class="mdui-card-menu"><button class="mdui-btn mdui-btn-icon mdui-btn-dense mdui-text-color-theme-icon' + tag_is_hide + recycle_hide + tag_is_review + '" mdui-tooltip="{content:\'复制链接\',delay:500}" onclick="openCardMenu(\'#document_list_' + document_id + '_copy_button\',\'#document_list_' + document_id + '_menu\',\'' + url_text + '\',' + document_id + ',' + copy_type + ');" id="document_list_' + document_id + '_copy_button"><i class="mdui-icon material-icons icon-dense">content_copy</i></button><ul class="mdui-menu" id="document_list_' + document_id + '_menu"><li class="mdui-menu-item"><a href="javascript:card_document_copy_url(\'html\');" class="mdui-ripple' + tag_html + ' clipboard-copy" data-clipboard-text="' + url_text + document_id + '.html">HTML网页</a><a href="javascript:card_document_copy_url(\'json\');" class="mdui-ripple' + tag_is_html + tag_locks + ' clipboard-copy" data-clipboard-text="' + url_text + document_id + '.json">Json接口</a><a href="javascript:card_document_copy_url(\'txt\');" class="mdui-ripple' + tag_is_html + tag_locks + ' clipboard-copy" data-clipboard-text="' + url_text + document_id + '.txt">TXT文本</a><a href="javascript:card_document_copy_url(\'lua\');" class="mdui-ripple' + tag_is_html + tag_locks + ' clipboard-copy" data-clipboard-text="' + url_text + document_id + '.lua">Lua链接</a><a href="javascript:card_document_copy_url(\'md5\');" class="mdui-ripple' + tag_is_html + tag_locks + ' clipboard-copy" data-clipboard-text="' + url_text + document_id + '.md5s">MD5链接</a><a href="javascript:card_document_copy_url(\'css\');" class="mdui-ripple' + tag_is_html + tag_locks + ' clipboard-copy" data-clipboard-text="' + url_text + document_id + '.css">CSS链接</a><a href="javascript:card_document_copy_url(\'js\');" class="mdui-ripple' + tag_is_html + tag_locks + ' clipboard-copy" data-clipboard-text="' + url_text + document_id + '.js">JS链接</a><a href="javascript:card_document_copy_url(\'password\');" class="mdui-ripple' + tag_lock + ' clipboard-copy" data-clipboard-text="' + url_text + document_id + '.password">密码专用地址</a></li></ul></div><div class="mdui-card-header-title" onclick="card_document_info(' + type + ',0,\'' + document_author + '\',\'' + create_time + '\',\'' + hide_msg + '\',\'' + html_msg + '\',\'' + document_id + '\',\'' + modifications + '\',\'' + modify_time + '\',\'' + document_pwd + '\',\'' + view_frequency + '\',\'' + document_key + '\',\'' + document_title + '\',' + is_review + ');">' + document_title + ' <i class="user-select-none mdui-icon material-icons txt-icon-lock mdui-text-color-red' + tag_lock + tag_is_review + '" mdui-tooltip="{content:\'已设置密码\',delay:500}">lock</i> <div class="badges user-select-none mdui-color-grey mdui-text-color-white' + tag_hide + tag_is_review +'" mdui-tooltip="{content:\'已开启私密\',delay:500}">私密</div> <div class="badges user-select-none mdui-color-blue mdui-text-color-white' + tag_html + tag_is_review + '" mdui-tooltip="{content:\'已开启HTML\',delay:500}">HTML</div> <div class="badges user-select-none mdui-color-orange mdui-text-color-white' + isxtime_tag + recycle_hide + tag_is_review + '" mdui-tooltip="{content:\'' + isxtime + '更新\',delay:500}">' + isxtime + '</div> <div class="badges user-select-none mdui-color-pink mdui-text-color-white' + tag_review + '" mdui-tooltip="{content:\'该文档已违规\',delay:500}">已违规</div> <div class="badges user-select-none mdui-color-red mdui-text-color-white' + recycle_is_day + '" mdui-tooltip="{content:\'该文档即将删除\',delay:500}">即将到期</div></div><div class="mdui-card-header-subtitle user-select-none" onclick="card_document_info(' + type + ',0,\'' + document_author + '\',\'' + create_time + '\',\'' + hide_msg + '\',\'' + html_msg + '\',\'' + document_id + '\',\'' + modifications + '\',\'' + modify_time + '\',\'' + document_pwd + '\',\'' + view_frequency + '\',\'' + document_key + '\',\'' + document_title + '\',' + is_review + ');">' + subtext + '</div></div><div class="mdui-card-content mdui-text-truncate mdui-p-b-2 mdui-p-x-2" onclick="card_document_info(' + type + ',0,\'' + document_author + '\',\'' + create_time + '\',\'' + hide_msg + '\',\'' + html_msg + '\',\'' + document_id + '\',\'' + modifications + '\',\'' + modify_time + '\',\'' + document_pwd + '\',\'' + view_frequency + '\',\'' + document_key + '\',\'' + document_title + '\',' + is_review + ');">' + document_desc + '</div><div class="mdui-card-actions"><button class="mdui-btn mdui-btn-dense mdui-color-theme-accent mdui-ripple mdui-float-right" onclick="' + btn_onClick + '">' + btn_text + '</button><button onclick="card_document_info(' + type + ',1,\'' + document_author + '\',\'' + create_time + '\',\'' + hide_msg + '\',\'' + html_msg + '\',\'' + document_id + '\',\'' + modifications + '\',\'' + modify_time + '\',\'' + document_pwd + '\',\'' + view_frequency + '\',\'' + document_key + '\',\'' + document_title + '\',' + is_review + ');" class="mdui-btn mdui-btn-dense mdui-text-color-pink mdui-hidden-xs-down">更多</button><button class="mdui-btn mdui-btn-dense mdui-text-color-pink mdui-hidden-sm-up' + recycle_hide + '" onclick="card_document_delete(0,' + document_id + ',1);">删除</button></div></div></div>';
  appendChild('.content-document-content-list',document_list);
};
//打开文档复制链接
function openCardMenu(anchorSelector,menuSelector,url_text,document_id,copy_type) {
  if (!isYunChuApp()) {
  var inst = new mdui.Menu(anchorSelector, menuSelector);
  inst.open();
  }
  sendYunChuAPP("openCopyMenu",'{"url":"' + url_text + '","id":"' + document_id + '","type":' + copy_type + '}');
}
//复制文档链接
function card_document_copy_url(type) {
  showToast(type + '链接已复制');
  var str = 'Html文档直接访问即可。接口类文档不建议使用Html文档';
  if (type == 'json') {
	  str = 'Json文档须按照Json规范的结构格式进行使用，解析和使用方法请自行百度';
  } else if (type == 'txt') {
	  str = '接口类文档建议使用Json文档';
  } else if (type == 'lua') {
	  str = 'lua文档可使用lua软件直接调用，请务必保证格式正确，代码无误。';
  } else if (type == 'md5') {
	  str = 'md5文档使用需要鉴权<br/>Sign获取方法为：md5(Appkey+文档内容+当前时间戳)';
  } else if (type == 'js') {
	  str = 'Js脚本请按照相关格式规格进行使用';
  } else if (type == 'css') {
	  str = 'css样式请按照相关格式规格进行使用';
  } else if (type == 'password') {
	  str = '当前文档已开启密码，可直接使用password密码专用地址进行提交密码访问文档。<br/><br/><table class="mdui-table mdui-shadow-0"><thead><tr><th>提交参数</th><th>请求方式</th><th>参数说明</th></tr></thead><tbody><tr><td><code>password</code></td><td><code>POST/GET</code></td><td>你的密码</td></tr></tbody></table>';
  }
  showAlert('使用说明',str,'我知道了');
};
//文档详细信息
function card_document_info(types,type,document_author, create_time, is_hide, is_html, document_id, modifications, modify_time, document_pwd, view_frequency, document_key, document_title,is_review) {
if(types != 1){
	$.ajax({
			method: 'POST',
			url: 'https://wd.cn.ecsxs.com/api/v1/text/getinfo.php?username=' + getCookie('user_name') + '&token=' + getCookie('user_token') + '&id=' + document_id,
			headers: yc_app_ajax_header,
			success: function(data) {
				var json = JSON.parse(data);
				var json_state = json['state'];
						if (json_state == 200) {
					document_author = json['data']['author'];
				create_time = json['data']['date'];
				modifications = json['data']['modify'];
				modify_time = stampToDate(json['data']['updatetime'],true);
				document_pwd = json['data']['password'];
				view_frequency = json['data']['read'];
				document_key = json['data']['key'];
				document_title = json['data']['title'];
				is_review = json['data']['review'];
					is_hide = '是';
					is_html = '是';
					if (isEmpty(json['data']['html'])) {
    is_html = '否';
  } 
  if (isEmpty(document_pwd)) {
    document_pwd = '未设置';
  } 
  if (isEmpty(json['data']['hide'])) {
    is_hide = '否';
  }
  if (isEmpty(document_key)) {
    document_key = '未启用';
  }
						}
				
					}
	});
	}
var editTime_txt = '编辑时间：';
if(types == 1){
editTime_txt = '删除时间：';
}
  var str = '修改次数：' + modifications + '次<br/>阅览次数：' + view_frequency + '次<br/>HTML文档：' + is_html + '<br/>私密文档：' + is_hide + '<br/>创建时间：' + create_time + '<br/>' + editTime_txt + modify_time;
  if (types == 0){
	  if (document_pwd != '未设置') {
		  str = str + '<br/>文档密码：' + addStrMosaic(document_pwd);
	  } else if (document_key != '未启用') {
		  str = str + '<br/>文档密钥：' + addStrMosaic(document_key);
	  }
  }
  if (is_review == 1) {
	  str = '<font class="mdui-text-color-red"><i class="mdui-icon material-icons">warning</i>&nbsp;该文档已违规，云储对违规内容零容忍，请尽快整改后提交<a class="mdui-text-color-blue cursor-pointer" onclick="appealDocument(' + document_id + ')">申诉</a>，否则逾期后将强行清理并记录账号违规，严重者将上报至相关部门。</font>';
  }
  setChildText('.content-document-info-dialog-title',document_title + '（ID：' + document_id + '）');
  setChildHtml('.content-document-info-dialog-desc',str);
  setAttribute('.content-document-info-dialog-delete-btn','onclick', 'card_document_delete(0,' + document_id + ',0);');
  addClass('.content-document-info-dialog-delete-btn','mdui-hidden-xs-down');
  hideChild('.content-document-info-dialog-edit-btn');
  if ((type == 0 && !isPC() || type == 1 )|| type == 3) {
	  if (!isYunChuApp()) {
  content_document_info_dialog.open();
	  }
	  if (type != 3){
  sendYunChuAPP('documentDetailsDlg','{"type":' + types + ',"tle":"' + document_title + '","id":' + document_id + ',"author":"' + document_author + '","edit":"' + modifications + '","view":"' + view_frequency + '","html":"' + is_html + '","hide":"' + is_hide + '","create":"' + create_time + '","modify":"' + modify_time + '","pwd":"' + document_pwd + '","key":"' + document_key + '","review":' + is_review + '}');
  }
  if (white_list.indexOf(parseInt(document_id)) != -1){
	  hideChild('.content-document-info-dialog-delete-btn');
  }else{
	  showChild('.content-document-info-dialog-delete-btn');
  }
  if (type == 3){
	   setAttribute('.content-document-info-dialog-edit-btn','onclick','card_document_edit("' + document_id + '");');
  showChild('.content-document-info-dialog-edit-btn');
  removeClass('.content-document-info-dialog-delete-btn','mdui-hidden-xs-down');
  sendYunChuAPP("searchDialog",'{"tle":"' + document_title + '（ID：' + document_id + '）","msg":"' + str + '","id":' + document_id + '}');
  }
  if(types==1){
	  addClass('.content-document-info-dialog-delete-btn','mdui-hidden');
  }
  }
};
//删除文档
function card_document_delete(types,id,type) {
	if (white_list.indexOf(parseInt(id)) != -1){
	  showToast('因该文档较特殊限制删除');
    } else {
	if(types == 0){
	if (type == 1) {
		if (!isYunChuApp()) {
		showSnackbar('确定删除该文档？',function(){
			delete_document(0,id);
		});
		}
		sendYunChuAPP('dialog','{"tle":"","msg":"确定删除该文档？","action":"delete_document(0,' + id + ');"}');
	} else {
		delete_document(0,id);
	}
	}else{
		delete_document(types,id);
	}
  }
};
	function delete_document(type,id){
		var tips_msg = '已移动至回收站';
		var recycle_rst = '';
		if(type == 1){
			recycle_rst = '&recycle=restore';
			tips_msg = '已恢复到我的文档';
		}
		$.ajax({
			method: 'POST',
			url: 'https://wd.cn.ecsxs.com/api/v1/text/delete/?id=' + id + '&token=' + getCookie('user_token') + '&username=' + getCookie('user_name') + recycle_rst,
			headers: yc_app_ajax_header,
			success: function(data) {
				var json = JSON.parse(data);
				var json_state = json['state'];
				if (json_state == 200) {
					showToast(tips_msg);
					//if(type == 0){
					removeChild('#textlist_' + id);
					/*}else{
					recycle_click();
						textlist(1);
					}*/
				}else{
					showToast(json['msg']);
				}
			},
			error: function(msg) {
				showToast('处理失败');
			}
		});
	}
//新建文档
$('.content-document-list-create-btn').on('click',function(event) {
	card_document_new();
});
//申诉文档
function appealDocument() {
	showToast('申诉功能暂未上线，如有误判请联系管理员');
}
var dlg_document_edit_content_old;
var dlg_document_edit_title_old;
//编辑文档dialog
function card_document_new() {
	card_document_new_home();
	content_document_edit_dialog.open();
}
function card_document_new_home(){
	hideChild('.content-document-edit-dialog-tips');
	setChildText('.content-document-edit-dialog-title','选择模板');
	showChild('.content-document-edit-dialog-title');
	hideChild('.content-document-edit-dialog-title-input');
	hideChild('.content-document-edit-dialog-save-btn');
	hideChild('.content-document-edit-dialog-key');
	hideChild('.mdui-dialog-content-html-template-edit');
	showChild('.mdui-dialog-content-html-template');
	setChecked('.content-document-edit-dialog-set-html-checkbox',false);
	setChecked('.content-document-edit-dialog-set-pwd-checkbox',false);
	hideChild('.mdui-dialog-content-json-editor-div');
	hideChild('.mdui-dialog-content-default-editor');
	showChild('.mdui-dialog-content-new-editor');
	removeAttribute('#html_template_iframe','src');
	showChild('.content-document-edit-dialog-set-html-div');
	showChild('.content-document-edit-dialog-set-hide-div');
	hideChild('.more-option-div');
	setSession('document_type',0);
}
//追加赞助编辑器内容列表
function append_admin_suport_edit_list_item(json_key,json_info,json_time){
	var json_admin_suport_list_item = '<div class="mdui-valign mdui-dialog-content-json-editor-div"><div class="mdui-textfield mdui-float-left mdui-textfield-floating-label" style="padding-right:10px;"><label class="mdui-textfield-label">人员</label><input class="mdui-textfield-input mdui-dialog-content-admin-editor-input" name="' + json_key + '_key" type="text" value="' + json_key + '" required><div class="mdui-textfield-error">不能为空</div></div><div class="mdui-textfield mdui-float-left mdui-textfield-floating-label" style="padding-right:10px;width:80%;"><label class="mdui-textfield-label">类型</label><input class="mdui-textfield-input" name="' + json_key + '_info" type="text" value="' + json_info + '" required><div class="mdui-textfield-error">不能为空</div></div><div class="mdui-textfield mdui-float-left mdui-textfield-floating-label"><label class="mdui-textfield-label">时间</label><input class="mdui-textfield-input" name="' + json_key + '_time" type="text" value="' + json_time + '" required><div class="mdui-textfield-error">不能为空</div></div><button class="mdui-btn mdui-btn-icon mdui-btn-dense mdui-dialog-content-json-editor-delete-btn" style="border-radius:100px;margin-left:5px;"><i class="mdui-icon material-icons">delete</i></button></div>';
	appendChild('.mdui-dialog-content-json-editor',json_admin_suport_list_item);
	mdui.updateTextFields();
};
//追加更新和公告编辑器内容列表
function append_admin_app_lite_notice_edit_list_item(json_version,json_versionCode,json_minVersionCode,json_title,json_message,json_url,json_must,type){
	if (parseInt(json_must) == 0) {
		isMust = '';
	} else {
		isMust = ' checked';
	}
	var hide_type = '';
	var hide_type_1 = '';
	var hide_type_2 = '';
	var msg_type = '更新日志';
	var url_type = '下载地址';
	var must_type = '强制更新';
	var ver_code = '最新版本';
	if (type == 1) {
		hide_type_1 = ' mdui-hidden';
		ver_code = '&nbsp;';
	} else if (type == 2) {
		hide_type_2 = ' mdui-hidden';
		msg_type = '推送内容';
		url_type = '跳转链接';
		must_type = '启用推送';
	} else {
		hide_type = ' mdui-hidden';
		json_versionCode = json_version;
	}
	var json_admin_app_lite_update_list_item = '<div class="mdui-valign admin-editor-app-lite-update-dlg-ver-div' + hide_type_2 +  '"><div class="mdui-textfield mdui-textfield-floating-label mdui-m-r-2' + hide_type + '" style="width:50%;"><label class="mdui-textfield-label">最新版本</label><input class="mdui-textfield-input admin-editor-app-lite-update-dlg-version-input" type="text" value="' + json_version + '" name="version" required><div class="mdui-textfield-error">内容不能为空</div><div class="mdui-textfield-helper">versionName</div></div><div class="mdui-textfield mdui-textfield-floating-label" style="flex-grow:1;"><label class="mdui-textfield-label">' + ver_code + '</label><input class="mdui-textfield-input admin-editor-app-lite-update-dlg-versionCode-input" type="number"  name="versionCode" value="' + json_versionCode + '" required><div class="mdui-textfield-error">仅支持整数且不能为空</div><div class="mdui-textfield-helper">versionCode</div></div></div><div class="mdui-textfield mdui-textfield-floating-label admin-editor-app-lite-update-dlg-minVer-div' + hide_type + hide_type_2 + '"><label class="mdui-textfield-label">minVersionCode</label><input class="mdui-textfield-input admin-editor-app-lite-update-dlg-minVersionCode-input" type="number" name="minVersionCode" value="' + json_minVersionCode + '" required><div class="mdui-textfield-error">仅支持整数且不能为空</div></div><div class="mdui-textfield mdui-textfield-floating-label admin-editor-app-lite-update-dlg-tle-div' + hide_type + hide_type_1 + '"><label class="mdui-textfield-label">推送标题</label><input class="mdui-textfield-input admin-editor-app-lite-update-dlg-title-input" type="text"  name="title" value="' + json_title + '" required><div class="mdui-textfield-error">内容不能为空</div></div><div class="mdui-textfield"><label class="mdui-textfield-label">' + msg_type + '</label><textarea class="mdui-textfield-input admin-editor-app-lite-update-dlg-message-input" style="min-height:150px;" onkeyup="json_edit_message_log_cont(this);" name="message" required="">' + json_message + '</textarea><div class="mdui-textfield-error">内容不能为空</div></div><div class="mdui-textfield mdui-textfield-floating-label"><label class="mdui-textfield-label">' + url_type + '</label><input class="mdui-textfield-input admin-editor-app-lite-update-dlg-url-input" type="text" name="url" value="' + json_url + '" required><div class="mdui-textfield-error">内容不能为空</div></div><div class="mdui-p-a-1 mdui-float-right admin-editor-app-lite-update-dlg-must-div' + hide_type_1 + '"><label class="mdui-switch"><input class="admin-editor-app-lite-update-dlg-must-input" name="must" type="checkbox"' + isMust + '><i class="mdui-switch-icon"></i><font class="mdui-p-l-1">' + must_type + '</font></label></div>';
	setChildHtml('.mdui-dialog-content-json-editor',json_admin_app_lite_update_list_item);
	mdui.updateTextFields();
};
//
function json_edit_message_log_cont(obj) {
//last_value = obj.value.replace(/\r\n/g,"\\n");
//obj.value = last_value.replace(/\n/g,"\\n");
};
var template_1_page_html = '<!DOCTYPE html><html lang="zh-CN"> <head>   <meta charset="utf-8" />   <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no" />   <meta name="referrer" content="never" />   <meta http-equiv="cache-control" content="no-store,no-cache,no-siteapp,must-revalidate" />   <meta http-equiv="pragma" content="no-cache">  <meta http-equiv="expires" content="0">  <meta http-equiv="expires" content="Wed, 26 Feb 1997 08:21:57 GMT">  <meta name="sharename" itemprop="name" content="示例官网" />   <meta name="shareimage" itemprop="image" content="//yunchu.cxoip.com/img/page_icon_screenshot.png" />   <meta name="keywords" itemprop="keywords" content="示例官网" />   <meta name="description" itemprop="description" content="一二三四五六七八九十一二三四五" />   <meta name="yunchu-template" content="1" />   <meta name="is-edit" content="1" />   <meta name="author" content="&copy;0047ol" />   <meta name="copyright" content="&copy;YunChu" />    <title>示例官网</title>   <link type="image/png" rel="shortcut icon" href="//yunchu.cxoip.com/img/page_icon_screenshot.png" />   <link type="text/css" rel="stylesheet" href="//yunchu.cxoip.com/assets/css/mdui.min.css" />   <link type="text/css" rel="stylesheet" href="//yunchu.cxoip.com/assets/css/mdclub.css" />   <link type="text/css" rel="stylesheet" href="//yunchu.cxoip.com/assets/css/mdui.css" />   <link type="text/css" rel="stylesheet" href="//yunchu.cxoip.com/assets/css/index.css" />  </head>  <body class="mdui-theme-primary-blue mdui-theme-accent-blue mdui-theme-layout-auto">   <div class="mdui-valign" style="padding-bottom: 150px;">    <div class="top-background" style="top: 110px;">     <img class="mdui-center top-icon" src="//yunchu.cxoip.com/img/page_icon_screenshot.png" width="80px" height="80px" style="border-radius: 5px;"/>     <h1 class="doc_tle top-tle mdui-typo-title mdui-text-color-grey-700" style="font-weight: 500;font-size: 1.9em;line-height: 1;font-family: \'Roboto\';">示例官网</h1>     <h4 class="top-sub mdui-typo-subheading-opacity mdui-text-color-grey-600" style="font-weight: normal;font-size: 20px;">一二三四五六七八九十一二三四五</h4>    </div>    <img class="mdui-center top-image" style="height: 150px;" src="//yunchu.cxoip.com/img/banner.jpg" />   </div>   <div class="mdui-color-grey-50 mdui-m-t-2 mdui-p-a-1"></div>   <div class="mdui-row-xs-1 mdui-row-sm-2 mdui-row-md-3 mdui-grid-list">    <div class="mdui-container mdui-col">     <div class="content-text">      <h4 class="mdui-text-color-theme-accent detail_tle_1">全新界面</h4>      <p class="mdui-typo-subheading-opacity mdui-text-color-grey-600 detail_dec_1">一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十</p>      <img class="mdui-shadow-3 detail_pic_1" src="//yunchu.cxoip.com/img/preview.jpg" />     </div>    </div>    <div class="mdui-container mdui-col">     <div class="content-text">      <h4 class="mdui-text-color-theme-accent detail_tle_2">最佳体验</h4>      <p class="mdui-typo-subheading-opacity mdui-text-color-grey-600 detail_dec_2">一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十</p>      <img class="mdui-shadow-3 detail_pic_2" src="//yunchu.cxoip.com/img/preview.jpg" />     </div>    </div>    <div class="mdui-container mdui-col">     <div class="content-text">      <h4 class="mdui-text-color-theme-accent detail_tle_3">使用方便</h4>      <p class="mdui-typo-subheading-opacity mdui-text-color-grey-600 detail_dec_3">一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十</p>      <img class="mdui-shadow-3 detail_pic_3" src="//yunchu.cxoip.com/img/preview.jpg" />     </div>    </div>    <div class="mdui-container mdui-col">     <div class="content-text">      <h4 class="mdui-text-color-theme-accent detail_tle_4">更多功能</h4>      <p class="mdui-typo-subheading-opacity mdui-text-color-grey-600 detail_dec_4">一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十</p>      <img class="mdui-shadow-3 detail_pic_4" src="//yunchu.cxoip.com/img/preview.jpg" />     </div>    </div>    <div class="mdui-container mdui-col">     <div class="content-text">      <h4 class="mdui-text-color-theme-accent detail_tle_5">快速入门</h4>      <p class="mdui-typo-subheading-opacity mdui-text-color-grey-600 detail_dec_5">一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十</p>      <img class="mdui-shadow-3 detail_pic_5" src="//yunchu.cxoip.com/img/preview.jpg" />     </div>    </div>    <div class="mdui-container mdui-col">     <div class="content-text">      <h4 class="mdui-text-color-theme-accent detail_tle_6">保护安全</h4>      <p class="mdui-typo-subheading-opacity mdui-text-color-grey-600 detail_dec_6">一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十</p>      <img class="mdui-shadow-3 detail_pic_6" src="//yunchu.cxoip.com/img/preview.jpg" />     </div>    </div>   </div>   <div class="mdui-color-grey-50 mdui-m-t-3 mdui-p-a-1 mdui-hidden-md-up"></div>   <div class="mdui-row content-text mdui-p-b-2 mdui-p-t-1 mdui-m-a-0">    <div class="mdui-col-xs-12 mdui-col-md-6 mdui-center">     <h4 class="mdui-text-color-theme-accent">关于我们</h4>     <div class="mdui-row-xs-3 mdui-center content-about">      <div class="mdui-col mdui-p-a-0">       <img class="mdui-img-circle mdui-center mdui-shadow-3 content-about-img auth_ico_1" src="https://q3.qlogo.cn/headimg_dl?dst_uin=2854196320&spec=640" />       <h4 class="mdui-text-center content-about-h4 mdui-text-color-grey-700 auth_name_1">开发者</h4>       <p class="mdui-text-center content-about-p mdui-text-color-grey-600 auth_info_1">某某某开发</p>      </div>      <div class="mdui-col mdui-p-a-0">       <img class="mdui-img-circle mdui-center mdui-shadow-3 content-about-img auth_ico_2" src="https://q3.qlogo.cn/headimg_dl?dst_uin=2854196320&spec=640" />       <h4 class="mdui-text-center content-about-h4 mdui-text-color-grey-700 auth_name_2">开发者</h4>       <p class="mdui-text-center content-about-p mdui-text-color-grey-600 auth_info_2">某某某开发</p>      </div>      <div class="mdui-col mdui-p-a-0">       <img class="mdui-img-circle mdui-center mdui-shadow-3 content-about-img auth_ico_3" src="https://q3.qlogo.cn/headimg_dl?dst_uin=2854196320&spec=640" />       <h4 class="mdui-text-center content-about-h4 mdui-text-color-grey-700 auth_name_3">开发者</h4>       <p class="mdui-text-center content-about-p mdui-text-color-grey-600 auth_info_3">某某某开发</p>      </div>     </div>    </div>    <div class="mdui-col-xs-12 mdui-col-md-6 mdui-center">     <div class="mdui-p-b-1 mdui-hidden-sm-down">      <h4 class="mdui-text-color-theme-accent">联系我们</h4>     </div>     <div class="mdui-row mdui-center content-about-contact">      <div class="mdui-col-xs-6 mdui-col-md-12">       <a class="mdui-btn mdui-center mdui-shadow-1 content-border-radiu-btn down-btn mdui-text-color-grey-600 email" href="mailto:admin@cxoip.com"><i class="mdui-icon mdui-icon-left material-icons mdui-text-color-theme-accent">mail</i> 联系邮箱</a>       <div class="mdui-hidden-sm-down mdui-p-b-1"></div>      </div>      <div class="mdui-col-xs-6 mdui-col-md-12">       <div class="mdui-hidden-sm-down mdui-p-t-1"></div>       <a class="mdui-btn mdui-center mdui-shadow-1 content-border-radiu-btn down-btn mdui-text-color-grey-600 qq_group" href="https://jq.qq.com/?_wv=1027&k=Xf6Y1sZ7" target="_blank"><i class="mdui-icon mdui-icon-left material-icons mdui-text-color-theme-accent">group</i>&nbsp交流Q群</a>      </div>     </div>    </div>   </div>   <button class="mdui-fab mdui-fab-hide mdui-fab-fixed fab-up fab-up-btn mdui-m-b-4 mdui-color-theme-accent go-top">    <i class="mdui-icon material-icons">expand_less</i>  </button>    <footer class="footer-content mdui-valign mdui-color-grey-50 mdui-text-color-theme-secondary">    <div class="bottom-copyright-content mdui-center mdui-text-center">     <div class="mdui-p-t-3 mdui-p-b-1">Copyright&nbsp&copy;&nbsp<font class="foot-copyright-year"></font>&nbsp<font class="foot-name">示例官网</font>&nbspAll&nbspRights&nbspReserved</div>    <div class="mdui-p-b-3">Powered&nbspBy&nbsp<a class="mdui-text-color-theme-accent" href="//www.mdui.org/" target="_blank">MDUI</a>&nbsp&amp;&nbsp<a class="mdui-text-color-theme-accent" href="//yunchu.cxoip.com/" target="_blank">YunChu</a></div>    </div>   </footer>   <script type="text/javascript" src="//yunchu.cxoip.com/assets/js/mdui.min.js"></script>   <script type="text/javascript" src="//yunchu.cxoip.com/assets/js/clipboard.min.js"></script>   <script type="text/javascript" src="//yunchu.cxoip.com/assets/js/tool.js"></script>    <script type="text/javascript" src="//yunchu.cxoip.com/page/page.js"></script>   </body></html>';
template_1_page_html = template_1_page_html.replace('//yunchu.cxoip.com/assets/js/tool.js','//yunchu.cxoip.com/assets/js/tool.js?' + getTimeStamp());
template_1_page_html = template_1_page_html.replace('//yunchu.cxoip.com/page/page.js','//yunchu.cxoip.com/page/page.js?' + getTimeStamp());
var template_2_down_html = '<!DOCTYPE html><html lang="zh-CN"> <head>   <meta charset="utf-8" />   <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no" />   <meta name="referrer" content="never" />   <meta http-equiv="Cache-Control" content="no-siteapp,must-revalidate" />   <meta name="sharename" itemprop="name" content="示例应用" />   <meta name="keywords" itemprop="keywords" content="示例应用" />   <meta name="shareimage" itemprop="image" content="http://yunchu.cxoip.com/img/page_icon_screenshot.png" />   <meta name="description" itemprop="description" content="一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十" />   <meta name="yunchu-template" content="2"/>  <meta name="is-edit" content="1" />   <meta name="author" content="&copy;0047ol" />   <meta name="copyright" content="&copy;YunChu" />   <title>示例应用</title>   <link type="image/png" rel="shortcut icon" href="//yunchu.cxoip.com/img/page_icon_screenshot.png" />   <link type="text/css" rel="stylesheet" href="//yunchu.cxoip.com/assets/css/mdui.min.css" />   <link type="text/css" rel="stylesheet" href="//yunchu.cxoip.com/assets/css/mdclub.css" />   <link type="text/css" rel="stylesheet" href="//yunchu.cxoip.com/assets/css/mdui.css" />   <link type="text/css" rel="stylesheet" href="//yunchu.cxoip.com/assets/css/index.css" />  </head>  <body class="mdui-theme-primary-blue mdui-theme-accent-blue mdui-color-grey-50 mdui-theme-layout-auto main-layout">   <div class="mdui-valign mdui-color-white mdui-p-t-2 mdui-p-x-2">    <a class="mdui-btn mdui-btn-icon mdui-text-color-theme-icon mdui-hidden"><i class="mdui-icon material-icons">share</i></a>    <div class="mdui-toolbar-spacer"></div>    <a class="mdui-btn mdui-btn-icon mdui-text-color-theme-icon" mdui-menu="{target:\'.toolbar-more-btn-menu\'}"><i class="mdui-icon material-icons">more_vert</i></a>    <ul class="mdui-menu toolbar-more-btn-menu">     <li class="mdui-menu-item"><a class="qq_group" href="https://jq.qq.com/?_wv=1027&k=Xf6Y1sZ7" target="_blank" class="mdui-ripple">加入QQ群</a></li>     <li class="mdui-menu-item"><a class="email" href="mailto:admin@cxoip.com" class="mdui-ripple">联系我</a></li>    </ul>   </div>   <div class="mdui-valign mdui-color-white mdui-p-b-4">    <div class="mdui-center">     <img class="mdui-center mdui-shadow-1 app_icon" src="//yunchu.cxoip.com/img/page_icon_screenshot.png" width="70px" height="70px" style="border-radius: 5px;" />     <p class="mdui-text-center mdui-typo-title doc_tle">示例应用</p>     <p class="mdui-text-center mdui-typo-subheading-opacity">9.0分&nbsp|&nbsp中文&nbsp|&nbsp999+次下载</p> 	<div class="mdui-valign">       <a class="mdui-btn mdui-center mdui-color-theme-accent down_url" href="//yunchu.cxoip.com/"><i class="mdui-icon mdui-icon-left material-icons">android</i>&nbsp;下载&nbsp;<font class="app_ver">v1.0</font></a>	</div>   </div>   </div>   <div class="mdui-m-t-1 mdui-p-t-2 mdui-p-x-2 mdui-color-white">    <div class="mdui-typo-title">    <font class="mdui-text-color-blue-accent">|&nbsp</font>更新日志   </div>    <div class="mdui-typo-subheading-opacity mdui-p-a-2 update_log">一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十</div>    <div class="mdui-typo-title">    <font class="mdui-text-color-blue-accent">|&nbsp</font>应用截图   </div>    <div class="mdui-p-a-2">     <div class="app-screenshots-box">      <div class="app-screenshots-box-img">       <img class="screenshot_1" src="//yunchu.cxoip.com/img/screenshot.jpg" />     </div>      <div class="app-screenshots-box-img">       <img class="screenshot_2" src="//yunchu.cxoip.com/img/screenshot.jpg" />      </div>      <div class="app-screenshots-box-img">       <img class="screenshot_3" src="//yunchu.cxoip.com/img/screenshot.jpg" />      </div>      <div class="app-screenshots-box-img">       <img class="screenshot_4" src="//yunchu.cxoip.com/img/screenshot.jpg" />      </div>      <div class="app-screenshots-box-img">       <img class="screenshot_5" src="//yunchu.cxoip.com/img/screenshot.jpg" />      </div>     </div>    </div>    <div class="mdui-typo-title">    <font class="mdui-text-color-blue-accent">|&nbsp</font>应用介绍   </div>    <div class="mdui-typo-subheading-opacity mdui-p-a-2 app_desc">一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十</div>    <div class="mdui-typo-title">    <font class="mdui-text-color-blue-accent">|&nbsp</font>详细信息   </div>    <div class="mdui-typo-subheading-opacity mdui-p-a-2">     <div>应用包名：<font class="package_name">com.app.test</font></div>     <div>应用版本：<font class="app_version">1.0</font></div>     <div>更新时间：<font class="update_time">2021-03-07 13:00:00</font></div>     <div>开发人员：<font class="author">作者名</font></div>     <div>系统支持：4.2+</div>    </div>    <div class="mdui-typo-title">    <font class="mdui-text-color-blue-accent">|&nbsp</font>所需权限   </div>    <div class="mdui-typo-subheading-opacity mdui-p-a-2">     <div>完全的网络访问权限</div>     <div>查看网络连接</div>     <div>查看WLAN连接</div>     <div>读取手机和账户状态</div>     <div>读取存储设备中的内容</div>     <div>修改或删除存储设备中的内容</div>     <div>允许安装未知来源的应用</div>     <div>允许静默安装应用</div>    </div>   </div>   <button class="mdui-fab mdui-fab-fixed fab-up fab-up-btn mdui-m-b-4 mdui-color-theme-accent go-top mdui-fab-hide">    <i class="mdui-icon material-icons">expand_less</i>  </button>   <footer class="footer-content mdui-valign mdui-color-grey-50 mdui-text-color-theme-secondary">    <div class="bottom-copyright-content mdui-center mdui-text-center">     <div class="mdui-p-t-3 mdui-p-b-1">Copyright&nbsp&copy;&nbsp<font class="foot-copyright-year"></font>&nbsp<font class="foot-name">作者名</font>&nbspAll&nbspRights&nbspReserved</div>     <div class="mdui-p-b-3">Powered&nbspBy&nbsp<a class="mdui-text-color-theme-accent" href="//www.mdui.org/" target="_blank">MDUI</a>&nbsp&amp;&nbsp<a class="mdui-text-color-theme-accent" href="//yunchu.cxoip.com/" target="_blank">YunChu</a></div>    </div>   </footer>   <script type="text/javascript" src="//yunchu.cxoip.com/assets/js/mdui.min.js"></script>   <script type="text/javascript" src="//yunchu.cxoip.com/assets/js/clipboard.min.js"></script>   <script type="text/javascript" src="//yunchu.cxoip.com/assets/js/tool.js"></script>    <script type="text/javascript" src="//yunchu.cxoip.com/page/down.js"></script>   </body></html>';
template_2_down_html = template_2_down_html.replace('//yunchu.cxoip.com/assets/js/tool.js','//yunchu.cxoip.com/assets/js/tool.js?' + getTimeStamp());
template_2_down_html = template_2_down_html.replace('//yunchu.cxoip.com/page/down.js','//yunchu.cxoip.com/page/down.js?' + getTimeStamp());

//空白模板
$('.mdui-dialog-content-default-template-edit-btn').on('click',function(event) {
		hideChild('.content-document-edit-dialog-title');
		showChild('.content-document-edit-dialog-title-input');
		showChild('.content-document-edit-dialog-save-btn');
		setValue('.content-document-edit-dialog-title-input','无标题');
		setValue('.content-document-edit-dialog-content-input','你好，云储！');
		dlg_document_edit_title_old = getValue('.content-document-edit-dialog-title-input');
		dlg_document_edit_content_old = getValue('.content-document-edit-dialog-content-input');
		showChild('.more-option-div');
		hideChild('.content-document-edit-dialog-key');
		setChecked('.content-document-edit-dialog-set-html-checkbox',false);
		setChecked('.content-document-edit-dialog-set-pwd-checkbox',false);
		setChecked('.content-document-edit-dialog-set-hide-checkbox',false);
		hideChild('.content-document-edit-dialog-set-html-div');
		hideChild('.content-document-edit-dialog-pwd');
		setValue('.content-document-edit-dialog-pwd-input','');
		setSession('document_type',8);
		setSession('document_id',0);
		removeAttribute('#html_template_iframe','srcdoc');
		showChild('.html_template_iframe_load');
		hideChild('#html_template_iframe');
		hideChild('.mdui-dialog-content-new-editor');
		showChild('.mdui-dialog-content-default-editor');
		mdui.updateTextFields();
});
//更新模板
$('.mdui-dialog-content-json-template-1-btn').on('click',function(event) {
showToast('模板升级维护中');
	/*hideChild('.mdui-dialog-content-default-editor');
						hideChild('.mdui-dialog-content-new-editor');
						hideChild('.mdui-dialog-content-html-template');
						hideChild('.content-document-edit-dialog-title');
		showChild('.content-document-edit-dialog-title-input');
		showChild('.content-document-edit-dialog-save-btn');
		setValue('.content-document-edit-dialog-title-input','远程更新');
						$('.mdui-dialog-content-json-editor').empty();
						hideChild('.more-option-div');
						showChild('.mdui-dialog-content-json-editor-div');
						setSession('document_type',9);
						showChild('.mdui-dialog-content-json-editor');
						setSession('document_id',0);
						append_admin_app_lite_notice_edit_list_item('2',2,0,'','这是你的更新日志','https://yunchu.cxoip.com/',0,0);*/
});
//公告模板
$('.mdui-dialog-content-json-template-2-btn').on('click',function(event) {
showToast('模板升级维护中');
	/*hideChild('.mdui-dialog-content-default-editor');
						hideChild('.mdui-dialog-content-new-editor');
						hideChild('.mdui-dialog-content-html-template');
						hideChild('.content-document-edit-dialog-title');
		showChild('.content-document-edit-dialog-title-input');
		showChild('.content-document-edit-dialog-save-btn');
		setValue('.content-document-edit-dialog-title-input','远程公告');
						$('.mdui-dialog-content-json-editor').empty();
						hideChild('.more-option-div');
						showChild('.mdui-dialog-content-json-editor-div');
						showChild('.mdui-dialog-content-json-editor');
						setSession('document_type',10);
						setSession('document_id',0);
						append_admin_app_lite_notice_edit_list_item('',0,0,'这是你的公告标题','这是你的公告内容','https://yunchu.cxoip.com/',1,2);*/
});

//HTML模板1配置
$('.mdui-dialog-content-html-template-1-btn').on('click',function(event) {
showToast('模板升级维护中');
	/*showChild('.html_template_iframe_load');
	setChildText('.content-document-edit-dialog-title','编辑模板');
	showChild('.content-document-edit-dialog-save-btn');
	hideChild('.mdui-dialog-content-html-template');
	showChild('.mdui-dialog-content-html-template-edit');
	setChecked('.content-document-edit-dialog-set-html-checkbox',true);
	hideChild('.content-document-edit-dialog-set-html-div');
	hideChild('.content-document-edit-dialog-set-hide-div');
	setAttribute('#html_template_iframe','srcdoc',template_1_page_html);
	showChild('.more-option-div');
	setSession('document_type',2);
	setSession('document_id',0);*/
});
//HTML模板2配置
$('.mdui-dialog-content-html-template-2-btn').on('click',function(event) {
showToast('模板升级维护中');
	/*showChild('.html_template_iframe_load');
	setChildText('.content-document-edit-dialog-title','编辑模板');
	showChild('.content-document-edit-dialog-save-btn');
	hideChild('.mdui-dialog-content-html-template');
	showChild('.mdui-dialog-content-html-template-edit');
	setChecked('.content-document-edit-dialog-set-html-checkbox',true);
	hideChild('.content-document-edit-dialog-set-html-div');
	hideChild('.content-document-edit-dialog-set-hide-div');
	setAttribute('#html_template_iframe','srcdoc',template_2_down_html);
	setSession('is_edit',true);
	showChild('.more-option-div');
	setSession('document_type',2);
	setSession('document_id',0);*/
});
document.getElementById('html_template_iframe').onload = function(){
	hideChild('.html_template_iframe_load');
	showChild('#html_template_iframe');
}
function getReportBaged(id){
	return '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF0AAAAoCAYAAACcnvaxAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAPfSURBVGiB7ZpNTxNBGMf/U3BpE/qiRC+CvOjJqB+IA0iiNgHKQQMhpjcbQzh46AoBY1I9yAcSowcJL8JFoKQUpLVCx0PZZbo7szPd7Zak3V8C3d15e+Y/zzw7My0QENAJkOs2oJMYymXp9slxIHrLyL6hxmUguo8Ynm0lEN0PGK/mEYjeBAZzWbrD8WgRjYkuGcG2pkqBkHFDAEoB4s5nlUqJYlNbQ3GljgeB6+us1ROS5wQ6UnDQmkiAe8GpJTAQAoCi24Np7Qsx/7mAXn1cimzWpezpnRjHKexeKssPALQKUGOwmE92xtDA0/mYsRwch6dXIpt5KYAQQEJXhdhybHgipAHRKa1VRAlAuNa0GZfC2bpK7F2vi/lyXZRepPYGmRjV7vjgW3LRDV25b/B293Z/UAgvDqGEWPMF2LFrJxdd2ZkDr1dFIaY3R0yaSuNR323zmqbSZlpc6wFNpXEvGueWY/O6bZum0gh3yX1M1F4z7DBo6ZJxfTQJomfM++FYAlvFAgrJWQDAL8nO16nTbL1WIssLKE3OozQ575hP1J61jOi5Kg2uXtwTWV4AUDPYMHZzfNqV9xA9Y/6pUL44b7gNEYa9Rn/cII8dHnekbkWVefXd3ij2z/6gMvXafOZXe6IybvFddBbetDSeDeSy2DstOpbhXRtYRRiKJbA1Po0nax+wnt+X2iFKEw2GF9FbFtOtxlsF3J2Ygbb0Fv+qVaX62E7fCNmj5HaxAAD4OvqCO8gjn9871h/VNJxUKjbxvYht0BLRWcF5RsdWF1FMztlCBQu7smnU+x7Eb2Hj+Kju2dbloIjsLCbnuHXJ+qKC76KLPFx0L0rbeZqypRM9g7jWg0JyFoOfdG46TaXxc2zSVdx++GUFP44OHe1yg++iR5YXMBJP4LvFeNF07QtH6tKdCHd1S5ebdz6+w/6zl648tFj5q5SvUXwXvXxxbhPciXy5BAB4vLaK9dGk+Zz1VHbdLeOgdFZ3LxKc92Ju1mbISstjukoa0TP4lj8Qdty67nbyXF44i60u4qRSkZmtPECN4l10haN1laWZF/p7Y7bl5v34TWyMTZn32tJb80VtvCTZtgdyWfw+OzXz+Imj6Eq/57iGcy6rp+1OzNRMEcwMQ1yiZ9DfGzPzswNvHbS+cASHz1813XZAIrpU8Gb9NIFXtcIUJnoGUU0TLu94s2jvtAiiZzAcS2BzfFpYd75c8i28OCsm3Y12wtd2zUd84KWy/Q++t3CF+1NGH0NLu8MVPbGyKPfhQHDXcEUv+LQTC6hhF13pKDcI5l6oF1317DzQ3BOm6Epx3CCI5574D2nGvvxbBDjHAAAAAElFTkSuQmCC" style="width:65px;position:fixed;right:0;bottom:0" onclick="window.location.href = \'https://yunchu.cxoip.com/?action=report&id=' + id + '&type=custom_html&from=document\';">';
}
//编辑文档dialog
function card_document_edit(id) {
	showChild('.content-document-edit-dialog-tips');
	setChildText('.content-document-edit-dialog-title','加载中...');
	showChild('.content-document-edit-dialog-title');
	setValue('.content-document-edit-dialog-title-input','获取文档标题中...');
	hideChild('.content-document-edit-dialog-title-input');
	hideChild('.content-document-edit-dialog-save-btn');
	setValue('.content-document-edit-dialog-content-input','获取文档内容中...');
	hideChild('.content-document-edit-dialog-key');
	setChecked('.content-document-edit-dialog-set-html-checkbox',false);
	setChecked('.content-document-edit-dialog-set-pwd-checkbox',false);
	hideChild('.mdui-dialog-content-json-editor-div');
	hideChild('.mdui-dialog-content-new-editor');
	showChild('.mdui-dialog-content-default-editor');
	showChild('.content-document-edit-dialog-set-html-div');
	showChild('.content-document-edit-dialog-set-hide-div');
	mdui.updateTextFields();
		$.ajax({
			method: 'POST',
			url: 'https://wd.cn.ecsxs.com/api/v1/text/update/?username=' + getCookie('user_name') + '&token=' + getCookie('user_token') + '&id=' + id,
			headers: yc_app_ajax_header,
			success: function(data) {
				var json = JSON.parse(data);
				var json_state = json['state'];
				var document_content_type = 0;
				if (json_state == 200) {
					hideChild('.content-document-edit-dialog-title');
					hideChild('.mdui-dialog-content-json-editor');
					showChild('.content-document-edit-dialog-title-input');
					showChild('.content-document-edit-dialog-save-btn');
					var json_title = json['data']['title'];
					var json_content = json['data']['content'];
					json_content = json_content.replace(getReportBaged(id),'');
					setValue('.content-document-edit-dialog-title-input',json_title);
					dlg_document_edit_title_old = json_title;
					dlg_document_edit_content_old = json_content;
					setValue('.content-document-edit-dialog-content-input',json_content);
					showChild('.more-option-div');
					setValue('.content-document-edit-dialog-key-input',json['data']['key']);
					setAttribute('.content-document-edit-dialog-copy-key-btn','data-clipboard-text', json['data']['key']);
					showChild('.content-document-edit-dialog-key');
					hideChild('.content-document-edit-dialog-tips');
					if (json['data']['html'] == 1) {
						setChecked('.content-document-edit-dialog-set-html-checkbox',true);
					} else {
						setChecked('.content-document-edit-dialog-set-html-checkbox',false);
					}
					if (json['data']['hide'] == 1) {
						setChecked('.content-document-edit-dialog-set-hide-checkbox',true);
					} else {
						setChecked('.content-document-edit-dialog-set-hide-checkbox',false);
					}
					if (!isEmpty(json['data']['password'])) {
						setValue('.content-document-edit-dialog-pwd-input',json['data']['password']);
						showChild('.content-document-edit-dialog-pwd');
						setChecked('.content-document-edit-dialog-set-pwd-checkbox',true);
					} else {
						setValue('.content-document-edit-dialog-pwd-input','');
						hideChild('.content-document-edit-dialog-pwd');
						setChecked('.content-document-edit-dialog-set-pwd-checkbox',false);
					}
					if (isEmpty(json['data']['key'])) {
						setChildText('.content-document-edit-dialog-key-helper','你还未启用文档密钥，请点击右侧按钮生成');
						hideChild('.content-document-edit-dialog-copy-key-btn');
					}else{
						setChildText('.content-document-edit-dialog-key-helper','文档密钥请勿泄露，点击右侧按钮可重置');
						showChild('.content-document-edit-dialog-copy-key-btn');
					}
					setSession('document_id',id);
					setSession('document_type',1);
						/*if (white_list.indexOf(parseInt(id)) != -1){
						if (isJSON(json_content) && white_list_web_support.indexOf(parseInt(id)) != -1) {
							hideChild('.mdui-dialog-content-default-editor');
						hideChild('.mdui-dialog-content-new-editor');
						hideChild('.mdui-dialog-content-html-template');
						$('.mdui-dialog-content-json-editor').empty();
						hideChild('.more-option-div');
						showChild('.mdui-dialog-content-json-editor-add-btn');
						showChild('.mdui-dialog-content-json-editor-div');
						showChild('.mdui-dialog-content-json-editor');
							setSession('document_type',4);
						var document_json = JSON.parse(json_content);
						for (var key in document_json) {
							append_admin_suport_edit_list_item(key,document_json[key]['info'],document_json[key]['time']);
						}
						}else if(isJSON(json_content) && white_list_app_update.indexOf(parseInt(id)) != -1 && JSON.parse(json_content).hasOwnProperty('minVersionCode')){
							var document_json = JSON.parse(json_content);
								setSession('document_type',6);
								hideChild('.mdui-dialog-content-default-editor');
						hideChild('.mdui-dialog-content-new-editor');
						hideChild('.mdui-dialog-content-html-template');
						$('.mdui-dialog-content-json-editor').empty();
						hideChild('.more-option-div');
						showChild('.mdui-dialog-content-json-editor-div');
						hideChild('.mdui-dialog-content-json-editor-add-btn');  
						showChild('.mdui-dialog-content-json-editor');
								append_admin_app_lite_notice_edit_list_item(document_json['version'],document_json['versionCode'],document_json['minVersionCode'],document_json['title'],document_json['message'],document_json['url'],document_json['must'],1);
						}
						}else{
							if (isJSON(json_content) && (JSON.parse(json_content).hasOwnProperty('yc_jsonType') || JSON.parse(json_content).hasOwnProperty('ycTemplate'))) {
							var document_json = JSON.parse(json_content);
							var type = 0;
							if (document_json['ycTemplate'] == 1){
								setSession('document_type',5);
							}else if (document_json['ycTemplate'] == 2){
								type = 2;
								setSession('document_type',7);
							}
						hideChild('.mdui-dialog-content-default-editor');
						hideChild('.mdui-dialog-content-new-editor');
						hideChild('.mdui-dialog-content-html-template');
						hideChild('.mdui-dialog-content-json-editor-add-btn');
						$('.mdui-dialog-content-json-editor').empty();
						hideChild('.more-option-div');
						showChild('.mdui-dialog-content-json-editor-div');
						showChild('.mdui-dialog-content-json-editor');
						append_admin_app_lite_notice_edit_list_item(document_json['version'],document_json['versionCode'],document_json['minVersionCode'],document_json['title'],document_json['message'],document_json['url'],document_json['must'],type);
						}
				}
					
					if (isHTML(json_content) && isExist(json_content,'<meta name="yunchu-template"') || (isJSON(json_content) && JSON.parse(json_content).hasOwnProperty('flag') && isExist(JSON.parse(json_content)['flag'],'ycTemplate_HTML_'))) {
						var content = json_content.match(/<meta[^>]+name=\"yunchu-template\".*?>/gi);
						if (!isEmpty(content)) {
							content = content[0];
							var template_id = content.match(/(?<=content=\").*(?=\"[\s|/|>])/g)[0];
							hideChild('.mdui-dialog-content-default-editor');
							hideChild('.mdui-dialog-content-new-editor');
							hideChild('.mdui-dialog-content-json-editor');
							hideChild('.content-document-edit-dialog-title-input');
							showChild('.content-document-edit-dialog-title');
							showChild('.mdui-dialog-content-new-editor');
							showChild('.mdui-dialog-content-html-template-edit');
							setChildText('.content-document-edit-dialog-title','编辑模板');
							showChild('.content-document-edit-dialog-save-btn');
							hideChild('.mdui-dialog-content-html-template');
							json_content = json_content.replace('name="is-edit" content="0"','name="is-edit" content="1"');
							json_content = json_content.replace('//yunchu.cxoip.com/assets/js/tool.js','//yunchu.cxoip.com/assets/js/tool.js?' + getTimeStamp());
							json_content = json_content.replace('//yunchu.cxoip.com/page/page.js','//yunchu.cxoip.com/page/page.js?' + getTimeStamp());
							json_content = json_content.replace('//yunchu.cxoip.com/page/down.js','//yunchu.cxoip.com/page/down.js?' + getTimeStamp());
							setAttribute('#html_template_iframe','srcdoc',json_content);
							showChild('.mdui-dialog-content-html-template-edit');
							showChild('.more-option-div');
							hideChild('.content-document-edit-dialog-set-html-div');
							hideChild('.content-document-edit-dialog-set-hide-div');
							setSession('document_type',3);
						}
					}*/
					mdui.updateTextFields();
				} else {
					showToast(json['msg']);
					content_document_edit_dialog.close();
					reLoad();
				}
			},
			error: function(msg) {
				showToast('获取文档信息失败');
				content_document_edit_dialog.close();
			}
		});
	content_document_edit_dialog.open();
};
//
$('.content-document-edit-dialog-content-input').on('focus',function(event){
    //showToast('获取焦点');
});
$('.content-document-edit-dialog-content-input').on('blur',function(event){
    //showToast('失去焦点');
});
//
function setValue_json_editor_cnt(){
	var json_formData = $('.mdui-dialog-content-json-editor').serializeArray();
		var json_datas = {};
		for (var i in json_formData) {
			json_datas[json_formData[i].name] = json_formData[i]['value'];
		}
		var data_json = JSON.stringify(json_datas, null, "\t");
	setValue('.content-document-edit-dialog-content-input',data_json);
}
//编辑文档关闭
function closeEditDialog() { 
    var type = getSession('document_type');
	if (type == 0) {
		content_document_edit_dialog.close();
	} else if (type == 1) {
	if(isSame(dlg_document_edit_content_old,getValue('.content-document-edit-dialog-content-input')) && isSame(dlg_document_edit_title_old,getValue('.content-document-edit-dialog-title-input'))){
		content_document_edit_dialog.close();
	} else {
		if (!isYunChuApp()) {
		showSnackbar('确定关闭放弃保存？',function(){
			content_document_edit_dialog.close();
		});
	}
	sendYunChuAPP('dialog','{"tle":"","msg":"确定关闭放弃保存？","action":"content_document_edit_dialog.close();"}');
	}
	} else if (type == 2 || type == 9 || type == 10) {
		if (!isYunChuApp()) {
		showSnackbar('确定关闭放弃保存？',function(){
			card_document_new_home();
		});
		}
		sendYunChuAPP('dialog','{"tle":"","msg":"确定关闭放弃保存？","action":"card_document_new_home();"}');
} else if (type == 3 || type == 4 || type == 5 || type == 6 || type == 7) {
		if (!isYunChuApp()) {
		showSnackbar('确定关闭放弃保存？',function(){
			content_document_edit_dialog.close();
		});
		}
		sendYunChuAPP('dialog','{"tle":"","msg":"确定关闭放弃保存？","action":"content_document_edit_dialog.close();"}');
	} else if (type == 8) {
	if(isSame(dlg_document_edit_content_old,getValue('.content-document-edit-dialog-content-input')) && isSame(dlg_document_edit_title_old,getValue('.content-document-edit-dialog-title-input'))){
		card_document_new_home();
	} else {
		if (!isYunChuApp()) {
		showSnackbar('确定关闭放弃保存？',function(){
			card_document_new_home();
		});
	}
	sendYunChuAPP('dialog','{"tle":"","msg":"确定关闭放弃保存？","action":"card_document_new_home();"}');
	}
	}
}
$('.content-document-edit-dialog-close-btn').on('click',function(event) {
	closeEditDialog();
});

//更新文档
$('.content-document-edit-dialog-save-btn').on('click',function(event) {
	var title = getValue('.content-document-edit-dialog-title-input');
	var content = getValue('.content-document-edit-dialog-content-input');
	var html = getChecked('.content-document-edit-dialog-set-html-checkbox');
	var hide = getChecked('.content-document-edit-dialog-set-hide-checkbox');
	var ispwd = getChecked('.content-document-edit-dialog-set-pwd-checkbox')
	var pwd = getValue('.content-document-edit-dialog-pwd-input');
	var id = getSession('document_id');
	var type = getSession('document_type');
	var ishtml = 0;
	var stext = 0;
	var types = 'default';
	if (html) {
		ishtml = 1;
		stext = 0;
		//content = content + getReportBaged(id);
	}
	if (isHTML(content)) {
		ishtml = 1;
	}
	var ishide = 0;
	if (hide) {
		ishide = 1;
	}
	var post_url = 'new/?';
	var tips_str = '创建成功'
	if (!isEmpty(id)) {
		post_url = 'update/?id=' + id + '&';
		tips_str = '文档已更新';
	}
	if (type == 3 || type == 2) {
		ishtml = 1;
		stext = 0;
		title = document.querySelector('#html_template_iframe').contentWindow.document.documentElement.querySelector('.doc_tle').innerHTML;
		content = document.querySelector('#html_template_iframe').contentWindow.document.documentElement.innerHTML;
		content = content.replace('name="is-edit" content="1"','name="is-edit" content="0"');
		content = content.replace(/contenteditable="true"/g, '');
	}else if(type == 4){
		ishtml = 0;
		var rest_formData = $('.mdui-dialog-content-json-editor').serializeArray();
		let index = 0;
		let newArray = [];
		while(index < rest_formData.length) {
			newArray.push(rest_formData.slice(index, index += 3));
		}
		var str1 = "";
		for (var i in newArray) {
			str1 += "\"" + newArray[i][0]['value'] + "\":{\"info\":\"" + newArray[i][1]['value'] + "\",\"time\":\"" + newArray[i][2]['value'] + "\"},";
		}
		content = "{" + str1.substr(0, str1.length - 1) + "}";
	}else if(type == 5 || type == 9){
		ishtml = 0;
		var ver = getValue('.admin-editor-app-lite-update-dlg-version-input');
		var verCode = getValue('.admin-editor-app-lite-update-dlg-versionCode-input');
		var msg = getValue('.admin-editor-app-lite-update-dlg-message-input');
		msg = msg.replace(/\r\n/g,"\\n");
		msg = msg.replace(/\n/g,"\\n");
		var url = getValue('.admin-editor-app-lite-update-dlg-url-input');
		var must = getChecked('.admin-editor-app-lite-update-dlg-must-input');
		if (must) {
			isMust = 1;
		} else {
			isMust = 0;
		}
		content = serializeArrayJson('.mdui-dialog-content-json-editor',true,1);
		types = "ycTemplate_0047ol_JSON_app_update";
	}else if(type == 6){
		ishtml = 0;
		var ver = getValue('.admin-editor-app-lite-update-dlg-version-input');
		var verCode = getValue('.admin-editor-app-lite-update-dlg-versionCode-input');
		var minVerCode = getValue('.admin-editor-app-lite-update-dlg-minVersionCode-input');
		var msg = getValue('.admin-editor-app-lite-update-dlg-message-input');
		msg = msg.replace(/\r\n/g,"\\n");
		msg = msg.replace(/\n/g,"\\n");
		var url = getValue('.admin-editor-app-lite-update-dlg-url-input');
		if (must) {
			isMust = 1;
		} else {
			isMust = 0;
		}
		content = serializeArrayJson('.mdui-dialog-content-json-editor',false,0);
		types = "ycTemplate_jesse205_JSON_app_update";
	}else if(type == 7 || type == 10){
		ishtml = 0;
		var tle = getValue('.admin-editor-app-lite-update-dlg-title-input');
		var msg = getValue('.admin-editor-app-lite-update-dlg-message-input');
		msg = msg.replace(/\r\n/g,"\\n");
		msg = msg.replace(/\n/g,"\\n");
		var url = getValue('.admin-editor-app-lite-update-dlg-url-input');
		var must = getChecked('.admin-editor-app-lite-update-dlg-must-input');
		if (must) {
			isMust = 1;
		} else {
			isMust = 0;
		}
		content = serializeArrayJson('.mdui-dialog-content-json-editor',true,2);
		types = "ycTemplate_0047ol_JSON_app_notice";
	}
	if (isEmpty(title)) {
		showToast('文档标题不能为空');
	} else if (isEmpty(content)) {
		showToast('文档内容不能为空');
	} else if (ispwd && isEmpty(pwd)) {
		showToast('访问密码不能为空');
	} else {
		$.ajax({
			method: 'POST',
			url: 'https://wd.cn.ecsxs.com/api/v1/text/' + post_url + 'token=' + getCookie('user_token') + '&username=' + getCookie('user_name'),
			data:  'title=' + title + '&content=' + encodeURIComponent(content) + '&html=' + ishtml + '&hide=' + ishide + '&password=' + pwd +'&stxt=' + stext + '&type=' + types,
			headers: yc_app_ajax_header,
			success: function(data) {
				var json = JSON.parse(data);
				var json_state = json['state'];
				if (json_state == 200) {
					showToast(tips_str);
					content_document_edit_dialog.close();
					//reLoad(true);
					setChildText('.content-document-content-list','');
					document_totals = 0;
	document_total_pages = 1;
	document_total_perpage = 0;
					hideChild('.content-document-list-tips');
					textlist(0);
					show_loading();
				}else{
					showToast(json['msg']);
				}
			},
			error: function(msg) {
				showToast('更新失败');
			}
		});
	}
	return false;
});
/*function cheshi_piliang(num){
	var shu = 0;
	var timeId = setInterval(function () {
		shu = shu + 1;
		var title = '测试文档' + shu;
		var content = '批量创建文档' + stampToDate(getTimeStamp(),true);
		if (shu >= num) {
			clearInterval(timeId);
		}
		$.ajax({
			method: 'POST',
			url: 'https://wd.cn.ecsxs.com/api/v1/text/new/?token=' + getCookie('user_token') + '&username=' + getCookie('user_name'),
			data:  'title=' + title + '&content=' + encodeURIComponent(content) + '&html=0&hide=0&password=&stxt=0&type=',
			headers: yc_app_ajax_header,
			success: function(data) {
				var json = JSON.parse(data);
				var json_state = json['state'];
				if (json_state == 200) {
					console.log('创建完成 ----- ' + shu);
				}else{
					console.log(json['msg'] + ' ----- ' + shu);
				}
			},
			error: function(msg) {
				console.log('创建失败 ----- ' + shu);
			}
		});
	}, 10000);
}*/
function reLoadHome() {
  if (getHash() == 'file') {
	  setHeadTitle('我的文件');
	  setChildText('.web-title','我的文件');
	  locaHash('file');
    files_click();
  } else if (getHash() == 'img') {
	  setHeadTitle('我的图片');
	  setChildText('.web-title','我的图片');
	  locaHash('img');
    images_click();
  } else if (getHash() == 'app') {
	  setHeadTitle('我的应用');
	  setChildText('.web-title','我的应用');
	  locaHash('app');
    application_click();
  } else if (getHash() == 'admin') {
	   setHeadTitle('管理云储');
	  setChildText('.web-title','管理云储');
	  locaHash('admin');
	  admin_click();
  } else if (getHash() == 'recycle') {
  if (!isYunChuApp()) {
	  show_loading();
	  }
	  setHeadTitle('回收站');
	  setChildText('.web-title','回收站');
	  setChildText('.content-document-content-list','');
	  setChildText('.content-document-content-list','');
	  locaHash('recycle');
	  textlist(1);
	  hideChild('.content-document-content-top-other');
  recycle_click();
  showChild('.content-recycle-list-top-tips');
  addClass('.content-document-list','recycle-list-padding-top');
  addClass('.mdui-appbar-fixed','content-top-tips-box-shadow');
  } else if (getHash() == 'user') {
  if (!isYunChuApp()) {
	  show_loading();
	  }
	  setHeadTitle('我的云储');
	  setChildText('.web-title','我的云储');
	  locaHash('user');
    user_click();
	userlist();
  } else {
	  document_totals = 0;
  document_total_pages = 1;
	document_total_perpage = 0;
	if (!isYunChuApp()) {
	  show_loading();
	  }
	  setHeadTitle('我的文档');
	  setChildText('.web-title','我的文档');
	  locaHash('text');
    document_click();
	removeClass('.content-document-list-create-btn','mdui-fab-hide');
	showChild('.content-document-content-top-other');
	setChildText('.content-document-content-list','');
	textlist(0);
  }
}
function openTextClick() {
	setHeadTitle('我的文档');
	  setChildText('.web-title','我的文档');
	  if (getHash() == 'recycle') {
		   show_loading();
		  setChildText('.content-document-content-list','');
		  textlist(0);
	  }
    document_click();
	locaHash('text');
	removeClass('.content-document-list-create-btn','mdui-fab-hide');
	showChild('.content-document-content-top-other');
	hideChild('.content-recycle-list-top-tips');
  removeClass('.content-document-list','recycle-list-padding-top');
  removeClass('.mdui-appbar-fixed','content-top-tips-box-shadow');
}
document.getElementById('html_template_iframe').onload = function(){
	hideChild('.html_template_iframe_load');
	showChild('#html_template_iframe');
}
//重置文档key
$('.content-document-edit-dialog-reset-key-btn').on('click',function(event) {
	var id = getSession('document_id');
	$.ajax({
		method: 'POST',
		url: 'https://wd.cn.ecsxs.com/api/v1/text/updatekey/?id=' + id + '&token=' + getCookie('user_token') + '&username=' + getCookie('user_name'),
		data:  'key=true',
		headers: yc_app_ajax_header,
		success: function(data) {
			var json = JSON.parse(data);
			var json_state = json['state'];
			var json_key = json['key'];
			if (json_state == 200) {
				showToast('已重置');
				setValue('.content-document-edit-dialog-key-input',json_key);
				setAttribute('.content-document-edit-dialog-copy-key-btn','data-clipboard-text', json_key);
				setChildText('.content-document-edit-dialog-key-helper','文档密钥请勿泄露，点击右侧按钮可重置');
				showChild('.content-document-edit-dialog-copy-key-btn');
				mdui.updateTextFields();
				content_document_edit_dialog.close();
				document_totals = 0;
	document_total_pages = 1;
	document_total_perpage = 0;
					setChildText('.content-document-content-list','');
					hideChild('.content-document-list-tips');
					textlist(0);
					show_loading();
			}else{
				showToast(json['msg']);
			}
		},
		error: function(msg) {
			showToast('重置失败');
		}
	});
});
//文档密码
$('.content-document-edit-dialog-set-pwd-checkbox').on('change',function(event) {
	if (getChecked('.content-document-edit-dialog-set-pwd-checkbox')) {
		showChild('.content-document-edit-dialog-pwd');
	} else {
		hideChild('.content-document-edit-dialog-pwd');
		setValue('.content-document-edit-dialog-pwd-input','');
	}
});
//复制文档key
$('.content-document-edit-dialog-key-input').on('click',function(event) {
	showToast('文档KEY已复制');
});
//我的文件点击
function files_click() {
  hideChild('.content-document-list');
  hideChild('.content-application-list');
  hideChild('.content-user-list');
  hideChild('.content-admin-list');
  hideChild('.content-images-list');
  hideChild('.toolbar-search-btn');
  showChild('.content-files-list');
  addClass('.drawer-list-item-files-list','mdui-list-item-active');
  removeClass('.drawer-list-item-document-list','mdui-list-item-active');
  removeClass('.drawer-list-item-application-list','mdui-list-item-active');
  removeClass('.drawer-list-item-user-list','mdui-list-item-active');
  removeClass('.drawer-list-item-images-list','mdui-list-item-active');
  removeClass('.drawer-list-item-recycle-list','mdui-list-item-active');
  removeClass('.drawer-list-item-admin-list','mdui-list-item-active');
  sendYunChuAPP("onload",0);
};
//我的图片点击
function images_click() {
  hideChild('.content-document-list');
  hideChild('.content-application-list');
  hideChild('.content-user-list');
  hideChild('.content-admin-list');
  hideChild('.content-files-list');
  hideChild('.toolbar-search-btn');
  showChild('.content-images-list');
  addClass('.drawer-list-item-images-list','mdui-list-item-active');
  removeClass('.drawer-list-item-document-list','mdui-list-item-active');
  removeClass('.drawer-list-item-application-list','mdui-list-item-active');
  removeClass('.drawer-list-item-user-list','mdui-list-item-active');
  removeClass('.drawer-list-item-files-list','mdui-list-item-active');
  removeClass('.drawer-list-item-recycle-list','mdui-list-item-active');
  removeClass('.drawer-list-item-admin-list','mdui-list-item-active');
  sendYunChuAPP("onload",0);
}
//我的应用点击
function application_click() {
  hideChild('.content-document-list');
  hideChild('.content-files-list');
  hideChild('.content-user-list');
  hideChild('.content-admin-list');
  hideChild('.content-images-list');
  hideChild('.toolbar-search-btn');
  showChild('.content-application-list');
  addClass('.drawer-list-item-application-list','mdui-list-item-active');
  removeClass('.drawer-list-item-document-list','mdui-list-item-active');
  removeClass('.drawer-list-item-files-list','mdui-list-item-active');
  removeClass('.drawer-list-item-user-list','mdui-list-item-active');
  removeClass('.drawer-list-item-images-list','mdui-list-item-active');
  removeClass('.drawer-list-item-recycle-list','mdui-list-item-active');
  removeClass('.drawer-list-item-admin-list','mdui-list-item-active');
  sendYunChuAPP("onload",0);
};
//回收站
function recycle_click() {
  hideChild('.content-files-list');
  hideChild('.content-application-list');
  hideChild('.content-user-list');
  showChild('.content-document-list');
  hideChild('.content-images-list');
  hideChild('.content-admin-list');
  hideChild('.toolbar-search-btn');
  addClass('.drawer-list-item-recycle-list','mdui-list-item-active');
  removeClass('.drawer-list-item-files-list','mdui-list-item-active');
  removeClass('.drawer-list-item-application-list','mdui-list-item-active');
  $('.document_list').empty();
  removeClass('.drawer-list-item-user-list','mdui-list-item-active');
  removeClass('.drawer-list-item-images-list','mdui-list-item-active');
  removeClass('.drawer-list-item-document-list','mdui-list-item-active');
  removeClass('.drawer-list-item-admin-list','mdui-list-item-active');
}
function admin_click() {
  hideChild('.content-document-list');
  hideChild('.content-files-list');
  hideChild('.content-user-list');
  hideChild('.content-images-list');
  hideChild('.content-application-list');
  hideChild('.toolbar-search-btn');
  showChild('.content-admin-list');
  addClass('.drawer-list-item-admin-list','mdui-list-item-active');
  removeClass('.drawer-list-item-document-list','mdui-list-item-active');
  removeClass('.drawer-list-item-files-list','mdui-list-item-active');
  removeClass('.drawer-list-item-images-list','mdui-list-item-active');
  removeClass('.drawer-list-item-recycle-list','mdui-list-item-active');
  removeClass('.drawer-list-item-user-list','mdui-list-item-active');
  removeClass('.drawer-list-item-application-list','mdui-list-item-active');
  sendYunChuAPP("onload",0);
};
//我的云储点击
function user_click() {
if (!isYunChuApp()) {
  show_loading();
  }
  hideChild('.content-document-list');
  hideChild('.content-files-list');
  hideChild('.content-application-list');
  hideChild('.content-admin-list');
  hideChild('.content-images-list');
  hideChild('.toolbar-search-btn');
  showChild('.content-user-list');
  addClass('.drawer-list-item-user-list','mdui-list-item-active');
  removeClass('.drawer-list-item-document-list','mdui-list-item-active');
  removeClass('.drawer-list-item-files-list','mdui-list-item-active');
  removeClass('.drawer-list-item-application-list','mdui-list-item-active');
  removeClass('.drawer-list-item-images-list','mdui-list-item-active');
  removeClass('.drawer-list-item-recycle-list','mdui-list-item-active');
  removeClass('.drawer-list-item-admin-list','mdui-list-item-active');
};
var json_user_appkey = '***************************************';
//获取用户信息
function userlist() {
  $.ajax({
    method: 'POST',
    url: 'https://wd.cn.ecsxs.com/api/v1/user/userlist/?username=' + getCookie('user_name') + '&token=' + getCookie('user_token'),
    headers: yc_app_ajax_header,
    success: function(data) {
      var json = JSON.parse(data);
	  var json_state = json['state'];
      if (json_state == 200) {
        var json_username = json['data']['username'];
        var json_grade = json['data']['a-grade'];
        var json_appid = json['data']['appid'];
        var json_appkey = json['data']['appkey'];
        var json_register_time = json['data']['registered_time'];
		var json_phone = json['data']['mobile'];
		if (isEmpty(json_phone)) {
			json_phone = '未绑定';
			showSnackbar('请尽快绑定手机号',function(){
		openUrl('https://docs.qq.com/form/page/DY2lsTnpaeGZTTVdy',false);
	});
		}
		var json_qq = json['data']['qq'];
		if (isEmpty(json_qq)) {
			json_qq = '未绑定';
			showSnackbar('请尽快绑定QQ号',function(){
		openUrl('https://docs.qq.com/form/page/DY2lsTnpaeGZTTVdy',false);
	});
		} else {
			var img_url ='https://q1.qlogo.cn/g?b=qq&nk=' + json_qq + '&s=640';
			setSrc('.avatar-img',img_url);
			setSrc('.user-list-avatar-img',img_url);
			  //QQ昵称
			  if (!isEmpty(json_qq)) {
  $.ajax({
		method: 'GET',
		url: 'https://0047ol.cn/api/v1/qq/?id=' + json_qq,
		success: function(data) {
			var json = JSON.parse(data);
			var json_state = json['code'];
			if(json_state == 200){
			setChildText('.drawer-list-item-user-name',json['data']['name']);
			var time = new Date().getHours();
		if (time > 4 && time <= 9) {
			setSrc('.content-user-list-greet-background','../img/morn.jpg');
			setChildText('.content-user-list-greet-text','早上好，' + json['data']['name']);
		} else if(time > 9 && time < 11) {
			setChildText('.content-user-list-greet-text','上午好，' + json['data']['name']);
		}  else if(time >= 11 && time < 13) {
			setSrc('.content-user-list-greet-background','../img/noon.jpg');
			setChildText('.content-user-list-greet-text','中午好，' + json['data']['name']);
		} else if(time >= 13 && time < 18) {
			setSrc('.content-user-list-greet-background','../img/after.jpg');
			setChildText('.content-user-list-greet-text','下午好，' + json['data']['name']);
		}  else if(time >= 11 && time <= 4) {
			setChildText('.content-user-list-greet-text','夜深了，' + json['data']['name']);
		} else {
			setChildText('.content-user-list-greet-text','晚上好，' + json['data']['name']);
		}
			setChildText('.drawer-subtitle-text',json['data']['sign']);
			}
		}
  });
			  } else {
				  var time = new Date().getHours();
		if (time > 4 && time <= 9) {
			setSrc('.content-user-list-greet-background','../img/morn.jpg');
			setChildText('.content-user-list-greet-text','早上好');
		} else if(time > 9 && time < 11) {
			setChildText('.content-user-list-greet-text','上午好');
		}  else if(time >= 11 && time < 13) {
			setSrc('.content-user-list-greet-background','../img/noon.jpg');
			setChildText('.content-user-list-greet-text','中午好');
		} else if(time >= 13 && time < 18) {
			setSrc('.content-user-list-greet-background','../img/after.jpg');
			setChildText('.content-user-list-greet-text','下午好');
		}  else if(time >= 11 && time <= 4) {
			setChildText('.content-user-list-greet-text','夜深了');
		} else {
			setChildText('.content-user-list-greet-text','晚上好');
		}
			  }
		}
        //setChildText('.drawer-list-item-user-name',json_username);
        setChildText('.drawer-list-item-user-grade',json_grade);
        setChildText('.content-user-list-user-info-userqq',addStrMosaic(json_qq));
        setChildText('.content-user-list-user-info-userphone',addStrMosaic(json_phone));
        setChildText('.content-user-list-user-info-username',json_username);
        setChildText('.content-user-list-user-info-email',json['data']['email']);
        setChildText('.content-user-list-user-info-user-grade',json_grade);
        setChildText('.content-user-list-invitation-code',json_appid);
        //setChildText('.content-user-list-user-app-key',json_appkey);
		json_user_appkey = json_appkey;
		isInvitCode = json_appid;
        setAttribute('.content-user-list-invitation-code-copy-btn','data-clipboard-text', 'https://yunchu.cxoip.com/?action=regist&invitCode=' + json_appid);
		if (isYunChuApp()) {
			setChildText('.content-user-list-invitation-code-copy-icon','share');
		}
        setAttribute('.content-user-list-app-key-copy-btn','data-clipboard-text', json_appkey);
        setAttribute('.content-user-list-user-info-regist-time','regist-time', dateToStamp(json_register_time));
        setAttribute('.content-user-list-user-info-regist-time','onclick', 'showToast(\'我在' + json_register_time + '注册了云储\');');
		setChildText('.content-user-list-users-id',json['data']['id']);
        getRegistTimes();
        hide_loading();
		sendYunChuAPP("onload",0);
      } else {
        //showToast(json['msg']);
        login_invalid(json_state);
      }
    },
    error: function(msg) {
      showToast('获取失败');
    }
  });
  //登录日志
  $.ajax({
    method: 'POST',
    url: 'https://wd.cn.ecsxs.com/api/v1/user/log.php?username=' + getCookie('user_name') + '&token=' + getCookie('user_token') + '&page=1',
    headers: yc_app_ajax_header,
    success: function(data) {
      var json = JSON.parse(data);
	  var json_state = json['state'];
      if (json_state == 200) {
        var items = json['data']['items'];
        var loginLog_list = '';
		var a_grade = items.length;
		if (a_grade > 0) {
        for (var i = 0; i < 4; i++)  {
          var login_ip = items[i]['ip'];
          var login_address = items[i]['address'];
          var login_time = items[i]['time'];
		  login_time = login_time.replace(' ','<br/>');
		  if (!isExist(login_address,'内网')){
			 loginLog_list += '<li class="mdui-list-item"><div class="mdui-list-item-content"><div class="mdui-list-item-title mdui-text-truncate" style="max-width:120px">' + login_ip + '</div><div class="mdui-list-item-text mdui-list-item-one-line">' + login_address + '</div></div><font class="mdui-text-truncate" style="max-width:180px">' + login_time + '</font></li>';
		  }
        }
        if (!isEmpty(loginLog_list)) {
        setChildHtml('.content-user-list-login-log',loginLog_list);
        } else {
			hideChild('.content-user-list-login-log-div');
		}
		} else {
			hideChild('.content-user-list-login-log-div');
		}
      } else {
        //showToast(json['msg']);
        login_invalid(json_state);
      }
    },
    error: function(msg) {
      showToast('获取失败');
    }
  });
  //邀请列表
  $.ajax({
    method: 'POST',
    url: 'https://wd.cn.ecsxs.com/api/v1/user/lnvitees.php?username=' + getCookie('user_name') + '&token=' + getCookie('user_token'),
    headers: yc_app_ajax_header,
    success: function(data) {
      var json = JSON.parse(data);
	  var json_state = json['state'];
      if (json_state == 200) {
        var items = json['data']['items'];
        var loginLog_morelist = '';
		 var a_grade = items.length;
		 if (a_grade > 0) {
			 hideChild('.content-user-list-invitation-tips');
        for (var i = 0; i < 2; i++)  {
          var regist_username = items[i]['username'];
          var regist_time = items[i]['registered_time'];
		  loginLog_morelist += '<li class="mdui-list-item"><div class="mdui-list-item-content"><div class="mdui-list-item-title mdui-text-truncate" style="max-width:120px">' + addStrMosaic(regist_username) + '</div><div class="mdui-list-item-text mdui-list-item-one-line">注册于' + regist_time + '</div></div><font class="mdui-text-truncate" style="max-width:180px">No.' + (a_grade--) + '</font></li>';
        }
        setChildHtml('.content-user-list-login-invit',loginLog_morelist);
		showChild('.content-user-list-login-invit-cont');
		 } else {
			 hideChild('.content-user-list-login-invit-cont');
			 showChild('.content-user-list-invitation-tips');
		 }
      } else {
        //showToast(json['msg']);
        login_invalid(json_state);
      }
    },
    error: function(msg) {
      showToast('获取失败');
    }
  });
};
//复制邀请码
$('.content-user-list-invitation-code-copy-btn').on('click',function(event) {
	if (!isYunChuApp()) {
  showToast('邀请链接已复制');
	} else {
		showToast('赶快分享给你的朋友注册吧');
	}
	sendYunChuAPP('shareInvitCode','{"code":"' + isInvitCode + '"}');
});
//修改密码打开
$('.content-user-list-user-info-change-pwd').on('click',function(event) {
	if (!isYunChuApp()) {
	content_user_list_user_info_change_pwd_dlg.open();
}
sendYunChuAPP('changPwd',0);
});
//修改密码提交
$('.content-user-list-user-info-change-pwd-submit-btn').on('click',function(event) {
  var old_pwd = getValue('.content-user-list-user-info-change-pwd-dlg-old-pwd');
  var new_pwd = getValue('.content-user-list-user-info-change-pwd-dlg-new-pwd');
  if (isEmpty(old_pwd)) {
    showToast('请填写原旧密码');
  } else if (isEmpty(new_pwd)) {
    showToast('请填写新的密码');
  } else {
   changPwd(old_pwd,new_pwd);
  }
});
function changPwd(old_pwd,new_pwd){
	 $.ajax({
	  method: 'POST',
      url: 'https://wd.cn.ecsxs.com/api/v1/user/updatepassword/?token=' + getCookie('user_token') + '&username=' + getCookie('user_name'),
      data: 'password1=' + old_pwd + '&password2=' + new_pwd,
      headers: yc_app_ajax_header,
      success: function(data) {
        var json = JSON.parse(data);
        if (json['state'] == 200) {
			showToast('修改成功');
			sendYunChuAPP("loginFailure",0);
			if (!isYunChuApp()) {
            reLoad(true);
			}
        }else{
			showToast(json['msg']);
		}
      },
      error: function(msg) {
        showToast('修改失败');
      }
    });
}
//注销账号
$('.content-user-list-user-info-delete-account').on('click',function(event) {
	if (!isYunChuApp()) {
	confirm('将会<font class="mdui-text-color-red">删除你的云储账号并清除全部数据，不可恢复</font>。注销成功后，你将会无法在使用云储服务。<br/>确认继续？',
	function(callback){
		if (callback){
		showSnackbar('你确定注销你的云储账号？',function(){
		logoutUser();
		});
	   }
	});
}
sendYunChuAPP('dialog','{"tle":"注销账号","msg":"将会申请注销你的云储账号。确认继续？\n注销成功后，你将会无法在使用云储服务。","action":"logoutUser();"}');
});
function logoutUser(){
	$.ajax({
				method: 'POST',
				url: 'https://wd.cn.ecsxs.com/api/v1/user/logoutuser/?token=' + getCookie('user_token') + '&username=' + getCookie('user_name'),
				data:  'qr=true',
				headers: yc_app_ajax_header,
				success: function(data) {
					var json = JSON.parse(data);
					var json_state = json['state'];
					if (json_state == 200) {
						showToast('已注销');
						sendYunChuAPP("accountDeleteSucceeded",0);
						removeLogin_back();
					}else{
						showToast(json['msg']);
					}
				},
				error: function(msg) {
					showToast('申请失败');
				}
			});
}
//查看登录日志
$('.content-user-list-login-log-more').on('click',function(event) {
  showLoginOptFullMoreDlg(0);
});
//查看邀请人数
$('.content-user-list-login-invit-more').on('click',function(event) {
  showLoginOptFullMoreDlg(1);
});
function showLoginOptFullMoreDlg(type) {
	if (type == 1) {
	setChildText('.content-user-list-login-log-more-dialog-title','我的邀请');
	$.ajax({
    method: 'POST',
    url: 'https://wd.cn.ecsxs.com/api/v1/user/lnvitees.php?username=' + getCookie('user_name') + '&token=' + getCookie('user_token'),
    headers: yc_app_ajax_header,
    success: function(data) {
      var json = JSON.parse(data);
	  var json_state = json['state'];
      if (json_state == 200) {
		setChildText('.content-user-list-login-log-more-dialog-th-1','序号');
		removeClass('.content-user-list-login-log-more-dialog-th-1','mdui-table-big');
		setChildText('.content-user-list-login-log-more-dialog-th-2','用户名');
		removeClass('.content-user-list-login-log-more-dialog-th-2','mdui-table-big');
		setChildText('.content-user-list-login-log-more-dialog-th-3','注册时间');
		addClass('.content-user-list-login-log-more-dialog-th-3','mdui-table-big');
		setChildText('.content-user-list-login-log-more-dialog-tbody','');
        var items  =  json['data']['items'];
        var loginLog_morelist = '';
		var a_grade = items.length;
        for (var key in items) {
          var regist_username = items[key]['username'];
          var regist_time = items[key]['registered_time'];
		  loginLog_morelist += '<tr><td>' + (a_grade--) + '</td><td>' + addStrMosaic(regist_username) + '</td><td>' + regist_time + '</td></tr>';
        };
        setChildHtml('.content-user-list-login-log-more-dialog-tbody',loginLog_morelist);
      } else {
        //showToast(json['msg']);
        login_invalid(json_state);
      }
    },
    error: function(msg) {
      showToast('获取失败');
    }
  });
	} else {
	setChildText('.content-user-list-login-log-more-dialog-title','最近登录');
	$.ajax({
    method: 'POST',
    url: 'https://wd.cn.ecsxs.com/api/v1/user/log.php?username=' + getCookie('user_name') + '&token=' + getCookie('user_token') + '&page=1',
    headers: yc_app_ajax_header,
    success: function(data) {
      var json = JSON.parse(data);
	  var json_state = json['state'];
      if (json_state == 200) {
		setChildText('.content-user-list-login-log-more-dialog-th-1','登录时间');
		addClass('.content-user-list-login-log-more-dialog-th-1','mdui-table-big');
		setChildText('.content-user-list-login-log-more-dialog-th-2','登录IP');
		removeClass('.content-user-list-login-log-more-dialog-th-2','mdui-table-big');
		setChildText('.content-user-list-login-log-more-dialog-th-3','登录地点');
		addClass('.content-user-list-login-log-more-dialog-th-3','mdui-table-big');
		setChildText('.content-user-list-login-log-more-dialog-tbody','');
        var items  =  json['data']['items'];
        var loginLog_morelist = '';
        for (var key in items) {
          var login_ip = items[key]['ip'];
          var login_address = items[key]['address'];
          var login_time = items[key]['time'];
		  if (!isExist(login_address,'内网')){
			 loginLog_morelist += '<tr><td>' + login_time + '</td><td>' + login_ip + '</td><td>' + login_address + '</td></tr>';
		  }
        };
        setChildHtml('.content-user-list-login-log-more-dialog-tbody',loginLog_morelist);
      } else {
        //showToast(json['msg']);
        login_invalid(json_state);
      }
    },
    error: function(msg) {
      showToast('获取失败');
    }
  });
	}
	content_user_list_login_more_full_dlg.open();
}
//显示AppKey
var is_show_appkey = false;
$('.content-user-list-user-app-key-see-btn').on('click',function(event) {
	if (is_show_appkey) {
		setChildText('.content-user-list-user-app-key','***********************************');
		setChildText('.content-user-list-user-app-key-see-icon','visibility');
		is_show_appkey = false;
	} else {
		setChildText('.content-user-list-user-app-key',json_user_appkey);
		setChildText('.content-user-list-user-app-key-see-icon','visibility_off');
		is_show_appkey = true;
	}
});
//复制AppKey
$('.content-user-list-app-key-copy-btn').on('click',function(event) {
  showToast('APPKEY已复制');
});
//复制文档Key
$('.content-document-edit-dialog-copy-key-btn').on('click',function(event) {
  showToast('复制文档密钥成功');
});
//重置AppKey
$('.content-user-list-app-key-reset-btn').on('click',function(event) {
	if (!isYunChuApp()) {
	confirm('将要重置你的APP KEY，重置后需重新配置。确认继续？',
	function(callback){
		if (callback){
			resetAppkey();
	   }
	});
	}
	sendYunChuAPP('dialog','{"tle":"重置APP KEY","msg":"将要重置你的APP KEY，重置后需重新配置。确认继续？","action":"resetAppkey();"}');
});
function resetAppkey(){
	$.ajax({
				method: 'POST',
				url: 'https://wd.cn.ecsxs.com/api/v1/user/updatekey/?token=' + getCookie('user_token') + '&username=' + getCookie('user_name'),
				data:  'key=true',
				headers: yc_app_ajax_header,
				success: function(data) {
					var json = JSON.parse(data);
					var json_state = json['state'];
					var json_key = json['key'];
					if (json_state == 200) {
						showToast('已重置');
						json_user_appkey = json_key;
						setAttribute('.content-user-list-app-key-copy-btn','data-clipboard-text', json_key);
						if (is_show_appkey) {
							setChildText('.content-user-list-user-app-key',json_key);
						} else {
							setChildText('.content-user-list-user-app-key','***********************************');
						}
					}else{
						showToast(json['msg']);
					}
				},
				error: function(msg) {
					showToast('重置失败');
				}
			});
}
//计算注册时间
function getRegistTimes() {
  window.setTimeout("getRegistTimes()", 1000);
  var runTime = parseInt(Math.round(new Date().getTime() / 1000) - getAttribute('.content-user-list-user-info-regist-time','regist-time'));
  var year = Math.floor(runTime / 86400 / 365);
  runTime = runTime % (86400 * 365);
  var month = Math.floor(runTime / 86400 / 30);
  runTime = runTime % (86400 * 30);
  var day = Math.floor(runTime / 86400);
  runTime = runTime % 86400;
  var hour = Math.floor(runTime / 3600);
  runTime = runTime % 3600;
  var minute = Math.floor(runTime / 60);
  runTime = runTime % 60;
  var second = runTime;
  if (year != 0) {
    year += '年';
  } else {
    year = '';
  }
  if (month != 0) {
    month += '个月';
  } else {
    month = '';
  }
  if (day != 0) {
    day += '天';
  } else {
    day = '';
  }
  if (hour != 0) {
    hour += '小时';
  } else {
    hour = '';
  }
  if (minute != 0) {
    minute += '分钟';
  } else {
    minute = '';
  }
  setChildText('.content-user-list-user-info-regist-time','我已注册' + year + month + day + hour + minute + second + '秒');
};
window.addEventListener('scroll', function(event) {
	//console.log('WindowHeight:' + getWindowHeight() + ' | ScrollTop:' + getScrollTop() + ' | ' + getScrollHeight() + ' | ScrollHeight:' + ((getWindowHeight() + getScrollTop() >= getScrollHeight())?'到底了':'没到底') + " | 当前数量:" + document_total_perpage + " | 总数量:" + document_totals);
    if(getWindowHeight() + getScrollTop() >= getScrollHeight() && document_total_perpage < document_totals) {
		if (getHash() == 'text') {
			textlist(0);
		}
    }
});