import { AppBskyFeedPost, AtUri } from "@atproto/api";
import { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import clsx from "clsx";
import { Link } from "react-router-dom";

import { PostContent } from "@/components/Post/PostContent";
import { PostShownReason } from "@/components/Post/PostShownReason";
import { getRelativeTimeString } from "@/components/Post/util";

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
	const itemUri = new AtUri(post.uri);
	return (
		<Link
			to={`/profile/${post.author.handle}/post/${itemUri.rkey}`}
			className={clsx("flex flex-col p-2", props.className)}>
			{props.payload.reason && (
				<div className="pl-12">
					<PostShownReason reason={props.payload.reason} />
				</div>
			)}
			<div className="flex">
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
							{record?.createdAt &&
								getRelativeTimeString(
									new Date(record.createdAt),
								)}
						</span>
					</div>
					<div className="w-full">
						{record && <PostContent post={post} record={record} />}
					</div>
					<p className="text-sm">{JSON.stringify(record)}</p>
				</div>
			</div>
		</Link>
	);
}

export { Post };
