const uuid = require('uuid');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: 'TITLE'
    },
    order: {
      type: Number,
      default: 0
    },
    description: {
      type: String,
      default: 'Description'
    },
    userId: {
      type: String,
      default: null
    },
    boardId: {
      type: String,
      default: null
    },
    columnId: {
      type: String,
      default: null
    },
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

taskSchema.statics.toResponse = task => {
  const {
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
    _id: id
  } = task;
  return { title, order, description, userId, boardId, columnId, id };
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
