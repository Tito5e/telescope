import clsx from "clsx";
import { Bell, Hash, House, Mail, Search } from "lucide-react";
import { NavLink } from "react-router-dom";

import { UserAvatar } from "@/components/Navigation/UserAvatar";
import { useSessionStore } from "@/libs/store/session";

function Navigation() {
	const session = useSessionStore((state) => state.selectedAccount);

	return (
		<nav className="grid-cols-6 grid grid-rows-1 place-items-center">
			<NavLink
				className={({ isActive, isPending }) =>
					clsx({
						"p-3 border-b-4": true,
						"border-transparent": !isActive && !isPending,
						"border-lime-500": isActive,
						"border-gray-500": isPending,
					})
				}
				to={`/profile/${session?.handle}`}>
				<UserAvatar className="w-7 h-7" />
			</NavLink>
			<NavLink
				className={({ isActive, isPending }) =>
					clsx({
						"p-3 border-b-4": true,
						"border-transparent": !isActive && !isPending,
						"border-lime-500": isActive,
						"border-gray-500": isPending,
					})
				}
				to="/">
				<House className="w-7 h-7" />
			</NavLink>
			<NavLink
				className={({ isActive, isPending }) =>
					clsx({
						"p-3 border-b-4": true,
						"border-transparent": !isActive && !isPending,
						"border-lime-500": isActive,
						"border-gray-500": isPending,
					})
				}
				to="/feeds">
				<Hash className="w-7 h-7" />
			</NavLink>
			<NavLink
				className={({ isActive, isPending }) =>
					clsx({
						"p-3 border-b-4": true,
						"border-transparent": !isActive && !isPending,
						"border-lime-500": isActive,
						"border-gray-500": isPending,
					})
				}
				to="/notifications">
				<Bell className="w-7 h-7" />
			</NavLink>
			<NavLink
				className={({ isActive, isPending }) =>
					clsx({
						"p-3 border-b-4": true,
						"border-transparent": !isActive && !isPending,
						"border-lime-500": isActive,
						"border-gray-500": isPending,
					})
				}
				to="/messages">
				<Mail className="w-7 h-7" />
			</NavLink>
			<NavLink
				className={({ isActive, isPending }) =>
					clsx({
						"p-3 border-b-4": true,
						"border-transparent": !isActive && !isPending,
						"border-lime-500": isActive,
						"border-gray-500": isPending,
					})
				}
				to="/search">
				<Search className="w-7 h-7" />
			</NavLink>
		</nav>
	);
}

export { Navigation };
