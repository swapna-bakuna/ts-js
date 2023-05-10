
import mongoose, { Schema } from "mongoose";

export interface IOrder{
itemname: string;
price: number;
quantity: number;
tableno: number;
userId: mongoose.Types.ObjectId;
items: String;
orderedat: Date;
status: "cooking" | "completed";
bill?: "paid" | "unpaid";
}

const orderSchema: Schema = new mongoose.Schema(
{
tableno: {
type: Number,
},
userId: {
type: mongoose.Types.ObjectId,
required: true,
ref: "User",
},
items: [
{
itemname: {
type: String,
required: true,
},
price: {
type: Number,
required: true,
},
quantity: {
type: Number,
required: true,
min: 1,
max: 10,
},
},
],
orderedat: { type: Date, default: Date.now },
status: {
type: String,
enum: ["cooking", "completed"],
default: "cooking",
},
bill: {
type: String,
enum: ["paid", "unpaid"],
},
},
{ timestamps: true }
);
export default mongoose.model<IOrder>('Order', orderSchema);
