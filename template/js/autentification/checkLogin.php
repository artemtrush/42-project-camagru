<?php
define('ROOT', dirname(dirname(dirname(__DIR__))));
require_once(ROOT.'/components/PDOdatabase.php');

$username = $_POST['username'];
$query = "SELECT COUNT(login) FROM user WHERE user.login = :name";
$result = DB::query($query, array(':name' => $username), false);
$result_array = $result->fetch(PDO::FETCH_ASSOC);
if ($result_array['COUNT(login)'] === 0)
	echo 'does not exist';
else
	echo 'exists';
