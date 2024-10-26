import { UserHoverCard } from "@/components/UserHoverCard";

type PostMetaProps = {
	displayName?: string;
	handle?: string;
	timestamp?: string;
	did: string;
};

function PostMeta({ displayName, handle, timestamp, did }: PostMetaProps) {
	return (
		<>
			<UserHoverCard did={did}>
				<div className="flex items-center shrink-1 grow-1 gap-2">
					<span className="font-semibold shrink-0 grow-0">
						{displayName}
					</span>
					<span className="text-sm text-zinc-500 shrink-1 grow-1 overflow-x-hidden">
						{handle}
					</span>
				</div>
			</UserHoverCard>
			<span className="text-zinc-500 shrink-0 grow-0">{timestamp}</span>
		</>
	);
}

export { PostMeta };
