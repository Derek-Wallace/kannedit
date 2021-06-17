<template>
  <div class="modal fade" id="list-form" tabindex="-1" aria-labelledby="List Form" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Create List
          </h5>
          <button type="button" class="close" title="Close Form" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createList">
            <label for="Title" class="sr-only">Title</label>
            <input type="text" maxlength="40" v-model="state.listData.title" class="w-100 border-left-0 border-right-0 border-top-0 my-3" placeholder="List Name">
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
import { listsService } from '../services/ListsService'
import $ from 'jquery'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    const state = reactive({
      listData: {}
    })
    return {
      state,
      async createList(event) {
        try {
          await listsService.createList(route.params.id, state.listData)
          event.target.reset()
          $('#list-form').modal('hide')
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
