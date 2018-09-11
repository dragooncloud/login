<template>
  <div>
    <h2>Welcome {{ `${profile.first_name} ${profile.last_name}` }}</h2>
    <img :src="profile.picture"/>
    <button @click="logout()">logout</button>
    <hr/>
  </div>
</template>

<script>
export default {
  computed: {
    profile() {
      return this.$store.state.auth.profile;
    },
  },
  methods: {
    logout() {
      this.hello(this.$store.state.auth.network).logout().then(() => {
        this.$store.commit('auth/logout');
        this.$router.push({path: '/', params: { reason: 'user-logged-out' }});
      });
    }
  },
};
</script>
