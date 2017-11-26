<?php

abstract class Selfie
{
    private static function saveImage($data)
    {
        if (!isset($_SESSION))
            session_start();
        $id = $_SESSION['user_id'];
        $dir = ROOT.'/database/'.$id;
        if (!file_exists($dir))
            mkdir($dir, 0777, true);
        do {
            $file = '/database/'.$id.'/'.uniqid().'.png';
        } while (file_exists(ROOT.$file));

        if (imagepng($data, ROOT.$file))
        {
            $query = "INSERT INTO image (user_id, path) VALUES (:user_id, :path)";
            $result = DB::query($query, array(':user_id' => $id, ':path' => $file), false);
            if ($result)
                return true;
        }
        return false;
    }

    public static function combineImage($params)
    {
        $img_encoded = substr($params['image'], 22);
        $img = imagecreatefromstring(base64_decode($img_encoded));
        $emj_list = json_decode($params['emoji_list'], true);

        for ($i = 0; $i < count($emj_list); $i++)
        {
            $emj = imagecreatefrompng($emj_list[$i]['src']);
            $left =  $emj_list[$i]['left'];
            $top = $emj_list[$i]['top'];
            imagecopy($img, $emj, $left, $top, 0, 0, imagesx($emj), imagesy($emj));
        }
        if (self::saveImage($img))
            return 'true';
        return 'false';
    }

    public static function getImages($params)
    {
        if (!isset($_SESSION))
            session_start();
        $id = $_SESSION['user_id'];
        $number = intval($params['number']);
        $query = "SELECT image.path FROM image WHERE image.user_id = :id ORDER BY image.id DESC LIMIT :number";
        $result = DB::query($query, array(':id' => $id, ':number' => $number));
        return json_encode($result);
    }

    public static function getEmoji($params)
    {
        $dir = ROOT.'/template/img/'.$params['dir'];
        if (!file_exists($dir))
            return 'false';
        $list = scandir($dir);
        $array = array();
        foreach ($list as $file)
            if (pathinfo($file, PATHINFO_EXTENSION) === 'png')
                array_push($array, '/template/img/'.$params['dir'].'/'.$file);
        return json_encode($array);
    }

    public static function deleteImage($params)
    {
        $path = strstr($params['path'],'/database/');
        $query = "DELETE FROM image WHERE image.path = :path";
        $result = DB::query($query, array(':path' => $path), false);
        if ($result)
            return 'true';
        return 'false';
    }
}