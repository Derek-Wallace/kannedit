import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentService } from '../services/CommentService'
import BaseController from '../utils/BaseController'

export class CommentController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:bid', this.getCommentsByTask)
      .post('/:bid/:tid', this.createComment)
      .put('/:id', this.updateComment)
      .delete('/:id', this.deleteComment)
  }

  async deleteComment(req, res, next) {
    try {
      await commentService.deleteComment(req.params.id)
      return res.send('deleted')
    } catch (error) {
      next(error)
    }
  }

  async updateComment(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const comment = await commentService.updateComment(req.params.id, req.body)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async createComment(req, res, next) {
    try {
      req.body.boardId = req.params.bid
      req.body.taskId = req.params.tid
      req.body.creatorId = req.userInfo.id
      const comment = await commentService.createComment(req.body)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async getCommentsByTask(req, res, next) {
    try {
      const comments = await commentService.getCommentsByTask(req.params.bid)
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }
}
