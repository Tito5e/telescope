import { AppBskyActorDefs } from "@atproto/api";
import { useQuery } from "@tanstack/react-query";

import { useAgentStore } from "@/libs/store/agent";

export function useProfileQuery({
	did,
	staleTime = 1000 * 5,
}: {
	did: string | undefined;
	staleTime?: number;
}) {
	const agent = useAgentStore((state) => state.agent);
	if (!agent) throw Error("");

	return useQuery<AppBskyActorDefs.ProfileViewDetailed>({
		staleTime,
		refetchOnWindowFocus: true,
		queryKey: ["useProfile", did ?? ""],
		queryFn: async () => {
			const res = await agent.getProfile({ actor: did ?? "" });
			return res.data;
		},
		enabled: !!did,
	});
}
