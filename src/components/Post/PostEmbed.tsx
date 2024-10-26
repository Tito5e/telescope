import {
	AppBskyEmbedExternal,
	AppBskyEmbedImages,
	AppBskyEmbedRecord,
	AppBskyEmbedRecordWithMedia,
	AppBskyEmbedVideo,
} from "@atproto/api";

type Embed =
	| AppBskyEmbedRecord.View
	| AppBskyEmbedImages.View
	| AppBskyEmbedVideo.View
	| AppBskyEmbedExternal.View
	| AppBskyEmbedRecordWithMedia.View
	| { $type: string; [k: string]: unknown };

type PostEmbedProps = {
	embed: Embed;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function PostEmbed({ embed }: PostEmbedProps) {
	return <div></div>;
}

export { PostEmbed };
