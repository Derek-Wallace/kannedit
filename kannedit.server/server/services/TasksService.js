import { dbContext } from '../db/DbContext'

class TasksService {
  async updateTask(body) {
    const task = await dbContext.Tasks.findByIdAndUpdate(body.id, body)
    return task
  }

  async getTasksFromBoardId(bid) {
    const tasks = await dbContext.Tasks.find({ boardId: bid })
    return tasks
  }

  async createTask(body) {
    const task = await dbContext.Tasks.create(body)
    return task
  }

  async deleteTask(id) {
    await dbContext.Tasks.findByIdAndRemove(id)
    return 'deleted ya task'
  }
}

export const tasksService = new TasksService()
