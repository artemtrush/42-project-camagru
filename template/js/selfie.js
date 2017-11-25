//    window.stream.getVideoTracks()[0].stop();
const S = (function () {
	return {
	    target: null,
        target_offset_left: 0,
        target_offset_top: 0,
        media_width: 1920,
        media_height: 1080,
        sidebar_max_images: 6,
        video_active: false,
        sidebar: false,
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
	S.handleFree();
	S.switchMedia();
	S.getImages(S.sidebar_max_images);
    S.loadPack('size64', '64');
    S.loadPack('size128', '128');
    S.loadPack('size256', '256');
    document.getElementById('btn64').click();
    document.getElementById('side_button').click();
};

S.handleFree = function () {
    const free = document.getElementById('free_button');
    let i = 0;
    let emoji_collection = document.getElementsByClassName('emoji');
    for (; i < emoji_collection.length; i++)
        if (emoji_collection[i].parentNode.className !== 'emoji_div')
            break ;
    if (i === emoji_collection.length)
    {
        free.style.backgroundColor = 'red';
    }
    else
    {
        free.style.backgroundColor = 'green';
    }
};

S.handleSnap = function () {
    const snap = document.getElementById('snap_button');
    let i = 0;
    let emoji_collection = document.getElementsByClassName('emoji');
    for (; i < emoji_collection.length; i++)
        if (emoji_collection[i].parentNode.className !== 'emoji_div')
            break ;
    if (i === emoji_collection.length || (S.currentMedia === 'video' && S.video_active === false))
    {
        snap.style.backgroundColor = 'red';
    }
    else
    {
        snap.style.backgroundColor = 'green';
    }
};

S.appendImage = function (path) {
    const container = document.getElementById('side_div');
    if (container.childNodes.length >= S.sidebar_max_images)
        container.firstChild.remove();
    let img = document.createElement('img');
    img.src = path;
    img.onclick = function(){S.removeImage(this);};
    container.appendChild(img);
};

S.removeImage = function (image) {
    if (!confirm('sure?'))
        return ;
    const request = new XMLHttpRequest();
    let params = 'model=selfie&function=deleteImage' +
                '&path=' + image.src;
    request.open('POST', S.ajax_router);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(params);

    request.onload = function()
    {
        if (request.responseText === 'true') {
            S.getImages(S.sidebar_max_images);
        }
        else
            console.log('image remove error');
    };
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
        try {
            let array = JSON.parse(request.responseText);
            for (let i = array.length - 1; i >= 0; i--)
                S.appendImage(array[i].path);
        }
        catch (e) {
            console.log('getImages error');
        }
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
    S.handleSnap();
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
    canvas.getContext('2d').drawImage(media, 0, 0, S.media_width, S.media_height);
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
        if (emoji_collection[i].parentNode.className !== 'emoji_div')
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
        if (emoji_collection[i].parentNode.className !== 'emoji_div')
            emoji_collection[i].remove();
        else
            i++;
    }
    S.handleFree();
    S.handleSnap();
};

S.snapshot = function () {
    let media_id = (S.currentMedia === 'video') ? 'video' : 'upload_img';
    let dataURL = S.getCanvasURL(media_id);

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
		S.video_active = true;
	}
	function videoError(error) {
		console.log(error);
        S.video_active = false;
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
        document.getElementById('unload_button').style.backgroundColor = 'green';
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
    if (S.target.parentNode.className === 'emoji_div')
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
    S.emojiClip(S.target, null);
    /*return -> select forbiddance*/
    return false;
};

S.dragMove = function (event) {
    if (!S.target)
        return;
    S.target.style.left = event.pageX - S.target_offset_left + 'px';
    S.target.style.top = event.pageY - S.target_offset_top + 'px';
};

S.emojiClip = function (target, media) {
    const emoji = target.getBoundingClientRect();
    /* clip: rect(Y1, X1, Y2, X2) */
    let y1 = 0;
    let x1 = emoji.width;
    let y2 = emoji.height;
    let x2 = 0;

    if (media) {
        if (emoji.left < media.left)
            x2 = media.left - emoji.left;
        if (emoji.right > media.right)
            x1 = x1 - (emoji.right - media.right);
        if (emoji.top < media.top)
            y1 = media.top - emoji.top;
        if (emoji.bottom > media.bottom)
            y2 = y2 - (emoji.bottom - media.bottom);
    }
    target.style.clip = 'rect(' + parseInt(y1) + 'px, ' +
                                  parseInt(x1) + 'px, ' +
                                  parseInt(y2) + 'px, ' +
                                  parseInt(x2) + 'px)';
};

S.dragEnd = function (event) {
    if (event.which !== 1)
        return;
    if (!S.target)
        return;
    const media_id = (S.currentMedia === 'video') ? 'video' : 'upload_img';
    const media = document.getElementById(media_id).getBoundingClientRect();
    if (event.clientX < media.left ||
        event.clientY < media.top ||
        event.clientX > media.right ||
        event.clientY > media.bottom)
        S.target.remove();
    else
        S.emojiClip(S.target, media);
    S.target = null;
    S.handleSnap();
    S.handleFree();
};

S.openPack = function(event, div_id) {
    const emoji_containers = document.getElementsByClassName('emoji_div');
    for (let i = 0; i < emoji_containers.length; i++)
        emoji_containers[i].style.display = "none";
    document.getElementById(div_id).style.display = "block";

    const tab_buttons = document.getElementsByClassName('tab_buttons_enabled');
    for (let i = 0; i < tab_buttons.length; i++)
        tab_buttons[i].className = 'tab_buttons_disabled';
    event.currentTarget.className = 'tab_buttons_enabled';
};

S.loadPack = function (id, dir) {
    const container = document.getElementById(id);
    const request = new XMLHttpRequest();
    let params = 'model=selfie&function=getEmoji' +
                '&dir=' + dir;
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
                {
                    let img = document.createElement('img');
                    img.src = array[i];
                    img.className = 'emoji';
                    container.appendChild(img);
                }
            }
            catch (e) {
                console.log('getEmoji error');
            }
        }
        else
            console.log('getEmoji error');
    };
};

S.sidehide = function () {
  const side = document.getElementById('side_div');
  S.sidebar = !S.sidebar;
  if (S.sidebar)
      side.style.height = '800px';
  else
      side.style.height = '0';
};