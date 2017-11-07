<?php
define('ROOT', dirname(dirname(__DIR__)));
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
			if ($function($_POST))
				echo 'true';
			else
				echo 'false';
		}
		catch (Exception $e)
		{
			echo 'error';
		}
		return ;
	}
}
echo 'error';