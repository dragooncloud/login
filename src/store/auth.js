
// state
export const state = () => ({
  access_token: null,
  profile: null,
  network: null,
});

// getters
export const getters = {
  isAuthenticated: (state) => {
    return state.profile !== null && state.access_token !== null;
  }
};

// mutations
export const mutations = {
  login (state, options) {
    state.profile = options.profile;
    state.profile.id = `${options.network}-${options.profile.id}`;
    state.access_token = options.access_token;
    state.network = options.network;
  },
  logout (state) {
    state.profile = null;
    state.access_token = null;
    state.network = null;
  },
};