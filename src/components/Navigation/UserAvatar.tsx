import { useProfileQuery } from "@/libs/query/profile";
import { useSessionStore } from "@/libs/store/session";

function UserAvatar() {
	const session = useSessionStore((state) => state.selectedAccount);
	const {
		data: profile,
		isError,
		isPending,
	} = useProfileQuery({
		did: session?.did,
	});
	if (isPending || isError) {
		return <div className=""></div>;
	}

	return (
		<div className="w-12 h-12">
			<img
				className="aspect-square w-full h-full object-cover"
				src={profile.avatar}
			/>
		</div>
	);
}

export { UserAvatar };
