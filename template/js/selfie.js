//    window.stream.getVideoTracks()[0].stop();
const S = (function () {
	return {
		ajax_router: '/template/js/ajax.router.php'
	};
}());

S.initialization = function() {
	navigator.webcam = (navigator.webkitGetUserMedia || navigator.mozGetUserMedia);


	S.videoJoin();
};

S.videoJoin = function() {
	function videoSuccess(stream) {
		const video = document.getElementById('video');
		video.srcObject = stream;
		video.play();
	}
	function videoError(error) {
		console.log(error);
	}

	navigator.webcam({video:true, audio:false}, videoSuccess, videoError);
};

S.uploadImage = function() {
	const image = document.getElementById('upload_img');
	const input_file = document.getElementById('upload_input').files[0];
	const reader = new FileReader();

	reader.onloadend = function () {
		image.src = reader.result;
		S.hideVideo();
	};

	if (input_file)
		reader.readAsDataURL(input_file);
};

S.hideImage = function() {
	const image = document.getElementById('upload_img');
	const video = document.getElementById('video');

	video.style.display = 'block';
	image.style.display = 'none';
	image.src = '#';
};

S.hideVideo = function() {
	const image = document.getElementById('upload_img');
	const video = document.getElementById('video');

	image.style.display = 'block';
	video.style.display = 'none';
};
