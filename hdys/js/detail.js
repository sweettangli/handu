//放大镜效果
(function() {
	$(document).ready(function() {
		var $sf_with = $('#spic').width() * $('#bf').width() / $('#bpic').width();
		var $sf_height = $('#spic').height() * $('#bf').height() / $('#bpic').height();
		var $shortx = 0;
		var $shorty = 0;
		//移入图片时小放，大放都显现
		$('#spic').on('mouseenter', function(ev) {
			$('#sf').css({
				'visibility': "visible",
				'width': $sf_with,
				'height': $sf_height,
				'left': ev.pageX - $sf_with / 2 - $('.fdj').offset().left,
				'top': ev.pageY - $sf_height / 2 - $('.fdj').offset().top,
				'background':'orange'
				//ev.pageX鼠标相对于文档左边缘的位置;
			});

			//移动时left，top变化
			$("#spic").on('mousemove', function(ev) {
				var $scale = $('#bpic').width() / $('#spic').width();
				var $x = ev.pageX - $('.fdj').offset().left - $("#sf").width() / 2;
				var $y = ev.pageY - $('.fdj').offset().top - $("#sf").height() / 2;
				if($x > ($('#spic').width() - $('#sf').width())) {
					$x = $('#spic').width() - $('#sf').width();
				} else if($x <= 0) {
					$x = 0;
				}
				if($y > ($('#spic').height() - $('#sf').height())) {
					$y = $('#spic').height() - $('#sf').height();
				} else if($y <= 0) {
					$y = 0;
				}
				$('#sf').css({
					'left': $x,
					'top': $y
				})
				$("#bf").css("visibility", "visible");
				$('#bpic').css({
					'visibility': "visible",
					left: -$scale * $x,
					top: -$scale * $y,
				})
			})
		})

		//移出时都消失
		$("#spic").on('mouseleave', function() {
			$('#sf').css({
				'visibility': "hidden"
			})
			$('#bf').css({
				'visibility': "hidden"
			})
			$('#bpic').css({
				'visibility': "hidden"
			})
		})

		//通过数量控制左右键是否被禁用
		var $num = 6;
		var $li_width = $('#list ul li').innerWidth();
		var $ali = $('#list ul li').size();
		$('#right').on('click', function() {
			if($num > $ali - 2) {
				$('#right').css({
					'color': '#fff'
				}).off('click');
			}
			$('#list ul').css({
				left: $('#list ul').position().left - $li_width
			})
			$('#left').css({
				'color': '#333'
			})
			$num++;
		})

		$('#left').on('click', function() {
			if($num < $ali - 2) {
				$(this).css({
					'color': '#fff'
				}).off('click');
				$('#right').css({
					'color': '#333'
				})
			}
			$('#list ul').css({
				left: $('#list ul').position().left + $li_width
			})
			$('#right').css({
				'color': '#333'
			})
			$num--;
		})
		$('#list ul li img').on('mouseover', function() {
			$('#bpic').attr('src', $(this).attr('src'));
			$('#spic img').attr('src', $(this).attr('src'));
		})
	});

})();


//得到cookie
function getCookie(key) {
	var str = decodeURI(document.cookie);
	var arr = str.split('; ');
	for(var i = 0; i < arr.length; i++) {
		var arr1 = arr[i].split('=');
		if(arr1[0] == key) {
			return arr1[1];
		}
	}
}
//获取cookie换掉详情页的信息
$.ajax({
	type: "get",
	url: "http://127.0.0.1/js1708/hhandou/php/mysql.php",
	async: false,
	dataType: 'json'
}).done(function(d){
	var sid=getCookie('sid');
	for(var i=0;i<d.length;i++){
		if(sid==d[i].sid){
			$('#box .fdj #spic img').attr('src',d[i].url);
			$('#box .fdj #bf img').attr('src',d[i].url);
			$('#box .info #xq-goods1 .n-price').html(d[i].price);
			$('#box .info #xq-goods1 .o-price').html(d[i].delprice);
			$('#box .info #xq-goods1 .xq-list .code').html(d[i].title);
		}
	}
})
//添加cookie的函数
		function addCookie(key,value,day){
			var date=new Date();//创建日期对象
			date.setDate(date.getDate()+day);//过期时间：获取当前的日期+天数，设置给date
			document.cookie=key+'='+encodeURI(value)+';expires='+date;//添加cookie，设置过期时间
		}
//得到cookie
		function getCookie(key){
			var str=decodeURI(document.cookie);
			var arr=str.split('; ');
			for(var i=0;i<arr.length;i++){
				var arr1=arr[i].split('=');
 				if(arr1[0]==key){
					return arr1[1];
				}
			}
		}
//if(!getcookie('sid')){
//	var sid=$('#box .fdj #spic img').attr('sid');
//	addCookie('sid',sid,7)
//}
//点击数量加加减减
var num=$('#box .info #xq-goods3 .xq-text').val();
$('#box .info #xq-goods3 .xq-del').on('click',function(){
	if(num>0){
		$('#box .info #xq-goods3 .xq-text').val(--num);
	}
})
$('#box .info #xq-goods3 .xq-in').on('click',function(){
	$('#box .info #xq-goods3 .xq-text').val(++num);
})
$('#box .info #xq-goods3 .xq-push').on('click',function(){
	num=$('#box .info #xq-goods3 .xq-text').val();
	addCookie('num',num,7);//将数量写入cookie，然后跳转页面
	location.href='http://127.0.0.1/js1708/hhandou/shoppingcar.html';
})

