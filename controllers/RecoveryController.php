<?php

include_once (ROOT.'/models/Recovery.php');

class RecoveryController
{
    public function actionIndex()
    {
        require_once(ROOT.'/views/recovery/index.php');
        return true;
    }
}
