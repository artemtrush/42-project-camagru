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

	private static function sendMail($email, $code)
	{
		$subject = "PHP SERVER {$code}";
		$message = "Code: {$code}";
		return mail($email, $subject, $message);
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
		return self::sendMail($usermail, $code);
	}

	public static function repeatCode()
	{
		session_start();
		if (isset($_SESSION['userdata']) && !empty($_SESSION['userdata']))
		{
			$userarray = $_SESSION['userdata'];
			if (isset($userarray['usermail']) && !empty($userarray['usermail']))
			{
				$code = rand(111111, 999999);
				$_SESSION['userdata']['usercode'] = sha1($code);
				return self::sendMail($userarray['usermail'], $code);
			}
		}
		return false;
	}

	public static function signIn($params)
	{
		$username = $params['username'];
		$userpass = $params['userpass'];
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
		session_start();
		if (isset($_SESSION['userdata']) && 
			sha1($_POST['input_code']) == $_SESSION['userdata']['usercode'])
		{
			
			$query = "INSERT INTO user (login, password, email) VALUES (:login, :password, :email)";
			$result = DB::query($query, array(':login' => $_SESSION['userdata']['username'],
											':email' => $_SESSION['userdata']['usermail'],
										':password' => $_SESSION['userdata']['userpass']));
			var_dump($result);
			if (1)
			{
				if (self::signIn($_SESSION['userdata']))
				{
					unset($_SESSION['userdata']);
					var_dump($_SESSION);
					return true;
				}
			}
		}
		return false;
	}

    public static function signOut()
    {
        session_start();
        if (isset($_SESSION['user_id']))
            unset($_SESSION['user_id']);
    }
}