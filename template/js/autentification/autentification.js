
const form = (function () {
    return {
        sign_mode: true,
        pos_color: 'green',
        neg_color: 'red',
        res_color: ''
    };
}());

form.initialization = function() {
    form.login_input = document.getElementById('login');
    form.pass_input = document.getElementById('pass');
    form.email_input = document.getElementById('mail');
    form.confirm_input = document.getElementById('confirm');
    form.email_input.onkeyup = function() {form.checkEmail();};
    form.confirm_input.onkeyup = form.checkConfirm;

    form.sign_btn = document.getElementById('sign');
    form.switch_btn = document.getElementById('switch');

    form.sign_btn.onclick = form.signUser;
    form.switch_btn.onclick = form.switchSign;

    form.setDiv('sign_form');
    form.switchSign();
};

form.setDiv = function(div_id) {
    document.getElementById('sign_form').style.display = (div_id === 'sign_form') ? 'flex' : 'none';
    document.getElementById('email_code').style.display = (div_id === 'email_code') ? 'block' : 'none';
    document.getElementById('loading').style.display = (div_id === 'loading') ? 'block' : 'none';
};

form.switchSign = function() {
    if (form.sign_mode === false) //if <sign in> now
    {
        form.email_input.style.display = 'inline';
        form.confirm_input.style.display = 'inline';

        form.sign_btn.innerText = 'Sign Up';
        form.switch_btn.innerText = 'I already have an account';
        form.checkEmail();

        form.login_input.onkeyup = function() {form.checkLogin();};
        form.checkLogin();

        form.pass_input.onkeyup = form.checkPass;
        form.checkPass();

        form.sign_mode = true;
    }
    else //if <sign up> now
    {
        form.login_input.style.borderColor = form.res_color;
        form.pass_input.style.borderColor = form.res_color;
        form.email_input.style.display = 'none';
        form.confirm_input.style.display = 'none';

        form.sign_btn.innerText = 'Sign In';
        form.switch_btn.innerText = 'I don\'t have an account yet';


        form.login_input.onkeyup = null;
        form.pass_input.onkeyup = null;

        form.sign_mode = false;
    }
};

form.checkLogin = function(callback) {
    const string = form.login_input.value;
    if (string.match(/^[a-z0-9_-]{3,15}$/))
    {
        const request = new XMLHttpRequest();
        request.open('POST', '/template/js/autentification/checkLogin.php');
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send('username=' + string);

        request.onload = function()
        {
            if (request.responseText === 'does not exist')
            {
                form.login_input.style.borderColor = form.pos_color;
                if (callback !== undefined)
                    callback();
            }
            else if (request.responseText === 'exists')
            {
                form.login_input.style.borderColor = form.neg_color;
            }
            else
            {
                form.login_input.style.borderColor = form.neg_color;
                form.serverError();
            }
        };
    }
    else
    {
        //status.innerHTML = '&#10008; Username must be 3 to 15 characters long.';
        form.login_input.style.borderColor = form.neg_color;
    }
};

form.checkEmail = function(callback) {
    const string = form.email_input.value;
    if (string.match(/^.+@.+$/))
    {
        const request = new XMLHttpRequest();
        request.open('POST', '/template/js/autentification/checkEmail.php');
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send('usermail=' + string);

        request.onload = function()
        {
            if (request.responseText === 'does not exist')
            {
                form.email_input.style.borderColor = form.pos_color;
                if (callback !== undefined)
                    callback();
            }
            else if (request.responseText === 'exists')
            {
               // Email exists';
                form.email_input.style.borderColor = form.neg_color;
            }
            else
            {
                form.email_input.style.borderColor = form.neg_color;
                form.serverError();
            }
        };
    }
    else
    {
        //status.innerHTML = '&#10008; Invalid';
        form.email_input.style.borderColor =  form.neg_color;
    }
};

form.checkPass = function() {
    form.checkConfirm();
    //Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
    if (form.pass_input.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,20}$/))
    {
        form.pass_input.style.borderColor = form.pos_color;
        return true;
    }
    // '&#10008; Bad pass';
    form.pass_input.style.borderColor = form.neg_color;
    return false;
};

form.checkConfirm = function() {
    if (form.confirm_input.value === form.pass_input.value &&
        form.confirm_input.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,20}$/))
    {
        form.confirm_input.style.borderColor = form.pos_color;
        return true;
    }
    //status.innerHTML = '&#10008; No confirm';
    form.confirm_input.style.borderColor = form.neg_color;
    return false;
};

form.signUser = function() {
    form.setDiv('loading');
    if (form.sign_mode === false)
    {
        const request = new XMLHttpRequest();
        let params = "username=" + form.login_input.value + "&userpass=" + form.pass_input.value;
        request.open('POST', '/template/js/autentification/signIn.php');
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send(params);

        request.onload = function ()
        {
            if (request.responseText === 'true')
                location.pathname = "/selfie";
            else
            {
                form.setDiv('sign_form');
                form.serverError();
            }
        };
    }
    else
    {
        if (form.checkPass() && form.checkPass())
        {
            form.checkLogin(
                form.checkEmail(
                    function() {
                        const request = new XMLHttpRequest();
                        let params = "username=" + form.login_input.value +
                                    "&userpass=" + form.pass_input.value +
                                    "&usermail=" + form.email_input.value;
                        request.open('POST', '/template/js/autentification/emailCode.php');
                        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        request.send(params);

                        request.onload = function ()
                        {
                            if (request.responseText === 'true')
                            {
                                form.setDiv('email_code');
                            }
                            else
                            {
                                form.setDiv('sign_form');
                                form.serverError();
                            }
                        };
                    }
                )
            );
        }
    }
};

form.serverError = function ()
{
    console.log('error');
};


/*
                   const request = new XMLHttpRequest();
                   let params = "username=" + form.login_input.value +
                               "&userpass=" + form.pass_input.value +
                               "&usermail=" + form.email_input.value;
                   request.open('POST', '/template/js/autentification/sign_in.php');
                   request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                   request.send(params);
                   */

