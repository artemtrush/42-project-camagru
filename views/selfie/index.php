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

</head>
<body>
<?php require_once (ROOT.'/views/_header.php')?>

<video id="video" width="640" height="480" autoplay poster="/template/img/success.jpg"></video>
<button id="snap">Snap Photo</button>
<canvas id="canvas" width="640" height="480"></canvas>
<script>
//    window.stream.getVideoTracks()[0].stop();

        navigator.webcam = (
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia
        );

        function mediaSuccess(stream) {
            const video = document.getElementById('video');
            video.srcObject = stream;
            video.play();
        }

        function mediaError(error) {
            console.log(error);
        }

        navigator.webcam({video:true, audio:false}, mediaSuccess, mediaError)


    // Elements for taking the snapshot
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var video = document.getElementById('video');

    // Trigger photo take
    document.getElementById("snap").addEventListener("click", function() {
        context.drawImage(video, 0, 0, 640, 480);
    });



</script>

<?php require_once (ROOT.'/views/_footer.php')?>
<!--    <script src="/template/js/selfie.js"></script>-->
</body>
</html>