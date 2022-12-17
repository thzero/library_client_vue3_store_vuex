![GitHub package.json version](https://img.shields.io/github/package-json/v/thzero/library_client_vue3_store_vuex)
![David](https://img.shields.io/david/thzero/library_client_vue3_store_vuex)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# library_client_vue3_store_vuex

An opinionated library for vue3 with vuex store for the library_client_vue3.

## Requirements

### NodeJs

[NodeJs](https://nodejs.org) version 18+

## Installation

[![NPM](https://nodei.co/npm/@thzero/library_common.png?compact=true)](https://npmjs.org/package/@thzero/library_client_vue3_store_vuex)


## Store Setup

### Store.js

Setup the 'store/store.js' as follows:

```
import Vue from 'vue';
import VuexPersist from 'vuex-persist';

import LibraryConstants from '@thzero/library_client_vue/constants';

import BaseStore from '@/library_vue/store';

class AppStore extends BaseStore {
	_init() {
		return {
			modules: {
			},
			state: {
				version: null
			},
			actions: {
				async getVersion({ commit }, correlationId) {
					const service = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_VERSION);
					const version = await service.version(correlationId);
					this.$logger.debug('store', 'getVersion', 'version', version, correlationId);
					commit('setVersion', { correlationId : correlationId, version: version });
				},
				async initialize({ commit }, correlationId) {
          // TODO: Call any services that are required during initialization
				},
				async setSettings({ commit }, params) {
					commit('setSettings', params);
				}
			},
			getters: {
			},
			mutations: {
				setVersion(state, params) {
					this.$logger.debug('store', 'setVersion', 'version', params.version, params.correlationId);
					state.version = params.version;
				}
			},
			dispatcher: {
				async getVersion(correlationId) {
					await GlobalUtility.$store.dispatch('getVersion', correlationId);
				},
				async initialize(correlationId) {
					await GlobalUtility.$store.dispatch('initialize', correlationId);
				}
			}
		};
	}

	_initModules() {
    // Initialize any store modules
    // i.e. this._addModule('yourmodulename', yourmodule);
	}

	_initPluginPersist() {
		return new VuexPersist({
			storage: window.localStorage,
			reducer: state => ({
        // TODO: any reducers?
				version: state.version
			})
		});
	}
}

export default AppStore;

```