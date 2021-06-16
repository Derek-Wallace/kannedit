<template>
  <div class="modal fade" :id="'m'+task.id" tabindex="-1" aria-labelledby="Task Details" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title text-break" id="exampleModalLabel">
            {{ task.body }}
          </h3>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>
            Description here
          </p>
        </div>
        <div class="modal-body border-top">
          <h4 class="border-bottom pb-1">
            Comments:
          </h4>
          <Comments v-for="comment in comments" :key="comment.id" :comment="comment" :task="task" />
          <form @submit.prevent="createComment(task.id)">
            <label for="comment" class="sr-only">Comment</label>
            <input type="text" v-model="state.newComment.body" class="border-top-0 border-left-0 border-right-0 bg-transparent w-75 mt-3" placeholder="Comment">
            <button type="submit" class="form-btn">
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
export default {
  props: { task: { type: Object, required: true } },
  setup() {
    const route = useRoute()
    const state = reactive({
      newComment: {}
    })
    return {
      state,
      comments: computed(() => AppState.comments),
      async createComment(tid) {
        try {
          await commentService.createComment(route.params.id, tid, state.newComment)
          state.newComment = {}
        } catch (error) {
          Notification.toast(error, 'error')
        }
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
