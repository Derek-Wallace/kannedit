<template>
  <div class="container-fluid flex-grow-1 pt-5 home">
    <div class="row d-flex justify-content-center mt-5">
      <div class="col-4 title-card p-4 shadow">
        <img class="img img-fluid" src="../assets/img/kanban-logo.png" alt="CodeWorks Logo">
        <hr>
        <h1 class="page-title">
          Kannedit
        </h1>
      </div>
    </div>
    <div class="row d-flex justify-content-center flex-grow-1 text-center">
      <div v-if="!user.isAuthenticated" class="col-12 mt-5">
        <button
          class="landing-button"
          @click="login"
        >
          Login
        </button>
      </div>
      <div class="d-flex justify-content-center flex-grow-1 text-center mt-5" v-else>
        <div class="col-lg-1">
          <router-link :to="{ name: 'Account' }">
            <div class="landing-button">
              Account
            </div>
          </router-link>
        </div>
        <div class="col-lg-1">
          <div
            class="landing-button"
            @click="logout"
          >
            Logout
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'Home',
  setup() {
    const router = useRouter()
    const state = reactive({
      dropOpen: false
    })
    return {
      state,
      user: computed(() => AppState.user),
      async login() {
        await AuthService.loginWithPopup()
        router.push({ name: 'Account' })
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  font-family: 'Secular One', sans-serif;
  text-align: center;
  user-select: none;
  background-color: #313131;
  background-image: url("https://www.transparenttextures.com/patterns/crissxcross.png");

  > img{
    height: 100px;
    }
}

.landing-button {
  color: #e4e2e2;
  border: 3px solid #3f3e7ab6;
  background-color: #3f3e7ab6;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
}

.landing-button:hover {
  color: #f8f7f7;
  background-color: #2e0944;
  border: 3px solid #2e0944;
  padding: 10px;
  text-decoration: none;
  box-shadow: 2px 2px black inset;
}

hr {
  border: 5px solid #C6D7F5;
  background-color: #C6D7F5;
  border-radius: 20px;
  box-shadow: 2px 2px 10px 2px #ffffff3a;
}

.page-title {
  font-size: 6vw;
  color: #C6D7F5;
  text-shadow: 4px 4px black;
}

.title-card {
  background-color: #00000018;
  border-radius: 10px;
  color: #C6D7F5
}

</style>
