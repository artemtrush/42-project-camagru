<?php
define('ROOT', dirname(dirname(__DIR__)));
require_once(ROOT.'/components/PDOdatabase.php');

$username = $_POST['username'];
$username = 'kek';
$user_query = "SELECT COUNT(id) FROM user";
print_r(DB::query($user_query));