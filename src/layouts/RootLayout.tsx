import { Outlet } from "react-router-dom";

import { Header } from "@/components/Header/Header";
import { Navigation } from "@/components/Navigation/Navigation";

function RootLayout() {
	return (
		<div className="grid xl:[grid-template-areas:'header''content''navigation'] grid-cols-1 grid-rows-[max-content_1fr_max-content] w-full h-full">
			<header className="xl:[grid-area:header] border-b border-gray-300 border-1">
				<Header />
			</header>
			<main className="xl:[grid-area:content]">
				<Outlet />
			</main>
			<footer className="xl:[grid-area:navigation] border-t border-gray-300 border-1 fixed bg-white bottom-0 w-full">
				<Navigation />
			</footer>
		</div>
	);
}

export { RootLayout };
