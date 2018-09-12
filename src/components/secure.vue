<template>
  <div class="secure">
    
    <!-- No Auth -->
    <div v-if="!isAuthenticated">
      <h2 class="subtitle">Dragoon Log-on System</h2>
      <ul>
        <li>Cookie-less</li>
        <li>No username</li>
        <li>No password</li>
      </ul>
      <div>
        <button @click="auth('windows')">Office 365</button>
        <button @click="auth('facebook')">Facebook</button>
        <button @click="auth('google')">Google</button>
        <button @click="fakeAuth()">Fake Auth</button>
      </div>
    </div>

    <!-- Authenticated (allow children) -->
    <div v-if="isAuthenticated">
      <p>
        <img :src="profile.thumbnail" alt="profile photo" style="max-height:64px;display:inline;margin-right:10px;"/>
        You are logged-in as {{ profile.first_name }} {{ profile.last_name }} [
        <button @click="logout()">logout</button>
        ]</p>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated'];
    },
    profile() {
      return this.$store.state.auth.profile;
    },
    network() {
      return this.$store.state.auth.network;
    },
  },
  methods: {
    fakeAuth() {
      this.$store.commit('auth/login', { 
        network: 'fake', 
        access_token: '12345', 
        profile: this.$dragoon_auth.fakeUser(),
      });
    },
    /**
     * @param {string} network windows/google/facebook
     */
    auth(network) {
      const hello = this.hello;
      hello(network).login().then(() => {
        const authRes = hello(network).getAuthResponse();
        console.log('authRes:', authRes);
        hello(network).api('me').then((profile) => {
          this.$store.commit('auth/login', { network, profile, access_token: authRes.access_token });
        });
      });
    },
    
    logout() {
      if (!this.network) {
        return;
      }
      if (this.network === 'fake') {
        this.$store.commit('auth/logout');
      } else {
        this.hello(this.network).logout().then(() => {
          this.$store.commit('auth/logout');
        });
      }
    },
  },
};
</script>
