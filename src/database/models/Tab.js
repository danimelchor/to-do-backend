const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const tabSchema = Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    tasks: { type: [taskSchema], required: false },
  },
  { timestamps: true }
);

const Tab = mongoose.model("Tab", tabSchema);

module.exports = Tab;
