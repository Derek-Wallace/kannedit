import mongoose from 'mongoose'
import { Value as ValueSchema } from '../models/Value'
import { AccountSchema } from '../models/Account'
import { BoardSchema } from '../models/Board'
import { ListSchema } from '../models/List'
import { TaskSchema } from '../models/Task'

class DbContext {
  Board = mongoose.model('Board', BoardSchema);
  List = mongoose.model('List', ListSchema);
  Tasks = mongoose.model('Task', TaskSchema);
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
}

export const dbContext = new DbContext()
