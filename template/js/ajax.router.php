<?php
define('ROOT', dirname(dirname(__DIR__)));  
include_once(ROOT.'/components/logger/ChromePhp.php');//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
if (isset($_POST['function']) && !empty($_POST['function'])
	&& isset($_POST['model']) && !empty($_POST['model']))
{
	$model = ucfirst($_POST['model']);
	$function = $model.'::'.$_POST['function'];
	$modelFile = ROOT.'\models\\'.$model.'.php';
	if (file_exists($modelFile))
	{
		unset($_POST['function']);
		unset($_POST['model']);
		include_once(ROOT.'\components\PDOdatabase.php');
		include_once($modelFile);
		try 
		{
			$result = $function($_POST);
			echo $result;
		}
		catch (Exception $e)
		{
			echo 'Request error occurred.';
		}
		return ;
	}
}
echo 'Request error occurred.';