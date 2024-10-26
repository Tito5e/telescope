import { Agent, CredentialSession } from "@atproto/api";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { SessionApiContext, SessionStateContext } from "@/libs/session/types";
import { isSessionExpired } from "@/libs/session/utils";
import { useAgentStore } from "@/libs/store/agent";

export const useSessionStore = create<
	SessionStateContext & SessionApiContext
>()(
	persist(
		(set, get) => ({
			accounts: [],
			selectedAccount: undefined,
			hasSession: false,

			login: async (args) => {
				const { accounts, selectedAccount } = get();
				if (
					selectedAccount &&
					(selectedAccount.did === args.identifier ||
						selectedAccount.email === args.identifier ||
						selectedAccount.handle === args.identifier)
				) {
					const session = new CredentialSession(
						new URL(args.service),
					);
					const response =
						await session.resumeSession(selectedAccount);
					if (response.success) {
						const agent = new Agent(session);
						set(() => ({
							hasSession: true,
						}));
						useAgentStore.setState(() => ({
							agent,
						}));
					}
				}
				const targetAccount = accounts.find((account) => {
					return (
						account.did === args.identifier ||
						account.email === args.identifier ||
						account.handle === args.identifier
					);
				});
				if (targetAccount) {
					const session = new CredentialSession(
						new URL(args.service),
					);
					const response = await session.resumeSession(targetAccount);
					if (response.success) {
						const agent = new Agent(session);
						useAgentStore.setState(() => ({
							agent,
						}));
						set({
							hasSession: true,
							selectedAccount: targetAccount,
						});
					}
				}
				const session = new CredentialSession(new URL(args.service));
				const response = await session.login(args);
				if (response.success) {
					const agent = new Agent(session);
					useAgentStore.setState(() => ({
						agent,
					}));
					set({
						selectedAccount: {
							...response.data,
							active: response.data.active ? true : false,
							service: args.service,
						},
						hasSession: true,
					});
				}
			},
			tryAutoLogin: async () => {
				const { selectedAccount, accounts } = get();
				if (selectedAccount) {
					const session = new CredentialSession(
						new URL(selectedAccount.service),
					);
					if (isSessionExpired(selectedAccount)) {
						set({
							hasSession: false,
							selectedAccount: undefined,
							accounts: accounts.filter(
								(p) => p.did !== selectedAccount.did,
							),
						});
					} else {
						const response =
							await session.resumeSession(selectedAccount);
						if (response.success) {
							const agent = new Agent(session);
							useAgentStore.setState({
								agent,
							});
						}
					}
				}
			},
		}),
		{
			name: "telescope-session-store",
			partialize: (state) => ({
				accounts: state.accounts,
				selectedAccount: state.selectedAccount,
			}),
		},
	),
);
