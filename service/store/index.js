import GlobalUtility from '@thzero/library_client/utility/global';

import Service from '@thzero/library_client/service/index';

class VuexStoreService extends Service {
	get dispatcher() {
		return GlobalUtility.$store.dispatcher;
	}

	get getters() {
		return GlobalUtility.$store.getters;
	}

	get state() {
		return GlobalUtility.$store.state;
	}

	get user() {
		return GlobaGlobalUtility.$store.state.user.user;
	}
	
	get userClaims() {
		return GlobalUtility.$store.store.state.claims;
	}
	
	get userToken() {
		return GlobalUtility.$store.store.state.token;
	}
	
	get userAuthCompleted() {
		return GlobalUtility.$store.store.state.authCompleted;
	}
	
	get userAuthIsLoggedIn() {
		return GlobalUtility.$store.store.state.isLoggedIn;
	}
	
	get userTheme() {
		return GlobalUtility.$store.store.state.theme;
	}
	
	get userTokenResult() {
		return GlobalUtility.$store.store.state.tokenResult;
	}
}

export default VuexStoreService;
