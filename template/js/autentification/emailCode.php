<?php
$usermail = trim($_POST['usermail']);

$subject = 'the subject';
$message = 'hello';
$headers = 'From: webmaster@example.com' . "\r\n" .
    'Reply-To: webmaster@example.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

$res = mail($usermail, $subject, $message, $headers);
echo $res;