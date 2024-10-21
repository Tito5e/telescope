import { Menu } from "lucide-react";

function Header() {
	return (
		<div className="flex justify-start">
			<div className="p-2">
				<Menu className="w-6 h-6" />
			</div>
		</div>
	);
}

export { Header };
