import { Tag } from 'domelementtype';

export class Component {
	constructor(props) {
		this.props = props;
	}
}

export function createDom(node) {
	if (typeof node === 'string') {
		return document.createTextNode(node);
	}

	const element = document.createElement(node.tag);

	Object.entries(node.props).forEach(([name, value]) => element.setAttribute(name, value));

	node.children.map(createDom).forEach(element.appendChild.bind(element));

	return element;
}

function makeProps(props, children) {
	return {
		...props,
		children: children.length === 1 ? children[0] : children,
	};
}

// chilren은 길이가 가변적인 가변인자로 받음
export function createElement(tag, props, ...children) {
	// 바벨 트랜스파일러가 인자가 없는 빈객체를 null로 넘기기 때문에 빈객체가 null이 되지 않도록 방어코드 추가
	props = props || {};

	// typeof 연산자는 함수와 클래스를 구분하지 못한다
	if (typeof tag === 'function') {
		// 실제 리액트는 심볼로 확인함
		if (tag.prototype instanceof Component) {
			const instance = new tag(makeProps(props, children));
			return instance.render();
		} else {
			if (children.length > 0) {
				return tag(makeProps(props, children));
			}
			return tag(props);
		}
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
