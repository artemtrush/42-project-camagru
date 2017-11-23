<?php

abstract class Gallery
{
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
		$query = "SELECT image.path FROM image WHERE image.user_id = :id AND image.id > :last LIMIT 10";
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
}