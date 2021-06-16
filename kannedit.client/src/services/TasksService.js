import { AppState } from '../AppState'
import { api } from './AxiosService'

class TasksService {
  async addTask(bid, lid, newTask) {
    const res = await api.post(`api/tasks/${bid}/${lid}`, newTask)
    AppState.tasks.push(res.data)
  }

  async getTasksByBoard(bid) {
    const res = await api.get('api/tasks/' + bid)
    AppState.tasks = res.data
  }

  async deleteTask(tid) {
    await api.delete('api/tasks/' + tid)
    AppState.tasks = AppState.tasks.filter(t => t.id !== tid)
  }

  async moveTask(task) {
    await api.put('api/tasks/' + task.id, task)
  }
}

export const tasksService = new TasksService()
