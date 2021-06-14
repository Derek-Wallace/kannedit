import { Auth0Provider } from '@bcwdev/auth0provider'
import { boardsService } from '../services/BoardsService'
import BaseController from '../utils/BaseController'

export class BoardController extends BaseController {
  constructor() {
    super('api/boards')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id', this.getBoardsFromUserId)
      .post('', this.createBoard)
      .delete('/:id', this.deleteBoard)
  }

  async getBoardsFromUserId(req, res, next) {
    try {
      const boards = await boardsService.getBoardsFromUserId(req.params.id)
      return res.send(boards)
    } catch (error) {
      next(error)
    }
  }

  async createBoard(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const board = await boardsService.createBoard(req.body)
      return res.send(board)
    } catch (error) {
      next(error)
    }
  }

  async deleteBoard(req, res, next) {
    try {
      const board = await boardsService.deleteBoard(req.params.id)
      return res.send(board)
    } catch (error) {
      next(error)
    }
  }
}
