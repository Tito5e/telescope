import { Heart, MessageSquare, Repeat2 } from "lucide-react";

type PostStatisticsProps = {
	replyCount?: number;
	repostCount?: number;
	likeCount?: number;
};

function PostStatistics({
	replyCount,
	repostCount,
	likeCount,
}: PostStatisticsProps) {
	return (
		<div className="grid grid-cols-4 grid-rows-1 w-full p-2">
			<div className="flex items-center gap-2">
				<MessageSquare className="text-gray-500 w-4 h-4" />
				<span className="text-gray-500">{replyCount}</span>
			</div>
			<div className="flex items-center gap-2">
				<Repeat2 className="text-gray-500 w-4 h-4" />
				<span className="text-gray-500">{repostCount}</span>
			</div>
			<div className="flex items-center gap-2">
				<Heart className="text-gray-500 w-4 h-4" />
				<span className="text-gray-500">{likeCount}</span>
			</div>
			<div className="flex items-center gap-2"></div>
		</div>
	);
}

export { PostStatistics };
