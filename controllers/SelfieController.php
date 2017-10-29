<?php

include_once (ROOT.'/models/Selfie.php');

class SelfieController
{
    public function actionIndex()
    {
        require_once(ROOT.'/views/selfie/index.php');
        return true;
    }
}