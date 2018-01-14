<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Not Found</title>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link href="/template/css/style.css" rel="stylesheet" type="text/css">

</head>
<body>

<div id="error-image">
    <img src="/template/img/404.png">
</div>
<?php include_once (ROOT.'/views/_footer.php'); ?>
<script>
    setTimeout(function() {
        location.pathname = '/selfie';
    }, 5000);
</script>
</body>
</html>