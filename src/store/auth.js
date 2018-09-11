
// state
export const state = () => ({
  access_token: null,
  profile: null,
  network: null,
});

// mutations
export const mutations = {
  login (state, options) {
    state.profile = options.profile;
    state.access_token = options.access_token;
    state.network = options.network;
  },
  logout (state) {
    state.profile = null;
    state.access_token = null;
    state.network = null;
  },
};