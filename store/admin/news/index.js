import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';

import Response from '@thzero/library_common/response';

const store = {
	state: {
		news: null
	},
	actions: {
		async createAdminNews({ commit }, params) {
			const service = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_ADMIN_NEWS);
			const response = await service.create(params.correlationId, params.item);
			this.$logger.debug('store.admin.news', 'createAdminNews', 'response', response);
			if (Response.hasSucceeded(response))
				commit('setAdminNews', { correlationId: params.correlationId, item: response.success && response.results ? response.results : null });
			return response;
		},
		async deleteAdminNews({ commit }, params) {
			const service = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_ADMIN_NEWS);
			const response = await service.delete(params.correlationId, params.id);
			this.$logger.debug('store.admin.news', 'deleteAdminNews', 'response', response);
			if (Response.hasSucceeded(response)) {
				commit('deleteAdminNews', params);
				LibraryClientUtility.$store.dispatcher.news.delete(params.correlationId, params.id);
			}
			return response;
		},
		async searchAdminNews({ commit }, params) {
			const service = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_ADMIN_NEWS);
			const response = await service.search(params.correlationId, params.params);
			this.$logger.debug('store.admin.news', 'searchAdminNews', 'response', response);
			commit('setAdminNewsListing', { correlationId: params.correlationId, list: response.success && response.results ? response.results.data : null });
		},
		async updateAdminNews({ commit }, params) {
			const service = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_ADMIN_NEWS);
			const response = await service.update(params.correlationId, params.item);
			this.$logger.debug('store.admin.news', 'updateAdminNews', 'response', response);
			if (Response.hasSucceeded(response))
				commit('setAdminNews', { correlationId: params.correlationId, item: response.success && response.results ? response.results : null });
			return response;
		}
	},
	mutations: {
		deleteAdminNews(state, params) {
			return LibraryCommonUtility.deleteArrayById(state.news, params.id);
		},
		setAdminNews(state, params) {
			this.$logger.debug('store.admin.news', 'setAdminNews', 'items.a', params.item, params.correlationId);
			this.$logger.debug('store.admin.news', 'setAdminNews', 'items.b', state.news, params.correlationId);
			state.news = LibraryCommonUtility.updateArrayById(state.news, params.item);
			this.$logger.debug('store.admin.news', 'setAdminNews', 'items.c', state.news, params.correlationId);
		},
		setAdminNewsListing(state, params) {
			this.$logger.debug('store.admin.news', 'setAdminNewsListing', 'list.a', params.list, params.correlationId);
			this.$logger.debug('store.admin.news', 'setAdminNewsListing', 'list.b', state.news, params.correlationId);
			state.news = params.list;
			this.$logger.debug('store.admin.news', 'setAdminNewsListing', 'list.c', state.news, params.correlationId);
		}
	},
	dispatcher: {
		async createAdminNews(correlationId, item) {
			return await LibraryClientUtility.$store.dispatch('createAdminNews', { correlationId: correlationId, item: item });
		},
		async deleteAdminNews(correlationId, id) {
			return await LibraryClientUtility.$store.dispatch('deleteAdminNews', { correlationId: correlationId, id: id });
		},
		async searchNews(correlationId, params) {
			await LibraryClientUtility.$store.dispatch('searchAdminNews', { correlationId: correlationId, params: params });
		},
		async updateAdminNews(correlationId, item) {
			return await LibraryClientUtility.$store.dispatch('updateAdminNews', { correlationId: correlationId, item: item });
		}
	}
};

export default store;
