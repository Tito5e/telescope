import { BskyFeedViewPreference, BskyPreferences } from "@atproto/api";
import { replaceEqualDeep, useQuery } from "@tanstack/react-query";

import { useAgentStore } from "@/libs/store/agent";

type Preferences = Omit<
	BskyPreferences,
	"contentLabels" | "feedViewPrefs" | "feeds"
> & {
	feedViewPrefs: BskyFeedViewPreference & {
		lab_mergeFeedEnabled?: boolean;
	};
};

export function usePreferencesQuery() {
	const agent = useAgentStore((state) => state.agent);

	if (!agent) throw Error("");

	return useQuery<Preferences>({
		staleTime: 1000 * 5,
		structuralSharing: replaceEqualDeep,
		refetchOnWindowFocus: true,
		queryKey: ["usePreferences"],
		queryFn: async () => {
			const response = await agent.getPreferences();

			return {
				...response,
				savedFeeds: response.savedFeeds.filter(
					(v) => v.type !== "unknown",
				),
				feedViewPrefs: {
					...(response.feedViewPrefs.home || {}),
				},
				threadViewPrefs: {
					...(response.threadViewPrefs ?? {}),
				},
			};
		},
	});
}
