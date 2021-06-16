<template>
  <div v-if="comment.taskId === task.id" class="d-flex justify-content-between">
    <p>{{ comment.body }}</p>
    <i role="button" @click="deleteComment(comment.id)" class="mdi mdi-trash-can-outline"></i>
  </div>
</template>

<script>
import { commentService } from '../services/CommentService'
import Notification from '../utils/Notification'
export default {
  props: { comment: { type: Object, required: true }, task: { type: Object, required: true } },
  setup() {
    return {
      async deleteComment(cid) {
        try {
          if (await Notification.confirmAction()) {
            await commentService.deleteComment(cid)
          }
        } catch (error) {
          Notification.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style>

</style>
