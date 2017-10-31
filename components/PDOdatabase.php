<?php

if (!defined('ROOT'))
    define('ROOT', dirname(__DIR__));
include_once(ROOT.'/config/database.php');

abstract class DB
{
    private static $db = null;
    private static $connect_error_mode = true;

    private static function connect($DB_DSN, $DB_USER, $DB_PASSWORD)
    {
        if (self::$db == null)
        {
            try
            {
                self::$db = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
                /*
                * ATTR_ERRMODE - Режим сообщений об ошибках.
                * ERRMODE_EXCEPTION - Выбрасывать исключения.
                */
                self::$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                self::$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
                //отключить клиент-серверную эмуляцию подготавливаемых запросов
                self::$db->exec("SET NAMES UTF8");
            }
            catch (PDOException $error)
            {
                if (self::$connect_error_mode) {
                    if ($error->getCode() == 2002)
                        echo 'Connection failed: SQLSTATE[HY000] [2002] Connection refused. Check your server' . PHP_EOL;
                    else
                        echo 'Connection failed: ' . $error->getMessage() . PHP_EOL;
                }
                else
                    self::$connect_error_mode = true;
                self::$db = null;
                return false;
            }
        }
        return true;
    }

    private static function delete()
    {
        try
        {
            self::$db->exec("DROP DATABASE IF EXISTS camagru");
            echo "Database 'camagru' has been deleted" . PHP_EOL;
            return true;
        }
        catch (PDOException $error) {
            echo 'Deletion failed: ' . $error->getMessage() . PHP_EOL;
        }
        return false;
    }

    public static function create()
    {
        global $DB_DSN;
        global $DB_USER;
        global $DB_PASSWORD;
        self::$connect_error_mode = false;
        if (self::connect($DB_DSN, $DB_USER, $DB_PASSWORD))
            self::delete();
        else
            self::connect(str_replace("dbname=camagru;", "", $DB_DSN), $DB_USER, $DB_PASSWORD);
        if (self::$db != null)
        {
            $create_query = file_get_contents(ROOT.'/config/sql/create.sql');
            $user_query = file_get_contents(ROOT.'/config/sql/user.sql');
            $image_query = file_get_contents(ROOT.'/config/sql/image.sql');
            $comment_query = file_get_contents(ROOT.'/config/sql/comment.sql');
            try
            {
                self::$db->exec($create_query);
                self::$db->exec($user_query);
                self::$db->exec($image_query);
                self::$db->exec($comment_query);
                echo "Database 'camagru' has been created" . PHP_EOL;
                return true;
            }
            catch (PDOException $error) {
                echo 'Creation failed: ' . $error->getMessage() . PHP_EOL;
            }
        }
        return false;
    }

    public static function query($query_string, $params = array(), $fetch_mode = true)
    {
        $database = self::get();
        $request = $database->prepare($query_string);
        foreach ($params as $item)
            $item = htmlspecialchars($item);
        $request->execute($params);
        if ($fetch_mode)
            return $request->fetchAll(PDO::FETCH_ASSOC);
        return $request;
    }

    public static function get()
    {
        if (self::$db == null)
        {
            global $DB_DSN;
            global $DB_USER;
            global $DB_PASSWORD;
            self::connect($DB_DSN, $DB_USER, $DB_PASSWORD);
        }
        return self::$db;
    }
}