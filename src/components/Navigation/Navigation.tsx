import { UserAvatar } from "@/components/Navigation/UserAvatar";

function Navigation() {
	return (
		<nav className="grid-cols-5 grid grid-rows-1 place-items-center">
			<div className="p-2">
				<UserAvatar />
			</div>
		</nav>
	);
}

export { Navigation };
