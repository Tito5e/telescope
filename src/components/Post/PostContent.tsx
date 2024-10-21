import { AppBskyFeedDefs, AppBskyFeedPost, AtUri } from "@atproto/api";
import { Reply } from "lucide-react";

import { PostEmbed } from "@/components/Post/PostEmbed";
import { UserInfoText } from "@/components/UserInfoText";
import { useSessionStore } from "@/libs/store/session";

type PostContentProps = {
	post: AppBskyFeedDefs.PostView;
	record: AppBskyFeedPost.Record;
};

function PostContent({ post, record }: PostContentProps) {
	const myDid = useSessionStore((state) => state.selectedAccount?.did);
	const replyAuthorDid = record?.reply
		? new AtUri(record.reply.parent?.uri || record.reply.root.uri).hostname
		: "";

	const replyIsTargettingMe = replyAuthorDid === myDid;

	return (
		<div className="flex flex-col">
			{replyAuthorDid !== "" && (
				<div className="flex pl-2 gap-2">
					<Reply className="w-4 h-4 text-zinc-500" />
					<span className="text-zinc-500 text-sm">
						{replyIsTargettingMe ? (
							"あなたへの返信"
						) : (
							<>
								<UserInfoText
									did={replyAuthorDid}
									className="text-zinc-500"
									attribute="displayName"
								/>
								への返信
							</>
						)}
					</span>
				</div>
			)}
			<div>{record.text}</div>
			{post.embed && <PostEmbed embed={post.embed} />}
		</div>
	);
}

export { PostContent };
