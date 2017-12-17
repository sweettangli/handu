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
	    $(this).addClass('black').siblings('li').removeClass('black');//滑过二级菜单背景变黑标题右移
	    $(this).children('h3').stop(true,true).animate({'margin-left':20},'linear').parent('li').siblings('li').children('h3').stop(true,true).animate({'margin-left':0},'linear');
		$('#nav .nav_fenlei .sanji').eq($(this).index()).css({
			'visibility': 'visible'
		});
	}, function() {
		$('#nav .nav_fenlei .sanji').eq($(this).index()).css({
			'visibility': 'hidden'
		});
	})
	
}