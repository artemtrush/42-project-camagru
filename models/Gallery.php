<?php

abstract class Gallery
{
    private static function getImageId($src)
    {
        $path = strstr($src,'/database/');
        $query = "SELECT image.id FROM image WHERE image.path = :path";
        $result = DB::query($query, array(':path' => $path), false);
        $result_array = $result->fetch(PDO::FETCH_ASSOC);
        if ($result_array)
            return $result_array['id'];
        return false;
    }

	public static function getLogin($id)
	{
		$query = "SELECT user.login FROM user WHERE user.id = :id";
		$result = DB::query($query, array(':id' => $id), false);
		$result_array = $result->fetch(PDO::FETCH_ASSOC);
		if ($result_array)
			return $result_array['login'];
		return false;
	}

	public static function getImages($params)
	{
		$id = $params['id'];
		$last = intval($params['image_last']);
		$query = "SELECT image.path FROM image WHERE image.user_id = :id AND image.id < :last ORDER BY image.id DESC LIMIT 10";
		$result = DB::query($query, array(':id' => $id, ':last' => $last));
		$last = -1;
		if (count($result) === 10)
		{
			unset($result[9]);
			$last_query = "SELECT image.id FROM image WHERE image.path = :path";
			$last_result = DB::query($last_query, array(':path' => $result[8]['path']), false);
			$last_array = $last_result->fetch(PDO::FETCH_ASSOC);
			if ($last_array)
				$last = $last_array['id'];
		}			
		array_unshift($result, $last);
		return json_encode($result);
	}

	public static function likeImage($params)
    {
        if (!isset($_SESSION))
            session_start();
        $user_id = $_SESSION['user_id'];
        $image_id = self::getImageId($params['src']);
        if (!$image_id)
            return 'false';
        $query = "INSERT INTO vote (image_id, user_id) VALUES (:image_id, :user_id)";
        $result = DB::query($query, array(':image_id' => $image_id, ':user_id' => $user_id), false);
        if ($result)
            return 'true';
        return 'false';
    }

    public static function dislikeImage($params)
    {
        if (!isset($_SESSION))
            session_start();
        $user_id = $_SESSION['user_id'];
        $image_id = self::getImageId($params['src']);
        if (!$image_id)
            return 'false';
        $query = "DELETE FROM vote WHERE vote.image_id = :image_id AND vote.user_id = :user_id";
        $result = DB::query($query, array(':image_id' => $image_id, ':user_id' => $user_id), false);
        if ($result)
            return 'true';
        return 'false';
    }

    public static function checkVote($params)
    {
        if (!isset($_SESSION))
            session_start();
        $user_id = $_SESSION['user_id'];
        $image_id = self::getImageId($params['src']);
        if (!$image_id)
            return 'error';
        $query = "SELECT vote.image_id FROM vote WHERE vote.image_id = :image_id AND vote.user_id = :user_id";
        $result = DB::query($query, array(':image_id' => $image_id, ':user_id' => $user_id), false);
        $result_array = $result->fetch(PDO::FETCH_ASSOC);
        if ($result_array)
            return 'true';
        return 'false';
    }

    public static function countVotes($params)
    {
        $image_id = self::getImageId($params['src']);
        if (!$image_id)
            return 'false';
        $query = "SELECT COUNT(vote.image_id) AS number FROM vote WHERE vote.image_id = :image_id";
        $result = DB::query($query, array(':image_id' => $image_id), false);
        $result_array = $result->fetch(PDO::FETCH_ASSOC);
        if ($result_array)
            return $result_array['number'];
        return 'false';
    }

    public static function getComments($params)
    {
        $image_id = self::getImageId($params['src']);
        $query = "SELECT comment.user_id as username, comment.text, comment.date FROM comment WHERE comment.image_id = :image_id";
        $result = DB::query($query, array(':image_id' => $image_id));
        foreach ($result as $field)
            $field['username'] = self::getLogin($field['username']);
        return json_encode($result);
    }

    public static function sendComment($params)
    {

    }
}