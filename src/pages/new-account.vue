<template>
  <secure>
    <h1>New Account</h1>
    <p>create new account (choose auth options)</p>
    <div>
      <input type="text" name="name" v-model="accountName" placeholder="Account/Company name"/>
    </div>
    <div>
      <label for="subscriptionsNeeded"># of Subscriptions needed (£10 pcm per subscription)</label>
      <input type="number" id="subscriptionsNeeded" v-model.number="subscriptionsNeeded"/>
    </div>
    <button @click="makeRequestWithPayPal()">Set-up payment with PayPal</button>
    <router-link to="/">Cancel</router-link>
  </secure>
</template>

<script>
import Secure from '~/components/secure.vue';

export default {
  components: { Secure },
  data() {
    return {
      subscriptionsNeeded: 1,
      accountName: null,
    };
  },
  methods: {
    makeRequestWithPayPal() {
      alert(
        `TODO: make function call to setup ${this.accountName} account, then redirect user ` + 
        `for consent and payment details for ${this.subscriptionsNeeded} subscriptions`
      );
    },
  },
}
</script>
