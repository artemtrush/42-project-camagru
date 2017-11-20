<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="content-type" content="text/html" charset="utf-8">
    <title>Recovery</title>

    <link href="https://fonts.googleapis.com/css?family=Gloria+Hallelujah" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Acme" rel="stylesheet">

    <link href="/template/css/reset.css" rel="stylesheet" type="text/css">
    <link href="/template/css/style.css" rel="stylesheet" type="text/css">

    <script src="/template/js/recovery.js"></script>
</head>
<body>

<div id="forgot_form" class="authentication_nav">
    <input type="text" id="rec_alias" placeholder="Enter your email or login">
    <input type="text" id="rec_code" placeholder="Enter code">
    <input type="password" id="rec_pass" placeholder="Enter pass">
    <input type="password" id="rec_confirm" placeholder="Enter confirm">

    <div class="auth_buttons">
    	<span id="rec_prev"> Back </span>
    	<span id="rec_next"> Next </span>
    </div>
    <div class="auth_buttons">
    	<span id="rec_back"> OMG YA VSPOMNIL!10! </span>
    </div>
</div>

<div id="loading" class="authentication_nav"></div>
<?php require_once (ROOT.'/views/_footer.php'); ?>
<script>S.initialization();</script>
</body>
</html>