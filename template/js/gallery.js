
const G = (function () {
    return {
        image_last: 4294967295,/*max id value*/
        vote_status: false,
        like_src: '/template/img/like.png',
        dislike_src: '/template/img/dislike.png',
        ajax_router: '/template/js/ajax.router.php'
    };
}());

G.initialization = function () {
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
            console.log('error like');
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
            console.log('error vote check');
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
            document.getElementById('likenumber').innerHTML = parseInt(request.responseText);
        }
    };
};

G.appendComment = function (user, date, text) {
    const container = document.getElementById('comment_box');
    let span = document.createElement('span');
    span.ClassName = 'comment_span';
    span.innerHTML = text;
    container.appendChild(span);
};

G.getComments = function () {
    const request = new XMLHttpRequest();
    let params = 'model=gallery&function=getComments' +
                '&src=' + document.getElementById('selected_image').src;
    request.open('POST', G.ajax_router);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(params);
    request.onload = function()
    {
        try {
            let array = JSON.parse(request.responseText);
            for (let i = 0; i < array.length; i++)
                G.appendComment(array[i]['username'], array[i]['date'], array[i]['text']);
        }
        catch (e) {
            console.log('get comments error');
        }
    };
};

G.sendComment = function () {
    const area = document.getElementById('comment_area');
    let text = area.value;
    const request = new XMLHttpRequest();
    let params = 'model=gallery&function=sendComment' +
                '&message=' + text +
                '&src=' + document.getElementById('selected_image').src;
    request.open('POST', G.ajax_router);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(params);
    area.value = '';
    request.onload = function()
    {
        try {
            let array = JSON.parse(request.responseText);
            G.appendComment(array['username'], array['date'], text);
        }
        catch (e) {
            console.log('comment add errror');
        }
    };
};

G.viewImage = function (image) {
    G.checkVote(image.src);
    G.countVotes(image.src);
    G.getComments();

    if (document.getElementById('selected_image').src !== image.src)
    {
        document.getElementById('selected_image').src = image.src;
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
                '&id=' + G.id;
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
        catch (e) {
            console.log('getImages error');
        }
        if (btn_enabled)
            button.style.display = 'block';
        if (document.getElementById('image_container').childNodes.length === 0)
            console.log('empty');
    };
};
