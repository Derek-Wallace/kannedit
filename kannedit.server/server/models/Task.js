import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TaskSchema = new Schema(
  {
    body: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    listId: { type: Schema.Types.ObjectId, ref: 'List', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
