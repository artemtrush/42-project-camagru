<?php

include_once (ROOT.'/models/Autentification.php');

class AutentificationController
{
    public function actionIndex()
    {
        require_once(ROOT.'/views/autentification/index.php');
        return true;
    }
}