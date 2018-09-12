<template>
  <secure>
    <h1>Accounts</h1>
    <p>Accounts overview and link to creation (allow more than 1 account ref!)</p>
    <ul>
      <li v-for="account in accounts" :key="account.id">
        <router-link :to="`/account/${account.id}`" v-text="`${account.name} (${account.paidFor} subscriptions)`"/>
      </li>
    </ul>
    <h2>Other Links</h2>
    <ul>
      <li><router-link to="/new-account">Create a new Account</router-link></li>
    </ul>
  </secure>
</template>

<script>
import Secure from '~/components/secure.vue';

export default {
  components: { Secure },
  data() {
    return { accounts: [] };
  },
  mounted() {
    this.$dragoon_auth.listAccountsForThisUser().then(accounts => this.accounts = accounts);
  },
};
</script>
