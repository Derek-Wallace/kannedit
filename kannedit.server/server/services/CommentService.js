import { dbContext } from '../db/DbContext'

class CommentService {
  async getCommentsByTask(bid) {
    const comments = await dbContext.Comments.find({ boardId: bid }).populate('creator', 'name picture')
    return comments
  }

  async createComment(body) {
    const comment = await dbContext.Comments.create(body)
    await comment.populate('creator', 'name picture').execPopulate()
    return comment
  }

  async updateComment(id, body) {
    const comment = await dbContext.Comments.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    return comment
  }

  async deleteComment(id) {
    await dbContext.Comments.findByIdAndRemove(id)
  }
}

export const commentService = new CommentService()
