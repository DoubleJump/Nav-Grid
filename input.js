var KeyState =
{
	RELEASED: 0,
	UP: 1,
	DOWN: 2,
	HELD: 3,
};

var Keys =
{
	MOUSE_LEFT: 0,
	MOUSE_RIGHT: 1,
	BACKSPACE: 8,
	TAB: 9,
	ENTER: 13,
	SHIFT: 16,
	CTRL: 17,
	ALT: 18,
	CAPS: 20,
	ESCAPE: 27,
	SPACE: 32,
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
	ZERO: 48,
	ONE: 49,
	TWO: 50,
	THREE: 51,
	FOUR: 52,
	FIVE: 53,
	SIX: 54,
	SEVEN: 55,
	EIGHT: 56,
	NINE: 57,
	A: 65,
	B: 66,
	C: 67,
	D: 68,
	E: 69,
	F: 70,
	G: 71,
	H: 72,
	I: 73,
	J: 74,
	K: 75,
	L: 76,
	M: 77,
	N: 78,
	O: 79,
	P: 80,
	Q: 81,
	R: 82,
	S: 83,
	T: 84,
	U: 85,
	V: 86,
	W: 87,
	X: 88,
	Y: 89,
	Z: 90,
};

var _keyboard;
function Keyboard(root)
{
	var r = {};
	r.keys = new Uint8Array(256);
	r.eat_events = false;
	if(!root) root = window;

	window.addEventListener('keydown', on_key_down);
	window.addEventListener('keyup', on_key_up);

	_keyboard = r;
	return r;
}

function update_keyboard(kb)
{
	for(var i = 0; i < 256; ++i)
	{
		if(kb.keys[i] === KeyState.DOWN) kb.keys[i] = KeyState.HELD;
		else if(kb.keys[i] === KeyState.UP) kb.keys[i] = KeyState.RELEASED;
	}
}

function key_up(code)
{
	return _keyboard.keys[code] === KeyState.UP;
}
function key_down(code)
{
	return _keyboard.keys[code] === KeyState.DOWN;
}
function key_held(code)
{
	return _keyboard.keys[code] === KeyState.HELD || in_keyboardput.keys[code] === KeyState.DOWN;
}
function key_released(code)
{
	return _keyboard.keys[code] === KeyState.RELEASED || _keyboard.keys[code] === KeyState.UP;
}
function on_key_down(e)
{
	var kc = e.keyCode || e.button;
	if(_keyboard.keys[kc] != KeyState.HELD) _keyboard.keys[kc] = KeyState.DOWN;
	if(_keyboard.eat_events) e.preventDefault();
}
function on_key_up(e)
{
	var kc = e.keyCode || e.button;
	if(_keyboard.keys[kc] != KeyState.RELEASED) _keyboard.keys[kc] = KeyState.UP;
	if(_keyboard.eat_events) e.preventDefault();
}