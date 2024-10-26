import { ReactNode, useState } from "react";
import {
	safePolygon,
	useFloating,
	useHover,
	useInteractions,
} from "@floating-ui/react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import reactStringReplace from "react-string-replace";

import { useProfileQuery } from "@/libs/query/profile";

type UserHoverCardProps = {
	children?: ReactNode;
	className?: string;
	did: string;
};

function UserHoverCard({ children, className, did }: UserHoverCardProps) {
	const {
		data: profile,
		isPending,
		isError,
	} = useProfileQuery({ did, staleTime: Infinity });

	const [isOpen, setIsOpen] = useState(false);
	const { refs, floatingStyles, context } = useFloating({
		strategy: "fixed",
		placement: "bottom-start",
		open: isOpen,
		onOpenChange: setIsOpen,
	});
	const hover = useHover(context, {
		mouseOnly: true,
		delay: {
			open: 300,
			close: 0,
		},
		handleClose: safePolygon(),
	});
	const { getReferenceProps, getFloatingProps } = useInteractions([hover]);
	const navigate = useNavigate();

	return (
		<>
			<div
				className={className}
				ref={refs.setReference}
				{...getReferenceProps()}>
				{children}
			</div>
			{isOpen && (
				<div
					style={floatingStyles}
					ref={refs.setFloating}
					{...getFloatingProps()}>
					<div
						className="bg-white shadow-lg rounded-md flex flex-col border border-gray-500 p-4 max-w-64 gap-2 cursor-default"
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
						}}>
						<div
							className="flex flex-col cursor-pointer"
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								navigate(`/profile/${profile?.handle}`);
							}}>
							<div className="flex">
								<div className="w-12 h-12 rounded-full overflow-hidden">
									<img
										className="w-full h-full"
										src={profile?.avatar}
									/>
								</div>
							</div>
							<div className="flex flex-col">
								<div>
									<span className="text-md text-lg font-semibold">
										{profile?.displayName}
									</span>
								</div>
								<div className="flex gap-2 w-full">
									<span className="rounded-sm bg-gray-200 text-sm px-2 shrink-0 grow-0">
										あなたをフォロー
									</span>
									<span className="text-sm text-gray-500 overflow-hidden whitespace-nowrap text-ellipsis w-full shrink-1 grow-1">
										@{profile?.handle}
									</span>
								</div>
							</div>
						</div>
						<div className="flex gap-4">
							<span className="text-sm">
								<span className="font-bold">
									{profile?.followersCount}
								</span>
								フォロワー
							</span>
							<span className="text-sm">
								<span className="font-bold">
									{profile?.followsCount}
								</span>
								フォロー
							</span>
						</div>
						<div className="text-sm whitespace-pre-wrap break-word">
							{reactStringReplace(
								profile?.description,
								/(https?:\/\/\S+)/g,
								(match, i) => (
									<a
										key={i}
										href={match}
										className="text-lime-500 pointer-events-auto"
										onClick={(event) => {
											event.preventDefault();
											event.stopPropagation();
											window.open(
												match,
												"_blank",
												"noopener noreferrer",
											);
										}}
										// hacks: override pointer events
										onMouseOver={(e) => {
											e.currentTarget.classList.add(
												"underline",
											);
										}}
										onMouseLeave={(e) => {
											e.currentTarget.classList.remove(
												"underline",
											);
										}}>
										{match}
									</a>
								),
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export { UserHoverCard };
