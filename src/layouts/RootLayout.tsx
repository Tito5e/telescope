import { Outlet } from "react-router-dom";

import { Header } from "@/components/Header/Header";
import { Navigation } from "@/components/Navigation/Navigation";

function RootLayout() {
	return (
		<div className="grid [grid-template-areas:'header''content''navigation'] grid-cols-1 grid-rows-[max-content_auto_max-content] w-full h-screen max-h-screen">
			<header className="[grid-area:header] border-b border-gray-300 border-1">
				<Header />
			</header>
			<Outlet />
			<footer className="[grid-area:navigation] border-t border-gray-300 border-1 bg-white bottom-0 w-full">
				<Navigation />
			</footer>
		</div>
	);
}

export { RootLayout };
