import { usePinnedFeedsQuery } from "@/libs/query/feed";

function FeedTab() {
	const { data: pinnedFeeds, isError, isPending } = usePinnedFeedsQuery();

	if (isError) return <></>;
	if (isPending) return <></>;

	return (
		<div className="w-full h-full">
			{pinnedFeeds.feeds.map((feed) => {
				return (
					<div>
						{feed.type === "timeline" ? (
							<span className="">Timeline</span>
						) : feed.type === "feed" ? (
							<span className="">{feed.data.displayName}</span>
						) : (
							<span className="">{feed.data.name}</span>
						)}
					</div>
				);
			})}
		</div>
	);
}

export { FeedTab };
