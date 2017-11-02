
function setDefaultValues()
{
    window.sign_mode = true;
    window.pos_color = 'green';
    window.neg_color = 'red';
    setDiv('sign_form');
    switch_sign();
}

function setDiv(div_id)
{
    document.getElementById('sign_form').style.display = 'none';
    document.getElementById('email_code').style.display = 'none';
    document.getElementById('loading').style.display = 'none';
    document.getElementById(div_id).style.display = 'block';
}

function switch_sign()
{
    const login_input = document.getElementById('login');
    const login_status = document.getElementById('login_status');
    const pass_input = document.getElementById('pass');
    const pass_status = document.getElementById('pass_status');
    const sign_btn = document.getElementById('sign');
    const switch_btn = document.getElementById('switch');
    const menu = document.getElementById('drop_down_sign_up');

    if (sign_mode === false) //if <sign in> now
    {
        sign_btn.value = 'Sign Up';
        switch_btn.value = 'I already have an account';
        menu.style = "visibility: visible;";
        checkEmail();

        login_input.onkeyup = () => {checkLogin();};
        login_status.style = "visibility: visible;";
        checkLogin();

        pass_input.onkeyup = checkPass;
        pass_status.style = "visibility: visible;";
        checkPass();

        window.sign_mode = true;
    }
    else //if sign up now
    {
        sign_btn.value = 'Sign In';
        switch_btn.value = 'I don\'t have an account yet';
        menu.style = "visibility: hidden;";

        login_input.onkeyup = null;
        login_input.onblur = null;
        login_status.style = "visibility: hidden;";

        pass_input.onkeyup = null;
        pass_input.onblur = null;
        pass_status.style = "visibility: hidden;";

        window.sign_mode = false;
    }
}

function checkLogin(async_mode = true)
{
    const input = document.getElementById('login');
    const status = document.getElementById('login_status');
    const string = input.value;
    if (string.match(/^[a-z0-9_-]{3,15}$/))
    {
        const request = new XMLHttpRequest();
        request.open('POST', '/template/js/autentification/check_login.php', async_mode);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send('username=' + string);

        const action = function()
        {
            if (request.status === 200)
            {
                if (request.responseText === 'does not exist')
                {
                    status.innerHTML = '&#10004;';
                    status.style = 'color: ' + pos_color;
                    return true;
                }
                else if (request.responseText === 'exists')
                {
                    status.innerHTML = '&#10008; User exists';
                    status.style = 'color: ' + neg_color;
                }
            }
            else
            {
                status.innerHTML = '&#10008; Server error';
                status.style = 'color: ' + neg_color;
            }
            return false;
        };
        if (async_mode)
            request.onload = action;
        else
            return action();
    }
    else
    {
        status.innerHTML = '&#10008; Username must be 3 to 15 characters long.';
        status.style = 'color: ' + neg_color;
    }
    return false;
}

function checkEmail(async_mode = true)
{
    const input = document.getElementById('mail');
    const status = document.getElementById('mail_status');
    const string = input.value;
    if (string.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
    {
        const request = new XMLHttpRequest();
        request.open('POST', '/template/js/autentification/check_email.php');
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send('usermail=' + string);

        const action = function()
        {
            if (request.status === 200)
            {
                if (request.responseText === 'does not exist')
                {
                    status.innerHTML = '&#10004;';
                    status.style = 'color: ' + pos_color;
                    return true;
                }
                else if (request.responseText === 'exists')
                {
                    status.innerHTML = '&#10008; Email exists';
                    status.style = 'color: ' + neg_color;
                }
            }
            else
            {
                status.innerHTML = '&#10008; Server email error';
                status.style = 'color: ' + neg_color;
            }
            return false;
        };
        if (async_mode)
            request.onload = action;
        else
            return action();
    }
    else
    {
        status.innerHTML = '&#10008; Invalid';
        status.style = 'color: ' + neg_color;
    }
    return false;
}

function checkPass()
{
    const input = document.getElementById('pass');
    const status = document.getElementById('pass_status');
    checkConfirm();

    //Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
    if (input.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,20}$/))
    {
        status.innerHTML = '&#10004;';
        status.style = 'color: ' + pos_color;
        return true;
    }
    status.innerHTML = '&#10008; Bad pass';
    status.style = 'color: ' + neg_color;
    return false;
}

function checkConfirm()
{
    const confirm_input = document.getElementById('confirm');
    const status = document.getElementById('confirm_status');
    const pass_input = document.getElementById('pass');

    if (confirm_input.value === pass_input.value &&
        confirm_input.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,20}$/))
    {
        status.innerHTML = '&#10004;';
        status.style = 'color: ' + pos_color;
        return true;
    }
    status.innerHTML = '&#10008; No confirm';
    status.style = 'color: ' + neg_color;
    return false;
}

function sign_user()
{
    const login_input = document.getElementById('login');
    const pass_input = document.getElementById('pass');
    if (window.sign_mode === false)
    {
        const request = new XMLHttpRequest();
        request.open('POST', '/template/js/autentification/sign_in.php', false);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send(null);

        if (request.status === 200)
        {

        }
    }
    else
    {
        if (checkLogin(false) && checkPass() && checkEmail(false) && checkConfirm())
        {

        }
        else
        {

        }
    }
}



