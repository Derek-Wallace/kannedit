import { Auth0Provider } from '@bcwdev/auth0provider'
import { listsService } from '../services/ListsService'
import BaseController from '../utils/BaseController'

export class ListController extends BaseController {
  constructor() {
    super('api/lists')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:bid', this.getListsFromBoardId)
      .post('/:bid', this.createList)
      .delete('/:id', this.deleteList)
  }

  async getListsFromBoardId(req, res, next) {
    try {
      const lists = await listsService.getListsFromBoardId(req.params.bid)
      return res.send(lists)
    } catch (error) {
      next(error)
    }
  }

  async createList(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.boardId = req.params.bid
      const list = await listsService.createList(req.body)
      return res.send(list)
    } catch (error) {
      next(error)
    }
  }

  async deleteList(req, res, next) {
    try {
      const list = await listsService.deleteList(req.params.id)
      return res.send(list)
    } catch (error) {
      next(error)
    }
  }
}
