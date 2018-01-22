<?php

function sendmail($email, $message, $subject = null)
{
	if (!$subject)
		$subject = "Camagru";
	return mail($email, $subject, $message);
}