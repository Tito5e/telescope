import { AppBskyFeedPost, AtUri } from "@atproto/api";
import {
	FeedViewPost,
	PostView,
} from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

import { PostContent } from "@/components/Post/PostContent";
import { PostMeta } from "@/components/Post/PostMeta";
import { PostShownReason } from "@/components/Post/PostShownReason";
import { getRelativeTimeString } from "@/components/Post/util";

type PostProps = {
	record: AppBskyFeedPost.Record | undefined;
	post: PostView;
	reason?: FeedViewPost["reason"];
	className?: string;
	showReplyLine?: boolean;
};

function PostInner({
	className,
	record,
	post,
	reason,
	showReplyLine,
}: PostProps) {
	const navigate = useNavigate();

	const itemUri = new AtUri(post.uri);
	return (
		<div
			onClick={(event) => {
				event.preventDefault();
				event.stopPropagation();
				navigate(`/profile/${post.author.handle}/post/${itemUri.rkey}`);
			}}
			className={clsx("flex flex-col p-2 cursor-pointer", className)}>
			{reason && (
				<div className="pl-12">
					<PostShownReason reason={reason} />
				</div>
			)}
			<div className="flex">
				<div className="shrink-0 grow-0">
					<div className="px-2 flex-col flex h-full gap-2">
						<div className="w-10 h-10 rounded-full overflow-hidden shrink-0 grow-0">
							<img
								className="aspect-square w-full h-full object-cover"
								src={post.author.avatar}
							/>
						</div>
						{showReplyLine && (
							<div className="flex h-full shrink-1 grow-1">
								<div className="border-r-2 border-gray-300 shrink-1 grow-1 w-full" />
								<div className="shrink-1 grow-1 w-full" />
							</div>
						)}
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
							href={`/profile/${post.author.handle}`}
						/>
					</div>
					<div className="w-full">
						{record && <PostContent post={post} record={record} />}
					</div>
					<p className="text-sm hidden">{JSON.stringify(record)}</p>
				</div>
			</div>
		</div>
	);
}

export { PostInner };
