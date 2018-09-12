<template>
  <secure>
    <h1>Admins</h1>
    <p>add/remove admins from this account</p>
    <div v-if="!isAdmin">
      <h2>Not enough permissions</h2>
      <p>You do not have permissions to manage the admins for this account.</p>
    </div>
    <div v-if="isAdmin">
      <h2>Current admins</h2>
      <ul>
        <li v-for="user in allRelatedUsers" :key="user">
          {{ user }}
          <span v-if="userIsAdmin(user)">ADMIN</span>&nbsp;
          <span style="font-weight:bold" v-if="profile.id === user">YOU</span>
        </li>
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
    profile() {
      return this.$store.state.auth.profile;
    },
    isAdmin() {
      if (!this.account || !this.profile) {
        return false;
      }
      return this.account.admins[this.profile.id] === true;
    },
    allRelatedUsers() {
      if (!this.account) {
        return [];
      }
      const subs = this.account.subscriptions;
      const subscriberUsers = Object.keys(subs)
        .filter(k => typeof(subs[k]) !== 'undefined' && typeof(subs[k].usedBy) !== 'undefined')
        .map(k => subs[k].usedBy);
      const uniqueUserIds = Object.assign({}, this.account.admins, subscriberUsers.reduce((a, c) => (a[c] = true), {}));
      return Object.keys(uniqueUserIds);
    },
  },
  mounted() {
    this.$dragoon_auth.getAccount(this.accountId).then(account => this.account = account);
  },
  methods: {
    userIsAdmin(userId) {
      if (!this.account) {
        return false;
      }
      return this.account.admins[userId] === true;
    },
  },
};
</script>
