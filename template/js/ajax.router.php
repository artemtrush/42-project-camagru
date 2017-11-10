<?php
define('ROOT', dirname(dirname(__DIR__)));  include_once(ROOT.'/components/logger/ChromePhp.php');
$output_mode = '';

function eotrue()
{
    global $output_mode;
    if ($output_mode !== 'silent' && $output_mode != 'error_only')
        echo 'true';
}

function eofalse()
{
    global $output_mode;
    if ($output_mode !== 'silent')
        echo 'false';
}


if (isset($_POST['function']) && !empty($_POST['function'])
	&& isset($_POST['model']) && !empty($_POST['model']))
{
    if (isset($_POST['output']) && !empty($_POST['output']))
    {
        $output_mode = $_POST['output'];
        unset($_POST['output']);
    }

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