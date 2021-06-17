import { dbContext } from '../db/DbContext'
import { socketProvider } from '../SocketProvider'

class TasksService {
  async updateTask(body) {
    const task = await dbContext.Tasks.findByIdAndUpdate(body.id, body, { new: true, runValidators: true })
    socketProvider.io.emit('move', task)
    return task
  }

  async getTasksFromBoardId(bid) {
    const tasks = await dbContext.Tasks.find({ boardId: bid })
    return tasks
  }

  async createTask(body) {
    const task = await dbContext.Tasks.create(body)
    socketProvider.io.emit('createTask', task)
    return task
  }

  async deleteTask(id) {
    const task = await dbContext.Tasks.findByIdAndRemove(id)
    socketProvider.io.emit('delete', task)
    return task
  }
}

export const tasksService = new TasksService()
