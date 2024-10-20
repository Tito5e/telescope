import { InferOutput, object, string } from "valibot";

export const SigninFormInputSchema = object({
	identifier: string(),
	password: string(),
});

export type SigninFormInput = InferOutput<typeof SigninFormInputSchema>;
