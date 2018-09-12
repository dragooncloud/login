<template>
  <secure>
    <h1>Subscription</h1>
    <p>details on subscription (do we actually need this screen?)</p>

    <div v-if="subscription">
      <div v-if="subscription.claimedAt && usedBy">
        <h2>Already allocated</h2>
        <p>Was claimed at {{ subscription.claimedAt }} by {{ usedBy.first_name }} {{ usedBy.last_name }}.</p>
      </div>
      <div v-if="!subscription.claimedAt">
        <h2>Not yet allocated</h2>
        <p>Was offered to {{ subscription.emailInvitationSentTo }} but has not yet been claimed (perhaps prod them?).</p>
      </div>
    </div>

    <h2>Links</h2>
    <ul>
      <li><router-link :to="`${subscriptionId}/cancel`">Cancel this Subscription</router-link></li>
      <li><router-link :to="`/account/${accountId}`">Back to account</router-link></li>
    </ul>
  </secure>
</template>

<script>
import Secure from '~/components/secure.vue';

export default {
  components: { Secure },
  data() {
    return {
      subscription: null,
      usedBy: null,
    };
  },
  computed: {
    subscriptionId() {
      return this.$route.params.subscription;
    },
    accountId() {
      return this.$route.params.account;
    },
  },
  mounted() {
    this.$dragoon_auth
      .getSubscription(this.accountId, this.subscriptionId)
      .then((subscription) => {
        this.subscription = subscription;
        if (this.subscription.usedBy) {
          return this.$dragoon_auth.getUser(this.accountId, this.subscription.usedBy).then(user => this.usedBy = user);
        }
      });
  },
}
</script>
