import { Account } from "@/libs/session/schema";

export type SessionStateContext = {
	accounts: Account[];
	selectedAccount: Account | undefined;
	hasSession: boolean;
};

export type SessionApiContext = {
	login: (args: {
		service: string;
		identifier: string;
		password: string;
		authFactorToken?: string | undefined;
	}) => Promise<void>;
	tryAutoLogin: () => Promise<void>;
};
