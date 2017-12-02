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

    private static function sendMail($sender, $image_id, $text)
    {
        $query = "SELECT image.user_id FROM image WHERE image.id = :id";
        $result = DB::query($query, array(':id' => $image_id), false);
        $result_array = $result->fetch(PDO::FETCH_ASSOC);
        if (!$result_array)
            return false;
        $receiver = $result_array['user_id'];
        if ($receiver === $sender)
            return true;
        $user_query = "SELECT user.login, user.email FROM user WHERE user.id = :id";
        $user_result = DB::query($user_query, array(':id' => $receiver), false);
        $user_array = $user_result->fetch(PDO::FETCH_ASSOC);
        if (!$user_array)
            return false;
        $sender_name = self::getLogin($sender);
        $receiver_name = $user_array['login'];
        $email = $user_array['email'];

        $subject = "$sender_name comment your photo";
        $message = "Hello $receiver_name, user $sender_name comment your photo with text : $text";
        return mail($email, $subject, $message);
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
        if (!$image_id)
            return 'false';
        $query = "SELECT comment.user_id as username, comment.text, comment.date FROM comment WHERE comment.image_id = :image_id";
        $result = DB::query($query, array(':image_id' => $image_id));
        for ($i = 0; $i < count($result); $i++)
            $result[$i]['username'] = self::getLogin($result[$i]['username']);
        return json_encode($result);
    }

    public static function sendComment($params)
    {
        if (!isset($_SESSION))
            session_start();
        $user_id = $_SESSION['user_id'];
        $text = $params['text'];
        $image_id = self::getImageId($params['src']);
        if (!$image_id)
            return 'false';
        $query = "INSERT INTO comment (user_id, image_id, text) VALUES (:user_id, :image_id, :text)";
        $result = DB::query($query, array(':user_id' => $user_id, ':image_id' => $image_id, ':text' => $text), false);
        if ($result) {
            $_SESSION['comment'] = array('uid' => $user_id, 'imgid' => $image_id, 'text' => $text);
            return 'true';
        }
        return 'false';
    }

    public static function notification()
    {
        if (!isset($_SESSION))
            session_start();
        if (!isset($_SESSION['comment']) || empty($_SESSION['comment']))
            return 'false';
        $array = $_SESSION['comment'];
        unset($_SESSION['comment']);
        if (self::sendMail($array['uid'], $array['imgid'], $array['text']))
            return 'true';
        return 'false';
    }
}