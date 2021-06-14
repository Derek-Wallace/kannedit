<template>
  <div class="sidebar-div p-5">
    <h1>Profile Pic</h1>
    <router-link :to="{ name: 'Home' }" class="nav-link">
      Home
    </router-link>
    <router-link :to="{ name: 'About' }" class="nav-link">
      About
    </router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.sidebar-div {
  background: blue;
}

</style>
