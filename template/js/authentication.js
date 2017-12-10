
const A = (function () {
	return {
		sign_mode: true,
		login_focus: false,
		email_focus: false,
        pos_color: '#009900',
        neg_color: '#b30000',
		res_color: '',
		ajax_router: '/template/js/ajax.router.php'
	};
}());

A.initialization = function() {
	A.login_input = document.getElementById('login');
	A.pass_input = document.getElementById('pass');
	A.email_input = document.getElementById('mail');
	A.confirm_input = document.getElementById('confirm');
	A.code_input = document.getElementById('code');

	A.sign_btn = document.getElementById('sign');
	A.switch_btn = document.getElementById('switch');
	A.back_btn = document.getElementById('return_to_sign');
	A.repeat_btn = document.getElementById('repeat');
	A.register_btn = document.getElementById('register');
	A.forgot_btn =  document.getElementById('forgot');

	A.email_input.onkeyup = function() {A.checkEmail();};
	A.email_input.onblur = function() {A.checkEmail();};
	A.email_input.onfocus = function() {A.checkEmail();};
	A.confirm_input.onkeyup = A.checkConfirm;
	A.confirm_input.onfocus = A.checkConfirm;

	A.sign_btn.onclick = A.signUser;
	A.switch_btn.onclick = A.switchSign;
	A.back_btn.onclick = A.backToForm;
	A.repeat_btn.onclick = A.repeatCode;
	A.register_btn.onclick = A.registerUser;

	A.forgot_btn.onclick = function () {
        location.pathname = '/recovery';
    };

	A.setDiv('sign_form');
	A.switchSign();
};

A.setDiv = function(div_id) {
	document.getElementById('sign_form').style.display = (div_id === 'sign_form') ? 'block' : 'none';
	document.getElementById('email_code').style.display = (div_id === 'email_code') ? 'block' : 'none';
	document.getElementById('loading').style.display = (div_id === 'loading') ? 'block' : 'none';
};

A.switchSign = function() {
	if (A.sign_mode === false) //if <sign in> now
	{
        A.email_input.classList.toggle('input-hidden');
        A.confirm_input.classList.toggle('input-hidden');

		A.sign_btn.innerText = 'Sign Up';
		A.switch_btn.innerText = 'I already have an account';

		A.login_input.onkeyup = function() {A.checkLogin();};
		A.login_input.onblur = function() {A.checkLogin();};
		A.login_input.onfocus = function() {A.checkLogin();};
		A.pass_input.onkeyup = A.checkPass;
		A.pass_input.onfocus = A.checkPass;

		A.checkPass();
		A.checkEmail();
		A.checkLogin();

		A.sign_mode = true;
        A.user_error(false);
	}
	else //if <sign up> now
	{
		A.login_input.style.borderColor = A.res_color;
		A.pass_input.style.borderColor = A.res_color;

        A.email_input.classList.toggle('input-hidden');
        A.confirm_input.classList.toggle('input-hidden');

		A.sign_btn.innerText = 'Sign In';
		A.switch_btn.innerText = 'I don\'t have an account yet';


		A.login_input.onkeyup = null;
		A.login_input.onblur = null;
		A.login_input.onfocus = null;
		A.pass_input.onkeyup = null;
		A.pass_input.onfocus = null;

		A.sign_mode = false;
        A.user_error("<span class=\'title\'>Camagru </span>", 'html');
	}
};

A.checkLogin = function(callback) {
	const string = A.login_input.value;
	A.login_focus = true;
	A.email_focus = false;
	A.user_error(false);
	if (string.match(/^[a-zA-Z0-9_-]{3,15}$/))
	{
		const request = new XMLHttpRequest();
		let params = 'model=authentication&function=loginVerify' +
					'&username=' + string;
		request.open('POST', A.ajax_router);
		request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		request.send(params);

		request.onload = function()
		{
			if (request.responseText === 'true')
			{
				A.login_input.style.borderColor = A.pos_color;
				if (callback !== undefined)
					callback();
			}
			else
			{
				A.login_input.style.borderColor = A.neg_color;
				if (callback === undefined)
				{
					if (A.login_focus)
                    	A.user_error('A user with such login already exists.');
            	}
				else
					A.setDiv('sign_form');
			}
		};
	}
	else
	{
		A.login_input.style.borderColor = A.neg_color;
		if (callback === undefined)
            A.user_error('The login must be 3 to 15 characters long and consist only of English letters, numbers, underscores, and dashes.');
		else
			A.setDiv('sign_form');
	}
};

