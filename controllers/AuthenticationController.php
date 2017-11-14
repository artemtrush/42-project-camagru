<?php

include_once (ROOT.'/models/Authentication.php');

class AuthenticationController
{
    public function actionIndex()
    {
        require_once(ROOT.'/views/authentication/index.php');
        return true;
    }
}