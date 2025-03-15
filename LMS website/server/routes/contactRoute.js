import express from "express";
import { deleteContact, getContact, submitContact } from "../controller/contactController.js";

const router = express.Router();
router.post("/", submitContact);
router.get("/", getContact);
router.delete("/deleteContact/:id",deleteContact)

export default router;
