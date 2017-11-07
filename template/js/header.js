
function signOut()
{
    const request = new XMLHttpRequest();
    request.open('GET', '/template/js/signOut.php', false);
    request.send(null);
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