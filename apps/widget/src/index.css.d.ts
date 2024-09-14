/**
 * @file index.css.d.ts
 * @brief CSS Modulesの型定義ファイル
 * @path src/index.css.d.ts
 */
declare module "*.module.css" {
	const classes: {
		[key: string]: string;
	};
	export default classes;
}
