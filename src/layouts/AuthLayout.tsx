import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { LoadingLayout } from "@/layouts/LoadingLayout";
import { RootLayout } from "@/layouts/RootLayout";
import { SigninLayout } from "@/layouts/Signin/SigninLayout";
import { TimelineLayout } from "@/layouts/TimelineLayout";
import { useAgentStore } from "@/libs/store/agent";
import { useSessionStore } from "@/libs/store/session";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				path: "/",
				element: <TimelineLayout />,
			},
			{
				path: "/profile/:identifier",
				element: <></>,
			},
			{
				path: "/feeds",
				element: <></>,
			},
			{
				path: "/notifications",
				element: <></>,
			},
			{
				path: "/messages",
				element: <></>,
			},
			{
				path: "/search",
				element: <></>,
			},
		],
	},
]);

function AuthLayout() {
	const agent = useAgentStore((state) => state.agent);
	const hasSession = useSessionStore((state) => state.hasSession);

	if (agent) {
		return <RouterProvider router={router} />;
	} else if (hasSession) {
		return <LoadingLayout />;
	} else {
		return <SigninLayout />;
	}
}

export { AuthLayout };
