<template>
  <div v-if="comment.taskId === task.id" class="d-flex justify-content-between">
    <p> <img :src="comment.creator.picture" class="rounded-circle pr-1" height="50">{{ comment.body }}</p>
    <i role="button" v-if="comment.creatorId === account.id" @click="deleteComment(comment.id)" title="Delete Comment" class="mdi mdi-trash-can-outline"></i>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { commentService } from '../services/CommentService'
import Notification from '../utils/Notification'
import { AppState } from '../AppState'
export default {
  props: { comment: { type: Object, required: true }, task: { type: Object, required: true } },
  setup() {
    return {
      account: computed(() => AppState.account),
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
