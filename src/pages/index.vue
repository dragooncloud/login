<template>
  <secure>
    <h1>
      Accounts
      <small class="text-muted">you're associated with</small>
    </h1>
    <p>Accounts overview and link to creation (allow more than 1 account ref)</p>

     <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Account</th>
          <th scope="col"># of Subscriptions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="account in accounts" :key="account.id">
          <td>
            <router-link :to="`/account/${account.id}`" v-text="account.name"/>
          </td>
          <td v-text="`${account.paidFor} subscriptions`"/>
        </tr>
      </tbody>
    </table>
    
    <h2>Other Links</h2>
    <router-link class="btn btn-lg btn-outline-primary" to="/new-account">Create a new Account</router-link>
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
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      this.$dragoon_auth.listAccountsForThisUser().then((accounts) => {
        this.accounts = accounts;
        this.$nuxt.$loading.finish();
      });
    });
  },
};
</script>
