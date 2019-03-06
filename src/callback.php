-*-coding: utf-8 -*-

<?php

$to = "info@automalar.by";

$name = $_POST['name'];
$number = $_POST['number'];

$message = "ФИО: " . $name . "\nТелефон: " . $number;

$headers  = "Content-type: text/html; charset=utf-8 \r\n"; 
$headers .= "From: automalar.by <info@automalar.by>\r\n"; 

if (mail($to, "Заявка с сайта", $message, $headers, "-finfo@automalar.by")){ 
 	echo "Сообщение успешно отправлено"; 
} else { 
 	echo "При отправке сообщения возникли ошибки";
}

?>