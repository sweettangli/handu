define(["jquery"], function() {
	return {
		change: (function() {
			$('#main .main_right .top #a1').on('click', function() {
				$(this).addClass('activereg');
				$('#main .main_right .top #a2').removeClass('activereg');
				$('#main .main_right .bottom .one').css({
					'display': 'block'
				});
				$('#main .main_right .bottom .two').css({
					'display': 'none'
				});
			})
			$('#main .main_right .top #a2').on('click', function() {
				$(this).addClass('activereg');
				$('#main .main_right .top #a1').removeClass('activereg');
				$('#main .main_right .bottom .one').css({
					'display': 'none'
				});
				$('#main .main_right .bottom .two').css({
					'display': 'block'
				});
			})
		})(),
		reg: (function() {
			yanzhengma();
			$('#usename').focus();

			function yanzhengma() {
				$yzm = ''; //写入验证码
				$arr = [];
				for(var i = 48; i < 58; i++) {
					$arr.push(String.fromCharCode(i));
				}
				for(var i = 97; i < 123; i++) {
					$arr.push(String.fromCharCode(i));
					$arr.push(String.fromCharCode(i).toUpperCase());
				}
				for(var i = 0; i < 4; i++) {
					$yzm += $arr[Math.floor(Math.random() * $arr.length)];
				}
				$('#main .main_right .bottom .two ul .yzmli b').html($yzm);
			}
			$('#main .main_right .bottom .two ul .yzmli b').on('click', function() {
				yanzhengma();
			})

			$('#usename').on('focus', function() {
				$(this).next('i').html('<span style="color:gray">用户名是以数字,字母下划线组成的</span>');
			})

			//表单验证-用户名
			var bstop = true; //不通过
			var usereg = /^([\u4e00-\u9fa5]|[a-zA-Z0-9\_\-]){3,15}$/;
			$('#usename').on('blur', function() {
				var username = $(this).val();
				if(username) {
					if(usereg.test(username)) {
						$.ajax({
							type: 'post',
							url: 'http://127.0.0.1/js1708/hhandou/php/reg.php?__hbt=1513151483589',
							data: {
								name: username
							},
							success: function(d) {
								//						console.log(d);
								if(!d) {
									$('#usename').next('i').css('color', 'green').html('<span style="color:greenyellow">√</span>');
									$('password').focus();
									bstop = false;
								} else {
									$('#usename').next('i').css('color', 'red').html('该用户名已经存在');
									bstop = true; //不通过
								}
							}
						})
					} else {
						$(this).next('i').css('color', 'red').html('格式不正确');
						bstop = true; //不通过
					}
				} else {
					$(this).next('i').css('color', 'red').html('用户名不能为空');
					bstop = true; //不通过
				}

			})

			var regpw = /^[0-9a-zA-Z]{8,24}$/gi;
			var bstop2 = true;
			$('#password').on('focus', function() {
				$(this).next('i').html('<span style="color:gray">密码是8-24位字符包含数字和字母</span>');
			}).on('blur', function() {
				if($(this).val() == '') {
					$(this).next('i').html('<span style="color:red">密码不能为空</span>');
					bstop2 = true;
				} else {
					if(regpw.test($(this).val())) {
						$(this).next('i').html('<span style="color:greenyellow"> √ </span>');
						bstop2 = false;
					} else {
						$(this).next('i').html('<span style="color:red">密码格式不正确 </span>');
						bstop2 = true;
					}
				}
			});

			var bstop3 = true;
			$('#surepw').on('focus', function() {
				$(this).next('i').html('<span style="color:gray">确认密码必须和上次输入的一致</span>');
			}).on('blur', function() {
				if($(this).val() == '') {
					$(this).next('i').html('<span style="color:red">确认密码不能为空</span>');
					bstop3 = true;
				} else {
					if($(this).val() == $('#password').val()) {
						$(this).next('i').html('<span style="color:greenyellow">√</span>');
						bstop3 = false;
					} else {
						$(this).next('i').html('<span style="color:red">两次输入密码不一致</span>');
						bstop = true;
					}
				}
			})

			var bstop4 = true;
			$('#yz').on('blur', function() {
				if($('#yz').val() == $('#main .main_right .bottom .two ul .yzmli b').html()) {
					$('#main .main_right .bottom .two ul .yzmli i').html('<span style="color:greenyellow">√</span>')
					bstop4 = false;
				} else {
					$('#main .main_right .bottom .two ul .yzmli i').html('<span style="color:red">验证码不一致</span>');
					bstop4 = true;
				}
			})

			var bstop5 = true;
			$('#cbx').on('click', function() {
				if($('#cbx').is(':checked')) {
					bstop5 = false;
				} else {
					alert('没同意协议');
					bstop5 = true;
				}
			})

			$('#form1').on('submit', function() {
				if(bstop && bstop2 && bstop3 && bstop4 && bstop5) {
					return false; //阻止按钮跳转。
				}
			});

		})()
	}
})

//正则验证