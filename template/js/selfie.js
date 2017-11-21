//    window.stream.getVideoTracks()[0].stop();
const S = (function () {
	return {
        // media_width: 640,
        // media_height: 480,
        media_width: 640,
        media_height: 480,
	    currentMedia: 'image',
		ajax_router: '/template/js/ajax.router.php'
	};
}());

S.initialization = function() {
	navigator.webcam = (navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia);

	//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    document.getElementById('emoji').style.display = 'block';
    //document.getElementById('emoji').src = '/template/img/sprite.png';
    document.getElementById('emoji').src = '/template/img/sprite.png';

	S.videoJoin();
	S.switchMedia();
};


S.switchMedia = function() {
    const image = document.getElementById('upload_img');
    const video = document.getElementById('video');

    S.currentMedia = (S.currentMedia === 'video') ? 'image' : 'video';
    video.style.display = (S.currentMedia === 'video') ? 'block' : 'none';
    image.style.display = (S.currentMedia === 'image') ? 'block' : 'none';
};

S.multipartConvert = function(data, boundary) {
    let params = ['\r\n'];
    for (let key in data)
        params.push('Content-Disposition: form-data; name=\"' + key + '\"\r\n\r\n' + data[key] + '\r\n');
    params = params.join('--' + boundary + '\r\n') + '--' + boundary + '--\r\n';
    return params;
};

S.getCanvasURL = function (id) {
    const media = document.getElementById(id);
    const canvas = document.createElement("canvas");
    canvas.width = S.media_width;
    canvas.height = S.media_height;
    canvas.getContext('2d').drawImage(media, 0, 0);
    return canvas.toDataURL();
};

S.snapshot = function () {
    let media_id = (S.currentMedia === 'video') ? 'video' : 'upload_img';
    dataURL = S.getCanvasURL(media_id);
console.log(document.getElementById("video").width);
    const request = new XMLHttpRequest();
    let data = {
    model: 'selfie',
    function: 'combineImage',
    top: 100,
    left: 100,
    image: dataURL,
    emoji_src: document.getElementById('emoji').src
    };
    let boundary = String(Math.random()).slice(2);
    let params = S.multipartConvert(data, boundary);
    request.open('POST', S.ajax_router, false);
    request.setRequestHeader('Content-type', 'multipart/form-data; boundary=' + boundary);
    request.send(params);

    if (request.status === 200)
    {
        console.log('snap = ' + request.responseText);
    }
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
		if (S.currentMedia === 'video')
		    S.switchMedia();
	};

	if (input_file)
		reader.readAsDataURL(input_file);
};