A.checkEmail = function(callback) {
	const string = A.email_input.value;
	A.login_focus = false;
	A.email_focus = true;
	A.user_error(false);
	if (string.match(/^.{1,30}@.{1,19}$/))
	{
		const request = new XMLHttpRequest();
		let params = 'model=authentication&function=emailVerify' +
					'&usermail=' + string;
		request.open('POST', A.ajax_router);
		request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		request.send(params);

		request.onload = function()
		{
			if (request.responseText === 'true')
			{
				A.email_input.style.borderColor = A.pos_color;
				if (callback !== undefined)
					callback();
			}
			else
			{
				A.email_input.style.borderColor = A.neg_color;
				if (callback === undefined)
				{
					if (A.email_focus)
                    	A.user_error('A user with such email already exists.');
				}
				else
					A.setDiv('sign_form');
			}
		};
	}
	else
	{
		A.email_input.style.borderColor =  A.neg_color;
		if (callback === undefined)
			A.user_error('Invalid email format.');
		else
			A.setDiv('sign_form');
	}
};

A.checkPass = function() {
	A.login_focus = false;
	A.email_focus = false;
	A.checkConfirm();
	if (A.pass_input.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,20}$/))
	{
		A.user_error(false);
		A.pass_input.style.borderColor = A.pos_color;
		return true;
	}
    A.user_error('Invalid password format: At least eight characters, one uppercase and one lowercase letter, and one number.');
	A.pass_input.style.borderColor = A.neg_color;
	return false;
};

A.checkConfirm = function() {
	A.login_focus = false;
	A.email_focus = false;
	if (A.confirm_input.value === A.pass_input.value &&
		A.confirm_input.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,20}$/))
	{
		A.user_error(false);
		A.confirm_input.style.borderColor = A.pos_color;
		return true;
	}
    A.user_error('The passwords do not match.');
	A.confirm_input.style.borderColor = A.neg_color;
	return false;
};

A.signUser = function() {
	A.setDiv('loading');
	if (A.sign_mode === false)
	{
        if (!A.login_input.value.match(/^[a-zA-Z0-9_-]{3,15}$/) ||
			!A.pass_input.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,20}$/))
		{
            window_error('Invalid login or password.');
            A.setDiv('sign_form');
			return;
		}
		const request = new XMLHttpRequest();
		let params = 'model=authentication&function=signIn' +
					'&username=' + A.login_input.value + 
					'&userpass=' + A.pass_input.value;
		request.open('POST', A.ajax_router);
		request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		request.send(params);

		request.onload = function ()
		{
			if (request.responseText === 'true')
				location.pathname = '/selfie';
			else
			{
                window_error('Invalid login or password.');
				A.setDiv('sign_form');
			}
		};
	}
	else
	{
		if (A.checkPass() && A.checkConfirm())
		{
			A.checkLogin(
				function () {
                    A.checkEmail(
                        function () {
                            const request = new XMLHttpRequest();
                            let params = 'model=authentication&function=sendCode' +
                                '&username=' + A.login_input.value +
                                '&userpass=' + A.pass_input.value +
                                '&usermail=' + A.email_input.value;
                            request.open('POST', A.ajax_router);
                            request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                            request.send(params);

                            request.onload = function () {
                                if (request.responseText === 'true') {
                                	document.getElementById('verification_hint').innerText =
										'The letter with verification code was sent to ' + A.email_input.value;
                                    A.setDiv('email_code');
                                }
                                else {
                                    A.setDiv('sign_form');
                                    window_error('Oops, there was an error sending verification code :(');
                                }
                            };
                        }
                    );
                }
			);
		}
		else
		{
            A.setDiv('sign_form');
            A.user_error(false);
		}
	}
};

A.backToForm = function () {
	A.code_input.value = '';
	A.setDiv('sign_form');
};

A.repeatCode = function () {
	A.setDiv('loading');
	const request = new XMLHttpRequest();
	let params = 'model=authentication&function=repeatCode';
	request.open('POST', A.ajax_router);
	request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	request.send(params);

	request.onload = function ()
	{
		if (request.responseText === 'true')
		{
			A.code_input.value = '';
			A.setDiv('email_code');
		}
		else
		{
			A.backToForm();
            window_error('Oops, there was an error sending verification code :(');
		}
	};
};

A.registerUser = function () {
	let string = A.code_input.value;
	if (string.match(/^[0-9]{6}$/))
	{
		A.setDiv('loading');
		const request = new XMLHttpRequest();
		let params = 'model=authentication&function=signUp' +
					'&input_code=' + string;
		request.open('POST', A.ajax_router);
		request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		request.send(params);

		request.onload = function ()
		{
			if (request.responseText === 'true')
				location.pathname = '/selfie';
			else
			{
                window_error('Invalid verification code.');
				A.setDiv('email_code');
			}
		};
	}
	else
        window_error('Invalid verification code.');
};

A.user_error = function (error, mode = 'text') {
	const paragraph = document.getElementById('hint_area');
	if (error === false)
	{
		paragraph.style.opacity = 0;
		return ;
	}
	if (mode === 'html')
        paragraph.innerHTML = error;
	else
        paragraph.innerText = error;
	paragraph.style.opacity = 1;
};

