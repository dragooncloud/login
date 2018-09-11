<template>
  <secure>
    <profile/>

    <h4>Your Account</h4>
    <ul>
      <li v-for="account in accounts" :key="account.id">
        <router-link :to="`/accounts/${account.id}`">{{account.name}}</router-link>
      </li>
    </ul>

    <div v-if="accounts.length === 0">
      <h4>Create new Account</h4>
      <input type="text" v-model="newAccount.name" />
      <input type="number" v-model.number="newAccount.subscriptionCount" />
      <button @click="createAccount()">Create account</button>
    </div>
  </secure>
</template>

<script>
import Secure from '~/components/secure.vue'
import Profile from '~/components/profile.vue'

export default {
  components: { Secure, Profile },
  data() {
    return {
      newAccount: { name: null, subscriptionCount: 1 },
      accounts: [
        {id: 1, name: 'Dragoon Testing'},
      ],
    };
  },
  methods: {
    createAccount() {
      console.log('todo:', JSON.stringify(this.newAccount));
      this.accounts = [ 
        ...this.accounts, 
        { 
          id: this.newAccount.name,
          ...this.newAccount,
        },
      ];
    },
  },
};
</script>
