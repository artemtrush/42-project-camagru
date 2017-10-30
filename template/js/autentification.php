<?php
define('ROOT', dirname(dirname(__DIR__)));
require_once(ROOT.'/components/PDOdatabase.php');
$db = DB::get();

$username = $_POST['username'];
$user_query = <<<EOQ
SELECT * FROM `user`;
EOQ;
var_dump($db->query($user_query));
echo false;