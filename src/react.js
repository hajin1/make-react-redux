export function createDom(node) {
	if (typeof node === 'string') {
		return document.createTextNode(node);
	}

	const element = document.createElement(node.tag);

	Object.entries(node.props).forEach(([name, value]) => element.setAttribute(name, value));

	node.children.map(createDom).forEach(element.appendChild.bind(element));

	return element;
}

// chilren은 길이가 가변적인 가변인자로 받음
export function createElement(tag, props, ...children) {
	return {
		tag,
		props,
		children,
	};
}

export function render(vdom, container) {
	container.appendChild(createDom(vdom));
}
