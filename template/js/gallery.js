
const G = (function () {
    return {
        image_last: 4294967295,/*max id value*/
        social_access: false,
        deletion_access: false,
        vote_status: false,
        last_key: 0,
        like_src: '/template/img/like.png',
        dislike_src: '/template/img/dislike.png',
        deleted_src: '/template/img/deleted_image.png',
        ajax_router: '/template/js/ajax.router.php'
    };
}());

G.initialization = function () {
    if (G.deletion_access)
    {
        document.getElementById('remove_button').onclick = G.removeImage;
        document.getElementById('remove_button').style.display = 'block';
    }
    if (G.social_access)
    {
        document.getElementById('message_box').style.display = 'block';
        document.getElementById('send_button').onclick = G.sendComment;
        document.getElementById('like_image').style.display = 'block';
        document.getElementById('like_image').onclick = G.likeImage;

        let area = document.getElementById('comment_area');
        area.onkeydown = function (event) {
            document.getElementById('message_counter').innerText = area.value.length + '/300';
            if (G.last_key === 16 && event.which === 13) {
                G.sendComment();
                G.last_key = -1;
            }
            else
                G.last_key = event.which;
        };
        area.onkeyup = function () {
            document.getElementById('message_counter').innerText = area.value.length + '/300';
            if (G.last_key === -1)
                area.value = '';
            G.last_key = 0;
        };
    }
    G.getImages();
};

G.likeImage = function () {
    let src = document.getElementById('selected_image').src;
    const request = new XMLHttpRequest();
    let params = (G.vote_status) ? ('model=gallery&function=dislikeImage&src=' + src) :
                                    ('model=gallery&function=likeImage&src=' + src);
    request.open('POST', G.ajax_router);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(params);
    request.onload = function()
    {
        if (request.responseText === 'true') {
            G.vote_status = !G.vote_status;
            document.getElementById('like_image').src = (G.vote_status) ? G.dislike_src : G.like_src;
            G.countVotes(src);
        }
        else
            window_error('An error has occurred. Try again later.');
    };
};

G.checkVote = function (src) {
    const request = new XMLHttpRequest();
    let params = 'model=gallery&function=checkVote&src=' + src;
    request.open('POST', G.ajax_router);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(params);
    request.onload = function()
    {
        if (request.responseText === 'true')
            G.vote_status = true;
        else if (request.responseText === 'false')
            G.vote_status = false;
        else
            console_error('Unable to verify user\'s vote.');
        document.getElementById('like_image').src = (G.vote_status) ? G.dislike_src : G.like_src;
    };
};

G.countVotes = function (src) {
    const request = new XMLHttpRequest();
    let params = 'model=gallery&function=countVotes&src=' + src;
    request.open('POST', G.ajax_router);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(params);
    request.onload = function()
    {
        if (request.responseText !== 'false')
        {
            document.getElementById('likenumber').innerText = parseInt(request.responseText);
        }
    };
};

G.appendComment = function (user, date, text) {
    const container = document.getElementById('comment_box');
    let span = document.createElement('span');
    span.className = 'comment_span';
    span.innerText = text + '|' + date + '|' + user;
    container.appendChild(span);
};

G.getComments = function (callback) {
    const request = new XMLHttpRequest();
    let params = 'model=gallery&function=getComments' +
                '&src=' + document.getElementById('selected_image').src;
    request.open('POST', G.ajax_router);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(params);
    request.onload = function()
    {
        try {
            const container = document.getElementById('comment_box');
            while (container.firstChild)
                container.firstChild.remove();
            let array = JSON.parse(request.responseText);
            for (let i = 0; i < array.length; i++)
                G.appendComment(array[i]['username'], array[i]['date'], array[i]['text']);
            if (callback !== undefined)
                callback();
        }
        catch (error) {
            console_error(error.message);
        }
    };
};

