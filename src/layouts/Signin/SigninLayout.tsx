import { valibotResolver } from "@hookform/resolvers/valibot";
import { SubmitHandler, useForm } from "react-hook-form";

import { SigninFormInput, SigninFormInputSchema } from "@/layouts/Signin/types";
import { useSessionStore } from "@/libs/store/session";

function SigninLayout() {
	const login = useSessionStore((state) => state.login);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SigninFormInput>({
		mode: "onBlur",
		resolver: valibotResolver(SigninFormInputSchema),
	});

	const onSubmit: SubmitHandler<SigninFormInput> = async (input) => {
		await login({
			service: "https://bsky.social",
			identifier: input.identifier,
			password: input.password,
		});
	};

	return (
		<div className="w-screen h-screen flex flex-col items-center justify-center">
			<div className="w-full max-w-xl p-8 rounded-lg border border-gray-600 shadow-md flex flex-col gap-6">
				<h1 className="text-3xl font-bold">
					Telescope - Bluesky Client
				</h1>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-4">
					<label className="flex flex-col">
						<span className="px-2">Identifier</span>
						<input
							className="border-gray-500 border-2 p-2 rounded-xl"
							placeholder="Identifier"
							type="text"
							{...register("identifier")}
						/>
						{errors.identifier && (
							<span>{errors.identifier.message}</span>
						)}
					</label>

					<label className="flex flex-col">
						<span className="px-2">Password</span>
						<input
							className="border-gray-500 border-2 p-2 rounded-xl"
							placeholder="Password"
							type="password"
							{...register("password")}
						/>
						{errors.password && (
							<span>{errors.password.message}</span>
						)}
					</label>

					<button
						type="submit"
						className="col-span-2 p-2 rounded-md bg-blue-500">
						<span className="text-white font-bold">ログイン</span>
					</button>
				</form>
			</div>
		</div>
	);
}

export { SigninLayout };
