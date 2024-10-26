import { useNavigate } from "react-router-dom";

import { UserHoverCard } from "@/components/UserHoverCard";

type PostMetaProps = {
	displayName?: string;
	handle?: string;
	timestamp?: string;
	did: string;
	href: string;
};

function PostMeta({
	displayName,
	handle,
	timestamp,
	did,
	href,
}: PostMetaProps) {
	const navigate = useNavigate();
	return (
		<>
			<UserHoverCard did={did} className="shrink-1 grow-1">
				<div className="flex items-center gap-2">
					<a
						className="shrink-0 grow-0"
						// hacks: for hover style
						onMouseOver={(e) => {
							e.currentTarget.classList.add("underline");
						}}
						onMouseLeave={(e) => {
							e.currentTarget.classList.remove("underline");
						}}
						// hacks: for hover link status
						href={href}
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							navigate(href);
						}}>
						<span className="font-bold">{displayName}</span>
					</a>
					<a
						className="shrink-1 grow-1 overflow-x-hidden text-ellipsis"
						// hacks: for hover style
						onMouseOver={(e) => {
							e.currentTarget.classList.add("underline");
						}}
						onMouseLeave={(e) => {
							e.currentTarget.classList.remove("underline");
						}}
						// hacks: for hover link status
						href={href}
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							navigate(href);
						}}>
						<span className="text-sm text-zinc-500 whitespace-nowrap">
							{handle}
						</span>
					</a>
				</div>
			</UserHoverCard>
			<span className="text-zinc-500 shrink-0 grow-0">{timestamp}</span>
		</>
	);
}

export { PostMeta };
