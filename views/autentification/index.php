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

<script type="text/javascript">
    //action selection
    var sign_in_string = 'Sign in';
    var sign_up_string = 'Sign up';
    var form_status = sign_in_string;
</script>

<input type="text" name="login" id="login" placeholder="Enter username"
       onkeyup="checkLogin(this, document.getElementById('login_status'))"
       onblur="isEmpty(this, document.getElementById('login_status'))">
<span id="login_status"></span>
<br>
<input type="password" name="pass" id="pass" placeholder="Enter password">
<br>
<input type="button" id="forgot" value="forgot">
<input type="button" id="sign" value="">
<input type="button" id="switch" value="">
<br>
<input type="email" name="mail" id="mail" placeholder="Enter email">
<br>
<input type="password" name="confirm" id="confirm" placeholder="Confirm password">
<br>

<?php require_once (ROOT.'/views/_footer.php')?>

<script>
    //set default values
    document.getElementById('sign').value = sign_in_string;
    document.getElementById('switch').value = sign_up_string;
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