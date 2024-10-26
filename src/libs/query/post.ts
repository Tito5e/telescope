import { AppBskyFeedDefs, AtUri } from "@atproto/api";
import { useQuery } from "@tanstack/react-query";

import { useAgentStore } from "@/libs/store/agent";

export function usePostQuery(uri: string | undefined) {
	const agent = useAgentStore((state) => state.agent);
	if (!agent) {
		throw Error("");
	}
	return useQuery<AppBskyFeedDefs.PostView>({
		queryKey: ["usePostQuery", uri],
		async queryFn() {
			const urip = new AtUri(uri!);

			if (!urip.host.startsWith("did:")) {
				const res = await agent.resolveHandle({
					handle: urip.host,
				});
				urip.host = res.data.did;
			}

			const res = await agent.getPosts({ uris: [urip.toString()] });
			if (res.success && res.data.posts[0]) {
				return res.data.posts[0];
			}

			throw new Error("No data");
		},
		enabled: !!uri,
	});
}
