import LibraryClientUtility from '@thzero/library_client/utility/index';

import Service from '@thzero/library_client/service/index';

class VuexStoreService extends Service {
	get dispatcher() {
		return LibraryClientUtility.$store.dispatcher;
	}

	get getters() {
		return LibraryClientUtility.$store.getters;
	}

	get state() {
		return LibraryClientUtility.$store.state;
	}

	get user() {
		return GlobaLibraryClientUtility.$store.state.user.user;
	}
	
	get userClaims() {
		return LibraryClientUtility.$store.store.state.claims;
	}
	
	get userToken() {
		return LibraryClientUtility.$store.store.state.token;
	}
	
	get userAuthCompleted() {
		return LibraryClientUtility.$store.store.state.authCompleted;
	}
	
	get userAuthIsLoggedIn() {
		return LibraryClientUtility.$store.store.state.isLoggedIn;
	}
	
	get userTheme() {
		return LibraryClientUtility.$store.store.state.theme;
	}
	
	get userTokenResult() {
		return LibraryClientUtility.$store.store.state.tokenResult;
	}
}

export default VuexStoreService;
