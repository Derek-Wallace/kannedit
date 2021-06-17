import { AppState } from '../AppState'
import { globals } from '../main'
import { SocketHandler } from '../utils/SocketHandler'
import $ from 'jquery'

class SocketService extends SocketHandler {
  constructor() {
    super()
    this
      .on('move', this.updateTask)
      .on('createTask', this.createTask)
      .on('delete', this.deleteTask)
      .on('createList', this.createList)
      .on('deleteList', this.deleteList)
      .on('createComment', this.createComment)
      .on('deleteComment', this.deleteComment)
  }

  updateTask(task) {
    const i = AppState.tasks.findIndex(t => t.id === task.id)
    AppState.tasks.splice(i, 1, task)
    $('.modal-backdrop').hide()
  }

  createTask(task) {
    AppState.tasks.push(task)
    globals.$redrawVueMasonry()
  }

  deleteTask(task) {
    AppState.tasks = AppState.tasks.filter(t => t.id !== task.id)
    globals.$redrawVueMasonry()
  }

  createList(list) {
    AppState.lists.push(list)
  }

  deleteList(list) {
    AppState.lists = AppState.lists.filter(l => l.id !== list.id)
    globals.$redrawVueMasonry()
  }

  createComment(comment) {
    AppState.comments.push(comment)
  }

  deleteComment(comment) {
    AppState.comments = AppState.comments.filter(c => c.id !== comment.id)
  }
}

export const socketService = new SocketService()
