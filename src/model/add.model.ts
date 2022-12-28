import { Schema, model } from 'mongoose';

const addSchema = new Schema(
  {
    num1: {
      required: true,
      type: Number,
    },

    num2: {
      required: true,
      type: Number,
    },

    sum: {
      required: true,
      type: Number,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export default model('Add', addSchema);
