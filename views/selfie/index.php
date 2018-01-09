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

<div class="container-fluid" id="media_container">
    <div class="row">
        <div class="col-md-7 col-md-offset-1">
            <div class="row" style="position: relative;">
                <div class="col-xs-12 col-sm-12 col-md-11" id="media_div">
                    <video id="video" autoplay poster="/template/img/poster.png"></video>
                    <img id="upload_img" src="#">
                </div>

                <div class="col-xs-12 col-sm-12 col-md-1" id="button_div">
                        <div class="text_button" id="free_button" onclick="S.emojiFree();">
                            <span> Free </span>
                        </div>
                        <div class="text_button" id="switch_button">
                            <span> Switch </span>
                        </div>
                        <div class="text_button" id="upload_button" onclick="document.getElementById('upload_input').click();">
                            <span> Upload </span>
                            <input id="upload_input" type="file" accept="image/*" onchange="S.uploadImage();">
                        </div>
                        <div class="text_button" id="snap_button" onclick="S.snapshot();">
                            <span> Snap </span>
                        </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-11">
                            <div id="size64" class="emoji_div"></div>
                            <div id="size128" class="emoji_div"></div>
                            <div id="size256" class="emoji_div"></div>
                        </div>

                        <div class="col-xs-12 col-sm-12 col-md-1" id="emoji_tab">
                            <div class="row">
                                <div id="btn64" class="col-xs-4 col-sm-4 col-md-12 tab_buttons_disabled" onclick="S.openPack(event, 'size64')">64</div>
                                <div id="btn128" class="col-xs-4 col-sm-4 col-md-12 tab_buttons_disabled" onclick="S.openPack(event, 'size128')">128</div>
                                <div id="btn256" class="col-xs-4 col-sm-4 col-md-12 tab_buttons_disabled" onclick="S.openPack(event, 'size256')">256</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>


        <div class="hidden-xs hidden-sm col-md-2 col-md-offset-2" id="sidebar">
            <span id="side_login"><?php echo $login ?></span>
            <div id="side_div"></div>
            <div id="side_button" onclick="S.sidehide();"></div>
        </div>

    </div>
</div>

<?php include_once (ROOT.'/views/_footer.php');?>
<script>S.initialization();</script>
</body>
</html>