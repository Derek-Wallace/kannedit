<template>
  <Navbar />
  <div class="container-fluid home flex-grow-1 pt-5">
    <div class="about text-center">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded" :src="account.picture" alt="" />
      <p>{{ account.email }}</p>
      <Sidebar />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import Sidebar from '../components/Sidebar.vue'
export default {
  components: { Sidebar },
  name: 'Account',
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
.home{
  font-family: 'Secular One', sans-serif;
  text-align: center;
  user-select: none;
  background-color: #313131;
  background-image: url("https://www.transparenttextures.com/patterns/crissxcross.png");
  color: white;
}
</style>
