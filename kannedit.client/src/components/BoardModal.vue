<template>
  <div class="modal fade" id="board-form" tabindex="-1" aria-labelledby="Board Form" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Create Board
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createBoard">
            <label for="Title" class="sr-only">Title</label>
            <input type="text" maxlength="40" v-model="state.boardData.title" class="w-100 border-left-0 border-right-0 border-top-0 my-3" placeholder="Board Name">
            <button type="button" class="btn btn-outline-danger mr-3" data-dismiss="modal">
              Close
            </button>
            <button type="submit" class="btn btn-success">
              Save changes
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
import { boardsService } from '../services/BoardsService'
import $ from 'jquery'
export default {
  setup() {
    const state = reactive({
      boardData: {}
    })
    return {
      state,
      async createBoard(event) {
        try {
          await boardsService.createBoard(state.boardData)
          event.target.reset()
          $('#board-form').modal('hide')
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
