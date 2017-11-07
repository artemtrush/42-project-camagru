<?php

abstract class Autentification
{
	public static function emailVerify($params)
	{
		$usermail = $params['usermail'];
		$query = "SELECT COUNT(email) FROM user WHERE user.email = :mail";
		$result = DB::query($query, array(':mail' => $usermail), false);
		$result_array = $result->fetch(PDO::FETCH_ASSOC);
		if ($result_array['COUNT(email)'] === 0)
			return true;
		return false;
	}

	public static function loginVerify($params)
	{
		$username = $params['username'];
		$query = "SELECT COUNT(login) FROM user WHERE user.login = :name";
		$result = DB::query($query, array(':name' => $username), false);
		$result_array = $result->fetch(PDO::FETCH_ASSOC);
		if ($result_array['COUNT(login)'] === 0)
			return true;
		return false;
	}

	public static function sendCode($params)
	{
		$usermail = trim($params['usermail']);
		$username = $params['usermail'];
		$userpass = $params['userpass'];
		$code = rand(111111, 999999);

		session_start();
		$_SESSION['userdata'] = array('username' => $username,
                            'usermail' => $usermail,
                            'userpass' => sha1($userpass),
                            'usercode' => sha1($code));

		$subject = "PHP SERVER {$code}";
		$message = "Code: {$code}";

		return mail($usermail, $subject, $message);
	}

	public static function signIn($params)
	{
		$username = $_POST['username'];
		$userpass = $_POST['userpass'];
		$query = "SELECT user.id FROM user WHERE user.login = :name  AND user.password = :pass";
		$result = DB::query($query, array(':name' => $username, ':pass' => $userpass), false);
		$result_array = $result->fetch(PDO::FETCH_ASSOC);

		if ($result_array !== false)
		{
    		session_start();
    		$_SESSION['user_id'] = $result_array['id'];
    		return true;
		}
		return false;
	}

	public static function signUp($params)
	{

	}
}