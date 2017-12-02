<?php

abstract class Navigation
{
    public static function searchRedirect($params)
    {
        $login = $params['login'];
        $query = "SELECT user.id FROM user WHERE user.login = :login";
        $result = DB::query($query, array(':login' => $login), false);
        $result_array = $result->fetch(PDO::FETCH_ASSOC);
        if ($result_array === false)
            return 'false';
        return 'true'.$result_array['id'];
    }

    public static function searchStart($params)
    {
        if (!isset($_SESSION))
            session_start();
        $id = (isset($_SESSION['user_id']) && !empty($_SESSION['user_id'])) ? $_SESSION['user_id'] : -1;
        $string = $params['search_string'];
        $query = "SELECT user.login FROM user WHERE user.login LIKE BINARY :login AND user.id <> :id LIMIT 3";
        $result = DB::query($query, array(':login' => '%'.$string.'%', ':id' => $id));
        $result_array = array();
        foreach ($result as $field)
            $result_array[] = $field['login'];
        if (count($result_array) > 0)
            return json_encode($result_array);
        return 'false';
    }
}