<template>
  <secure>
    <h1>Sign-in Provider</h1>
    <p>check client and redirect, perform login and redirect back</p>
    <button @click="done()">Proceed</button>
  </secure>
</template>

<script>
import Secure from '~/components/secure.vue';

export default {
  components: { Secure },
  computed: {
    clientId() {
      return this.$route.query.clientId;
    },
    redirectUrl() {
      return this.$route.query.redirectUrl;
    },
    profile() {
      return this.$store.state.auth.profile;
    },
    access_token() {
      return this.$store.state.auth.access_token;
    }
  },
  mounted() {
    console.log('verify client details requested:', this.clientId, this.redirectUrl);
  },
  methods: {
    done() {
      if (!this.profile || !this.access_token) {
        return;
      }
      document.location = `${this.redirectUrl}?userid=${encodeURIComponent(this.profile.id)}access_token=${this.access_token}`;
    },
  },
}
</script>
