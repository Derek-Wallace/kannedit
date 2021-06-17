import { AppState } from '../AppState'
import { api } from './AxiosService'

class ListsService {
  async getListsByBoard(bid) {
    const res = await api.get('api/lists/' + bid)
    AppState.lists = res.data
  }

  async createList(bid, data) {
    await api.post('api/lists/' + bid, data)
  }

  async deleteList(lid) {
    await api.delete('api/lists/' + lid)
  }
}

export const listsService = new ListsService()
