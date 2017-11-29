const console_reporting = true;
const window_reporting = true;

function console_error(error_message)
{
    if (!console_reporting)
        return;
        console.log(error_message);
}

function window_error(error_message)
{
    if (!window_reporting)
        return;
    console.log(error_message);
}