import { dbContext } from '../db/DbContext'

class TasksService {
  async getTasksFromListId(lid) {
    const tasks = await dbContext.Tasks.find({ listId: lid })
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
