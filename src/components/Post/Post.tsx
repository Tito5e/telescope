import { AppBskyFeedPost } from "@atproto/api";
import { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import clsx from "clsx";

import { getRelativeTimeString } from "@/components/Post/util";

type PostProps = {
	payload: FeedViewPost;
	className?: string;
};

function Post(props: PostProps) {
	const response = AppBskyFeedPost.validateRecord(props.payload.post.record);
	if (!response.success) {
		return <span>えらぁ</span>;
	}
	const post = props.payload.post;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const record: any = response.value;
	return (
		<div className={clsx("flex p-2", props.className)}>
			<div className="shrink-0 grow-0">
				<div className="px-2">
					<div className="w-10 h-10 rounded-full overflow-hidden">
						<img
							className="aspect-square w-full h-full object-cover"
							src={post.author.avatar}
						/>
					</div>
				</div>
			</div>
			<div className="shrink-1 grow-1 flex flex-col w-full">
				<div className="flex items-center justify-between w-full">
					<div className="flex items-center shrink-1 grow-1 gap-2">
						<span className="font-semibold shrink-0 grow-0">
							{post.author.displayName}
						</span>
						<span className="text-sm text-zinc-500 shrink-1 grow-1 overflow-x-hidden">
							@{post.author.handle}
						</span>
					</div>
					<span className="text-zinc-500 shrink-0 grow-0">
						{record.createdAt &&
							getRelativeTimeString(new Date(record.createdAt))}
					</span>
				</div>
				<div className="w-full">
					<p>{record.text}</p>
				</div>
			</div>
		</div>
	);
}

export { Post };
