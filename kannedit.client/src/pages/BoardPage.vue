<template>
  <div class="container-fluid d-flex flex-grow-1 home">
    <Sidebar />
    <div v-if="account.id" class="row d-flex align-content-start board-content flex-grow-1 flex-wrap">
      <Lists v-for="list in lists" :key="list.id" :list="list" />
      <div class="col-lg-1 my-auto">
        <h1 data-toggle="modal" data-target="#list-form" class="mx-1 my-1 blue mdi mdi-view-grid-plus shadow" role="button" title="Add List"></h1>
      </div>
    </div>
    <ListModal />
  </div>
</template>

<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { listsService } from '../services/ListsService'
import { tasksService } from '../services/TasksService'
import { commentService } from '../services/CommentService'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    watchEffect(async() => {
      try {
        if (route.params.id) {
          await listsService.getListsByBoard(route.params.id)
          await tasksService.getTasksByBoard(route.params.id)
          await commentService.getComments(route.params.id)
        }
      } catch (error) {
        Notification.toast(error, 'error')
      }
    })
    return {
      activeBoard: computed(() => AppState.activeBoard),
      account: computed(() => AppState.account),
      lists: computed(() => AppState.lists)
    }
  }
}
</script>

<style>
.home{
  font-family: 'Secular One', sans-serif;
  text-align: center;
  user-select: none;
  background-color: #313131;
  background-image: url("https://www.transparenttextures.com/patterns/crissxcross.png");
}
.blue{
    color: #C6D7F5;
    -webkit-text-stroke: 2px rgb(0, 0, 0);
    background-color: rgba(255, 255, 255, 0.253);
    border-radius: 5px;
}
.board-content{
  margin-left: 15vw;
  margin-top: 20px;
}
</style>
