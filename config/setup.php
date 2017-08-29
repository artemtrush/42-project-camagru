<?php

include('database.php');

function connect($DB_DSN, $DB_USER, $DB_PASSWORD)
{
    try {
        $db = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
// ATTR_ERRMODE - Режим сообщений об ошибках.
// ERRMODE_EXCEPTION - Выбрасывать исключения.
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch (PDOException $err) {
        echo 'Connection failed: ' . $err->getMessage() . PHP_EOL;
        $db = null;
    }
    return ($db);
}

function create_db(PDO $db) {
    $create_query = "CREATE DATABASE IF NOT EXISTS camagru; USE camagru";

    $user_query = "CREATE TABLE IF NOT EXISTS user (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    login VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL)";

    $image_query = "CREATE TABLE IF NOT EXISTS image (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT(6) UNSIGNED NOT NULL,
    rating INT(6) NOT NULL,
    path VARCHAR(100) NOT NULL)";

    $comment_query = "CREATE TABLE IF NOT EXISTS comment (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    image_id INT(6) UNSIGNED NOT NULL,
    text VARCHAR(300) NOT NULL,
    date TIMESTAMP)";

    try {
        $db->exec($create_query);
        $db->exec($user_query);
        $db->exec($image_query);
        $db->exec($comment_query);
    }
    catch (PDOException $err) {
        echo 'Creation failed: ' . $err->getMessage() . PHP_EOL;
        exit;
    }
    print ("Database 'camagru' has been created" . PHP_EOL);
}

$db = connect($DB_DSN, $DB_USER, $DB_PASSWORD);

if ($db) {
    print ("Database successfully connected" . PHP_EOL);
    print ("Type 're' to re-create the database or press 'Enter' to exit:" . PHP_EOL);
    $r = trim(fgets(STDIN));
    if ($r == "re") {
        try {
        $db->exec("DROP DATABASE IF EXISTS camagru");}
        catch (PDOException $err) {
            echo 'Deletion failed: ' . $err->getMessage() . PHP_EOL;
            exit;
        }
        print ("Database 'camagru' has been deleted" . PHP_EOL);
        create_db($db);
    }
}
else {
    print ("Сreate a database? (y|n):" . PHP_EOL);
    do {
        $r = trim(fgets(STDIN));
    } while ($r != 'y' && $r != 'n');
    if ($r == 'n')
        exit;
    $db = connect(str_replace("dbname=camagru;", "", $DB_DSN), $DB_USER, $DB_PASSWORD);
    if ($db)
        create_db($db);
}
