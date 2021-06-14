import { dbContext } from '../db/DbContext'

class BoardsService {
  async getBoardsFromUserId(id) {
    const boards = await dbContext.Board.find({ creatorId: id })
    return boards
  }

  async createBoard(body) {
    const board = await dbContext.Board.create(body)
    return board
  }

  async deleteBoard(id) {
    await dbContext.Board.findByIdAndRemove(id)
    return 'deleted ya bored'
  }
}

export const boardsService = new BoardsService()
