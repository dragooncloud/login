<template>
  <div>
    <div>
      <header>
        <nav class="navbar navbar-expand-md navbar-dark bg-dark">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <router-link to="/" class="navbar-brand">Digital Dragoon&trade;</router-link>
          <div class="collapse navbar-collapse" id="navbarToggler">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0"/>
            <ul class="navbar-nav">
              <li class="nav-item" v-if="profile">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="false" aria-expanded="true">
                  <img :src="profile.picture" :title="`${profile.first_name} ${profile.last_name}`" style="max-height:32px;display:inline;margin-right:10px;"/>
                  <span v-text="`${profile.first_name} ${profile.last_name}`"></span>
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" @click="logout()">logout</a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <main role="main" class="container">
        <nuxt/>
      </main>

      <footer class="footer fixed-bottom bg-dark">
        <div class="container">
          <span class="text-muted">Copyright &copy; Digital Dragoon Limited 2018</span>
          <div class="text-light">TODO: link to privacy policy and main company web-site.</div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    profile() {
      return this.$store.state.auth.profile;
    },
    network() {
      return this.$store.state.auth.network;
    },
  },
  methods: {
    logout() {
      if (!this.network) {
        return;
      }
      if (this.network === 'fake') {
        this.$store.commit('auth/logout');
      } else {
        this.hello(this.network).logout().then(() => {
          this.$store.commit('auth/logout');
        });
      }
    },
  },
};
</script>
