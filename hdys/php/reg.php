<?php
	require "conn.php";//引入数据库连接的文件
	if(isset($_POST['name']) || isset($_POST['submit'])){//如果有ajax传过来name值 或者有提交
		$username=@$_POST['name'];//有即取
	}else{
		exit('非法操作');//没有输出'非法操作'并且退出
	}
	
	//判断用户名是否存在
	$query="select * from user where usename='$username'";
	$result=mysql_query($query);
	if(mysql_fetch_array($result)){//如果有值代表用户名存在。
		echo true;//有重复
	}else{
		echo false;//没有重复
	}
	
	if(isset($_POST['submit']) && $_POST['submit']=="同意协议并注册"){//存在提交按钮时
		$user=$_POST['usename'];
		$pass=md5($_POST['password']);
		$query="insert user(sid,usename,password) values(default,'$user','$pass')";
		mysql_query($query);
		header('location:../login.html');//注册成功后实现跳转
	}
?>