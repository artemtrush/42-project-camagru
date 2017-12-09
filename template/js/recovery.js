
const R = (function () {
	return {
		step: 0,
		ajax_router: '/template/js/ajax.router.php'
	};
}());

R.initialization = function() {
	R.alias_input = document.getElementById('rec_alias');
	R.code_input = document.getElementById('rec_code');
	R.pass_input = document.getElementById('rec_pass');
	R.conf_input = document.getElementById('rec_confirm');

	R.prev_btn = document.getElementById('rec_prev');
	R.next_btn = document.getElementById('rec_next');
	R.back_btn = document.getElementById('rec_back');

	R.back_btn.onclick = function () {
        location.pathname = '/authentication';
    };
	R.prev_btn.onclick = R.prevStep;
	R.next_btn.onclick = R.nextStep;
    document.onkeypress = function (event) {
        if (event.which === 13)
            R.nextStep();
    };
    R.stepHandle();
    R.setDiv('forgot_form');
};

R.setDiv = function (div_id) {
    document.getElementById('forgot_form').style.display = (div_id === 'forgot_form') ? 'block' : 'none';
    document.getElementById('loading').style.display = (div_id === 'loading') ? 'block' : 'none';
};

R.prevStep = function () {
	if (R.step > 0)
	{
        R.step -= 1;
        R.stepHandle();
    }
};

R.checkAlias = function () {
	if (R.alias_input.value.length < 3) {
		window_error('The user with such account could not be found.');
        return;
    }
    R.setDiv('loading');
    R.code_input.value = '';
    const request = new XMLHttpRequest();
    let params = 'model=recovery&function=aliasVerify' +
				'&useralias=' + R.alias_input.value;
    request.open('POST', R.ajax_router);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(params);

    request.onload = function()
    {
        if (request.responseText === 'true')
        {
            R.step += 1;
            R.stepHandle();
        }
        else if (request.responseText === 'false')
            window_error('The user with such account could not be found.');
		else
            window_error('Oops, there was an error sending verification code :(');
        R.setDiv('forgot_form');
    };
};

R.checkCode = function () {
    if (R.code_input.value.length !== 6) {
        window_error('Invalid verification code.');
        return;
    }
    R.setDiv('loading');
    const request = new XMLHttpRequest();
    let params = 'model=recovery&function=codeVerify' +
				'&reset_code=' + R.code_input.value;
    request.open('POST', R.ajax_router);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(params);

    request.onload = function()
    {
        if (request.responseText === 'true')
        {
            R.step += 1;
            R.stepHandle();
        }
        else
            window_error('Invalid verification code.');
        R.setDiv('forgot_form');
    };
};

R.checkPass = function () {
	if (!(R.pass_input.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,20}$/)))
	{
		window_error('Invalid password format: At least eight characters, one uppercase and one lowercase letter, and one number.', 7);
		return;
	}
	if (R.pass_input.value !== R.conf_input.value)
	{
        window_error('The passwords do not match.');
        return;
	}
    R.setDiv('loading');
    const request = new XMLHttpRequest();
    let params = 'model=recovery&function=passUpdate' +
        '&new_pass=' + R.pass_input.value;
    request.open('POST', R.ajax_router);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(params);

    request.onload = async function()
    {
        if (request.responseText === 'true') {
            location.pathname = '/selfie';
        }
        else
            window_error('Oops, there was an error updating your password :(');
        R.setDiv('forgot_form');
    };
};

R.nextStep = function () {
	switch (R.step) {
		case 0:
            R.checkAlias();
			break;
		case 1:
            R.checkCode();
			break;
		case 2:
			R.checkPass();
			break;
	}
};

R.stepHandle = function () {
	switch(R.step) {
		case 0:
			R.alias_input.disabled = false;
			R.code_input.disabled = true;
			R.pass_input.disabled = true;
			R.conf_input.disabled = true;
            R.code_input.classList.remove('recovery-complete');
            R.code_input.classList.add('recovery-disabled');

			R.prev_btn.classList.add('disabled');
            R.prev_btn.style.pointerEvents = 'none';
			break;
		case 1:
			R.alias_input.disabled = true;
			R.code_input.disabled = false;
			R.pass_input.disabled = true;
			R.conf_input.disabled = true;
            R.alias_input.classList.add('recovery-complete');

            R.prev_btn.classList.remove('disabled');
            R.prev_btn.style.pointerEvents = 'auto';
			break;
		case 2:
			R.alias_input.disabled = true;
			R.code_input.disabled = true;
			R.pass_input.disabled = false;
			R.conf_input.disabled = false;
            R.code_input.classList.add('recovery-complete');
            R.code_input.classList.remove('recovery-disabled');

            R.prev_btn.classList.remove('disabled');
            R.prev_btn.style.pointerEvents = 'auto';
			break;
	}
};
