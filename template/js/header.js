
const H = (function () {
    return {
        ajax_router: '/template/js/ajax.router.php'
    };
}());

H.initialization = function () {
    document.getElementById('search_input').onkeyup = function(event){
        if (event.keyCode === 13)
            H.searchRedirect(document.getElementById('search_input').value);
        else
            H.searchStart();
    };
};

H.searchStart = function () {
    let search_string = document.getElementById('search_input').value;
    let ul = document.getElementsByClassName('search_login');
    if (!(search_string.match(/^[a-zA-Z0-9_-]{1,15}$/g)))
    {
        let i = 0;
        while (i < ul.length)
        {
            ul[i].style.display = 'none';
            i++;
        }
        return;
    }
    const request = new XMLHttpRequest();
    let params = 'model=navigation&function=searchStart' +
                '&search_string=' + search_string;
    request.open('POST', H.ajax_router, true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(params);
    request.onload = function()
    {
        let i = 0;
        if (request.responseText !== 'false')
        {
            const reg = new RegExp(search_string, 'g');
            let array = JSON.parse(request.responseText);
            while (i < array.length)
            {
                ul[i].innerHTML = array[i].replace(reg, '<span>' + search_string + '</span>');
                ul[i].style.display = 'block';
                i++;
            }
        }
        while (i < ul.length)
        {
            ul[i].style.display = 'none';
            i++;
        }
    };
};

H.searchRedirect = function (login) {
    login = login.replace(/<\/?span>/g, '');
    const request = new XMLHttpRequest();
    let params = 'model=navigation&function=searchRedirect' +
                '&login=' + login;
    request.open('POST', H.ajax_router, false);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(params);

    if (request.status === 200)
    {
        if (request.responseText.match(/true[0-9]+/))
        {
            let id = request.responseText.substring(4);
            location.pathname = "/gallery/" + id;
        }
    }
    console.log('bad login');//!!!!!!!!!!!!!!!!!!
};

H.searchShow = function () {
    H.searchStart();
	document.getElementById('search_input').style.display = 'inline';
    document.getElementById('search_drop_down').style.display = 'block';
	document.getElementById('search_span').style.display = 'none';
	document.getElementById('search_input').focus();
};

H.searchHide = function () {
	document.getElementById('search_span').style.display = 'inline';
	document.getElementById('search_input').style.display = 'none';
    document.getElementById('search_drop_down').style.display = 'none';
};

H.signOut = function () {
    const request = new XMLHttpRequest();
    let params = 'model=authentication&function=signOut';
    request.open('POST', H.ajax_router, false);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(params);

    if (request.status === 200)
        location.pathname = "/authentication";
};

H.selfiePage = function () {
    location.pathname = "/selfie";
};

H.galleryPage = function () {
    location.pathname = "/gallery"
};