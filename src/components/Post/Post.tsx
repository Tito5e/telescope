import { AppBskyFeedPost } from "@atproto/api";
import { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import clsx from "clsx";

import { PostInner } from "@/components/Post/PostInner";
import { usePostQuery } from "@/libs/query/post";

type PostProps = {
	payload: FeedViewPost;
	className?: string;
};

function Post(props: PostProps) {
	const record: AppBskyFeedPost.Record | undefined =
		AppBskyFeedPost.isRecord(props.payload.post.record) &&
		AppBskyFeedPost.validateRecord(props.payload.post.record).success
			? props.payload.post.record
			: undefined;
	const post = props.payload.post;

	const reply: AppBskyFeedPost.ReplyRef | undefined = record?.reply;
	const {
		data: beforePost,
		isPending,
		isError,
	} = usePostQuery(reply?.parent.uri);

	if (reply && beforePost && !isPending && !isError) {
		const beforeRecord: AppBskyFeedPost.Record | undefined =
			AppBskyFeedPost.isRecord(beforePost.record) &&
			AppBskyFeedPost.validateRecord(beforePost.record).success
				? beforePost.record
				: undefined;
		return (
			<>
				<PostInner
					post={beforePost}
					record={beforeRecord}
					className={props.className}
					showReplyLine
				/>
				<PostInner
					reason={props.payload.reason}
					post={post}
					record={record}
					className={clsx(
						"border-b border-gray-300",
						props.className,
					)}
				/>
			</>
		);
	}

	return (
		<>
			<PostInner
				reason={props.payload.reason}
				post={post}
				record={record}
				className={clsx("border-b border-gray-300", props.className)}
			/>
		</>
	);
}

export { Post };
