<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="content-type" content="text/html" charset="utf-8">
	<title>Gallery</title>
	<meta name="keywords" content="">
	<meta name="description" content="">

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
		  integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
	<link href="/template/css/style.css" rel="stylesheet" type="text/css">

	<script src="/template/js/gallery.js"></script>
</head>
<body class="gallery">
<?php include_once (ROOT.'/views/_loader.php'); ?>
<?php include_once (ROOT.'/views/_header.php');?>


<div class="container-fluid">
	<div class="row"><div class="col-md-12 gallery-login">
		<?php echo $login;?>
	</div></div>

	<div class="row"><div id="empty_gallery" class="col-md-12">
		There are no pictures yet :(
	</div></div>
  
	<div class="row">
		<div id='image_container' class="col-md-10 col-md-offset-1"></div>
	</div>

	<div class="row"><div id="more_button" class="col-md-12" onclick="G.getImages();">
		Load more
	</div></div>


<div id="view_image" class="row">

	<div id="view_background" onclick="G.hideImage();">
		<img src="/template/img/close_cross.png">
	</div>

	<div id="view_box" class="col-sm-8 col-sm-offset-2 col-md-8 col-md-offset-2">
		<div class="row">
			<div id="image_box" class="col-md-8">
				<img id="selected_image" src="#">
				<img id="like_image" src="/template/img/like.png">
				<div id="likemeter">
					<img src="/template/img/likemeter.png">
					<span id="likenumber">0</span>
				</div>
			</div>

			<div class="col-md-4">
				<div id="comment_box"></div>
				<div id="message_box">
					<textarea id="comment_area" rows="5" cols="30" maxlength="300" placeholder="type comment"></textarea>
					<a id="send_button" class="button">Send</a>
					<a id="remove_button" class="button">Delete</a>
					<span id="message_counter">0/300</span>
				</div>

				<div id="social_box">
					<a id="telegram" class="social_link" target="_blank">
						<img class="social_icon" src="/template/img/telegram.png">
					</a>
					<a id="facebook" class="social_link" target="_blank">
						<img class="social_icon" src="/template/img/facebook.png">  </a>
					<a id="twitter" class="social_link" target="_blank">
						<img class="social_icon" src="/template/img/twitter.png">
					</a>
					<a id="linkedin" class="social_link" target="_blank">
						<img class="social_icon" src="/template/img/linkedin.png">
					</a>
					<a id="google" class="social_link" target="_blank">
						<img class="social_icon" src="/template/img/google.png">
					</a>
				</div>
			</div>
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