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

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
