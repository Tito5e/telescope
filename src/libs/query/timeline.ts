import { Agent } from "@atproto/api";
import { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { TIMELINE_FETCH_LIMIT } from "@/libs/query/consts";
import { useAgentStore } from "@/libs/store/agent";

export function useTimelineQuery({
	cursor,
	limit,
	staleTime = 1000 * 5,
}: {
	cursor: string | undefined;
	limit: number;
	staleTime?: number;
}) {
	const agent = useAgentStore((state) => state.agent);
	if (!agent) throw Error("");

	return useQuery({
		staleTime,
		refetchOnWindowFocus: true,
		queryKey: ["useTimeline", cursor, limit],
		queryFn: async () => {
			const res = await agent.getTimeline({
				cursor,
				limit,
			});
			return res.data;
		},
	});
}

async function fetchTimeline(
	agent: Agent,
	limit: number,
	cursor: string | undefined,
): Promise<{
	posts: Array<FeedViewPost>;
	nextCursor: string | undefined;
}> {
	const timeline = await agent.getTimeline({
		cursor: cursor,
		limit: limit,
	});
	return {
		posts: timeline.data.feed,
		nextCursor: timeline.data.cursor,
	};
}

export function useInfiniteTimelineQuery({
	staleTime = 1000 * 5,
	refetchInterval = 1000 * 15,
}: {
	staleTime?: number;
	refetchInterval?: number;
}) {
	const agent = useAgentStore((state) => state.agent);
	if (!agent) throw Error("");

	return useInfiniteQuery({
		queryKey: ["useInfiniteTimeline"],
		staleTime,
		refetchInterval,
		queryFn: (ctx) =>
			fetchTimeline(agent, TIMELINE_FETCH_LIMIT, ctx.pageParam),
		getNextPageParam: (lastGroup) => lastGroup.nextCursor,
		initialPageParam: undefined as string | undefined,
	});
}
