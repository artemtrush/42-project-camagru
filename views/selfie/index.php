<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="content-type" content="text/html" charset="utf-8">
    <title>Selfie</title>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link href="/template/css/style.css" rel="stylesheet" type="text/css">

    <script src="/template/js/selfie.js"></script>
</head>
<body class="selfie">
<?php include_once (ROOT.'/views/_loader.php'); ?>
<?php include_once (ROOT.'/views/_header.php');?>

<div id="main_div">
    <div id="media_div">
        <video id="video" autoplay poster="/template/img/poster.png"></video>
        <img id="upload_img" src="#">
    </div>

    <div id="button_div">
        <div id="free_button" onclick="S.emojiFree();">
            <a class="button"> Free </a>
        </div>
        <div id="switch_button">
            <a class="button"> Switch </a>
        </div>
        <div id="upload_button" onclick="document.getElementById('upload_input').click();">
            <a class="button"> Upload </a>
            <input id="upload_input" type="file" accept="image/*" onchange="S.uploadImage();">
        </div>
        <div id="snap_button" onclick="S.snapshot();">
            <a class="button"> Snap </a>
        </div>
    </div>

    <div id="size64" class="emoji_div"></div>
    <div id="size128" class="emoji_div"></div>
    <div id="size256" class="emoji_div"></div>

    <div id="emoji_tab">
        <div id="btn64" class="tab_buttons_disabled" onclick="S.openPack(event, 'size64')">64</div>
        <div id="btn128" class="tab_buttons_disabled" onclick="S.openPack(event, 'size128')">128</div>
        <div id="btn256" class="tab_buttons_disabled" onclick="S.openPack(event, 'size256')">256</div>
    </div>

</div>

<div id="sidebar">
    <span id="side_login"><?php echo $login ?></span>
    <div id="side_div"></div>
    <div id="side_button" onclick="S.sidehide();"></div>
</div>

<?php include_once (ROOT.'/views/_footer.php');?>
<script>S.initialization();</script>
</body>
</html>