import { dbContext } from '../db/DbContext'
import { socketProvider } from '../SocketProvider'

class CommentService {
  async getCommentsByTask(bid) {
    const comments = await dbContext.Comments.find({ boardId: bid }).populate('creator', 'name picture')
    return comments
  }

  async createComment(body) {
    const comment = await dbContext.Comments.create(body)
    await comment.populate('creator', 'name picture').execPopulate()
    socketProvider.io.emit('createComment', comment)
    return comment
  }

  async updateComment(id, body) {
    const comment = await dbContext.Comments.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    return comment
  }

  async deleteComment(id) {
    const comment = await dbContext.Comments.findByIdAndRemove(id)
    socketProvider.io.emit('deleteComment', comment)
    return comment
  }
}

export const commentService = new CommentService()
