import { Auth0Provider } from '@bcwdev/auth0provider'
import { tasksService } from '../services/TasksService'
import BaseController from '../utils/BaseController'

export class TaskController extends BaseController {
  constructor() {
    super('api/tasks')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:lid', this.getTasksFromListId)
      .post('/:lid', this.createTask)
      .delete('/:id', this.deleteTask)
  }

  async getTasksFromListId(req, res, next) {
    try {
      const tasks = await tasksService.getTasksFromListId(req.params.lid)
      return res.send(tasks)
    } catch (error) {
      next(error)
    }
  }

  async createTask(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.listId = req.params.lid
      const task = await tasksService.createTask(req.body)
      return res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async deleteTask(req, res, next) {
    try {
      const task = await tasksService.deleteTask(req.params.id)
      return res.send(task)
    } catch (error) {
      next(error)
    }
  }
}
