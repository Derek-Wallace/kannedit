<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
    <Sidebar />
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
</style>
