
const R = (function () {
	return {
		step: 0,
		cdisable: 'gray',
		cenable: 'black',
		ajax_router: '/template/js/ajax.router.php'
	};
}());

R.initialization = function() {
	R.name_input = document.getElementById('rec_name');
	R.code_input = document.getElementById('rec_code');
	R.pass_input = document.getElementById('rec_pass');
	R.conf_input = document.getElementById('rec_confirm');

	R.prev_btn = document.getElementById('rec_prev');
	R.next_btn = document.getElementById('rec_next');
	R.back_btn = document.getElementById('rec_back');

	R.back_btn.onclick = function () {
        location.pathname = '/authentication';
    };

    R.stepHandle();
};

R.prevStep = function () {

	R.step += 1;
	R.stepHandle();
};

R.nextStep = function () {

	R.step += 1;
	R.stepHandle();
};

R.stepHandle = function () {
	switch(R.step) {
	case 0:
		R.name_input.disabled = false;
		R.code_input.disabled = true;
		R.pass_input.disabled = true;
		R.conf_input.disabled = true;
		R.prev_btn.disabled = true;
		R.prev_btn.style.color = R.cdisable;
		break;
	case 1:
		R.name_input.disabled = true;
		R.code_input.disabled = false;
		R.pass_input.disabled = true;
		R.conf_input.disabled = true;
		R.prev_btn.disabled = false;
		R.prev_btn.style.color = R.cenable;
		break;
	case 2:
		R.name_input.disabled = true;
		R.code_input.disabled = true;
		R.pass_input.disabled = false;
		R.conf_input.disabled = false;
		R.prev_btn.disabled = true;
		R.prev_btn.style.color = R.cenable;
		break;
	}
};

R.serverError = function () {
	console.log('error');
};
