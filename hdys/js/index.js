//楼梯效果
(function() {
	$(window).on('scroll', function() {
		var $top = $(this).scrollTop();
		//滚动条的距离
		if($top >= 1600) {
			$('#loutinav').show();
		} else {
			$('#loutinav').hide();
		}
		//顶部悬浮搜索框
		if($top >= $('#notice').offset().top) {
			$('.xfsearch').show();
		} else {
			$('.xfsearch').hide();
		}
		$('.louti').each(function() { //拖动滚轮对应的楼梯添加active类
			var $loutitop = $('.louti').eq($(this).index('.louti')).offset().top + 700;

			if($loutitop > $top) {
				$('#loutinav li').removeClass('active');
				$('#loutinav li').eq($(this).index('.louti')).addClass('active');
				return false; //终止循环
			}
		});
	});
	$('#loutinav li').not('#loutinav li.last').on('click', function() { //点击楼梯回到顶部

		$(this).addClass('active').siblings('li').removeClass('active');

		var $offsettop = $('.louti').eq($(this).index('#loutinav li')).offset().top;
		console.log($(this).index('#loutinav li'));
		$('html,body').animate({
			scrollTop: $offsettop
		});

	});
	$('#loutinav .last').on('click', function() { //回到顶部
		//		console.log($('html,body').scrollTop())
		//		$('html,body').scrollTop(0)
		$('html,body').animate({
			scrollTop: 0
		});
	});
})();

//韩都动态部分tab切换
$('#pingpai .pingpai_right .pingpai_right_top span').on('mouseover', function() {
	$(this).addClass('redline').siblings('span').removeClass('redline');
	$('.list').eq($(this).index()).css({
		'display': 'block'
	}).siblings('.list').css({
		'display': 'none'
	});
})

//这些效果在导入部分里面的，所以要等所有加载完毕才可以实现效果
window.onload = function() {
	//网页导航隐藏菜单	
	$('.te').on('mouseover', function() {
		$('.hide').css({
			'visibility': 'visible'
		})
	}).on('mouseout', function() {
		$('.hide').css({
			'visibility': 'hidden'
		})
	})

	//头部滑过字体变色
	$('#header').find('a').hover(function() {
		$(this).addClass('redword');
	}, function() {
		$(this).removeClass('redword');
	})

	//鼠标滑过二级菜单出现三级菜单内容
	$('#nav .nav_left .first').on('mouseenter', function() {
		$('#nav .nav_fenlei .erji').css({
			'visibility': 'visible'
		});
	}).on('mouseleave', function() {
		$('#nav .nav_fenlei .erji').css({
			'visibility': 'hidden'
		});
	})
	$('#nav .nav_fenlei').on('mouseenter', function() {
		$('#nav .nav_fenlei .erji').css({
			'visibility': 'visible'
		});
	})
	$('#nav .nav_fenlei .erji li').hover(function() {
		$(this).addClass('black').siblings('li').removeClass('black'); //滑过二级菜单背景变黑标题右移
		$(this).children('h3').stop(true, true).animate({
			'margin-left': 20
		}, 'linear').parent('li').siblings('li').children('h3').stop(true, true).animate({
			'margin-left': 0
		}, 'linear');
		$('#nav .nav_fenlei .sanji').eq($(this).index()).css({
			'visibility': 'visible'
		});
	}, function() {
		$('#nav .nav_fenlei .sanji').eq($(this).index()).css({
			'visibility': 'hidden'
		});
	})
}

//轮播图效果
$(function() {
	var $num = 0;
	$('#lunbo').on('mouseenter', function() {
		$('#lunbo #te #left').show();
		$('#lunbo #te #right').show();
	})
	$('#lunbo').on('mouseleave', function() {
		$('#lunbo #te #left').hide();
		$('#lunbo #te #right').hide();
	})
	$('ol li').on('click', function() {
		$num = $(this).index();
		lunbo();
	})

	function lunbo() {
		$('ol li').removeClass('active');
		$('ol li').eq($num).addClass('active');
		$('#lunbo ul li').eq($num).stop(true, true).animate({
			'opacity': 1
		}, 200).siblings('li').stop(true, true).animate({
			'opacity': 0
		}, 200)
	}

	$('#left').on('click', function() {
		$num--;
		if($num < 0) {
			$num = 7;
		}
		lunbo();
	})
	$('#right').on('click', function() {
		$num++;
		if($num > 7) {
			$num = 0;
		}
		lunbo();
	})
});

