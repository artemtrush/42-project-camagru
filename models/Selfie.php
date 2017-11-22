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
            $file = ROOT.'/database/'.$id.'/'.uniqid().'.png';
        } while (file_exists($file));
        return imagepng($data, $file);
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
}