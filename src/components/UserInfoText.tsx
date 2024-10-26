import { AppBskyActorDefs } from "@atproto/api";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

import { useProfileQuery } from "@/libs/query/profile";

function UserInfoText({
	did,
	attribute = "handle",
	className,
}: {
	did: string;
	attribute?: keyof AppBskyActorDefs.ProfileViewDetailed;
	className?: string;
}) {
	const { data: profile, isError } = useProfileQuery({
		did,
		staleTime: Infinity,
	});
	const navigate = useNavigate();

	if (isError) {
		return <span className="text-red-500">Error</span>;
	}

	if (profile) {
		return (
			<a
				onClick={(event) => {
					event.preventDefault();
					event.stopPropagation();
					navigate(`/profile/${profile.handle}`);
				}}
				// hacks: for hover style
				onMouseOver={(e) => {
					e.currentTarget.classList.add("underline");
				}}
				onMouseLeave={(e) => {
					e.currentTarget.classList.remove("underline");
				}}
				// hacks: for hover link status
				href={`/profile/${profile.handle}`}
				className={clsx(className)}>
				<span>
					{typeof profile[attribute] === "string" &&
					profile[attribute]
						? profile[attribute]
						: ""}
				</span>
			</a>
		);
	} else {
		return <></>;
	}
}

export { UserInfoText };
