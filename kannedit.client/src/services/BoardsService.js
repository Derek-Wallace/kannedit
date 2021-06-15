const { AppState } = require('../AppState')
const { api } = require('./AxiosService')

class BoardsService {
  async getAccountBoards(id) {
    const res = await api.get('api/boards/' + id)
    AppState.boards = res.data
  }

  async createBoard(boardData) {
    const res = await api.post('api/boards', boardData)
    AppState.boards = [...AppState.boards, res.data]
  }

  async deleteBoard(bid) {
    await api.delete('api/boards/' + bid)
    AppState.boards = AppState.boards.filter(b => b.id !== bid)
  }
}

export const boardsService = new BoardsService()
