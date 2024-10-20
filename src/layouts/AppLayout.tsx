import { RootLayout } from "@/layouts/RootLayout";
import { SigninLayout } from "@/layouts/Signin/SigninLayout";
import { useAgentStore } from "@/libs/store/agent";

function AppLayout() {
	const agent = useAgentStore((state) => state.agent);

	if (agent) {
		return <RootLayout />;
	} else {
		return <SigninLayout />;
	}
}

export { AppLayout };
