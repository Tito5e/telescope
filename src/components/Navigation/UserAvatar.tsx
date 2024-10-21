import clsx from "clsx";

import { useProfileQuery } from "@/libs/query/profile";
import { useSessionStore } from "@/libs/store/session";

type UserAvatarProps = {
	className?: string;
};

function UserAvatar(props: UserAvatarProps) {
	const session = useSessionStore((state) => state.selectedAccount);
	const {
		data: profile,
		isError,
		isPending,
	} = useProfileQuery({
		did: session?.did,
	});
	if (isPending || isError) {
		return <div className="bg-gray-300 rounded-full"></div>;
	}

	return (
		<div
			className={clsx(
				"overflow-hidden rounded-full border border-gray-300",
				props.className,
			)}>
			<img
				className="aspect-square w-full h-full object-cover"
				src={profile.avatar}
			/>
		</div>
	);
}

export { UserAvatar };
