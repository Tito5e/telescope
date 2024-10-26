import { jwtDecode } from "jwt-decode";

import { Account } from "@/libs/session/schema";

function isSessionExpired(account: Account) {
	try {
		if (account.accessJwt) {
			const decoded = jwtDecode(account.accessJwt);
			if (decoded.exp) {
				const didExpire = Date.now() >= decoded.exp * 1000;
				return didExpire;
			}
		}
	} catch {
		console.trace("isSessionExpired: could not decode jwt");
	}
	return true;
}

export { isSessionExpired };
