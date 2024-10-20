import { useAgentStore } from "@/libs/store/agent";

function RootLayout() {
	const agent = useAgentStore((state) => state.agent);

	return <span>{agent?.did}</span>;
}

export { RootLayout };
