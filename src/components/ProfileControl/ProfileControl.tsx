import { useProfileQuery } from "@/libs/query/profile";
import { useSessionStore } from "@/libs/store/session";

function ProfileControl() {
	const session = useSessionStore((state) => state.selectedAccount);
	const { data, isError, isPending } = useProfileQuery({
		did: session?.did,
	});
	if (isPending || isError) {
		return <div className=""></div>;
	}

	return (
		<div className="w-full h-full flex items-center p-4 gap-4 select-none">
			<img
				className="w-14 h-14 border border-gray-600"
				src={data.avatar}
			/>
			<div className="flex flex-col items-start justify-center">
				<span className="font-bold">{data.displayName}</span>
				<span className="text-gray-600">@{data.handle}</span>
			</div>
		</div>
	);
}

export { ProfileControl };
