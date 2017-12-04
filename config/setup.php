<?php

define('ROOT', dirname(__DIR__));
require_once(ROOT.'/components/PDOdatabase.php');

$db = DB::get();
if ($db) {
    echo "Database already exists" . PHP_EOL . "Do you really want to re-create 'camagru'? (y|n)" . PHP_EOL;
    do {
        $answer = strtolower(trim(fgets(STDIN)));
    } while ($answer != 'n' && $answer != 'y');
    if ($answer == 'y')
        DB::create();
}
else {
    echo "Database creation ..." . PHP_EOL;
    DB::create();
}
