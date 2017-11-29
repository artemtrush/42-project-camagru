
const A = (function () {
	return {
		sign_mode: true,
		pos_color: 'green',
		neg_color: 'red',
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
	A.confirm_input.onkeyup = A.checkConfirm;
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
	document.getElementById('sign_form').style.display = (div_id === 'sign_form') ? 'flex' : 'none';
	document.getElementById('email_code').style.display = (div_id === 'email_code') ? 'block' : 'none';
	document.getElementById('loading').style.display = (div_id === 'loading') ? 'block' : 'none';
};

A.switchSign = function() {
	if (A.sign_mode === false) //if <sign in> now
	{
		A.email_input.style.display = 'inline';
		A.confirm_input.style.display = 'inline';

		A.sign_btn.innerText = 'Sign Up';
		A.switch_btn.innerText = 'I already have an account';
		A.checkEmail();

		A.login_input.onkeyup = function() {A.checkLogin();};
		A.login_input.onblur = function() {A.checkLogin();};
		A.checkLogin();

		A.pass_input.onkeyup = A.checkPass;
		A.checkPass();

		A.sign_mode = true;
	}
	else //if <sign up> now
	{
		A.login_input.style.borderColor = A.res_color;
		A.pass_input.style.borderColor = A.res_color;
		A.email_input.style.display = 'none';
		A.confirm_input.style.display = 'none';

		A.sign_btn.innerText = 'Sign In';
		A.switch_btn.innerText = 'I don\'t have an account yet';


		A.login_input.onkeyup = null;
		A.pass_input.onkeyup = null;

		A.sign_mode = false;
	}
};

A.checkLogin = function(callback) {
	const string = A.login_input.value;
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
                    A.user_error('A user with such login already exists.');
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
                    A.user_error('A user with such email already exists.');
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
	A.checkConfirm();
	if (A.pass_input.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,20}$/))
	{
		A.pass_input.style.borderColor = A.pos_color;
		return true;
	}
    A.user_error('Invalid password format: At least eight characters, one uppercase and one lowercase letter, and one number.');
	A.pass_input.style.borderColor = A.neg_color;
	return false;
};

A.checkConfirm = function() {
	if (A.confirm_input.value === A.pass_input.value &&
		A.confirm_input.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,20}$/))
	{
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
            A.setDiv('sign_form');
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

A.user_error = function (error) {
	console.log(error);//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
};

