import {
	AppBskyActorDefs,
	AppBskyFeedDefs,
	AppBskyGraphDefs,
} from "@atproto/api";
import { useQuery } from "@tanstack/react-query";

import { usePreferencesQuery } from "@/libs/query/preferences";
import { useAgentStore } from "@/libs/store/agent";

type PinnedFeed =
	| {
			type: "timeline";
			config: AppBskyActorDefs.SavedFeed;
	  }
	| {
			type: "feed";
			config: AppBskyActorDefs.SavedFeed;
			data: AppBskyFeedDefs.GeneratorView;
	  }
	| {
			type: "list";
			config: AppBskyActorDefs.SavedFeed;
			data: AppBskyGraphDefs.ListView;
	  };

export function usePinnedFeedsQuery() {
	const agent = useAgentStore((state) => state.agent);
	const { data: preferences, isLoading: isLoadingPrefs } =
		usePreferencesQuery();
	const savedItems = preferences?.savedFeeds ?? [];
	if (!agent) throw Error("");

	return useQuery<{
		count: number;
		feeds: PinnedFeed[];
	}>({
		enabled: !isLoadingPrefs,
		staleTime: Infinity,
		queryKey: ["usePinnedFeeds", ...savedItems],
		queryFn: async () => {
			const feeds = new Map<string, AppBskyFeedDefs.GeneratorView>();
			const lists = new Map<string, AppBskyGraphDefs.ListView>();

			const savedFeeds = savedItems.filter((f) => f.type === "feed");
			const savedLists = savedItems.filter((f) => f.type === "list");

			let feedsPromise = Promise.resolve();

			if (savedFeeds.length > 0) {
				feedsPromise = agent.app.bsky.feed
					.getFeedGenerators({
						feeds: savedFeeds.map((f) => f.value),
					})
					.then((res) => {
						res.data.feeds.forEach((f) => {
							feeds.set(f.uri, f);
						});
					});
			}

			const listsPromises = savedLists.map((v) =>
				agent.app.bsky.graph
					.getList({
						list: v.value,
						limit: 1,
					})
					.then((res) => {
						lists.set(res.data.list.uri, res.data.list);
					}),
			);

			await Promise.allSettled([feedsPromise, ...listsPromises]);

			// Bluesky公式クライアントではパフォーマンスのためプリフェッチしている
			// とりあえず無効化

			/*feeds.forEach((feed) => {
				const hydrated = hydrateFeedGenerator(feed);
				precacheFeed(hydrated);
			});

			lists.forEach((list) => {
				precacheList(list);
			});*/

			const result: PinnedFeed[] = [];

			for (const item of savedItems) {
				if (item.type === "timeline") {
					result.push({
						type: "timeline",
						config: item,
					});
				} else if (item.type === "feed") {
					const resolved = feeds.get(item.value);
					if (resolved) {
						result.push({
							type: "feed",
							config: item,
							data: resolved,
						});
					}
				} else if (item.type === "list") {
					const resolved = lists.get(item.value);
					if (resolved) {
						result.push({
							type: "list",
							config: item,
							data: resolved,
						});
					}
				}
			}

			return {
				count: result.length,
				feeds: result,
			};
		},
	});
}
