<?php

abstract class Recovery
{
    private static function sendCode($email)
    {
        if (!isset($_SESSION))
            session_start();

        $code = rand(111111, 999999);			ChromePhp::log($code);//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        $_SESSION['recovery_code'] = sha1($code);
        $_SESSION['recovery_mail'] = $email;
        $subject = "PHP SERVER {$code}";
        $message = "RECOVERY Code: {$code}";
        return mail($email, $subject, $message);
    }

    public static function aliasVerify($params)
    {
        $alias = $params['useralias'];
        $query = "SELECT user.email FROM user WHERE user.login = :name OR user.email = :mail";
        $result = DB::query($query, array(':name' => $alias, ':mail' => $alias), false);
        $result_array = $result->fetch(PDO::FETCH_ASSOC);
        if ($result_array === false)
            return 'false';
        if (!(self::sendCode($result_array['email'])))
            return 'send_error';
        return 'true';
    }

    public static function codeVerify($params)
    {
        if (!isset($_SESSION))
            session_start();
        if (sha1($params['reset_code']) === $_SESSION['recovery_code'])
            return 'true';
        return 'false';
    }

    public static function passUpdate($params)
    {
        if (!isset($_SESSION))
            session_start();
        $password = sha1($params['new_pass']);
        $email = $_SESSION['recovery_mail'];

        $query = "SELECT user.id FROM user WHERE user.email = :mail";
        $result = DB::query($query, array(':mail' => $email), false);
        $result_array = $result->fetch(PDO::FETCH_ASSOC);
        if ($result_array === false)
            return 'false';
        $id = $result_array['id'];
        $update_query = "UPDATE user SET user.password = :pass WHERE user.id = :id";
        $update_result = DB::query($update_query, array(':pass' => $password, 'id' => $id), false);
        if (!($update_result))
            return 'false';
        $_SESSION['user_id'] = $result_array['id'];
        unset($_SESSION['recovery_mail']);
        unset($_SESSION['recovery_code']);
        return 'true';
    }
}