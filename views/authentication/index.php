<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="content-type" content="text/html" charset="utf-8">
    <title>Authentication</title>

    <link href="https://fonts.googleapis.com/css?family=Gloria+Hallelujah" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Acme" rel="stylesheet">

    <link href="/template/css/style.css" rel="stylesheet" type="text/css">

    <script src="/template/js/authentication.js"></script>
    <script src="/template/js/header.js"></script>
</head>
<body>

<p id="hint_area"></p>

<div id="sign_form" class="authentication_nav">
    <input id="login" class="input_field" placeholder="login">

    <input id="mail" class="input_field" placeholder="email">

    <input type="password" id="pass" class="input_field" placeholder="password">

    <input type="password" id="confirm" class="input_field" placeholder="confirmation">

    <a class="button" id="sign"></a>
    <a class="button" id="forgot">I forgot my password</a>
    <a class="button" id="switch"></a>

    <div>
        <a id="search_link" class="button" onclick="H.searchShow()">
            Search
        </a>
        <input id="search_input" maxlength="15" placeholder="Search" onblur="H.searchHide()">
        <ul id="search_drop_down">
            <li class="search_login" onmousedown="H.searchRedirect(this.innerHTML);"></li>
            <li class="search_login" onmousedown="H.searchRedirect(this.innerHTML);"></li>
            <li class="search_login" onmousedown="H.searchRedirect(this.innerHTML);"></li>
        </ul>
    </div>

</div>

<div id="email_code" class="authentication_nav">
    <span id="verification_hint"></span>
    <input id="code" class="input_field" placeholder="verification code">
    <a id="register" class="button"> Complete registration </a>
    <a id="repeat" class="button"> Resend verification code </a>
    <a id="return_to_sign" class="button">Back!!</a>
</div>

<div id="loading" class="authentication_nav"></div>

<?php include_once (ROOT.'/views/_footer.php'); ?>
<script>
    A.initialization();
    H.initialization();
</script>
</body>
</html>