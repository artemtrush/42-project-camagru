<?php

//General settings
ini_set('display_errors', 1);
error_reporting(E_ALL);

//Connecting files
define('ROOT', __DIR__);
require_once (ROOT.'/components/Router.php');
include_once(ROOT.'/components/PDOdatabase.php');
include_once(ROOT.'/components/Sendmail.php');

//Call Router
$router = new Router();
$router->run();
