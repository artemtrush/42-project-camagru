//    window.stream.getVideoTracks()[0].stop();
const S = (function () {
	return {
	    target: null,
        target_offset_left: 0,
        target_offset_top: 0,
        media_width: 640,
        media_height: 480,
        sidebar_max_images: 6,
	    currentMedia: 'image',
		ajax_router: '/template/js/ajax.router.php'
	};
}());

S.initialization = function() {
	navigator.webcam = (navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia);
    document.onmousedown= S.dragStart;
    document.onmousemove = S.dragMove;
    document.onmouseup = S.dragEnd;

	S.videoJoin();
	S.switchMedia();
	S.getImages(S.sidebar_max_images);
};

S.appendImage = function (path) {
    const container = document.getElementById('side_div');
    if (container.childNodes.length >= S.sidebar_max_images)
        container.firstChild.remove();
    let img = document.createElement('img');
    img.src = path;
    container.appendChild(img);
};

S.getImages = function (number) {
    const request = new XMLHttpRequest();
    let params = 'model=selfie&function=getImages' +
                '&number=' + number;
    request.open('POST', S.ajax_router);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(params);

    request.onload = function()
    {
        if (!request.responseText.match(/.*false$/))
        {
            try {
                let array = JSON.parse(request.responseText);
                for (let i = 0; i < array.length; i++)
                    S.appendImage(array[i].path);
            }
            catch (e) {
                console.log('getImages error');        
            }
        }
        else
            console.log('getImages error');
        if (document.getElementById('side_div').childNodes.length === 0)
            console.log('empty');
    }
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
        if (data.hasOwnProperty(key))
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

/*absolute coords*/
S.getCoords = function(elem) {
    let block = elem.getBoundingClientRect();
    return {
        left: parseInt(block.left) + parseInt(pageXOffset),
        top: parseInt(block.top) + parseInt(pageYOffset)
    };
};

S.getEmojiList = function() {
    let emoji_collection = document.getElementsByClassName('emoji');
    let emoji_list = [];
    let media_coords = S.getCoords(document.getElementById('media_div'));
    for (let i = 0; i < emoji_collection.length; i++)
    {
        if (emoji_collection[i].parentNode.id !== 'emoji_div')
        {
            emoji_list.push({
                src: emoji_collection[i].src,
                left: parseInt(emoji_collection[i].style.left) - media_coords.left,
                top: parseInt(emoji_collection[i].style.top) - media_coords.top,
                zinx: parseInt(emoji_collection[i].style.zIndex)
            })
        }
    }
    emoji_list.sort(function (a, b) {
        if (a.zinx > b.zinx)
            return 1;
        return -1;
    });
    return emoji_list;
};

S.emojiFree = function () {
    let emoji_collection = document.getElementsByClassName('emoji');

    let i = 0;
    while (i < emoji_collection.length)
    {
        if (emoji_collection[i].parentNode.id !== 'emoji_div')
            emoji_collection[i].remove();
        else
            i++;
    }
};

S.snapshot = function () {
    let media_id = (S.currentMedia === 'video') ? 'video' : 'upload_img';
    dataURL = S.getCanvasURL(media_id);

    const request = new XMLHttpRequest();
    let data = {
    model: 'selfie',
    function: 'combineImage',
    image: dataURL,
    emoji_list: JSON.stringify(S.getEmojiList())
    };
    let boundary = String(Math.random()).slice(2);
    let params = S.multipartConvert(data, boundary);
    request.open('POST', S.ajax_router);
    request.setRequestHeader('Content-type', 'multipart/form-data; boundary=' + boundary);
    request.send(params);

    request.onload = function () {
        if (request.responseText === 'true')
            S.getImages(1);
        else
            console.log('snapError');
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

S.maxIndex = function () {
    let highest_index = 1;
    const elements = document.getElementsByClassName('emoji');
    for (let i = 0; i < elements.length; i++)
    {
        if (highest_index <= parseInt(elements[i].style.zIndex))
            highest_index = parseInt(elements[i].style.zIndex) + 1;
    }
    return highest_index;
};

S.dragStart = function (event) {
    if (event.which !== 1)
        return;
    S.target = event.target.closest('.emoji');
    if (!S.target)
        return;
    if (S.target.parentNode.id === 'emoji_div')
    {
        let avatar = document.createElement('img');
        avatar.src = S.target.src;
        avatar.className = S.target.className;
        document.body.appendChild(avatar);
        avatar.style.position = 'absolute';
        avatar.style.left = S.getCoords(S.target).left + 'px';
        avatar.style.top = S.getCoords(S.target).top + 'px';
        S.target = avatar;
    }
    S.target_offset_left = event.pageX - S.getCoords(S.target).left;
    S.target_offset_top = event.pageY - S.getCoords(S.target).top;
    S.target.style.zIndex = S.maxIndex();
    /*return -> select forbiddance*/
    return false;
};

S.dragMove = function (event) {
    if (!S.target)
        return;
    S.target.style.left = event.pageX - S.target_offset_left + 'px';
    S.target.style.top = event.pageY - S.target_offset_top + 'px';
};

S.dragEnd = function (event) {
    if (event.which !== 1)
        return;
    if (!S.target)
        return;
    const media = document.getElementById('media_div').getBoundingClientRect();
    if (event.clientX < media.left ||
        event.clientY < media.top ||
        event.clientX > media.left + media.width ||
        event.clientY > media.top + media.height)
        S.target.remove();
    S.target = null;
};