<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="content-type" content="text/html" charset="utf-8">
    <title>Selfie</title>
    <meta name="keywords" content="">
    <meta name="description" content="">

    <link href="https://fonts.googleapis.com/css?family=Gloria+Hallelujah" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Acme" rel="stylesheet">

    <link href="/template/css/reset.css" rel="stylesheet" type="text/css">
    <link href="/template/css/style.css" rel="stylesheet" type="text/css">

    <script src="/template/js/selfie.js"></script>
</head>
<body>
<?php require_once (ROOT.'/views/_header.php');?>

<div id="media_div">
    <video class="media_block" id="video" autoplay></video>
    <img class="media_block" id="upload_img" src="#">
    <img class="media_block" id="emoji" src="#">
</div>

<label>
    <span id="upload_span">Upload</span>
    <input id="upload_input" type="file" accept="image/*" onchange="S.uploadImage();">
</label>

<br>



<!-- <canvas id="canvas" width="640" height="480"></canvas> -->

<?php require_once (ROOT.'/views/_footer.php');?>
<script>S.initialization();</script>
</body>
</html>