<template>
  <div class="nav">
    <div class="nav-box">
      <router-link to="/">Gallery</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <div class="nav-box">
      <template v-if="!isAuthenticated">
        <router-link to="/register">Register</router-link> |
        <router-link to="/login">Login</router-link>
      </template>
      <template v-else>
        <a class="button" @click="logout">Logout</a>
      </template>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters  } from 'vuex';
export default {
  name: 'nav-bar',
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
  },
  methods: {
    ...mapActions('auth', ['logout']),
  },
};
</script>
<style scoped>
.nav {
  display: flex;
  padding: 30px;
}

.nav-box {
  flex: 1;
}
.nav a {
  font-weight: bold;
  color: #2c3e50;
}

.nav a.router-link-exact-active {
  color: #42b983;
}
.button {
  cursor: pointer;
}
</style>
