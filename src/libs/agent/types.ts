import { Agent } from "@atproto/api";

export type AgentStateContext = {
	agent: Agent | undefined;
};

export type AgentApiContext = {
	initialize: (agent: Agent) => void;
};
