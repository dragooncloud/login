<template>
  <secure>
    <h1>New Subscription</h1>
    <p>Allocate one of your subscriptions</p>
    <input type="text" v-model="emailTo" placeholder="Employee's email address"/>
    <button @click="allocate()">Offer subscription to recipient&hellip;</button>
  </secure>
</template>

<script>
import Secure from '~/components/secure.vue';

export default {
  components: { Secure },
  data() {
    return {
      emailTo: null,
    };
  },
  computed: {
    accountId() {
      return this.$route.params.account;
    },
  },
  methods: {
    allocate() {
      this.$dragoon_auth.offerSubscription(this.accountId, this.emailTo).then(() => this.$router.back(1));
    },
  },
}
</script>
