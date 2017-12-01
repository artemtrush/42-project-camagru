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
		$login = Gallery::getLogin($id);
		if (!$login)
		{
			global $router;
			$router->error404();
		}
		if (!isset($_SESSION['user_id']) || empty($_SESSION['user_id']))
		{
			$social_access = false;
			$deletion_access = false;
		}
		else
		{
			$social_access = true;
			$deletion_access = ($id === $_SESSION['user_id']) ? true : false;
		}
		require_once(ROOT.'/views/gallery/index.php'); 
		return true;
	}
}