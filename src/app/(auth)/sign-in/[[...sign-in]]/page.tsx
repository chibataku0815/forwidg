/**
 * @file
 * このファイルは、サインインページのコンポーネントを定義します。
 * ClerkのSignInコンポーネントを使用して、ユーザーがサインインできるようにします。
 *
 * @spec
 * - ClerkのSignInコンポーネントを表示します。
 * - レスポンシブデザインをサポートします。
 *
 * @limitations
 * - カスタムスタイルは適用されていません。
 */

import { SignIn } from "@clerk/nextjs";

export default function Page() {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<SignIn />
		</div>
	);
}
