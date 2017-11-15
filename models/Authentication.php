<?php

abstract class Authentication
{
	public static function emailVerify($params)
	{
		$usermail = $params['usermail'];
		$query = "SELECT COUNT(email) FROM user WHERE user.email = :mail";
		$result = DB::query($query, array(':mail' => $usermail), false);
		$result_array = $result->fetch(PDO::FETCH_ASSOC);
		if ($result_array['COUNT(email)'] === 0)
			return 'true';
		return 'false';
	}

	public static function loginVerify($params)
	{
		$username = $params['username'];
		$query = "SELECT COUNT(login) FROM user WHERE user.login = :name";
		$result = DB::query($query, array(':name' => $username), false);
		$result_array = $result->fetch(PDO::FETCH_ASSOC);
		if ($result_array['COUNT(login)'] === 0)
			return 'true';
		return 'false';
	}

	private static function sendMail($email, $code)
	{
		$subject = "PHP SERVER {$code}";
		$message = "Code: {$code}";
		return mail($email, $subject, $message) ? 'true' : 'false';
	}

	public static function sendCode($params)
	{
		$usermail = trim($params['usermail']);
		$username = $params['username'];
		$userpass = $params['userpass'];
		$code = rand(111111, 999999);			ChromePhp::log($code);//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        if (!isset($_SESSION))
		    session_start();
		$_SESSION['userdata'] = array('username' => $username,
                            'usermail' => $usermail,
                            'userpass' => sha1($userpass),
                            'usercode' => sha1($code));

		return self::sendMail($usermail, $code);
	}

	public static function repeatCode()
	{
        if (!isset($_SESSION))
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
		return 'false';
	}

	public static function signIn($params, $encrypt = true)
	{
		$username = $params['username'];
		$userpass = ($encrypt) ? sha1($params['userpass']) : $params['userpass'];
		$query = "SELECT user.id FROM user WHERE user.login = :name  AND user.password = :pass";
		$result = DB::query($query, array(':name' => $username, ':pass' => $userpass), false);
		$result_array = $result->fetch(PDO::FETCH_ASSOC);

		if ($result_array !== false)
		{
            if (!isset($_SESSION))
    		    session_start();
    		$_SESSION['user_id'] = $result_array['id'];
    		return 'true';
		}
		return 'false';
	}

	public static function signUp($params)
	{
        if (!isset($_SESSION))
		    session_start();
		if (isset($_SESSION['userdata']) && 
			sha1($params['input_code']) == $_SESSION['userdata']['usercode'])
		{
			$check_query = "SELECT user.id FROM user WHERE user.login = :name  OR user.email = :mail";
			$check_result = DB::query($check_query, array(':name' => $_SESSION['userdata']['username'],
														  ':mail' => $_SESSION['userdata']['usermail']),
														  false);
			if (($check_result->fetch(PDO::FETCH_ASSOC)) === false)
			{
				$query = "INSERT INTO user (login, password, email) VALUES (:login, :password, :email)";
				$result = DB::query($query, array(':login' => $_SESSION['userdata']['username'],
												':email' => $_SESSION['userdata']['usermail'],
											    ':password' => $_SESSION['userdata']['userpass']),
                                        	    false);
				if ($result)
				{
					if (self::signIn($_SESSION['userdata'], false))
					{
						unset($_SESSION['userdata']);
						return 'true';
					}
				}
			}
		}
		return 'false';
	}

    public static function signOut()
    {
        if (!isset($_SESSION))
            session_start();
        if (isset($_SESSION['user_id']))
            unset($_SESSION['user_id']);
    }
}