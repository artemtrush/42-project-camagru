const console_reporting = false;
const window_reporting = true;

function console_error(error_message)
{
    if (!console_reporting)
        return;
    console.log(error_message);
}

function window_error(error_message, delay = 3)
{
    if (!window_reporting)
        return;
    const warnings = document.getElementsByClassName('window_error');
    for (let i = 0; i < warnings.length; i++)
        warnings[i].style.display = 'none';
    let message = document.createElement('div');
    let block = document.createElement('div');
    block.className = 'col-sm-4 col-md-2 panel panel-danger window_error';
    message.className = 'panel-heading';
    message.innerText = error_message;
    block.appendChild(message);
    document.body.appendChild(block);
    setTimeout(function() {
    	block.style.opacity = 0;
    	setTimeout(function() {
    		block.remove();
    	}, 5000);
    }, delay * 1000);
}