import { Post } from "@/components/Post/Post";
import { useTimelineQuery } from "@/libs/query/timeline";

function TimelineLayout() {
	const {
		data: timeline,
		isError,
		isPending,
	} = useTimelineQuery({
		limit: 30,
		cursor: undefined,
	});
	if (isError) {
		return <span>えらぁ</span>;
	}
	if (isPending) {
		return <></>;
	}
	return (
		<div className="w-full flex flex-col overflow-x-hidden pb-20">
			{timeline.feed.map((post) => (
				<Post payload={post} key={post.post.cid} />
			))}
		</div>
	);
}

export { TimelineLayout };
