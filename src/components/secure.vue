<template>
  <div class="secure">
    
    <!-- No Auth -->
    <div v-if="!isAuthenticated">
      <h2 class="subtitle">
        Please log-on to continue
        <small class="text-muted">the page you requested is restricted</small>
      </h2>

      <ul id="login-buttons" class="button-list">
        <li><button @click="auth('windows')" class="btn btn-outline-dark btn-lg">Office 365</button></li>
        <li><button @click="auth('facebook')" class="btn btn-outline-dark btn-lg">Facebook</button></li>
        <li><button @click="auth('google')" class="btn btn-outline-dark btn-lg">Google</button></li>
        <li><button @click="fakeAuth()" class="btn btn-outline-danger btn-lg">Fake Auth</button></li>
      </ul>

      <p>The team at Dragoon have worked hard to avoid needing to create yet another log-on system.
        Instead, we use your existing accounts which you already own. Using a very clever
        (and secure) mechanism called <a href="#">OAuth2</a>, we communicate with your existing
        supplier to ensure none of you data is exposed and your account remains secure.</p>
      
      <h3>Wait&hellip; where's the user-name &amp; password fields?</h3>
      <div class="alert alert-success" role="alert">
        Does not use browser cookies
      </div>
      <div class="alert alert-success" role="alert">
        Single-sign-on - don't need to remember yet another user-name and password
      </div>
      <div class="alert alert-success" role="alert">
        Manage your account using tools you're already familiar with
      </div>
    </div>

    <!-- Authenticated (allow children) -->
    <div v-if="isAuthenticated">
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

<style lang="scss" scoped>
#login-buttons {
  margin: 60px;
  text-align: center;
}
</style>
