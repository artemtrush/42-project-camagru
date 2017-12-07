<?php

/*
https://tympanus.net/Tutorials/CSS3ButtonSwitches/index3.html
https://codepen.io/Katrine-Marie/pen/jPYxvj
http://cssdeck.com/labs/esbtmdeg
https://www.freshdesignweb.com/css3-buttons/

*/


function sendmail($email, $message, $subject = null)
{
	if (!$subject)
		$subject = "PHP SERVER NOTIFICATION";
	return mail($email, $subject, $message);
}