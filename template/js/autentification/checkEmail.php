<?php
define('ROOT', dirname(dirname(dirname(__DIR__))));
require_once(ROOT.'/components/PDOdatabase.php');

$usermail = $_POST['usermail'];
$query = "SELECT COUNT(email) FROM user WHERE user.email = :mail";
$result = DB::query($query, array(':mail' => $usermail), false);
$result_array = $result->fetch(PDO::FETCH_ASSOC);
if ($result_array['COUNT(email)'] === 0)
	echo 'does not exist';
else
	echo 'exists';
