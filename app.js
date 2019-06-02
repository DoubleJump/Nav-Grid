var app = {};


window.addEventListener('load', init);
function init()
{
	app.keyboard = Keyboard();
	//app.gamepad;
	//app.leap_motion;
	//sound input
	//teachable machine
	app.nav = Tree();
	requestAnimationFrame(update);
}

//First thing we need to do is build the tree, assigning data as we go,

/*
var data = 
[
	{
		name: 'home',
		url: ''
		shortcut: h,
	},
	{
		name: 'work',
		shortcut: w,
		children:
		[
			{ name:'Work Item 1', shortcut: 1 },
			{ name:'Long Work Item 2', shortcut: 2 },
			{ name:'Work item 3', shortcut: 3 },
		],
	},
]
*/

function dom_tree_to_nav_tree()
{
	var r = Tree();

	r.root = document.querySelector('nav');
}

function update()
{
	requestAnimationFrame(update);

	var state = 'none';

	// Keyboard

	if(key_down(Keys.LEFT)) state = 'prev';
	if(key_down(Keys.RIGHT)) state = 'next';
	if(key_down(Keys.UP)) state = 'enter';
	if(key_down(Keys.DOWN)) state = 'exit';

	app.nav.input_state = state;

	//update_nav(app.nav);
	update_keyboard(app.keyboard);
}

// this is where we need to decide how much the tree
// does itself versus being customisable, not sure what
// the right answer is until trying it on a few things

function update_tree(tree)
{
	var cn = tree.current_node;
	switch(tree.input_state)
	{
		case 'prev':

			tree.active_node = get_prev_node(tree, cn);

		break;
		case 'next':

			tree.active_node = get_prev_node(tree, cn);

		break;
		case 'enter':

			tree.active_node = enter_node(tree, cn);

		break;
		case 'exit':


		break;
	}

	nav.input_state = 'none';
}

function render_tree(tree)
{

}

