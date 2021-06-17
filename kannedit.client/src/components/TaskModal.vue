<template>
  <div class="modal fade" :id="'m'+task.id" tabindex="-1" aria-labelledby="Task Details" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title text-break" id="exampleModalLabel" v-if="state.taskUpdateForm === false">
            {{ task.body }}
          </h3>
          <input type="text" class="border-right-0 border-left-0 border-top-0 bg-transparent" v-model="state.taskUpdate.body" v-if="state.taskUpdateForm === true">
          <button type="button"
                  class="close"
                  title="Close Task"
                  data-dismiss="modal"
                  aria-label="Close"
                  @click="hideForm"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body d-flex justify-content-between" v-if="state.taskUpdateForm === false">
          <p v-if="task.description">
            {{ task.description }}
          </p>
          <i role="button" v-if="task.creatorId === account.id" @click="showForm" title="Edit Description" class="mdi mdi-pencil-plus-outline"></i>
        </div>
        <div v-if="state.taskUpdateForm === true" class="modal-body">
          <textarea name="Task Description" v-model="state.taskUpdate.description" cols="49" rows="10"></textarea>
        </div>
        <button v-if="state.taskUpdateForm === true" class="btn btn-success" @click="editTask(task.id)">
          Accept Edit
        </button>
        <div class="modal-body border-top">
          <h4 class="border-bottom pb-1">
            Comments:
          </h4>
          <Comments v-for="comment in comments" :key="comment.id" :comment="comment" :task="task" />
          <form @submit.prevent="createComment(task.id)">
            <label for="comment" class="sr-only">Comment</label>
            <input type="text" v-model="state.newComment.body" class="border-top-0 border-left-0 border-right-0 bg-transparent w-75 mt-3" placeholder="Comment">
            <button type="submit" class="form-btn" title="Add a comment">
              <h5 class="mdi mdi-message-plus"></h5>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import Notification from '../utils/Notification'
import { commentService } from '../services/CommentService'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { tasksService } from '../services/TasksService'
export default {
  props: { task: { type: Object, required: true } },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      newComment: {},
      taskUpdate: { description: props.task.description, body: props.task.body, id: props.task.id, boardId: props.task.boardId, listId: props.task.listId },
      taskUpdateForm: false
    })
    return {
      state,
      comments: computed(() => AppState.comments),
      account: computed(() => AppState.account),
      async createComment(tid) {
        try {
          await commentService.createComment(route.params.id, tid, state.newComment)
          state.newComment = {}
        } catch (error) {
          Notification.toast(error, 'error')
        }
      },
      async editTask(tid) {
        try {
          await tasksService.editTask(tid, state.taskUpdate)
          state.taskUpdate = { description: props.task.description, body: props.task.body, id: props.task.id, boardId: props.task.boardId, listId: props.task.listId }
          state.taskUpdateForm = false
        } catch (error) {
          Notification.toast(error, 'error')
        }
      },
      showForm() {
        state.taskUpdateForm = true
      },
      hideForm() {
        state.taskUpdateForm = false
      }
    }
  }
}
</script>

<style>
.form-btn{
  background: none;
  border: none;
}
</style>
