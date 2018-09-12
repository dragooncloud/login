import Vue from 'vue';
import { Subscription } from 'rx';

const fakeAccounts = {
  '3AVd7zibjyOGtLZOsqYK': {
    name: 'Test Account 1',
    paidFor: 100,
    authMethods: { facebook: true, google: false, windows: true },
    admins: { 'fake-user12345': true },
    subscriptions: {
      'sub-12345': {
        emailInvitationSentTo: 'testing@dragoon.cloud',
        claimSecret: 'claim-12345',
      }
    },
  },
};

const fakeUser = {
  first_name: 'Tom',
  last_name: 'Tester',
  id: 'fake-user12345',
  email: 'testing@dragoon.cloud',
  picture: 'http://thebertshow.com/wp-content/uploads/2014/07/violation-of-probation.jpg',
  thumbnail: 'http://thebertshow.com/wp-content/uploads/2014/07/violation-of-probation.jpg',
};

const DragoonAuthApi = (opts) => ({
    /**
     * Generate a fake user
     * @returns {object} the fake user
     */
    fakeUser() {
      return fakeUser;
    },

    /**
     * Get a user by its id
     * @param {string} accountId the account this user belongs to
     * @param {string} userId the id for the user
     * @returns {Promise<User>} callback with the user or null if not found
     */
    getUser(accountId, userId) {
      let user = fakeUser;
      return Promise.resolve(user);
    },

    /**
     * Get all accounts associated with this user
     * @returns {Promise<any[]>} promise for list of accounts
     */
    listAccountsForThisUser() {
      return Promise.resolve(Object.keys(fakeAccounts).map(k => ({ id: k, ...fakeAccounts[k] })));
    },

    /**
     * Get the account information based on its id
     * @param {string} accountId the id of the account you're interested in
     * @param {Profile} currentUser the current logged-in user's profile
     * @returns {Promise<Account>} the account requested or null if not found
     */
    getAccount(accountId) {
      return fetch(`${opts.functionsHost}/account_info?account=${encodeURIComponent(accountId)}`)
        .then(d => d.json())
        .then(d => ({ id: accountId, ...d }));
    },

    /**
     * Cancel this account
     * @param {string} accountId the account to cancel
     * @returns {Promise} callback or catch to handle errors
     */
    cancelAccount(accountId) {
      console.log('cancelAccount', accountId);
      let account = fakeAccounts[accountId];
      if (!account) {
        return Promise.reject(new Error('Account not known'));
      }
      let subscriptionCount = Object.keys(account.subscriptions || {}).length;
      if (subscriptionCount > 0) {
        return Promise.reject(new Error('Cannot cancel account with active subscriptions'));
      }
      delete fakeAccounts[accountId];
      return Promise.resolve();
    },

    /**
     * Fetch a subscription
     * @param {string} accountId the account the subscription will belong to
     * @param {string} subscriptionId the id of the subscription to load
     * @returns {Promise<Subscription>} the subscription or null if not found
     */
    getSubscription(accountId, subscriptionId) {
      let account = fakeAccounts[accountId];
      if (!account) {
        return Promise.resolve(null);
      }
      return Promise.resolve(account.subscriptions[subscriptionId]);
    },

    /**
     * Offer the subscription by email
     * @param {string} accountId the id for the account
     * @param {string} recipientEmail the recipient's email address
     * @returns {Promise} callback when done, or catch any errors
     */
    offerSubscription(accountId, recipientEmail) {
      // find account
      let account = fakeAccounts[accountId];
      if (!account) {
        throw new Error('Account not known');
      }
      
      // probably should check you have some left?
      account.subscriptions = account.subscriptions || {}; // make sure isn't null

      console.log('can access store?', this.$store);
      let newSubscriptionId = new Date().toISOString().replace(/[:\-\.]/g, '_');
      account.subscriptions[newSubscriptionId] = {
        id: newSubscriptionId,
        emailInvitationSentTo: recipientEmail,
      }
      return Promise.resolve();
    },

    /**
     * Cancel a subscription (revoke offer)
     * @param {string} accountId the account the subscription belongs to
     * @param {string} subscriptionId the subscription's id to cancel
     * @returns {Promise} callback when done, or catch to handle errors
     */
    cancelSubscription(accountId, subscriptionId) {
      let account = fakeAccounts[accountId];
      if (!account) {
        throw new Error('Account not known');
      }
      if (!account.subscriptions) {
        throw new Error('Account has not subscriptions');
      }
      let subscription = account.subscriptions[subscriptionId];
      if (!subscription) {
        throw new Error('Subscription not known');
      }
      delete account.subscriptions[subscriptionId];
      return Promise.resolve();
    },

    /**
     * Allocate the subscription to the current logged-in user
     * @param {string} accountId the account this subscription belongs to
     * @param {string} subscriptionId the id of this subscription being claimed
     * @param {string} claimSecret the secret (used in the email link) to authorise this claim
     */
    allocateSubscription(accountId, subscriptionId, claimSecret) {
      let account = fakeAccounts[accountId];
      if (!account) {
        throw new Error('Account not known');
      }
      let subscription = account.subscriptions[subscriptionId];
      if (!subscription) {
        throw new Error('Subscription not known');
      }
      if (typeof(subscription.claimedAt) !== 'undefined') {
        throw new Error('Subscription already allocated');
      }
      if (claimSecret !== subscription.claimSecret) {
        throw new Error('Incorrect secret');
      }
      // TODO: ensure user is registered
      // mark as claimed
      subscription.claimedAt = new Date().toISOString();
      subscription.usedBy = fakeUser.id;
      return Promise.resolve();
    },
});

// install our api
const DragoonAccountApiInstaller = {
  install(Vue, options) {
    Vue.prototype.$dragoon_auth = DragoonAuthApi(options);
  }
};

// install the api
Vue.use(DragoonAccountApiInstaller, {
  functionsHost: 'https://us-central1-dragoon-215220.cloudfunctions.net',
});
