import { api } from './AxiosService'

class CommentService {
  async createComment(bid, tid, newComment) {
    await api.post(`api/comments/${bid}/${tid}`, newComment)
  }

  async getComments(bid) {
    await api.get('api/comments/' + bid)
  }

  async deleteComment(cid) {
    await api.delete('api/comments/' + cid)
  }
}

export const commentService = new CommentService()
