<template>
  <div class="sidebar-div p-5">
    <img class="profile-img img-fluid mb-5" :src="account.picture" alt="">
    <h1 class="text-primary text-break">
      {{ account.name }}
    </h1>
    <router-link :to="{ name: 'Home' }" class="nav-link">
      Home
    </router-link>
    <router-link :to="{ name: 'About' }" class="nav-link">
      About
    </router-link>
    <button
      class="btn btn-outline-primary text-uppercase"
      @click="login"
      v-if="!user.isAuthenticated"
    >
      Login
    </button>
    <div v-else>
      <router-link :to="{ name: 'Account' }">
        <div class="hoverable">
          Account
        </div>
      </router-link>
      <div
        class="nav-link text-primary"
        @click="logout"
        role="button"
      >
        Logout
      </div>
    </div>
  </div>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      dropOpen: false
    })
    return {
      state,
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style scoped>
.sidebar-div {
  position: fixed;
  top: 0;
  left: 0;
  background: #1f1f2296;
  height: 100vh;
  font-size: 100%;
  color: black;
}

h1 {
  font-size: 100%;
}

.profile-img {
  border-radius: 50%;
}

</style>
