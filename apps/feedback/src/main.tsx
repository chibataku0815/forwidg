import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

/**
 * アプリケーションのエントリーポイント
 * ここでReactアプリケーションをルートDOM要素にレンダリングします。
 *
 * @throws {Error} ルート要素が見つからない場合にエラーをスローします。
 */
const rootElement = document.getElementById("root");
if (!rootElement) {
	throw new Error(
		'Failed to find the root element. Please ensure there is an element with id "root" in your HTML.',
	);
}

createRoot(rootElement).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
