import { AppState } from '../AppState'
import { api } from './AxiosService'

class CommentService {
  async createComment(bid, tid, newComment) {
    const res = await api.post(`api/comments/${bid}/${tid}`, newComment)
    AppState.comments = [...AppState.comments, res.data]
  }

  async getComments(bid) {
    const res = await api.get('api/comments/' + bid)
    AppState.comments = res.data
  }

  async deleteComment(cid) {
    await api.delete('api/comments/' + cid)
    AppState.comments = AppState.comments.filter(c => c.id !== cid)
  }
}

export const commentService = new CommentService()
