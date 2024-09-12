/**
 * @file
 * このファイルは、サインアップページのコンポーネントを定義します。
 * ClerkのSignUpコンポーネントを使用して、ユーザーがサインアップできるようにします。
 *
 * @spec
 * - ClerkのSignUpコンポーネントを表示します。
 * - レスポンシブデザインをサポートします。
 *
 * @limitations
 * - カスタムスタイルは適用されていません。
 */

import { SignUp } from "@clerk/nextjs";

export default function Page() {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<SignUp />
		</div>
	);
}
