import { AppState } from '../AppState'
import { api } from './AxiosService'

class ListsService {
  async getListsByBoard(bid) {
    const res = await api.get('api/lists/' + bid)
    AppState.lists = res.data
  }

  async createList(bid, data) {
    const res = await api.post('api/lists/' + bid, data)
    AppState.lists = [...AppState.lists, res.data]
  }

  async deleteList(lid) {
    await api.delete('api/lists/' + lid)
    AppState.lists = AppState.lists.filter(l => l.id !== lid)
  }
}

export const listsService = new ListsService()
