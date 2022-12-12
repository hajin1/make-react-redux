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
	// 바벨 트랜스파일러가 인자가 없는 빈객체를 null로 넘기기 때문에 빈객체가 null이 되지 않도록 방어코드 추가
	props = props || {};

	if (typeof tag === 'function') {
		if (children.length > 0) {
			return tag({
				...props,
				children: children.length === 1 ? children[0] : children,
			});
		}
		return tag(props);
	}

	return {
		tag,
		props,
		children,
	};
}

export function render(vdom, container) {
	container.appendChild(createDom(vdom));
}
