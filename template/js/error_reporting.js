const console_reporting = true;
const window_reporting = true;

function console_error(error)
{
    if (!console_reporting)
        return;
    if (error !== undefined)
        console.log('kekek');
    else
        console.log('lolek');
}

function window_error(error)
{
    if (!window_reporting)
        return;
    console.log('keks');
}