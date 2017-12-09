<?php

function sendmail($email, $message, $subject = null)
{
	if (!$subject)
		$subject = "PHP SERVER NOTIFICATION";
	return mail($email, $subject, $message);
}