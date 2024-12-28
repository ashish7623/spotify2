import { Router } from "express";
import { getAllUsers } from "../controller/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
// import { getAdmin } from "../controller/admin.controller.js";

const router = Router()

router.get("/", protectRoute, getAllUsers);
// router.get("/messages/:userId", protectRoute, getMessages);


export default router 