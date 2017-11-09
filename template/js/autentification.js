
const form = (function () {
	return {
		sign_mode: true,
		pos_color: 'green',
		neg_color: 'red',
		res_color: '',
		ajax_router: '/template/js/ajax.router.php'
	};
}());

form.initialization = function() {
	form.login_input = document.getElementById('login');
	form.pass_input = document.getElementById('pass');
	form.email_input = document.getElementById('mail');
	form.confirm_input = document.getElementById('confirm');
	form.code_input = document.getElementById('code');

	form.sign_btn = document.getElementById('sign');
	form.switch_btn = document.getElementById('switch');
	form.back_btn = document.getElementById('return_sign');
	form.repeat_btn = document.getElementById('repeat');
	form.register_btn = document.getElementById('register');

	form.email_input.onkeyup = function() {form.checkEmail();};
	form.email_input.onblur = function() {form.checkEmail();};
	form.confirm_input.onkeyup = form.checkConfirm;
	form.sign_btn.onclick = form.signUser;
	form.switch_btn.onclick = form.switchSign;
	form.back_btn.onclick = form.backToForm;
	form.repeat_btn.onclick = form.repeatCode;
	form.register_btn.onclick = form.registerUser;
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
		form.login_input.onblur = function() {form.checkLogin();};
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
	if (string.match(/^[a-zA-Z0-9_-]{3,15}$/))
	{
		const request = new XMLHttpRequest();
		let params = 'model=autentification&function=loginVerify' +
					'&username=' + string;
		request.open('POST', form.ajax_router);
		request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		request.send(params);

		request.onload = function()
		{
			if (request.responseText === 'true')
			{
				form.login_input.style.borderColor = form.pos_color;
				if (callback !== undefined)
					callback();
			}
			else if (request.responseText === 'false')
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
		let params = 'model=autentification&function=emailVerify' +
					'&usermail=' + string;
		request.open('POST', form.ajax_router);
		request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		request.send(params);

		request.onload = function()
		{
			if (request.responseText === 'true')
			{
				form.email_input.style.borderColor = form.pos_color;
				if (callback !== undefined)
					callback();
			}
			else if (request.responseText === 'false')
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
		let params = 'model=autentification&function=signIn' +
					'&username=' + form.login_input.value + 
					'&userpass=' + form.pass_input.value;
		request.open('POST', form.ajax_router);
		request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		request.send(params);

		request.onload = function ()
		{
			if (request.responseText === 'true')
				location.pathname = '/selfie';
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
						let params = 'model=autentification&function=sendCode' +
									'&username=' + form.login_input.value +
									'&userpass=' + form.pass_input.value +
									'&usermail=' + form.email_input.value;
						request.open('POST', form.ajax_router);
						request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
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

form.backToForm = function () {
	form.code_input.value = '';
	form.setDiv('sign_form');
};

form.repeatCode = function () {
	form.setDiv('loading');
	const request = new XMLHttpRequest();
	let params = 'model=autentification&function=repeatCode';
	request.open('POST', form.ajax_router);
	request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	request.send(params);

	request.onload = function ()
	{
		if (request.responseText === 'true')
		{
			form.setDiv('email_code');
		}
		else
		{
			form.backToForm();
			form.serverError();
		}
	};
};

form.registerUser = function () {
	let string = form.code_input.value;
	if (string.match(/^[0-9]{6}$/))
	{
		form.setDiv('loading');
		const request = new XMLHttpRequest();
		let params = 'model=autentification&function=signUp' +
					'&input_code=' + string;
		request.open('POST', form.ajax_router);
		request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		request.send(params);

		request.onload = function ()
		{
			console.log(request.responseText);
			if (request.responseText === 'true')
				location.pathname = '/selfie';
			else
			{
				//form.code_input.value = '';
				form.setDiv('email_code');
				console.log('bad code');
				//error bad code
			}
		};
	}
	else
	{
		//form.code_input.value = '';
		console.log('bad codeOO');
		//error bad code
	}
};

form.serverError = function () {
	console.log('error');
};
