import { valibotResolver } from "@hookform/resolvers/valibot";
import { AtSign, KeyRound } from "lucide-react";
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
		<div className="w-screen h-screen flex flex-col items-center">
			<div className="w-full p-6 flex flex-col gap-6">
				<span className="text-2xl font-semibold">サインイン</span>
				<p>
					パスワードの代わりにApp Passwordを使用することを推奨します
				</p>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-4">
					<label className="flex flex-col relative">
						<AtSign className="absolute left-4 w-4 h-4 top-[50%] -translate-y-1/2" />
						<input
							className="py-3 rounded-lg bg-gray-200 placeholder:text-zinc-500 pl-10 focus:ring-inset focus:ring-2 focus:ring-lime-500 outline-none"
							placeholder="ユーザー名"
							type="text"
							{...register("identifier")}
						/>
						{errors.identifier && (
							<span>{errors.identifier.message}</span>
						)}
					</label>

					<label className="flex flex-col relative">
						<KeyRound className="absolute left-4 w-4 h-4 top-[50%] -translate-y-1/2" />
						<input
							className="py-3 rounded-lg bg-gray-200 placeholder:text-zinc-500 pl-10 focus:ring-inset focus:ring-2 focus:ring-lime-500 outline-none"
							placeholder="パスワード"
							type="password"
							{...register("password")}
						/>
						{errors.password && (
							<span>{errors.password.message}</span>
						)}
					</label>

					<div className="flex justify-end">
						<button
							type="submit"
							className="col-span-2 py-2 px-4 rounded-md bg-lime-500">
							<span className="text-white font-bold">
								ログイン
							</span>
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export { SigninLayout };
