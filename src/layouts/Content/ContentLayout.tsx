import { FeedTab } from "@/components/FeedTab/FeedTab";

function ContentLayout() {
	return (
		<div className="w-full h-full flex">
			<div className="w-full h-full basis-[200px] grow-0 shrink-0 border-r border-1 border-gray-600">
				<FeedTab />
			</div>
			<div className="w-full h-full grow-1 shrink-1"></div>
		</div>
	);
}

export { ContentLayout };
