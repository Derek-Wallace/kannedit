<template>
  <header>
    <Navbar />
  </header>
  <main>
    <Sidebar />
    <router-view />
  </main>
  <footer>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Sidebar from './components/Sidebar.vue'
export default {
  components: { Sidebar },
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

</style>
