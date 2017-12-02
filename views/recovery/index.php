<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="content-type" content="text/html" charset="utf-8">
    <title>Recovery</title>

    <link href="https://fonts.googleapis.com/css?family=Gloria+Hallelujah" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Acme" rel="stylesheet">

    <link href="/template/css/style.css" rel="stylesheet" type="text/css">

    <script src="/template/js/recovery.js"></script>
</head>
<body>

<div id="forgot_form" class="authentication_nav">
    <input id="rec_alias" class="input_field" placeholder="login or email">
    <input id="rec_code" class="input_field" placeholder="verification code">
    <input type="password" id="rec_pass" class="input_field" placeholder="new password">
    <input type="password" id="rec_confirm" class="input_field" placeholder="confirmation">

    <div>
    	<a id="rec_prev" class="button"> Back </a>
    	<a id="rec_next" class="button"> Next </a>
    </div>
    <div>
    	<a id="rec_back" class="button"> I've managed to recall my password </a>
    </div>
</div>

<div id="loading" class="authentication_nav"></div>
<?php include_once (ROOT.'/views/_footer.php'); ?>
<script>R.initialization();</script>
</body>
</html>