import { useQuery } from "@tanstack/react-query";

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
