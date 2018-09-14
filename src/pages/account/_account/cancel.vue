<template>
  <secure>
    <div v-if="account">
      <h1>Cancel: {{ account.name }}</h1>
      <p>Confirmation screen before cancelling, feedback etc.</p>

      <div class="warn" v-if="offeredOrUsedSubscriptionsCount > 0">
        <h2>You cannot cancel this account&hellip; just yet</h2>
        <p>You must cancel all subscriptions first, you currently have {{ offeredOrUsedSubscriptionsCount }} offered or used subscriptions.</p>
      </div>
      <div v-if="offeredOrUsedSubscriptionsCount === 0">
        <h2>Confirm cancel</h2>
        <button @click="confirmCancel()">Yes, I want to cancel</button>
      </div>
    </div>
  </secure>
</template>

<script>
import Secure from '~/components/secure.vue';

export default {
  components: { Secure },
  data() {
    return { account: null, offeredOrUsedSubscriptionsCount: 0 };
  },
  computed: {
    accountId() {
      return this.$route.params.account;
    },
  },
  mounted() {
    this.$dragoon_auth.getAccount(this.accountId).then((account) => {
      this.account = account; // TODO: do we actually need this?
      this.offeredOrUsedSubscriptionsCount = Object.keys(account.subscriptions || {}).length;
    });
  },
  methods: {
    confirmCancel() {
      this.$dragoon_auth
        .cancelAccount(this.accountId)
        .then(() => {
          this.$router.push({ path: '/' });
        })
        .catch(err => console.error('cant cancel account', err.message));
    },
  },
}
</script>
