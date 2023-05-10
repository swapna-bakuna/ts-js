import mongoose, { Schema } from 'mongoose';
export interface IMenu{
  items: string;
  }
const menuSchema: Schema = new Schema({
  items: [
    {
      itemname: {
        type: String,
        required: true,
        unique: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
});

export default mongoose.model<IMenu>('Menu', menuSchema);