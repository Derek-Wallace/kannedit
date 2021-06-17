<template>
  <div class="col-xl-3 p-4">
    <div
      class="list-card"
      @drop="drop($event, list.id)"
      @dragover.prevent
      @dragenter.prevent
    >
      <div class="list-card-header d-flex justify-content-end">
        <h2 class="m-auto">
          {{ list.title }}
        </h2>
        <h3
          role="button"
          title="Delete List"
          class="mdi mdi-trash-can"
          @click="deleteList(list.id)"
        ></h3>
      </div>
      <div class="list-card-body text-left">
        <div>
          <Tasks
            v-for="task in tasks"
            :key="task.id"
            :task="task"
            :list="list"
          />
        </div>
      </div>
      <form @submit.prevent="addTask(event, list.id)">
        <input
          type="text"
          v-model="state.newTask.body"
          class="
            task-input
            border-left-0 border-right-0 border-top-0
            bg-transparent
          "
          placeholder="Add Task"
        />
        <button type="submit" class="form-btn" title="Add a Task">
          <h4 class="mdi mdi-comment-plus add-task"></h4>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from '@vue/runtime-core'
import { listsService } from '../services/ListsService'
import { tasksService } from '../services/TasksService'
import Notification from '../utils/Notification'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { globals } from '../main'

export default {
  props: { list: { type: Object, required: true } },
  setup() {
    const state = reactive({
      newTask: {}
    })
    const route = useRoute()
    return {
      state,
      tasks: computed(() => AppState.tasks),
      async drop(event, listId) {
        const taskId = event.dataTransfer.getData('taskId')
        // eslint-disable-next-line eqeqeq
        const task = AppState.tasks.find(t => t.id == taskId)
        task.listId = listId
        await tasksService.moveTask(task)
      },
      async addTask(event, lid) {
        try {
          await tasksService.addTask(route.params.id, lid, state.newTask)
          state.newTask = {}
          globals.$redrawVueMasonry()
        } catch (error) {
          Notification.toast(error, 'error')
        }
      },
      async deleteList(lid) {
        try {
          if (await Notification.confirmAction()) {
            await listsService.deleteList(lid)
          }
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
  background-color: #c6d7f5;
  border-radius: 0px 0px 10px 10px;
  padding-bottom: 10px;
  width: 300px;
}

.list-card-header {
  background-color: #005bb1;
  color: #c6d7f5;
  -webkit-text-stroke: 1px black;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-bottom: 30px;
}
.form-btn {
  background: none;
  border: none;
}
</style>
