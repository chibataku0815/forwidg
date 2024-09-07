import ReactDom from "react-dom/client";
/**
 * @file
 * このファイルは、WebコンポーネントとしてのWidgetを定義します。
 * 属性名を正規化する関数と、Webコンポーネントのクラスを含みます。
 */

import { Widget } from "./index";

/**
 * 属性名を正規化する関数
 * @param {string} attribute - 正規化する属性名
 * @returns {string} 正規化された属性名
 */
export function normalizeAttribute(attribute: string): string {
	return attribute.replace(/-([a-z])/g, (_, letter: string) =>
		letter.toUpperCase(),
	);
}

/**
 * WidgetWebComponentクラス
 * WebコンポーネントとしてのWidgetを定義します。
 */
class WidgetWebComponent extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		const props = this.getPropsFromAttributes();
		const shadowRoot = this.shadowRoot;

		if (!shadowRoot) {
			console.error("WidgetWebComponent: ShadowRoot is not available.");
			return;
		}
		const root = ReactDom.createRoot(shadowRoot);
		root.render(<Widget projectId={props.projectId} />);
	}
	/**
	 * 属性からプロパティを取得する関数
	 * @returns {Record<string, string>} 属性から取得したプロパティのオブジェクト
	 */
	getPropsFromAttributes(): Record<string, string> {
		const props: Record<string, string> = {};
		for (let i = 0; i < this.attributes.length; i++) {
			const attribute = this.attributes[i];
			props[normalizeAttribute(attribute.name)] = attribute.value;
		}
		return props;
	}
}

customElements.define("widget-web-component", WidgetWebComponent);

export default WidgetWebComponent;
