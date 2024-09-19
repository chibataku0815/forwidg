import { Link } from "lucide-react";

const Footer = () => {
	return (
		<footer className="mt-24 border-t flex justify-center w-full p-5">
			<div className="flex flex-col gap-3">
				<p className="text-gray-800 text-sm underline">
					<a href="/law">特定商取引法に基づく表記</a>
				</p>
				<p className="text-gray-800">&copy; 2024 Forestone, Inc.</p>
			</div>
		</footer>
	);
};

export default Footer;
