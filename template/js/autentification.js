function switch_sign(sign_btn, switch_btn, menu)
{
    if (sign_mode === false)
    {
        sign_btn.value = 'Sign Up';
        switch_btn.value = 'I already have an account';
        menu.style = "visibility: visible;";
        sign_mode = true;
    }
    else
    {
        sign_btn.value = 'Sign In';
        switch_btn.value = 'I don\'t have an account yet';
        menu.style = "visibility: hidden;";
        sign_mode = false;
    }
}

function checkLogin(input, status)
{
    var string = input.value;
    if (string.match("^[a-z0-9_-]{3,15}$"))
    {
        status.innerHTML = '&#10004;';
        status.style = "";
    }
    else
    {
        status.innerHTML = '&#10008; Username must be 3 to 15 characters long.';
        status.style = "";
    }
}

function isEmpty(input, status)
{
    var string = input.value;
    if (string === "")
    {
        status.innerHTML = '&#10008; This field must be filled';
        status.style = "";
    }
}
