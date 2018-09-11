<template>
  <div class="secure">
    <slot v-if="profile"></slot>
  </div>
</template>

<script>
export default {
  computed: {
    profile() {
      return this.$store.state.auth.profile;
    }
  },
  created() {
    if (!this.profile) {
        this.$router.push({ path: '/', params: { error: 'unauthorised' } });
    }
  },
};
</script>
