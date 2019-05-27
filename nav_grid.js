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

function Nav_List(root)
{
	var r = {};
	r.root = root;
	r.index = 0;
	var children = root.querySelectorAll('.item');
	r.count = children.length;
	r.children = new Array(r.count);

	for(var i = 0; i < r.count; ++i)
	{
		var item = children[i];
		var name = item.getAttribute('data-name');
		var sub_menu = document.querySelector('[data-menu=' + name + ']');
		if(sub_menu)
		{
			r.children[i] = Nav_List(sub_menu);
		}
		else
		{
			r.children[i] = item;
		}
	}
	return r;
}

function Nav_Grid(data)
{
	var r = {};
	r.col_index = 0;
	r.row_index = 0;
	r.active_item = null;
	r.state = null;
	r.input_state = 'none';
	r.root = document.querySelector('nav');
	r.list = Nav_List(document.querySelector('.menu-main'));
	r.preview = document.querySelector('menu-preview');
	return r;
}

function update_nav(nav)
{
	var category = nav.categories[nav.category_index];
	var num_categories = nav.categories.length;
	var num_links = category.links.length;
	var link_index = nav.link_index;
	var cat_index = nav.category_index;

	switch(nav.input_state)
	{
		case 'prev':

			if(num_links > 1)
			{	
				link_index--;
				//if(link_index < 0) link_index = num_links-1;
				if(link_index < 0) link_index = 0;
			}

		break;
		case 'next':

			if(num_links > 1)
			{	
				link_index++;
				//if(link_index > num_links-1) link_index = 0;
				if(link_index >= num_links) link_index = num_links-1;
			}

		break;
		case 'up':

			link_index = 0;
			cat_index--;
			if(cat_index < 0) cat_index = 0;

		break;
		case 'down':

			link_index = 0;
			cat_index++;
			if(cat_index >= num_categories) cat_index = num_categories-1;

		break;
	}

	category = nav.categories[cat_index];
	var link = category.links[link_index];

	if(nav.active_link != null)
	{
		if(link !== nav.active_link)
		{
			nav.active_link.classList.remove('active');
		}
	}
	link.classList.add('active');
	nav.active_link = link;

	//TODO: go through and measure each cat width
	nav.root.style.transform = 'translateX(' + (-cat_index * 200) + 'px)';

	category.element.style.transform = 'translateY(' + (-link_index * 60) + 'px)';

	nav.link_index = link_index;
	nav.category_index = cat_index;
	nav.input_state = 'none';
}