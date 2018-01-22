<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="content-type" content="text/html" charset="utf-8">
    <title>Recovery</title>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link href="/template/css/style.css" rel="stylesheet" type="text/css">

    <script src="/template/js/recovery.js"></script>
</head>
<body class="recovery">

<div class="container-fluid">
    <div class="row">
        <div id="forgot_form" class="col-md-4 col-md-offset-4 authentication_nav">

            <div class="form-group">
                <input id="rec_alias" class="form-control input_field" maxlength="50" placeholder="login or email">
            </div>
            <div class="form-group">
                <input id="rec_code" class="form-control input_field recovery-disabled" maxlength="20" placeholder="verification code">
            </div>
            <div class="form-group">
                <input type="password" id="rec_pass" class="form-control input_field recovery-disabled" maxlength="20" placeholder="new password">
            </div>
            <div class="form-group">
                <input type="password" id="rec_confirm" class="form-control input_field recovery-disabled" maxlength="20" placeholder="confirmation">
            </div>

            <div class="row">
                <div class="col-md-push-6 col-md-6">
                    <a id="rec_next" class="btn button" style="min-width: 100px;"> Next </a>
                </div>
                <div class="col-md-pull-6 col-md-6">
                    <a id="rec_prev" class="btn button" style="min-width: 100px;"> Back </a>
                </div>
            </div>
            <a id="rec_back" class="btn button" style="min-width: 350px";> I've managed to recall my password </a>
        </div>

        <div id="loading" class="col-md-6 col-md-offset-3 authentication_nav">
            <div class="loader"></div>
        </div>
    </div>
</div>

<?php include_once (ROOT.'/views/_footer.php'); ?>
<script>R.initialization();</script>
</body>
</html>