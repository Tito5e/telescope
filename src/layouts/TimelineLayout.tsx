import { Post } from "@/components/Post/Post";
import { useTimelineQuery } from "@/libs/query/timeline";

function TimelineLayout() {
	const {
		data: timeline,
		isError,
		isPending,
	} = useTimelineQuery({
		limit: 10,
		cursor: undefined,
	});
	if (isError) {
		return <span>えらぁ</span>;
	}
	if (isPending) {
		return <></>;
	}
	return (
		<div className="w-full flex flex-col overflow-y-scroll overflow-x-hidden pb-20">
			{timeline.feed.map((post) => (
				<Post
					payload={post}
					className="border-b border-gray-300"
					key={post.post.cid}
				/>
			))}
		</div>
	);
}

export { TimelineLayout };
