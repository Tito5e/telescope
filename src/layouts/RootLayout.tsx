import { ProfileControl } from "@/components/ProfileControl/ProfileControl";
import { ContentLayout } from "@/layouts/Content/ContentLayout";

function RootLayout() {
	return (
		<div className="grid xl:[grid-template-areas:'header_content''control_content'] grid-cols-[240px_1fr] grid-rows-[1fr_80px] w-full h-full">
			<header className="xl:[grid-area:header] xl:border-b xl:border-gray-600 xl:border-1">
				a
			</header>
			<main className="xl:[grid-area:content] xl:border-l xl:border-gray-600 xl:border-1">
				<ContentLayout />
			</main>
			<div className="xl:[grid-area:control]">
				<ProfileControl />
			</div>
		</div>
	);
}

export { RootLayout };
