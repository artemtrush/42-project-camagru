
function signOut()
{
    const request = new XMLHttpRequest();
    let params = 'model=autentification&function=signOut';
    request.open('POST', '/template/js/ajax.router.php', false);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(params);

    if (request.status === 200)
        location.pathname = "/autentification";
}

function selfiePage()
{
    location.pathname = "/selfie";
}

function galleryPage()
{
    location.pathname = "/gallery"
}