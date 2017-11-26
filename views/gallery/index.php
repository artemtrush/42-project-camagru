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

<div id='image_container'></div>
<span id="more_button" onclick="G.getImages();">MORE</span>
<div id="view_image">
    <div id="view_background" onclick="G.hideImage();">
        <img src="/template/img/close_cross.png">
    </div>
    <div id="view_box">
        <div id="image_box">
            <img id="selected_image" src="#">
            <img id ="like_image" src="/template/img/like.png" onclick="G.likeImage();">
            <div id="likemeter">
                <img src="/template/img/likemeter.png">
                <span id="likenumber">0</span>
            </div>
        </div>

        <div id="social_container"></div>
    </div>
</div>

<?php include_once (ROOT.'/views/_footer.php');?>
<script>
    G.id = "<?php echo $id; ?>";
    G.access = "<?php echo $access; ?>";
    G.initialization();
</script>
</body>
</html>