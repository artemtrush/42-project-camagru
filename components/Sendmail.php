<?php

/*
https://tympanus.net/Tutorials/CSS3ButtonSwitches/index3.html               switch
https://codepen.io/Katrine-Marie/pen/jPYxvj									button
http://cssdeck.com/labs/esbtmdeg
https://www.freshdesignweb.com/css3-buttons/

*/


function sendmail($email, $message, $subject = null)
{
	if (!$subject)
		$subject = "PHP SERVER NOTIFICATION";
	return mail($email, $subject, $message);
}