G.sendComment = function () {
    const area = document.getElementById('comment_area');
    let text = area.value;
    if (text.trim().length === 0) {
        area.value = '';
        area.focus();
        return;
    }
    const request = new XMLHttpRequest();
    let params = 'model=gallery&function=sendComment' +
                '&text=' + text +
                '&src=' + document.getElementById('selected_image').src;
    request.open('POST', G.ajax_router);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(params);
    area.value = '';
    area.focus();
    request.onload = function()
    {
        if (request.responseText === 'true') {
            const notification = new XMLHttpRequest();
            notification.open('POST', G.ajax_router);
            notification.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            notification.send('model=gallery&function=notification');
            notification.onload = function () {
                if (notification.responseText !== 'true')
                    console_error('Unable to send email');
            };

            G.getComments(function () {
                const container = document.getElementById('comment_box');
                container.scrollTop = container.scrollHeight;
            });
        }
        else
            window_error('Oops, there was an error sending message :(');
    };
};

G.viewImage = function (image) {
    if (image.name === 'deleted')
        return;
    if (G.social_access)
        G.checkVote(image.src);
    G.countVotes(image.src);
    if (document.getElementById('selected_image').src !== image.src)
    {
        document.getElementById('selected_image').src = image.src;
        G.getComments();
        /* let share_url = image.src; */
        let share_url = 'https://itc.ua/wp-content/uploads/2017/04/Unit-Factory.jpg';
        document.getElementById('telegram').href = 'https://t.me/share/url?url=' + share_url;
        document.getElementById('facebook').href = 'http://www.facebook.com/sharer.php?u=' + share_url;
        document.getElementById('twitter').href = 'http://twitter.com/share?url=' + share_url;
        document.getElementById('linkedin').href = 'http://www.linkedin.com/shareArticle?url=' + share_url;
        document.getElementById('google').href = 'https://plus.google.com/share?url=' + share_url;
        document.getElementById('comment_area').value = '';
    }
    document.getElementById('view_image').style.display = 'block';
};

G.hideImage = function () {
    const view = document.getElementById('view_image');
    view.style.display = 'none';
};

G.appendImage = function (path) {
    const container = document.getElementById('image_container');
    let img = document.createElement('img');
    img.className = 'gallery_image';
    img.src = path;
    img.onclick = function(){G.viewImage(this);};
    container.appendChild(img);
};

G.getImages = function() {
    const button = document.getElementById('more_button');
    button.style.display = 'none';

    const request = new XMLHttpRequest();
    let params = 'model=gallery&function=getImages' +
                '&image_last=' + G.image_last +
                '&id=' + G.owner_id;
    request.open('POST', G.ajax_router);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(params);

    request.onload = function()
    {
        let btn_enabled = true;
        try {
            let array = JSON.parse(request.responseText);
            if (array[0] > 0)
                G.image_last = array[0];
            else
                btn_enabled = false;
            for (let i = 1; i < array.length; i++)
                G.appendImage(array[i].path);
        }
        catch (error) {
            console_error(error.message);
        }
        if (btn_enabled)
            button.style.display = 'block';
        if (document.getElementById('image_container').childNodes.length === 0)
            document.getElementById('empty_gallery').style.display = 'block';
    };
};

G.removeImage = function () {
    if (!confirm('Do you really want to delete the photo?'))
        return ;
    let src = document.getElementById('selected_image').src;
    const request = new XMLHttpRequest();
    let params = 'model=selfie&function=deleteImage' +
                '&path=' + src;
    request.open('POST', G.ajax_router);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(params);

    request.onload = function()
    {
        if (request.responseText === 'true') {
            let collection = document.getElementsByClassName('gallery_image');
            for (let i = 0; i < collection.length; i++)
                if (collection[i].src === src)
                {
                    collection[i].src = G.deleted_src;
                    collection[i].name = 'deleted';
                    break ;
                }
            G.hideImage();
        }
        else
            window_error('Oops, there was an error deleting the photo :(');
    };
};
