import {
	AppBskyEmbedExternal,
	AppBskyEmbedImages,
	AppBskyEmbedRecord,
	AppBskyEmbedRecordWithMedia,
	AppBskyEmbedVideo,
	AppBskyFeedDefs,
	AppBskyGraphDefs,
} from "@atproto/api";
import clsx from "clsx";

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
function PostEmbed({ embed }: PostEmbedProps) {
	if (AppBskyEmbedRecord.isView(embed)) {
		if (AppBskyFeedDefs.isGeneratorView(embed.record)) {
			return <div>ふぃーどかーど</div>;
		}

		if (AppBskyGraphDefs.isListView(embed.record)) {
			return <div>りすとかーど</div>;
		}

		if (AppBskyGraphDefs.isStarterPackViewBasic(embed.record)) {
			return <div>すたーたぱっく</div>;
		}

		return <div>くぉーと</div>;
	}

	if (AppBskyEmbedImages.isView(embed)) {
		const { images } = embed;

		if (images.length > 0) {
			const items = embed.images.map((img) => ({
				thumb: img.thumb,
				fullsize: img.fullsize,
				alt: img.alt,
				aspectRatio: img.aspectRatio,
			}));

			if (items.length === 1) {
				const cropMode = calculateImageSizeForSingle(
					items[0].aspectRatio?.width,
					items[0].aspectRatio?.height,
				);
				return (
					<div
						className={clsx(
							"w-full rounded-lg overflow-hidden border-gray-300 border",
							{
								["aspect-[1/2]"]: cropMode === "limit",
							},
						)}>
						<img
							src={items[0].thumb}
							width={items[0].aspectRatio?.width}
							height={items[0].aspectRatio?.height}
						/>
					</div>
				);
			}
			if (items.length === 2) {
				return (
					<div className="w-full flex gap-1">
						<div className="w-full rounded-lg overflow-hidden border-gray-300 border aspect-square">
							<img
								src={items[0].thumb}
								className="object-cover object-center w-full h-full"
								width={items[0].aspectRatio?.width}
								height={items[0].aspectRatio?.height}
							/>
						</div>
						<div className="w-full rounded-lg overflow-hidden border-gray-300 border aspect-square">
							<img
								src={items[1].thumb}
								className="object-cover object-center w-full h-full"
								width={items[1].aspectRatio?.width}
								height={items[1].aspectRatio?.height}
							/>
						</div>
					</div>
				);
			}
			if (items.length === 3) {
				return (
					<div className="w-full flex gap-1">
						<div className="w-full rounded-lg overflow-hidden border-gray-300 border aspect-square">
							<img
								src={items[0].thumb}
								className="object-cover object-center w-full h-full"
								width={items[0].aspectRatio?.width}
								height={items[0].aspectRatio?.height}
							/>
						</div>
						<div className="w-full flex flex-col gap-1">
							<div className="w-full rounded-lg overflow-hidden border-gray-300 border aspect-[2/1]">
								<img
									src={items[1].thumb}
									className="object-cover object-center w-full h-full"
									width={items[1].aspectRatio?.width}
									height={items[1].aspectRatio?.height}
								/>
							</div>
							<div className="w-full rounded-lg overflow-hidden border-gray-300 border aspect-[2/1]">
								<img
									src={items[2].thumb}
									className="object-cover object-center w-full h-full"
									width={items[2].aspectRatio?.width}
									height={items[2].aspectRatio?.height}
								/>
							</div>
						</div>
					</div>
				);
			}
			if (items.length === 4) {
				return (
					<div className="w-full flex gap-1">
						<div className="w-full flex flex-col gap-1">
							<div className="w-full rounded-lg overflow-hidden border-gray-300 border aspect-[3/2]">
								<img
									src={items[0].thumb}
									className="object-cover object-center w-full h-full"
									width={items[0].aspectRatio?.width}
									height={items[0].aspectRatio?.height}
								/>
							</div>
							<div className="w-full rounded-lg overflow-hidden border-gray-300 border aspect-[3/2]">
								<img
									src={items[1].thumb}
									className="object-cover object-center w-full h-full"
									width={items[1].aspectRatio?.width}
									height={items[1].aspectRatio?.height}
								/>
							</div>
						</div>
						<div className="w-full flex flex-col gap-1">
							<div className="w-full rounded-lg overflow-hidden border-gray-300 border aspect-[3/2]">
								<img
									src={items[2].thumb}
									className="object-cover object-center w-full h-full"
									width={items[2].aspectRatio?.width}
									height={items[2].aspectRatio?.height}
								/>
							</div>
							<div className="w-full rounded-lg overflow-hidden border-gray-300 border aspect-[3/2]">
								<img
									src={items[3].thumb}
									className="object-cover object-center w-full h-full"
									width={items[3].aspectRatio?.width}
									height={items[3].aspectRatio?.height}
								/>
							</div>
						</div>
					</div>
				);
			}
		}
	}

	return <></>;
}

export { PostEmbed };

function calculateImageSizeForSingle(
	width?: number,
	height?: number,
): "passed" | "limit" {
	if (width == 0 || height == 0 || !width || !height) {
		return "passed";
	}
	const ratio = height / width;

	if (ratio > 2) {
		return "limit";
	}

	return "passed";
}
