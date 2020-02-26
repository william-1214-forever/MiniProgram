<?php
  header('content-type: text/html;charset="utf-8"');
$name = 'jack';

//PHP有 string Number Array Boolean integer float Object null underfinder等基本数据类型
//拼接字符串方式以 '.' 的方式拼接
//创建变量的方式：$name
//在前后端交互过程中 1.将数据结构转为字符串 
//                  2.将字符串转为数据结构 
//Array 分为 1.索引数组 2.关联数组（键值数组） 3.全局数组 ：$_GET $_POST

echo "my name is.$name";

?>
