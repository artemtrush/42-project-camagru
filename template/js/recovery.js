
const R = (function () {
	return {
		step: 0,
		cdisable: 'gray',
		cenable: 'black',
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
    R.stepHandle();
    R.setDiv('forgot_form');
};

R.setDiv = function (div_id) {
    document.getElementById('forgot_form').style.display = (div_id === 'forgot_form') ? 'flex' : 'none';
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
		R.error('Nado 3 simvola');//!!!!!!!!!!
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
        else
            R.error('Net takih');//!!!!!!!!!!
        R.setDiv('forgot_form');
    };
};

R.checkCode = function () {
    if (R.code_input.value.length !== 6) {
        R.error('Nado 6 simvola');//!!!!!!!!!!
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
            R.error('Invalid code');//!!!!!!!!!!
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
			R.prev_btn.style.color = R.cdisable;
			break;
		case 1:
			R.alias_input.disabled = true;
			R.code_input.disabled = false;
			R.pass_input.disabled = true;
			R.conf_input.disabled = true;
			R.prev_btn.style.color = R.cenable;
			break;
		case 2:
			R.alias_input.disabled = true;
			R.code_input.disabled = true;
			R.pass_input.disabled = false;
			R.conf_input.disabled = false;
			R.prev_btn.style.color = R.cenable;
			break;
	}
};

R.error = function (error) {
	console.log(error);
};
