import { Request, Response } from "express";
import Menu from "../models/menuModel";
import Order, { IOrder } from "../models/orderModel";

export const addmenu = async (req: Request, res: Response): Promise<void> => {
  console.log("data==>", req.body);
  try {
    const newMenu = await Menu.create({ items: req.body.items });
    res.status(201).json({ status: "success", data: newMenu });
  } catch (err:any) {
    console.log(err);
    res.status(400).json({ status: "fail", message: err.message });
  }
};

export const updatemenu = async (req: Request, res: any): Promise<void> => {
  try {
    const updatedMenu = await Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedMenu) {
      return res
        .status(404)
        .json({ status: "fail", message: "Menu item not found" });
    }
    res.status(200).json({ status: "success", data: updatedMenu });
  } catch (err:any) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

export const getmenu = async (req: Request, res: Response): Promise<void> => {
  try {
    const itemName = req.query.itemname as string;
    const menu = await Menu.find({ "items.itemname": itemName });
    res.status(200).json({ status: "success", data: menu });
  } catch (err:any) {
    res.status(404).json({ status: "fail", message: err.message });
  }
};

export const order = async (req: Request, res: Response): Promise<void> => {
  try {
    const order:IOrder = await Order.create({
      tableno: req.body.tableno,
      userId: req.body.userId,
      items: req.body.items,
      orderedat: req.body.orderedate
    });
    res.status(200).json({ status: "success", data: order });
  } catch (err:any) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

export const orderstatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const tableno = req.query.tableno as string;
    const getorder = await Order.find({ tableno });
    res.status(200).json({ status: "success", data: getorder });
  } catch (err:any) {
    res.status(404).json({ status: "fail", message: err.message });
  }
};

export const updateOrderStatus = async (req: any,res: any): Promise<void> => {
  try {
    const order = await Order.findOne({ tableno: req.params.tableno });
    if (!order) {
      return res
        .status(404)
        .json({ status: "fail", message: "Order not found" });
    }
    order.status = "completed";
    await order.save();
    order.items = new String('');
    await order.save();

    res
      .status(200)
      .json({ status: "success", message: "cooking completed" });
  } catch (err:any) {
    res.status(404).json({ status: "fail", message: err.message });
  }
};
