const console_reporting = true;
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
    let message = document.createElement('p');
    let block = document.createElement('div');
    block.className = 'window_error';
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