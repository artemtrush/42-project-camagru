<?php

include_once (ROOT.'/models/Gallery.php');

class GalleryController
{
    public function actionIndex()
    {
    	if (!isset($_SESSION))
    		session_start();
    	$id = $_SESSION['user_id'];
    	return $this->actionView($id);
    }

    public function actionView($id)
    {
        if (!isset($_SESSION))
    		session_start();
    	$access = ($id === $_SESSION['user_id']) ? true : false;
        $login = Gallery::getLogin($id);
        require_once(ROOT.'/views/gallery/index.php'); 
        return true;
    }
}