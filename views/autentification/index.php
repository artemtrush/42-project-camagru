<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="content-type" content="text/html" charset="utf-8">
    <title>Autentification</title>

    <link href="https://fonts.googleapis.com/css?family=Gloria+Hallelujah" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Acme" rel="stylesheet">

    <link href="/template/css/reset.css" rel="stylesheet" type="text/css">
    <link href="/template/css/style.css" rel="stylesheet" type="text/css">

    <script src="/template/js/autentification.js"></script>
</head>
<body>

<div id="sign_form" class="autentification_nav">
    <input type="text" name="login" id="login" placeholder="Enter username">

    <input type="text" name="mail" id="mail" placeholder="Enter email">

    <input type="password" name="pass" id="pass" placeholder="Enter password">

    <input type="password" name="confirm" id="confirm" placeholder="Confirm password">

    <div id="auth_buttons">
        <span id="forgot">Forgot pass</span>
        &nbsp;&nbsp;
        <span id="sign"></span>
        &nbsp;&nbsp;
        <span id="switch"></span>
    </div>
</div>

<div id="email_code" class="autentification_nav">
    <input type="text" name="code" id="code" placeholder="Enter email code">
    <span id="register">Register</span>
</div>

<div id="loading" class="autentification_nav"></div>

<?php require_once (ROOT.'/views/_footer.php'); ?>
<script>form.initialization();</script>
</body>
</html>