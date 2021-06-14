import { dbContext } from '../db/DbContext'

class ListsService {
  async getListsFromBoardId(bid) {
    const lists = await dbContext.List.find({ boardId: bid })
    return lists
  }

  async createList(body) {
    const list = await dbContext.List.create(body)
    return list
  }

  async deleteList(id) {
    await dbContext.List.findByIdAndRemove(id)
    return 'deleted ya list'
  }
}

export const listsService = new ListsService()
