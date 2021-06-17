import { AppState } from '../AppState'
import { api } from './AxiosService'

class TasksService {
  async addTask(bid, lid, newTask) {
    await api.post(`api/tasks/${bid}/${lid}`, newTask)
  }

  async getTasksByBoard(bid) {
    const res = await api.get('api/tasks/' + bid)
    AppState.tasks = res.data
  }

  async deleteTask(tid) {
    await api.delete('api/tasks/' + tid)
  }

  async moveTask(task) {
    await api.put('api/tasks/' + task.id, task)
  }

  async editTask(tid, taskUpdate) {
    const res = await api.put('api/tasks/' + tid, taskUpdate)
    AppState.tasks = AppState.tasks.filter(t => t.id !== tid)
    AppState.tasks = [...AppState.tasks, res.data]
  }
}

export const tasksService = new TasksService()
