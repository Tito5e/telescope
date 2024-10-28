import { Heart, MessageSquare, Repeat2 } from "lucide-react";

type PostStatisticsProps = {
	replyCount?: number;
	repostCount?: number;
	likeCount?: number;
	isReposted: boolean;
	isLiked: boolean;
};

function PostStatistics({
	replyCount,
	repostCount,
	likeCount,

	isReposted,
	isLiked,
}: PostStatisticsProps) {
	return (
		<div
			className="grid grid-cols-4 grid-rows-1 w-full p-2 select-none cursor-default"
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
			}}>
			<div className="flex items-center gap-2">
				<MessageSquare className="text-gray-500 w-4 h-4" />
				<span className="text-gray-500">{replyCount}</span>
			</div>
			<div className="flex items-center gap-2">
				{isReposted ? (
					<>
						<Repeat2 className="text-lime-500 fill-lime-500 w-4 h-4" />
						<span className="text-lime-500">{repostCount}</span>
					</>
				) : (
					<>
						<Repeat2 className="text-gray-500 w-4 h-4" />
						<span className="text-gray-500">{repostCount}</span>
					</>
				)}
			</div>
			<div className="flex items-center gap-2">
				{isLiked ? (
					<>
						<Heart className="text-lime-500 fill-lime-500 w-4 h-4" />
						<span className="text-lime-500">{likeCount}</span>
					</>
				) : (
					<>
						<Heart className="text-gray-500 w-4 h-4" />
						<span className="text-gray-500">{likeCount}</span>
					</>
				)}
			</div>
			<div className="flex items-center gap-2"></div>
		</div>
	);
}

export { PostStatistics };
