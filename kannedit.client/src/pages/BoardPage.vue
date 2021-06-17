<template>
  <Navbar />
  <div class="container-fluid d-flex flex-grow-1 home">
    <Sidebar />
    <!-- <div v-if="account.id" v-masonry="containerId" class="row d-flex align-content-start board-content flex-grow-1 flex-wrap"> -->
    <div
      v-if="account.id"
      v-masonry="containerList"
      class="row board-content flex-grow-1"
      id="containerList"
      item-selector=".item"
    >
      <Lists
        v-masonry-tile
        v-for="list in lists"
        :key="list.id"
        :list="list"
        class="item"
      />
      <div v-masonry-tile class="col-xl-1 item">
        <h1
          data-toggle="modal"
          data-target="#list-form"
          class="mx-1 my-1 blue mdi mdi-view-grid-plus shadow"
          role="button"
          title="Add List"
        ></h1>
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
import Notification from '../utils/Notification'
import { globals } from '../main'

export default {
  setup(props, x) {
    const route = useRoute()

    watchEffect(async() => {
      try {
        if (route.params.id) {
          await listsService.getListsByBoard(route.params.id)
          await tasksService.getTasksByBoard(route.params.id)
          await commentService.getComments(route.params.id)
          globals.$redrawVueMasonry()
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

<style lang="scss">
.home {
  font-family: "Secular One", sans-serif;
  text-align: center;
  user-select: none;
  background-color: #313131;
  background-image: url("https://www.transparenttextures.com/patterns/crissxcross.png");
}
.blue {
  color: #c6d7f5;
  -webkit-text-stroke: 2px rgb(0, 0, 0);
  background-color: rgba(255, 255, 255, 0.253);
  border-radius: 5px;
}
.board-content {
  margin-left: 250px;
  margin-top: 20px;
}

@media only screen and (max-width: 1000px) {
  .board-content {
    margin-left: 0px;
  }
}

.masonry-with-flex {
  @for $i from 1 through 36 {
    div:nth-child(#{$i}) {
      $h: (random(400) + 100) + px;
      height: $h;
      line-height: $h;
    }
  }
}
</style>
