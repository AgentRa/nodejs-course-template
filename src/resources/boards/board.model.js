const uuid = require('uuid');
const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: 'TITLE'
    },
    columns: {
      type: Array,
      default: []
    },
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

boardSchema.statics.toResponse = board => {
  const { title, columns, _id: id } = board;
  return { title, columns, id };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
