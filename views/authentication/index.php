<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="content-type" content="text/html" charset="utf-8">
	<title>Authentication</title>

    <link href="https://fonts.googleapis.com/css?family=Cabin|Dosis|Acme" rel="stylesheet">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
	<link href="/template/css/style.css" rel="stylesheet" type="text/css">

	<script src="/template/js/authentication.js"></script>
	<script src="/template/js/header.js"></script>
</head>
<body class="authentication">

<div class="container-fluid">
	<div class="row">
		<div id="sign_form" class="col-md-6 col-md-offset-3 authentication_nav">
			<div class="row">

				<div class="col-md-12">
					<p class="text-center" id="hint_area"></p>
				</div>

				<div class="col-md-8 col-md-offset-2">
					<div class="form-group">
						<input id="login" class="form-control input_field" maxlength="15" placeholder="login">
					</div>
					<div class="form-group">
						<input id="mail" class="form-control input_field" maxlength="50" placeholder="email">
					</div>
					<div class="form-group">
						<input type="password" id="pass" class="form-control input_field" maxlength="20" placeholder="password">
					</div>
					<div class="form-group">
						<input type="password" id="confirm" class="form-control input_field" maxlength="20" placeholder="confirmation">
					</div>
				</div>

				<div class="col-md-8 col-md-offset-2">
					<a class="btn button" id="sign"></a>
                    <a class="btn button" id="switch"></a>
					<a class="btn button" id="forgot">I forgot my password</a>
                    <div>
                        <a class="btn button" id="search_button" onclick="H.searchShow()"
                        style="padding: 12px;">
                            I'm just looking for someone
                            <span class="glyphicon glyphicon-search" style="font-size: 80%;"></span>
                        </a>
                        <input class="form-control input_field auth_search" id="search_input"
                               maxlength="15" placeholder="search" onblur="H.searchHide()">
                        <ul id="search_drop_down">
                            <li class="search_login" onmousedown="H.searchRedirect(this.innerHTML);"></li>
                            <li class="search_login" onmousedown="H.searchRedirect(this.innerHTML);"></li>
                            <li class="search_login" onmousedown="H.searchRedirect(this.innerHTML);"></li>
                            <li class="search_login" onmousedown="H.searchRedirect(this.innerHTML);"></li>
                            <li class="search_login" onmousedown="H.searchRedirect(this.innerHTML);"></li>
                        </ul>
                    </div>
				</div>

			</div>
		</div>

		<div id="email_code" class="col-md-6 col-md-offset-3 authentication_nav">
            <div class="row">
                <div class="col-md-12">
                    <p id="verification_hint"></p>
                </div>

                <div class="col-md-8 col-md-offset-2">
                    <div class="form-group">
                        <input id="code" class="form-control input_field" maxlength="20" placeholder="verification code">
                    </div>
                </div>

                <div class="col-md-8 col-md-offset-2">
                    <a id="register" class="btn button"> Complete registration </a>
                    <a id="repeat" class="btn button"> Resend verification code </a>
                    <a id="return_to_sign" class="btn button">Back to the registration form</a>
                </div>
            </div>
		</div>

		<div id="loading" class="col-md-6 col-md-offset-3 authentication_nav"</div>
	</div>
</div>

<?php include_once (ROOT.'/views/_footer.php'); ?>
<script>
    A.initialization();
    H.initialization();
</script>
</body>
</html>