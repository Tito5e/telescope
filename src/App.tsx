import { AppLayout } from "@/layouts/AppLayout";
import { useSessionStore } from "@/libs/store/session";

useSessionStore.getState().tryAutoLogin();

function App() {
	return <AppLayout />;
}

export { App };
