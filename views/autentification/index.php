<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="content-type" content="text/html" charset="utf-8">
    <title>Autentification</title>

    <link href="https://fonts.googleapis.com/css?family=Gloria+Hallelujah" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Acme" rel="stylesheet">

    <link href="/template/css/reset.css" rel="stylesheet" type="text/css">
    <link href="/template/css/style.css" rel="stylesheet" type="text/css">

    <script src="/template/js/autentification/autentification.js"></script>
</head>
<body>

<div id="sign_form" class="autentification_nav">
    <input type="text" name="login" id="login" placeholder="Enter username">
    <span id="login_status"></span>

    <br>

    <input type="password" name="pass" id="pass" placeholder="Enter password">
    <span id="pass_status"></span>
    <br>

    <input type="button" id="forgot" value="Forgot pass">


    <input type="button" id="sign" value="" onclick="sign_user()">

    <input type="button" id="switch" value="" onclick="switch_sign()">
    <br>

    <!-- Drop-down sign up-->
    <div id="drop_down_sign_up" class="">
        <input type="text" name="mail" id="mail" placeholder="Enter email" onkeyup="checkEmail()">
        <span id="mail_status"></span>
        <br>
        <input type="password" name="confirm" id="confirm" placeholder="Confirm password" onkeyup="checkConfirm()">
        <span id="confirm_status"></span>
        <br>
    </div>
</div>

<div id="email_code" class="autentification_nav">
    hhehehhe
</div>

<div id="loading" class="autentification_nav"></div>

<?php require_once (ROOT.'/views/_footer.php'); ?>

<script type="text/javascript">setDefaultValues();</script>

</body>
</html>