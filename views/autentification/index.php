<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="content-type" content="text/html" charset="utf-8">
    <title>Autentification</title>

    <link href="https://fonts.googleapis.com/css?family=Gloria+Hallelujah" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Acme" rel="stylesheet">

    <link href="/template/css/reset.css" rel="stylesheet" type="text/css">
    <link href="/template/css/style.css" rel="stylesheet" type="text/css">
</head>
<body>

<input type="text" name="login" id="login" placeholder="Enter username">
<input type="password" name="pass" id="pass" placeholder="Enter password">
<input type="email" name="mail" id="mail" placeholder="Enter email">

<input type="button" id="forgot" value="forgot">
<input type="button">
<input type="button">

<input type="password" name="confirm" id="confirm" placeholder="Confirm password">

<?php require_once (ROOT.'/views/_footer.php')?>
</body>
</html>