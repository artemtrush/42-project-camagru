
function searchShow()
{
	document.getElementById('search_input').style.display = 'inline';
	document.getElementById('search_span').style.display = 'none';
	document.getElementById('search_input').focus();
}

function searchHide()
{
	document.getElementById('search_span').style.display = 'inline';
	document.getElementById('search_input').style.display = 'none';
}

function searchStart(e)
{
	  if (e.keyCode == 13) {
   	 alert("Ура нажали Enter");
  }
	console.log('start');
}

function signOut()
{
    const request = new XMLHttpRequest();
    let params = 'model=authentication&function=signOut';
    request.open('POST', '/template/js/ajax.router.php', false);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(params);

    if (request.status === 200)
        location.pathname = "/authentication";
}

function selfiePage()
{
    location.pathname = "/selfie";
}

function galleryPage()
{
    location.pathname = "/gallery"
}