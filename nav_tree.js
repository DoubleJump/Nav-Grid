var Node_Cycle_Mode = 
{
	NONE: 0,
	LOOP: 1
};

function Node(tree, parent)
{
	var r = {};
	r.data; //dom element/transform/whatevs
	r.parent = parent;
	r.uid = tree.node_count;
	tree.node_count++;
	r.index = parent.children.length;
	r.children = [];
	r.cycle_mode = Node_Cycle_Mode.NONE;
	parent.children.append(r)
	return r;
}

function Tree()
{
	var r = {};
	r.active_item = null;
	r.state = null;
	r.input_state = 'none';
	r.root = null;
	r.node_count = 0;
	r.current_node = null;
	return r;
}

function get_prev_node(tree, node)
{
	if(!node.parent) return node;
	if(node.index === 0)
	{
		switch(node.cycle_mode)
		{
			case Node_Cycle_Mode.NONE: return node;
			case Node_Cycle_Mode.LOOP:
			return node.parent.children[node.parent.node_count-1];
		}	
	}
	return node.parent.children[node.index-1];
}

function get_next_node(tree, node)
{
	var ni = node.index+1;
	if(ni >= node.parent.children.length)
	{
		switch(node.cycle_mode)
		{
			case Node_Cycle_Mode.NONE: return node;
			case Node_Cycle_Mode.LOOP:
			return node.parent.children[0];
		}	
		return node;
	}
	return node.parent.children[ni];
}

function get_prev_branch(tree, node)
{
	if(!node.parent) return node;
	return get_prev_node(tree, node.parent);
}

function get_next_branch(tree, node)
{
	if(!node.parent) return node;
	return get_next_node(tree, node.parent);
}

function enter_node(tree, node)
{
	if(node.children.length === 0) return node;
	return node.children[0];
}