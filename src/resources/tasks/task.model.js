const uuid = require('uuid');
const mongoose = require('mongoose');

// class Task {
//   constructor({
//     id = uuid(),
//     title = 'TITLE',
//     order = 0,
//     description = 'DESCRIPTION',
//     userId = null,
//     boardId = null,
//     columnId = null
//   } = {}) {
//     this.id = id;
//     this.title = title;
//     this.order = order;
//     this.description = description;
//     this.userId = userId;
//     this.boardId = boardId;
//     this.columnId = columnId;
//   }
// }

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

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
