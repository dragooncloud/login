<template>
  <secure>
    <h1>Cancel Subscription</h1>
    <p>confirm cancel allocation (send email to recipient)</p>

    <div v-if="isAdmin">
      <button @click="confirmCancel()">Yes, I want to cancel this subscription</button>
    </div>
    <div v-if="!isAdmin">
      <div class="warn">You do not have permission to cancel this subscription; speak to an admin</div>
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
    }
  },
  computed: {
    accountId() { 
      return this.$route.params.account; 
    },
    subscriptionId() {
      return this.$route.params.subscription;
    },
    profile() {
      return this.$store.state.auth.profile;
    },
    isAdmin() {
      if (!this.account || !this.profile) {
        return false;
      }
      return this.account.admins[this.profile.id] === true;
    }
  },
  mounted() {
    this.$dragoon_auth.getAccount(this.accountId).then(account => this.account = account);
  },
  methods: {
    confirmCancel() {
      alert('todo: call function to send out email and de-allocate this subscription');
      this.$dragoon_auth.cancelSubscription(this.accountId, this.subscriptionId).then(() => {
        this.$router.push({ path: '../..' });
      });
    },
  },
};
</script>
