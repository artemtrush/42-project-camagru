<?php

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