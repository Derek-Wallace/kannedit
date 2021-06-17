<template>
  <div v-if="task.listId === list.id">
    <div data-toggle="modal" :data-target="'#m'+task.id" class="task-div shadow d-flex justify-content-between pr-2" :draggable="true" @dragstart="drag($event, task)">
      <p class="text-break">
        {{ task.body }}
      </p>
      <i v-if="task.creatorId === account.id" role="button" @click.stop="deleteTask(task.id)" class="mdi mdi-trash-can" title="Delete Task"></i>
    </div>
    <TaskModal :task="task" />
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { tasksService } from '../services/TasksService'
export default {
  props: {
    task: { type: Object, required: true },
    list: { type: Object, required: true }
  },
  setup() {
    return {
      tasks: computed(() => AppState.tasks),
      lists: computed(() => AppState.lists),
      account: computed(() => AppState.account),
      drag(event, task) {
        event.dataTransfer.drogEffect = 'move'
        event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.setData('taskId', task.id)
      },
      async deleteTask(tid) {
        try {
          if (await Notification.confirmAction()) {
            await tasksService.deleteTask(tid)
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
.task-div {
  background-color: rgba(240, 255, 255, 0.521);
  cursor: grab;
  margin: 5px 10px;
  padding: 7px 0;
  border-radius: 2px;
  padding-left: 30px;
}
.task-div:active {
  cursor: grabbing;
}
</style>
