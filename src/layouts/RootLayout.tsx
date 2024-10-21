import { Navigation } from "@/components/Navigation/Navigation";
import { ContentLayout } from "@/layouts/Content/ContentLayout";

function RootLayout() {
	return (
		<div className="grid xl:[grid-template-areas:'header''content''navigation'] grid-cols-1 grid-rows-[max-content_1fr_max-content] w-full h-full">
			<header className="xl:[grid-area:header] border-b border-gray-300 border-1">
				a
			</header>
			<main className="xl:[grid-area:content]">
				<ContentLayout />
			</main>
			<footer className="xl:[grid-area:navigation] border-t border-gray-300 border-1">
				<Navigation />
			</footer>
		</div>
	);
}

export { RootLayout };
