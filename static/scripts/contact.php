<?php
$name = $_POST["InputName"];
$number = $_POST["InputNumber"];
$datetime = $_POST["datetimePicker"];
$to = 'anankitpatil@gmail.com';
$subject = 'sukhakartahospital.com Reservation Form | ' . $name;
$message = 'From: ' . $name . "\r\n" .
	'Phone number: ' . $number . "\r\n" .
	'Date & Time: ' . $datetime . "\r\n";
$headers = 'From: reservationform@sukhakartahospital.com' . "\r\n" .
    'Reply-To: ' . $email . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
	
if(mail($to, $subject, $message, $headers)){
	echo 'We have received your contact details. We will get in touch soon!';	
} else{
	echo 'Something went wrong. Please refresh the page and try again.';	
};
?> 