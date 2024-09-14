/**
 * @file web-component.tsx
 * @description Web Componentsを使用してフィードバックウィジェットを提供するコンポーネント
 * @path src/components/web-component.tsx
 * @example
 * <WebFeedbackWidgetWrapper projectId="12345" />
 */
"use client";

import { useEffect, useRef } from "react";
import type { Root } from "react-dom/client";
import { createRoot } from "react-dom/client";
import { Widget } from "@/components/widget";
import dynamic from "next/dynamic";

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

// Web Componentをカスタムエレメントとして登録
if (typeof window !== "undefined") {
	customElements.define("web-feedback-widget", WebFeedbackWidget);
}

// WebFeedbackWidgetをラップするReactコンポーネント
const WebFeedbackWidgetWrapper = ({ projectId }: { projectId: string }) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref.current) {
			const widget = document.createElement("web-feedback-widget");
			widget.setAttribute("project-id", projectId);
			ref.current.appendChild(widget);
		}
		return () => {
			if (ref.current) {
				ref.current.innerHTML = "";
			}
		};
	}, [projectId]);

	return <div ref={ref} />;
};

const WebFeedbackWidgetNoSSR = dynamic(
	() => Promise.resolve(WebFeedbackWidgetWrapper),
	{
		ssr: false,
	},
);

export default WebFeedbackWidgetNoSSR;
