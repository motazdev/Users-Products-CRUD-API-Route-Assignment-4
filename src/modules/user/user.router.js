import { Router } from "express";
import { createUser, updateUser, deleteUser, getAllUsers, startWithAandAge, ageBetween, oldThreeUsers, searchWList } from "./user.controller.js";
const router = Router();

router.post("/", createUser);

router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

router.get("/", getAllUsers);

router.get("/start-with", startWithAandAge);
router.get("/age-between", ageBetween);
router.get("/old3users", oldThreeUsers);
router.get("/search-list", searchWList);



export default router;
