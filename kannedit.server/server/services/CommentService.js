import { dbContext } from '../db/DbContext'

class CommentService {
  async getCommentsByTask(bid) {
    const comments = await dbContext.Comments.find({ boardId: bid })
    return comments
  }

  async createComment(body) {
    const comment = await dbContext.Comments.create(body)
    return comment
  }

  async updateComment(id, body) {
    const comment = await dbContext.Comments.findByIdAndUpdate(id, body)
    return comment
  }

  async deleteComment(id) {
    await dbContext.Comments.findByIdAndRemove(id)
  }
}

export const commentService = new CommentService()
