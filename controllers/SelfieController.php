<?php

include_once (ROOT.'/models/Selfie.php');
include_once (ROOT.'/models/Gallery.php');

class SelfieController
{
    public function actionIndex()
    {
    	if (!isset($_SESSION))
			session_start();
    	$login = Gallery::getLogin($_SESSION['user_id']);
        require_once(ROOT.'/views/selfie/index.php');
        return true;
    }
}