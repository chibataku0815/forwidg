import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
/**
 * @fileoverview
 * このファイルは、アプリケーション全体のレイアウトを定義します。
 * Noto Sans JPフォントを使用し、HTMLの言語を日本語に設定します。
 *
 * @spec
 * - Noto Sans JPフォントをGoogle Fontsから読み込み、CSS変数として設定します。
 * - HTMLのlang属性を"ja"に設定します。
 * - bodyタグにフォントクラスを適用します。
 *
 * @limitations
 * - フォントのサブセットは"latin"のみです。
 *
 * @path apps/dashboard/src/app/layout.tsx
 */

const notoSansJP = Noto_Sans_JP({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-noto-sans-jp",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ja">
			<body className={notoSansJP.className}>{children}</body>
		</html>
	);
}
