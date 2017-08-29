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

    $create_query = "loll";
    $db->query($create_query);
}

$db = connect($DB_DSN, $DB_USER, $DB_PASSWORD);

if ($db) {
    print ("Database successfully connected" . PHP_EOL);
    print ("Type 're' to re-create the database or press 'Enter' to exit:" . PHP_EOL);
    $r = trim(fgets(STDIN));
    if ($r == "re") {
        $db->query("");
    }
}
else {
    print ("Сreate a database? (y|n):" . PHP_EOL);
    do {
        $r = trim(fgets(STDIN));
    } while ($r != 'y' && $r != 'n');
    if ($r == 'n')
        exit;
    $db = connect(str_replace("dbname=test;", "", $DB_DSN), $DB_USER, $DB_PASSWORD);
    if ($db)
        create_db($db);
}
