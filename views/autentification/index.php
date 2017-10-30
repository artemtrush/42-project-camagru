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
<!--Start values-->
<script type="text/javascript">
    //  action selection
    //  false = sign in
    //  true = sign up
    var sign_mode = true;
    var pos_color = 'green';
    var neg_color = 'red';
</script>


<!--Username and Password input-->
<input type="text" name="login" id="login" placeholder="Enter username"
       onkeyup="checkLogin(this, document.getElementById('login_status'))"
       onblur="isEmpty(this, document.getElementById('login_status'))">
<span id="login_status"></span>

<br>

<input type="password" name="pass" id="pass" placeholder="Enter password">

<br>

<input type="button" id="forgot" value="Forgot pass">
<input type="button" id="sign" value="">
<input type="button" id="switch" value="" onclick="switch_sign(document.getElementById('sign'),
        document.getElementById('switch'), document.getElementById('drop_down_sign_up'))">
<br>


<!-- Drop-down sign up-->
<div style="visibility: hidden;" id="drop_down_sign_up">
    <input type="email" name="mail" id="mail" placeholder="Enter email">
    <br>
    <input type="password" name="confirm" id="confirm" placeholder="Confirm password">
    <br>
</div>

<?php require_once (ROOT.'/views/_footer.php')?>

<script>
    switch_sign(document.getElementById('sign'),
        document.getElementById('switch'), document.getElementById('drop_down_sign_up'));
    /*
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200)
            alert(request.responseText);
    };

    function update(object)
    {

    }
    */
</script>

</body>
</html>