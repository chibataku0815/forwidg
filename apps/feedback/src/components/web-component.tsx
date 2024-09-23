/**
 * @file web-component.tsx
 * @description Web Componentsを使用してフィードバックウィジェットを提供するコンポーネント
 * @path src/components/web-component.tsx
 * @example
 * <web-feedback-widget project-id="12345"></web-feedback-widget>
 */

import type { Root } from "react-dom/client";
import { createRoot } from "react-dom/client";
import { Widget } from "./Widget";

/**
 * @function normalizeAttribute
 * @description 属性名を正規化し、ケバブケースをキャメルケースに変換します
 * @param {string} attribute - 正規化する属性名
 * @returns {string} 正規化された属性名
 */
export const normalizeAttribute = (attribute: string): string => {
	return attribute.replace(/-([a-z])/g, (_: string, letter: string) =>
		letter.toUpperCase(),
	);
};

// Web Componentの定義
class WebFeedbackWidget extends HTMLElement {
	private root: Root | null = null;

	connectedCallback() {
		const projectId = this.getAttribute("project-id") || "";
		if (!this.root) {
			this.root = createRoot(this.attachShadow({ mode: "open" }));
		}
		this.root.render(<Widget projectId={projectId} />);
	}

	disconnectedCallback() {
		if (this.root) {
			this.root.unmount();
		}
	}
}

export default WebFeedbackWidget;
