<template>
  <div role="button" @click="routeToBoard(b.id)" v-for="b in boards" :key="b.id" class="col-lg-2 words py-5 px-2 m-3 mx-1 text-center">
    <p class="text-break icon-size">
      {{ b.title }}
    </p>
    <div v-if="b.creatorId === account.id" class="delete-icon">
      <i @click.stop="deleteBoard(b.id)" class="mdi mdi-trash-can icon-size" title="Delete Board"></i>
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
      account: computed(() => AppState.account),
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
        route.push({ path: '/board/' + bid })
      }
    }
  }
}
</script>

<style scoped>
.words{
    background-color: #C6D7F5;
    border-radius: 5px;
    border-radius: 10px;
    box-shadow: 1px 1px 10px #000000 inset;
    height: 17vh;
}
.delete-icon{
  position: absolute;
  right: 5px;
  bottom: 0;
}
.icon-size {
  font-size: 2rem;
}
</style>
