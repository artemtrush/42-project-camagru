<?php
//Front controller

//General settings
ini_set('display_errors', 1);
error_reporting(E_ALL);

//Connecting files
define('ROOT', __DIR__);	include_once(ROOT.'/components/logger/ChromePhp.php');
require_once (ROOT.'/components/Router.php');
include_once(ROOT.'/components/PDOdatabase.php');

//Call Router
$router = new Router();
$router->run();
