define(["jquery"], function() {
			return {
				login: (function() {
					function addCookie(key, value, day) {
						var date = new Date(); //创建日期对象
						date.setDate(date.getDate() + day); //过期时间：获取当前的日期+天数，设置给date
						document.cookie = key + '=' + encodeURI(value) + ';expires=' + date; //添加cookie，设置过期时间
					}
					$('.input_sm').on('click', function() {
						var $username = $('.input_um').val();
						var $password = $('.input_pw').val();
						$.ajax({
							type: 'post',
							url: 'http://127.0.0.1/js1708/hhandou/php/login.php',
							data: { //将用户名和密码传输给后端
								name: $username,
								pass: $password
							},
							success: function(d) { //请求成功，接收后端返回的值
								console.log(d);
								if(d == 1) {
									addCookie('UserName', $username, 7);
									location.href = 'index.html';
								} else {
									$('.error_um').html('用户名或者密码错误');
									$('.input_pw').val('');
								}
							}
						})
					});
				})()
			}
		})