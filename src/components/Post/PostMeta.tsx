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
			<UserHoverCard did={did}>
				<div className="flex items-center shrink-1 grow-1 gap-2">
					<a
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
						<span className="font-semibold shrink-0 grow-0">
							{displayName}
						</span>
					</a>
					<a
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
						<span className="text-sm text-zinc-500 shrink-1 grow-1 overflow-x-hidden">
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
