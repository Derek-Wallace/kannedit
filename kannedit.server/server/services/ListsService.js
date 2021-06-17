import { dbContext } from '../db/DbContext'
import { socketProvider } from '../SocketProvider'

class ListsService {
  async getListsFromBoardId(bid) {
    const lists = await dbContext.List.find({ boardId: bid })
    return lists
  }

  async createList(body) {
    const list = await dbContext.List.create(body)
    socketProvider.io.emit('createList', list)
    return list
  }

  async deleteList(id) {
    const list = await dbContext.List.findByIdAndRemove(id)
    socketProvider.io.emit('deleteList', list)
    return list
  }
}

export const listsService = new ListsService()
