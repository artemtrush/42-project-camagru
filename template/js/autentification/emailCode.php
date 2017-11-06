<?php
$usermail = trim($_POST['usermail']);
$username = $_POST['usermail'];
$userpass = $_POST['userpass'];
$code = rand(111111, 999999);

session_start();
$_SESSION['userdata'] = array('username' => $username,
                            'usermail' => $usermail,
                            'userpass' => sha1($userpass),
                            'usercode' => sha1($code));

$subject = "PHP SERVER {$code}";
$message = "Code: {$code}";

if (mail($usermail, $subject, $message))
    echo 'true';
else
    echo 'false';
