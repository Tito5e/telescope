import { AppBskyFeedPost, AtUri } from "@atproto/api";
import { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";

import { PostContent } from "@/components/Post/PostContent";
import { PostMeta } from "@/components/Post/PostMeta";
import { PostShownReason } from "@/components/Post/PostShownReason";
import { getRelativeTimeString } from "@/components/Post/util";

type PostProps = {
	payload: FeedViewPost;
	className?: string;
};

function Post(props: PostProps) {
	const navigate = useNavigate();

	const record: AppBskyFeedPost.Record | undefined =
		AppBskyFeedPost.isRecord(props.payload.post.record) &&
		AppBskyFeedPost.validateRecord(props.payload.post.record).success
			? props.payload.post.record
			: undefined;
	const post = props.payload.post;
	const itemUri = new AtUri(post.uri);
	return (
		<div
			onClick={(event) => {
				event.preventDefault();
				event.stopPropagation();
				navigate(`/profile/${post.author.handle}/post/${itemUri.rkey}`);
			}}
			className={clsx(
				"flex flex-col p-2 cursor-pointer",
				props.className,
			)}>
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
						<PostMeta
							displayName={post.author.displayName}
							handle={`@${post.author.handle}`}
							timestamp={
								record?.createdAt &&
								getRelativeTimeString(
									new Date(record.createdAt),
								)
							}
							did={post.author.did}
						/>
					</div>
					<div className="w-full">
						{record && <PostContent post={post} record={record} />}
					</div>
					<p className="text-sm">{JSON.stringify(record)}</p>
				</div>
			</div>
		</div>
	);
}

export { Post };
