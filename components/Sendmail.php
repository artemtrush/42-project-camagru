<?php

/*
https://tympanus.net/Tutorials/CSS3ButtonSwitches/index3.html
https://codepen.io/Katrine-Marie/pen/jPYxvj
http://cssdeck.com/labs/esbtmdeg
https://www.freshdesignweb.com/css3-buttons/

*/


include_once('logger/ChromePhp.php');

function sendmail($email, $message, $subject = null)
{
	Chrome::log($email);
	Chrome::log($message);
	if (!$subject)
		$subject = "PHP SERVER NOTIFICATION";
	Chrome::log($subject);
	return mail($email, $subject, $message);
}