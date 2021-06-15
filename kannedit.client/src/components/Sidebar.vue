<template>
  <div class="sidebar-div p-5">
    <h1>Profile Pic</h1>
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
        <div class="list-group-item list-group-item-action hoverable">
          Account
        </div>
      </router-link>
      <div
        class="list-group-item list-group-item-action hoverable"
        @click="logout"
      >
        logout
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
  background: blue;
}

</style>
