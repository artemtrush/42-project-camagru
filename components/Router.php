<?php

class Router
{
    private $routes;

    public function __construct()
    {
        $routPath = ROOT.'/config/routes.php';
        $this->routes = include($routPath);
    }

    private function getURI()
    {
        if (!empty($_SERVER['REQUEST_URI'])) {
            return trim($_SERVER['REQUEST_URI'], '/');
        }
    }

    public function run()
    {
        //Get request string
        $uri = $this->getURI();
        //Check the value of the request
        foreach ($this->routes as $pattern => $path)
        {
            echo $uri.PHP_EOL;
            echo $pattern .PHP_EOL;
            if (preg_match("~$pattern~", $uri))
                echo "+";
        }

        //
    }

}