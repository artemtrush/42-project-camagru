<?php
define('ROOT', dirname(dirname(dirname(__DIR__))));
require_once(ROOT.'/components/PDOdatabase.php');

$username = $_POST['username'];
$userpass = $_POST['userpass'];
$query = "SELECT user.id FROM user WHERE user.login = :name  AND user.password = :pass";
$result = DB::query($query, array(':name' => $username, ':pass' => $userpass), false);
$result_array = $result->fetch(PDO::FETCH_ASSOC);

if ($result_array !== false)
{
    session_start();
    $_SESSION['user_id'] = $result_array['id'];
    echo 'true';
}
else
    echo 'false';