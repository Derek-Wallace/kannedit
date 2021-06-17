import { AppState } from '../AppState'
import { api } from './AxiosService'

class CommentService {
  async createComment(bid, tid, newComment) {
    await api.post(`api/comments/${bid}/${tid}`, newComment)
  }

  async getComments(bid) {
    const res = await api.get('api/comments/' + bid)
    AppState.comments = res.data
  }

  async deleteComment(cid) {
    await api.delete('api/comments/' + cid)
  }
}

export const commentService = new CommentService()
