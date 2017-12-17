//添加cookie的函数
function addCookie(key, value, day) {
	var date = new Date(); //创建日期对象
	date.setDate(date.getDate() + day); //过期时间：获取当前的日期+天数，设置给date
	document.cookie = key + '=' + encodeURI(value) + ';expires=' + date; //添加cookie，设置过期时间
}
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
//删除cookie
function delCookie(key, value) {
	addCookie(key, value, -1); //添加的函数,将时间设置为过去时间
}

//购物车部分填充数据
function ajx() {
	$.ajax({
		type: 'get',
		url: "http://127.0.0.1/js1708/hhandou/php/mysql.php",
		async: false,
		dataType: 'json',
	}).done(function(d) {
		loadimg(d);
	})
}
//加载图片一个ul一个ul追加
function loadimg(d) {
	var $html = '<ul class="gw-slidesul">';
	for(var i = 0; i < 10; i++) {
		$html += '<li>' + '<img src="' + d[i].url + '"  sid=' + d[i].sid + '>' +
			'<div class="price">' + d[i].price +
			'<del>' + d[i].delprice +
			'</del>' +
			'</div>' +
			'<span class="buy">加入购物车</span>' +
			'</li>';
		if((i + 1) % 5 == 0) {
			$html += '</ul>'
			$('.gw-suoul').append($html);
			$html = '<ul class="gw-slidesul">';
		}
	}
}
ajx();

//懒加载图片--获取高度无效
$(window).on('scroll', function() {
	if(($('.gw-huand .gw-slides').height() + $('.gw-huand .gw-slides').offset().top) < ($(window).height() + $(document).scrollTop())) {
		ajx();
	}
})

//购物车部分
var arrsid = [];
var arrnum = [];

function cookieToArray() { //将cookie转化为数组
	if(getCookie('carsid')) { //carsid:cookie的key
		arrsid = getCookie('carsid').split(',');
	} else {
		arrsid = [];
	}
	if(getCookie('carnum')) { //carnum:cookie的数量value
		arrnum = getCookie('carnum').split(',');
	} else {
		arrnum = [];
	}
}
//鼠标点击加入购物车，将商品对应的sid 和 num 加入到cookie中
$('.gw-huand .gw-slidesul li .buy').on('click', function() {
	var $sid = $(this).siblings('img').attr('sid'); //商品列表里面的图片的sid
	cookieToArray();
	if($.inArray($sid, arrsid) != -1) { //商品列表的sid在cookie的arrsid里面存在则数量加加
		$('#gw_wrap .gw_shopping .car_goodlist ul li .product .product_img img').each(function() { //循环遍历出商品列表的sid和购物车列表的sid相同
			//循环购物车列表里面的图片	
			if($sid == $(this).attr('sid')) { //数量加加
				var num = $(this).parents('li').find('.numder .num').html();
				num++;
				$(this).parents('li').find('.numder .num').html(num);
				arrnum[$.inArray($sid, arrsid)] = num; //将数量存入到对应的cooike的位置   $.inArray(sid,arrsid) 存在会返回当前位置    	  	 
				addCookie('carnum', arrnum.toString(), 7);
				totalPrice(); //数量增加一次计算一次总价
			}
		})
	} else { //不存在则sid写入数据库，并且数量为1写入数据库
		arrsid.push($sid);
		addCookie('carsid', arrsid.toString(), 7);
		arrnum.push(1);
		addCookie('carnum', arrnum.toString(), 7);
		creategoods($sid, 1) //调用创建购物车商品列表
		$('#gw_wrap .gw_shopping .car_goodlist p').css({
			'display': 'none'
		});
	}
})

