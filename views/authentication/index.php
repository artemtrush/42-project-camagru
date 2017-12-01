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
    <input type="text" id="login" placeholder="Enter username">

    <input type="text" id="mail" placeholder="Enter email">

    <input type="password" id="pass" placeholder="Enter password">

    <input type="password" id="confirm" placeholder="Confirm password">

    <span class="auth_buttons" id="sign"></span>
    <span class="auth_buttons" id="switch"></span>
    <span class="auth_buttons" id="forgot">I forgot my password</span>

    <div>
        <span id="search_span" class="menu" onclick="H.searchShow()">
            Search
        </span>
        <input type="text" id="search_input" maxlength="15" placeholder="type smth" onblur="H.searchHide()">
        <ul id="search_drop_down">
            <li class="search_login" onmousedown="H.searchRedirect(this.innerHTML);"></li>
            <li class="search_login" onmousedown="H.searchRedirect(this.innerHTML);"></li>
            <li class="search_login" onmousedown="H.searchRedirect(this.innerHTML);"></li>
        </ul>
    </div>

</div>

<div id="email_code" class="authentication_nav">
    <input type="text" id="code" placeholder="Enter email code">
    <br>
    <span id="register">Register</span>
    <br>
    <span id="repeat">Repeat</span>
    <br>
    <span id="return_to_sign">Back</span>
    <br>
</div>

<div id="loading" class="authentication_nav"></div>

<?php include_once (ROOT.'/views/_footer.php'); ?>
<script>
    A.initialization();
    H.initialization();
</script>
</body>
</html>