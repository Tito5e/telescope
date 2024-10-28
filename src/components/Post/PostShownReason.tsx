import {
	ReasonPin,
	ReasonRepost,
} from "@atproto/api/dist/client/types/app/bsky/feed/defs";

type PostShownReasonProps = {
	reason:
		| ReasonRepost
		| ReasonPin
		| {
				[k: string]: unknown;
				$type: string;
		  }
		| undefined;
};

function PostShownReason({ reason }: PostShownReasonProps) {
	if (reason?.$type === "app.bsky.feed.defs#reasonRepost") {
		return (
			<div>
				<span className="text-sm text-zinc-500">
					{
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						reason.by.displayName
					}
					がリポスト
				</span>
			</div>
		);
	} else {
		// For Debug
		/*return (
			<div>
				<span className="text-blue-500 text-sm">
					{JSON.stringify(reason)}
				</span>
			</div>
		);*/
		return <></>;
	}
}

export { PostShownReason };