//创建购物车商品列表
function creategoods(sid, num) {
	$.ajax({
		url: "http://127.0.0.1/js1708/hhandou/php/mysql.php",
		dataType: 'json',
		async: false,
	}).done(function(d) {
		for(var i = 0; i < d.length; i++) {
			if(sid == d[i].sid) {
				var $cloneli = $('.car_goodlist ul li:hidden').clone(true);
				$cloneli.css({
					'display': 'block'
				});
				$cloneli.find('.product .product_img img').attr({
					src: d[i].url,
					sid: d[i].sid
				})
				$cloneli.find('.product p a').html(d[i].title);
				$cloneli.find('.price .con span').html(d[i].price);
				$cloneli.find('.price .con del').html(d[i].delprice);
//				console.log(num);
				$cloneli.find('.numder .num').html(num);
//				console.log($cloneli.find('.numder .num').html());
				//#gw_wrap .gw_shopping .car_goodlist ul li .numder .num
				$cloneli.find('.xiaoji').html(d[i].price);
				$('#gw_wrap .gw_shopping .car_goodlist ul').append($cloneli);
				totalPrice(); //创建一次列表计算一次总价
			}
		}
	})
}

//计算总价
function totalPrice() {
	var $totalprice = 0;
	$('#gw_wrap .gw_shopping .car_goodlist ul li').not('.car_goodlist ul li:hidden').each(function() {
		var $num = $(this).find('.numder .num').html();
		var $price = $(this).find('.con span').html().substring(1);
		var $liprice = $num * $price;
		$(this).find('.xiaoji').html('￥' + $liprice); //将每个li标签里面的小计总价写入
		$totalprice += $liprice;
	})
	$('#gw_wrap .gw_zongjia .zj_right b').html('￥' + $totalprice); //将最终所有商品的总价写入
	$('#gw_wrap .gw_shopping .car_info .car_info_right table tbody tr td').eq(2).html($('#gw_wrap .gw_zongjia .zj_right b').html())
}

//点击加号减号数量加加减减
$('#gw_wrap .gw_shopping .car_goodlist ul li .numder .jian').on('click', function() {
	var $nb = $(this).next('span').text();
	$(this).next('span').text(++$nb);
	totalPrice(); //计算小计价格和总价格
	var $addsid = $(this).parent('.numder').parent('li').find('img').attr('sid');
	arrnum[$.inArray($addsid, arrsid)] = $nb - 1; //将数量存入到对应的cooike的位置   $.inArray(sid,arrsid) 存在会返回当前位置
	addCookie('carnum', arrnum.toString(),7);
})
$('#gw_wrap .gw_shopping .car_goodlist ul li .numder .jia').on('click', function() {
	var $nb2 = $(this).prev('span').text();
	if($nb2 > 0) {
//		console.log($nb2--);
		$(this).prev('span').text(--$nb2);
		totalPrice(); //计算小计价格和总价格
		var $reducesid = $(this).parent('.numder').parent('li').find('img').attr('sid');
		arrnum[$.inArray($reducesid, arrsid)] = $nb2 - 1; //将数量存入到对应的cooike的位置   $.inArray(sid,arrsid) 存在会返回当前位置
		addCookie('carnum', arrnum.toString(), 7);
	}
})

//自动获取cookie创建购物车列表
cookieToArray();
if(getCookie('sid') && getCookie('num')) {
	
		var sidper = getCookie('sid');
		var numper = getCookie('num');
		
		arrsid.push(sidper);
		arrnum.push(numper);
		addCookie('carnum',arrnum.toString(),7);
		addCookie('carsid',arrsid.toString(),7);
//console.log(getCookie('carsid'))
		
	}

//console.log(getCookie('carsid'))
if(getCookie('carsid') && getCookie('carnum')) {
	cookieToArray();
	for(var i = 0; i < arrsid.length; i++) {
		creategoods(arrsid[i],arrnum[i]);

		$('#gw_wrap .gw_shopping .car_goodlist p').css({
			'display': 'none'
		});
	}
}

//删除商品
$('#gw_wrap .gw_shopping .car_goodlist ul li .caozuo .cz a').on('click', function() {
	$(this).parents('li').remove();
	var $delsid = $(this).parents('li').find('img').attr('sid');
	cookieToArray();
	var $index = $.inArray($delsid, arrsid);
	arrsid.splice($index,1);
	arrnum.splice($index,1);
	addCookie('carsid', arrsid.toString(), 7);
	addCookie('carnum', arrnum.toString(), 7);
	
})