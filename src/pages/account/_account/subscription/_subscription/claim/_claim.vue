<template>
  <secure>
    <h1>Claim Subscription</h1>
    <p>Claim your subscription</p>

    <div v-if="account">
      <h2>Confirm this subscription by logging-into your preferred login-system</h2>
      <ul>
        <button @click="confirmAllocation()">Yes, I want this subscription</button>
      </ul>
    </div>
  </secure>
</template>

<script>
import Secure from '~/components/secure.vue';

export default {
  components: { Secure },
  data() {
    return {
      account: null,
    };
  },
  computed: {
    accountId() {
      return this.$route.params.account;
    },
    subscriptionId() {
      return this.$route.params.subscription;
    },
    claimSecret() {
      return this.$route.params.claim;
    },
  },
  mounted() {
    this.$dragoon_auth.getAccount(this.accountId).then((account) => {
      this.account = account;
    });
  },
  methods: {
    confirmAllocation() {
      this.$dragoon_auth.allocateSubscription(this.accountId, this.subscriptionId, this.claimSecret).then(() => {
        this.$router.push({ path: '..' });
      })
      .catch((err) => {
        console.error('unable to associate this subscription with this user');
      });
    },
  },
}
</script>
