var app = {};


window.addEventListener('load', init);
function init()
{
	app.keyboard = Keyboard();
	//app.gamepad;
	//app.leap_motion;
	app.nav = Nav_Grid();
	requestAnimationFrame(update);
}

function update()
{
	requestAnimationFrame(update);

	var state = 'none';

	// Keyboard

	if(key_down(Keys.LEFT)) state = 'prev';
	if(key_down(Keys.RIGHT)) state = 'next';
	if(key_down(Keys.UP)) state = 'up';
	if(key_down(Keys.DOWN)) state = 'down';

	app.nav.input_state = state;

	//update_nav(app.nav);
	update_keyboard(app.keyboard);
}


