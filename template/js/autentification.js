function checkLogin(input, status)
{
    var string = input.value;
    if (!string.match("^[a-z0-9_-]{3,15}$"))
    {
        status.innerHTML = '&#10008; Username must be 3 to 15 characters long.';
        status.className = 'negative_status';
    }
}

function isEmpty(input, status)
{
    var string = input.value;
    if (string === "")
    {
        status.innerHTML = '&#10008; This field must be filled';
        status.className = 'negative_status';
    }
}