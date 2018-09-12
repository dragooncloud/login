<template>
  <secure>
    <h1>Account: {{ account == null ? accountId : account.name }}</h1>
    <p>Edit details provided on new-account for an existing account</p>

    <h2>Subscriptions</h2>
    <p v-if="isAdmin">You have {{ subscriptionsRemaining }} subscriptions remaining ({{ numberOfAllocatedSubscriptions }} already offered or allocated).<br/>
      <router-link :to="`${accountId}/allocate`">Allocate another&hellip;</router-link></p>
    
    <div v-if="account">
      <h3>Already allocated</h3>
      <ul>
        <li v-for="subscription in accountSubscriptions" :key="subscription.id">
          <router-link :to="`${accountId}/subscription/${subscription.id}`">{{ subscription.id }} offered to {{ subscription.emailInvitationSentTo }}</router-link>
        </li>
      </ul>
    </div>

    <div v-if="isAdmin">
      <h2>Administer this Account</h2>
      <ul>
        <li><router-link :to="`${accountId}/apps`">Configure Dragoon Apps for this account</router-link></li>
        <li><router-link :to="`${accountId}/billing`">Increase/Decrease the number of subscriptions in this account</router-link></li>
        <li><router-link :to="`${accountId}/cancel`">Cancel this account</router-link></li>
        <li><router-link :to="`${accountId}/admins`">Add/Remove Admins</router-link></li>
      </ul>
    </div>
  </secure>
</template>

<script>
import Secure from '~/components/secure.vue'

export default {
  components: { Secure },
  data() {
    return { 
      account: null,
      subscriptionsRemaining: 0,
      numberOfAllocatedSubscriptions: 0,
    };
  },
  computed: {
    accountId() {
      return this.$route.params.account;
    },
    profile() {
      return this.$store.state.auth.profile;
    },
    isAdmin() {
      if (!this.account || !this.profile) {
        return false;
      }
      return this.account.admins[this.profile.id] === true;
    },
    accountSubscriptions() {
      const subs = this.account.subscriptions;
      return Object.keys(subs).map(k => ({id: k, ...subs[k] }));
    },
  },
  mounted() {
    return this.$dragoon_auth.getAccount(this.accountId).then((account) => {
      let numberOfPaidSubscriptions = account.paidFor;
      this.numberOfAllocatedSubscriptions = Object.keys(account.subscriptions || {}).length;
      this.subscriptionsRemaining = numberOfPaidSubscriptions - this.numberOfAllocatedSubscriptions;
      this.account = account;
    });
  },
};
</script>
