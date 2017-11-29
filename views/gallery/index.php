<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="content-type" content="text/html" charset="utf-8">
    <title>Gallery</title>
    <meta name="keywords" content="">
    <meta name="description" content="">

    <link href="https://fonts.googleapis.com/css?family=Gloria+Hallelujah" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Acme" rel="stylesheet">

    <link href="/template/css/style.css" rel="stylesheet" type="text/css">

    <script src="/template/js/gallery.js"></script>
</head>
<body>
<?php include_once (ROOT.'/views/_header.php');?>
<h1> <?php echo $login;?> </h1>

<div id="empty_gallery">
    There are no pictures yet :(
</div>

<div id='image_container'></div>
<span id="more_button" onclick="G.getImages();">Load more</span>
<div id="view_image">

    <div id="view_background" onclick="G.hideImage();">
        <img src="/template/img/close_cross.png">
    </div>

    <div id="view_box">

        <div id="image_box">
            <img id="selected_image" src="#">
            <img id="like_image" src="/template/img/like.png">
            <div id="likemeter">
                <img src="/template/img/likemeter.png">
                <span id="likenumber">0</span>
            </div>
        </div>

        <div id="comment_box"></div>
        <div id="message_box">
            <textarea id="comment_area" rows="5" cols="30" maxlength="300" placeholder="type comment"></textarea>
            <button id="send_button">Send</button>
            <button id="remove_button">Delete</button>
        </div>
        <div id="social_box">
            <a id="telegram" class="social_link"><img class="social_icon" src="/template/img/telegram.png"></a>
            <a id="facebook" class="social_link"><img class="social_icon" src="/template/img/facebook.png"></a>
            <a id="twitter" class="social_link"><img class="social_icon" src="/template/img/twitter.png"></a>
            <a id="linkedin" class="social_link"><img class="social_icon" src="/template/img/linkedin.png"></a>
            <a id="google" class="social_link"><img class="social_icon" src="/template/img/google.png"></a>
        </div>
    </div>
</div>

<?php include_once (ROOT.'/views/_footer.php');?>
<script>
    G.owner_id = "<?php echo $id; ?>";
    G.social_access = "<?php echo $social_access; ?>";
    G.deletion_access = "<?php echo $deletion_access; ?>";
    G.initialization();
</script>
</body>
</html>