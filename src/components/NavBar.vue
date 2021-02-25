<template>
  <div class="nav d-flex justify-content-between">
    <div class="galleries">
      <router-link to="/">Galleries </router-link>  
      <router-link v-if="isAuthenticated" to="/my-galleries">My Galleries </router-link> 
      <router-link v-if="isAuthenticated" to="/create-new-gallery">Create New Gallery</router-link> 
    </div>
    <div class="auth">
      <template v-if="!isAuthenticated">
        <router-link to="/register">Register </router-link> 
        <router-link to="/login">Login</router-link>
      </template>
      <template v-else>
        <span>Hello {{ activeUser.first_name }} |</span>
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
    ...mapGetters('auth', ['isAuthenticated', 'activeUser']),
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
