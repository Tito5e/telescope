import { create } from "zustand";

import { AgentApiContext, AgentStateContext } from "@/libs/agent/types";

export const useAgentStore = create<AgentStateContext & AgentApiContext>(
	(set) => ({
		agent: undefined,

		initialize: (agent) => {
			set({ agent });
		},
	}),
);
