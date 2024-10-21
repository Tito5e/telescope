import { AppBskyActorDefs } from "@atproto/api";
import clsx from "clsx";
import Emoji, { Twemoji } from "react-emoji-render";
import { Link } from "react-router-dom";

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

	if (isError) {
		return <span className="text-red-500">Error</span>;
	}

	if (profile) {
		return (
			<Link to={`/profile/${profile.handle}`} className={clsx(className)}>
				<span>
					<Twemoji>
						{typeof profile[attribute] === "string" &&
						profile[attribute]
							? profile[attribute]
							: ""}
					</Twemoji>
				</span>
			</Link>
		);
	} else {
		return <></>;
	}
}

export { UserInfoText };
