/**
 * @fileoverview
 * このファイルは、ヘッダーのナビゲーションメニューコンポーネントを定義します。
 * メニューには、アプリケーション内の主要なページへのリンクが含まれます。
 *
 * @spec
 * - ホーム、ダッシュボード、サインイン、サインアップへのリンクを表示します。
 * - レスポンシブデザインをサポートします。
 *
 * @limitations
 * - メニュー項目は固定されています。
 */

"use client";
import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Button } from "@/shared/components/ui/button";
import { Menu, X, Folder, CreditCard } from "lucide-react";
import { useState } from "react";

const HeaderMenu: React.FC = () => {
	const [open, setOpen] = useState<boolean>(false);

	const toggleMenu = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	return (
		<DropdownMenu open={open} onOpenChange={toggleMenu}>
			<DropdownMenuTrigger asChild>
				<Button onClick={toggleMenu} className="mr-4" variant="secondary">
					{open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuItem asChild>
					<Link href="/dashboard" className="flex">
						<Folder className="mr-2 h-4 w-4" />
						<span>ダッシュボード</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href="/payments" className="flex">
						<CreditCard className="mr-2 h-4 w-4" />
						<span>支払い</span>
					</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default HeaderMenu;