//新品上市tab切换效果
(function() {
	var $num = 0;
	var timer = null;
	$('#xinpin .xinpin_head p a').on('mouseover', function() {
		clearInterval(timer);
		$num = $(this).index();
		$(this).addClass('bg').siblings('a').removeClass('bg');
		$('#xinpin .waitao .xinpin_body1').eq($(this).index() / 2).animate({
			'opacity': 1
		}, 1000).siblings('.xinpin_body1').css({
			'opacity': 0
		});

	}).on('mouseout', function() {
		timer = setInterval(function() {
			$num += 2;
			$('#xinpin .xinpin_head p a').eq($num / 2).addClass('bg').siblings('a').removeClass('bg');
			$('#xinpin .waitao .xinpin_body1').eq($num / 2).animate({
				'opacity': 1
			}, 1000).siblings('.xinpin_body1').css({
				'opacity': 0
			});
			if($num >= 10) {
				$num = -2;
			}
		}, 2000)
	})

	timer = setInterval(function() {
		$num += 2;
		if($num >= 10) {
			$num = 0;
		}
		$('#xinpin .xinpin_head p a').eq($num / 2).addClass('bg').siblings('a').removeClass('bg');
		$('#xinpin .waitao .xinpin_body1').eq($num / 2).animate({
			'opacity': 1
		}, 1000).siblings('.xinpin_body1').css({
			'opacity': 0
		});
	}, 2000)
})();

//热销排行榜切换效果
(function() {
	$('.hstyle .hstyle_body .hstyle_body_r .right ul li').hover(function() {
		$('.hstyle .hstyle_body .hstyle_body_r .right ul li h2').css({
			'display': 'block'
		});
		$('.hstyle .hstyle_body .hstyle_body_r .right ul li ul').css({
			'display': 'none'
		});
		$(this).children('ul').css({
			'display': 'block'
		}).children('h2').css({
			'display': 'none'
		});
	})
})();

//HSTYLE下面部分的li标签php取出数据，ajax拿来拼接
$.ajax({
	type: "get",
	url: "http://127.0.0.1/js1708/hhandou/php/mysql.php",
	async: false,
	dataType: 'json'
}).done(function(d) {
	var $html = '';
	for(var i = 0; i < 5; i++) {
		$html += '<li>' + '<img src="' + d[i].url + '" sid=' + d[i].sid + '>' +
			'<div class="price">' + d[i].price +
			'<del>' + d[i].delprice +
			'</del>' +
			'</div>' +
			'<span class="buy">立即抢购</span>' +
			'</li>';
	}
	$('.hstyle_pic ul').html($html);
})

//新品上市，tab切换区填充数据
$.ajax({
	type: "get",
	url: "http://127.0.0.1/js1708/hhandou/php/mysql.php",
	async: false,
	dataType: 'json'
}).done(function(d) {
	var $html = '';
	for(var i = 0; i < 25; i++) {
		$html += '<li>' + '<img src="' + d[i].url + '" sid=' + d[i].sid + '>' +
			'<div class="price">' + d[i].price +
			'<del>' + d[i].delprice +
			'</del>' +
			'</div>' +
			'<span class="buy">立即抢购</span>' +
			'</li>';
		if((i + 1) % 5 == 0) {
			$('#xinpin .waitao .xinpin_body1').eq(Math.floor(i / 5)).html($html);
			$html = '';
		}
	}
})

//点击首页商品跳转到详情页
function addCookie(key, value, day) {
	var date = new Date(); //创建日期对象
	date.setDate(date.getDate() + day); //过期时间：获取当前的日期+天数，设置给date
	document.cookie = key + '=' + encodeURI(value) + ';expires=' + date; //添加cookie，设置过期时间
}
$('.buy').on('click', function() { //点击购买时将sid存入cookie后跳转到详情页
	var currentsid = $(this).parent('li').find('img').attr('sid');
	addCookie('sid', currentsid);
	location.href = 'http://127.0.0.1/js1708/hhandou/detail.html';
})

//页面底部友情链接滚动
$(function() {
	var $c = 0;
	var timer = null;
	var bstop = true;

	function dingshi() {
		if(bstop) {
			timer = setInterval(function() {
				$c--;
				if($('#scroll div p').position().left<= -($('#scroll div p').width() - 1100)) {
					$c = 1
				}
				$('#scroll div p').css('left', $c);
			}, 20)
		} else {
			clearInterval(timer);
		}
	}
	dingshi();
	$('#scroll div p').on('mouseover', function() {

		bstop = false;
		dingshi()
	}).on('mouseout', function() {
		bstop = true;
		dingshi()
	})
})