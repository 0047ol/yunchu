parallaxMouse();
  if (isPC()) {
    showToast('晃动鼠标，会有奇妙的事情发生哦~');
  }
  $(document).on('click', '.content-support-list li', function(event) {
    showToast('你的支持是我们最大的动力');
  });
  function parallaxMouse() {
    if ($('#parallax').length) {
        var scene = document.getElementById('parallax');
        var parallax = new Parallax(scene);
    }
  }
  $.ajax({
		method: 'GET',
		url: 'https://wd.cn.ecsxs.com/api/v1/yunchu/ponsor.php?data=qq',
		success: function(data) {
			var json = JSON.parse(data);
			var data = json['data']['items']['qq'];
			for (var key in data) {
			var qq = data[key][0]['qq'];
			var value = data[key][0]['content'];
			var amount = data[key]['tatol']['amount'];

    var _ys = String(amount).indexOf(".") + 1;
    var count = String(amount).length - _ys;
    if(_ys > 0) {
        if (count < 2){
			amount = amount + '0';
		}
    } else {
        amount = amount + '.00';
    }
			var info = data[key][0]['source'];
			/*if (!isNaN(value)){
			if (value == '0'){
			info = '帮助云储相关测试';
			}else{
			info = '赞助支持<font class="mdui-text-color-red">' + value + '</font>元';
			}
			}else{
			info = value;
			}*/
			var nickname = '<div class="mdui-list-item-title mdui-text-truncate suppport-' + qq + '-nickname-div" style="max-width:180px;">' + qq + '</div>';;
			if (isEmpty(amount)) {
				//info = '帮助云储相关测试';
			} else {
				if (amount >= 10) {
					nickname = '<div class="mdui-list-item-title mdui-text-truncate suppport-' + qq + '-nickname-div mdui-text-color-red" style="max-width:180px;">' + qq + '</div>';
					info = '累计赞助<font class="mdui-text-color-red">' + amount + '</font>元';
				} else {
					info = '累计赞助' + amount + '元';
				}
			}
			var time = stampToDate(data[key][0]['ponsortime'],true).replace(new Date().getFullYear() + '-','');
			if (qq != 1526353170 && qq != 318118088 && qq != 962567460 && qq != 2088343717 && amount >= 1) {
				appendChild('.content-support-list','<li class="mdui-list-item mdui-ripple"><div class="mdui-list-item-avatar"><img class="suppport-' + qq + '-avatar-img" src="https://q1.qlogo.cn/headimg_dl?dst_uin=0&spec=640"></div><div class="mdui-list-item-content">' + nickname + '<div class="mdui-list-item-text mdui-list-item-one-line">' + info + '</div> </div>' + time + '</li>');
			}
			$.ajax({
		method: 'GET',
		url: 'https://0047ol.cn/api/v1/qq/?id=' + qq,
		success: function(data) {
			var json1 = JSON.parse(data);
			var json1_state = json1['code'];
			if(json1_state == 200){
			var qqnumber = json1['data']['qq'];
			var nickname = json1['data']['name'];
			var avatar = json1['data']['avatar'];
				$('.suppport-' + qqnumber + '-avatar-img').attr('src',avatar);
				if (!isEmpty(nickname)) {
					$('.suppport-' + qqnumber + '-nickname-div').html(nickname);
				}
		}
		}
  });
  }
		}
  });