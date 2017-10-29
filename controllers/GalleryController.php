<?php

include_once (ROOT.'/models/Gallery.php');

class GalleryController
{
    public function actionIndex()
    {

        return true;
    }

    public function actionView($id)
    {
        echo 'id ='.$id;
        return true;
    }
}