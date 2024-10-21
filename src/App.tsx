import { AuthLayout } from "@/layouts/AuthLayout";
import { useSessionStore } from "@/libs/store/session";

useSessionStore.getState().tryAutoLogin();

function App() {
	return <AuthLayout />;
}

export { App };
