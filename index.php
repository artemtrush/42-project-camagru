<?php
//Front controller

//General settings
ini_set('display_errors', 1);
error_reporting(E_ALL);

//Connecting files
define('ROOT', __DIR__);
require_once (ROOT.'/components/Router.php');

//Connection to the

//Call Router
$router = new Router();
$router->run();
