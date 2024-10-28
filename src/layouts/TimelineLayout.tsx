import PullToRefresh from "react-simple-pull-to-refresh";
import { VList } from "virtua";

import { Post } from "@/components/Post/Post";
import {
	useInfiniteTimelineQuery,
	useInvalidateInfiniteTimelineQuery,
} from "@/libs/query/timeline";

function TimelineLayout() {
	const {
		data: timeline,
		status,
		hasNextPage,
		fetchNextPage,
	} = useInfiniteTimelineQuery({});

	const { invalidate: invalidateTimeline } =
		useInvalidateInfiniteTimelineQuery();

	const allPosts = timeline ? timeline.pages.flatMap((d) => d.posts) : [];

	if (status === "error") {
		return <span>えらぁ</span>;
	}
	if (status === "pending") {
		return <></>;
	}
	return (
		<main className="[grid-area:content] w-full h-full max-w-[800px]">
			<PullToRefresh
				isPullable={false}
				onRefresh={async () => {
					await invalidateTimeline();
				}}>
				<VList
					className="w-full"
					onRangeChange={async (_, end) => {
						if (end + 10 > allPosts.length) {
							await fetchNextPage();
						}
					}}>
					{allPosts.map((post, index) => {
						const isLoader = index > allPosts.length - 1;

						return (
							<div className="w-full" key={index}>
								{isLoader ? (
									hasNextPage ? (
										"Loading..."
									) : (
										"Nothing"
									)
								) : (
									<Post payload={post} />
								)}
							</div>
						);
					})}
				</VList>
			</PullToRefresh>
		</main>
	);
}

export { TimelineLayout };
