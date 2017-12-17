<?php
//读写数据库里面数据
header('content-type:text/html;charset=utf-8');
//1.连接上数据库  //false:空   true：1  两种容错的方式
$conn = @mysql_connect('localhost', 'root', '12345678') or die('数据库连接错误' . mysql_error());
/*if(!$conn){//false:空
 die('数据库连接错误'.mysql_error());
 }*/

//2.选择 MySQL 数据库
mysql_select_db('handu') or die('选择数据库错误' . mysql_error());
mysql_query('SET NAMES UTF8');
//设置字符集

//3.设置sql语句
$query = 'select * from user';

$result = mysql_query($query);
//执行sql语句,结果资源类型。(记录集)

$user = '邓小平';
$pass = md5('hehe');
$email = 'dengxiaoping@china.com';

//$query1="insert user values(null,'毛泽东',md5('helloworld'),'maozedong@china.com',NOW())";
$query1 = "insert user values(null,'$user','$pass','email',NOW())";
mysql_query($query1);

//mysql_fetch_array(）拿的是数据表格里面第一条数据，存放在一个数组里面
/*print_r(mysql_fetch_array($result,MYSQL_ASSOC));。
 print_r(mysql_fetch_array($result,MYSQL_ASSOC));
 print_r(mysql_fetch_array($result,MYSQL_ASSOC));*/

$arr = array();
//定义的空数组

for ($i = 0; $i < mysql_num_rows($result); $i++) {
	//print_r(mysql_fetch_array($result,MYSQL_ASSOC));
	$arr[$i] = mysql_fetch_array($result, MYSQL_ASSOC);
}

echo json_encode($arr);
?>