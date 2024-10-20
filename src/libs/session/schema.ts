import { boolean, InferOutput, object, optional, string } from "valibot";

export const AccountSchema = object({
	service: string(),
	did: string(),
	handle: string(),

	email: optional(string()),
	emailConfirmed: optional(boolean()),
	emailAuthFactor: optional(boolean()),

	refreshJwt: string(),
	accessJwt: string(),

	signupQueued: optional(boolean()),
	active: boolean(),

	status: optional(string()),
	pdsUrl: optional(string()),
});

export type Account = InferOutput<typeof AccountSchema>;
