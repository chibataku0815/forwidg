/**
 * @file ユーザー用のレイアウトコンポーネント
 * @description このファイルは、ユーザー用のページ全体のレイアウトを定義します。
 * 主にTailwind CSSのproseクラスを使用して、コンテンツのスタイルを整えます。
 */

// レイアウトコンポーネントの定義
function UserLayout({ children }: { children: React.ReactNode }) {
	return <div className="container mx-auto">{children}</div>;
}

export default UserLayout;
