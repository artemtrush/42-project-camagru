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
        switch (pathinfo($params['emoji_src'], PATHINFO_EXTENSION))
        {
            case 'png':
                $extension = 'png';
                break;
            case 'jpg':
                $extension = 'jpeg';
                break;
            case 'bmp':
                $extension = 'bmp';
                break;
            default:
                return 'false';
        }
        $emj = ('imagecreatefrom'.$extension)($params['emoji_src']);
        imagecopy($img, $emj, $params['left'], $params['top'], 0, 0, imagesx($emj), imagesy($emj));
        if (self::saveImage($img))
            return 'true';
        return 'false';
    }
}