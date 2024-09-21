import { NextFunction, Request, Response } from "express";
import { Push_Token } from "../../models/push_token";
import { sendPushNotification } from "../../utils/sendPushNotification";
import { CustomError } from "../../middlewares/error";

export const sendCustomNotification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { message, userId } = req.body;

    // If userId is provided, send to that specific user
    if (userId) {
      const tokenData = await Push_Token.findOne({ user: userId });

      if (!tokenData) {
        return res.status(404).json({ success: false, message: "Push token not found for the specified user" });
      }

      await sendPushNotification(tokenData.push_token, message);

      return res.status(200).json({
        success: true,
        message: "Custom notification sent to the user successfully",
      });
    }

    // If no userId is provided, send to all users
    const tokens = await Push_Token.find();

    if (tokens.length === 0) {
      return res.status(404).json({ success: false, message: "No push tokens found" });
    }

    for (const tokenData of tokens) {
      await sendPushNotification(tokenData.push_token, message);
    }

    res.status(200).json({
      success: true,
      message: "Custom notification sent to all users successfully",
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};
