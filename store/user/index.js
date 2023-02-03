import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryClientVueUtility from '@thzero/library_client_vue3/utility';

import Response from '@thzero/library_common/response';

const store = {
	state: {
		authCompleted: false,
		claims: null,
		isLoggedIn: false,
		theme: 'defaultTheme',
		token: null,
		tokenResult: null,
		user: null
	},
	actions: {
		async refreshUserSettings({ commit }, correlationId) {
			const service = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_USER);
			const response = await service.refreshSettings(correlationId, this.state.user.user);
			this.$logger.debug('store.user', 'refreshUserSettings', 'response', response);
			if (Response.hasSucceeded(response) && response.results)
				commit('setUserSettings', { correlationId: correlationId, user: response.results });
			return response;
		},
		async resetUser({ commit }, correlationId) {
			commit('resetUser', correlationId);
		},
		async setAuthCompleted({ commit }, params) {
			commit('setAuthCompleted', params);
		},
		async setClaims({ commit }, params) {
			commit('setClaims', params);
		},
		async setLoggedIn({ commit }, params) {
			commit('setLoggedIn', params);
		},
		async setTheme({ commit }, params) {
			commit('setTheme', params);
		},
		async setTokenResult({ commit }, params) {
			commit('setTokenResult', params);
		},
		async setUser({ commit }, params) {
			commit('setUser', params);
		},
		async setUserSettings({ commit }, params) {
			const service = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_USER);
			params.settings = LibraryClientVueUtility.settings().mergeUser(params.correlationId, params.settings);
			const response = await service.updateSettings(params.correlationId, this.state.user.user, params.settings);
			this.$logger.debug('store.user', 'setUserSettings', 'response', response);
			if (Response.hasSucceeded(response) && response.results)
				commit('setUserSettings', { correlationId: params.correlationId, user: response.results });
			return response;
		}
	},
	mutations: {
		// eslint-disable-next-line
		resetUser(state, correlationId) {
			state.claims = null;
			state.isLoggedIn = false;
			state.token = null;
			state.tokenResult = null;
			state.user = null;
		},
		setAuthCompleted(state, params) {
			state.authCompleted = params.authCompleted;
		},
		setClaims(state, params) {
			state.claims = params.claims;
		},
		setLoggedIn(state, params) {
			state.isLoggedIn = params.isLoggedIn;
		},
		async setTheme(e, params) {
			state.theme = params.theme;
		},
		setTokenResult(state, params) {
			state.tokenResult = params.tokenResult;
			state.token = params.tokenResult ? params.tokenResult.token : null;
		},
		setUser(state, params) {
			if (params.user)
				params.user.settings = LibraryClientVueUtility.settings().mergeUser(params.correlationId, params.user.settings);
			state.user = params.user;
		},
		setUserSettings(state, params) {
			params.user.settings = LibraryClientVueUtility.settings().mergeUser(params.correlationId, params.user.settings);
			state.user = params.user;
		}
	},
	dispatcher: {
		async refreshUserSettings(correlationId) {
			await LibraryClientUtility.$store.dispatch('refreshUserSettings', correlationId);
		},
		async resetUser(correlationId) {
			await LibraryClientUtility.$store.dispatch('resetUser', correlationId);
		},
		async setAuthCompleted(correlationId, authCompleted) {
			await LibraryClientUtility.$store.dispatch('setAuthCompleted', { correlationId: correlationId, authCompleted: authCompleted });
		},
		async setClaims(correlationId, claims) {
			await LibraryClientUtility.$store.dispatch('setClaims', { correlationId: correlationId, authCompleted: claims });
		},
		async setLoggedIn(correlationId, isLoggedIn) {
			await LibraryClientUtility.$store.dispatch('setLoggedIn', { correlationId: correlationId, isLoggedIn: isLoggedIn });
		},
		async setTheme(correlationId, theme) {
			await LibraryClientUtility.$store.dispatch('setTheme', { correlationId: correlationId, theme: theme });
		},
		async setTokenResult(correlationId, tokenResult) {
			await LibraryClientUtility.$store.dispatch('setTokenResult', { correlationId: correlationId, tokenResult: tokenResult });
		},
		async setUser(correlationId, user) {
			await LibraryClientUtility.$store.dispatch('setUser', { correlationId: correlationId, user: user });
		},
		async setUserSettings(correlationId, settings) {
			return await LibraryClientUtility.$store.dispatch('setUserSettings', { correlationId: correlationId, settings: settings });
		}
	}
};

export default store;
