<template>
  <section class="container">
    <div>
      <h1 class="title">
        dragoon-login
      </h1>
      <h2 class="subtitle">
        OAuth2 Logon Portal for Office365, Facebook and Google integration
        <ul>
          <li>Cookie-less</li>
          <li>No username</li>
          <li>No password</li>
        </ul>
      </h2>
      <div class="links" v-if="!profile">
        <button @click="auth('windows')" class="button--green">Office 365</button>
        <button @click="auth('facebook')" class="button--grey">Facebook</button>
        <button @click="auth('google')" class="button--grey">Google</button>
      </div>
      <div v-if="profile">
        <h2>You are now signed-in; welcome {{ profile.first_name }}!</h2>
        <ul>
          <li>Id: <code v-text="profile.id" /></li>
          <li>Email: <code v-text="profile.email" /></li>
          <li>Name: <code v-text="profile.first_name" /> <code v-text="profile.last_name" /></li>
          <li>Picture: 
            <a :href="profile.picture"><img :src="profile.picture" style="max-height:200px"/></a>
            <a :href="profile.thumbnail"><img :src="profile.thumbnail" style="max-height:200px"/></a>
          </li>
          <li>Profile Link: <a :href="profile.link" target="_blank" v-text="profile.link"/></li>
          <li>Access Token: <code v-text="access_token"/></li>
        </ul>
        <button @click="logout()" class="button--green">Logout</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
      store() {
        if (!this.$store) {
          return { state: { auth: {} } }; // null implementation
        }
        return this.$store;
      },
      network() {
        return this.store.state.auth.network;
      },
      profile() {
        return this.store.state.auth.profile;
      },
      access_token() {
        return this.store.state.auth.access_token;
      },
  },
  methods: {
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
          this.$router.push({ path: 'accounts' });
        });
      });
    },
    
    logout() {
      if (!this.network) {
        return;
      }
      this.hello(this.network).logout().then(() => {
        this.$store.commit('auth/logout');
      });
    },
  },
}
</script>

<style scoped>
* {
  text-align: center;
  margin: 30px;
}
</style>
