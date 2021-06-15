<template>
  <div role="button" @click="routeToBoard(b.id)" v-for="b in boards" :key="b.id" class="col-lg-2 words py-5 px-2 m-3 mx-1 text-center">
    <h3 class="text-break">
      {{ b.title }}
    </h3>
    <div class="delete-icon">
      <h3 @click.stop="deleteBoard(b.id)" class="mdi mdi-trash-can"></h3>
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { boardsService } from '../services/BoardsService'
import Notification from '../utils/Notification'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const route = useRouter()
    watchEffect(async() => {
      try {
        await boardsService.getAccountBoards(AppState.account.id)
      } catch (error) {
        Notification.toast(error, 'error')
      }
    })
    return {
      boards: computed(() => AppState.boards),
      async deleteBoard(bid) {
        try {
          if (await Notification.confirmAction()) {
            await boardsService.deleteBoard(bid)
          }
        } catch (error) {
          Notification.toast(error, 'error')
        }
      },
      routeToBoard(bid) {
        route.push({ path: 'board/' + bid })
      }
    }
  }
}
</script>

<style>
.words{
    background-color: #C6D7F5;
    border-radius: 10px;
    box-shadow: 1px 1px 10px #000000 inset;
    height: 17vh;
}
.delete-icon{
  position: absolute;
  right: 5px;
  bottom: 0;
}
</style>
