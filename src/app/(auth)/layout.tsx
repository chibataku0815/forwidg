import { UserButton } from "@clerk/nextjs";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<UserButton />
			{children}
		</div>
	);
};

export default Layout;
