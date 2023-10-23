import { Router } from "express";
import Messages from "../dao/managers/mongodb/messages.js";
import { getAllMessages, saveMessage } from "../controllers/messagesController.js";

const router = Router();
const messagesManager = new Messages();


router.get('/messages', getAllMessages);
router.post('/messages', saveMessage);



export default router;



