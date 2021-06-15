<template>
  <div v-for="list in lists" :key="list.id" :list="list" class="col-3 p-4">
    <div class="list-card">
      <div class="list-card-header">
        <h2>{{ list.title }}</h2>
      </div>
      <div class="list-card-body text-left">
        <Tasks v-for="task in tasks" :key="task.id" :task="task" />
      </div>
      <input type="text" class="task-input border-left-0 border-right-0 border-top-0 bg-transparent" placeholder="Add Task">
      <h3 role="button" class="mdi mdi-comment-plus add-task"></h3>
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { listsService } from '../services/ListsService'
import Notification from '../utils/Notification'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    watchEffect(async() => {
      try {
        if (route.params.id) {
          await listsService.getListsByBoard(route.params.id)
        }
      } catch (error) {
        Notification.toast(error, 'error')
      }
    })
    return {
      lists: computed(() => AppState.lists),
      async deleteList(lid) {
        try {
          await listsService.deleteList(lid)
        } catch (error) {
          Notification.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style scoped>
.list-card {
  background-color: #C6D7F5;
  border-radius: 0px 0px 10px 10px;
  height: 200px;
}

.list-card-header{
  background-color: #005bb1;
  color: #C6D7F5;
  -webkit-text-stroke: 1px black;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-bottom: 30px;
}

.add-task {
  position: absolute;
  bottom: 25px;
  right: 40px;
}
.task-input{
  position: absolute;
  width: 60%;
  bottom: 15%;
  right: 25%;
}
</style>
