import { LoadingLayout } from "@/layouts/LoadingLayout";
import { RootLayout } from "@/layouts/RootLayout";
import { SigninLayout } from "@/layouts/Signin/SigninLayout";
import { useAgentStore } from "@/libs/store/agent";
import { useSessionStore } from "@/libs/store/session";

function AuthLayout() {
	const agent = useAgentStore((state) => state.agent);
	const hasSession = useSessionStore((state) => state.hasSession);

	if (agent) {
		return <RootLayout />;
	} else if (hasSession) {
		return <LoadingLayout />;
	} else {
		return <SigninLayout />;
	}
}

export { AuthLayout };
