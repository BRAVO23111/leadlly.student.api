import express from "express";
import { checkAuth } from "../middlewares/checkAuth";
import {
  buySubscription,
  cancelSubscription,
  getFreeTrialActive,
  verifySubscription,
} from "../controllers/Subscription";
import { getPricing } from "../controllers/Subscription/pricing";
import { checkCoupon, getCoupon } from "../controllers/Subscription/coupon";

const router = express.Router();

//create subscription
router.post("/create", checkAuth, buySubscription);

//verify subscription
router.post("/verify", checkAuth, verifySubscription);

//cancel subscripiton
router.post("/cancel", checkAuth, cancelSubscription);

router.get("/freetrial", checkAuth, getFreeTrialActive);

router.get("/pricing/get", checkAuth, getPricing);

router.get("/coupons/get", checkAuth, getCoupon);

router.get("/coupons/check", checkAuth, checkCoupon);

export default router;
