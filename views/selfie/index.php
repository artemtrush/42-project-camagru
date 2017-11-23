<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="content-type" content="text/html" charset="utf-8">
    <title>Selfie</title>
    <meta name="keywords" content="">
    <meta name="description" content="">

    <link href="https://fonts.googleapis.com/css?family=Gloria+Hallelujah" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Acme" rel="stylesheet">

    <link href="/template/css/style.css" rel="stylesheet" type="text/css">

    <script src="/template/js/selfie.js"></script>
</head>
<body>
<?php include_once (ROOT.'/views/_header.php');?>

<div id="media_div">
    <video id="video" autoplay></video>
    <img id="upload_img" src="#">
</div>

<br><br><br><br><br><br><br><br>


<span id="snap_span" onclick="S.snapshot();">Snap</span>

<label>
    <span id="upload_span">Upload</span>
    <input id="upload_input" type="file" accept="image/*" onchange="S.uploadImage();">
</label>

<br>

<div id="emoji_div">
    <img class="emoji" src="/template/img/sprite.png">
    <img class="emoji" src="/template/img/twitter.png">
    <img class="emoji" src="/template/img/0.png">
    <img class="emoji" src="/template/img/11.png">
    <img class="emoji" src="/template/img/12.png">
</div>

<!-- <canvas id="canvas" width="640" height="480"></canvas> -->

<?php include_once (ROOT.'/views/_footer.php');?>
<script>S.initialization();</script>
</body>
</html>