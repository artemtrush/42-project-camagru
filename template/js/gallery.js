
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

G.addSocialShare = function(href, url, ico) {
   const container = document.getElementById('social_container');
   let link = document.createElement('a');
   let img = document.createElement('img');

   img.src = ico;
   img.className = 'social_icon';
   link.href = href + url;
   link.className = 'social_link';
   link.appendChild(img);
   container.appendChild(link);
};

G.viewImage = function (image) {
    document.getElementById('selected_image').src = image.src;
    G.checkVote(image.src);
    G.countVotes(image.src);
    let share_url = 'https://itc.ua/wp-content/uploads/2017/04/Unit-Factory.jpg';
    G.addSocialShare('http://www.facebook.com/sharer.php?u=', share_url, '/template/img/like.png');
    G.addSocialShare('http://twitter.com/share?url=', share_url, '/template/img/like.png');
    G.addSocialShare('https://plus.google.com/share?url=', share_url, '/template/img/like.png');
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
