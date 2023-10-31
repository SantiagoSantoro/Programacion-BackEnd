import { Router } from "express";
import Messages from "../dao/managers/mongodb/messages.js";
import { getAllMessages, saveMessage } from "../controllers/messagesController.js";
import { isUser } from '../middleware/authorization.js'

const router = Router();
const messagesManager = new Messages();


router.get('/messages', getAllMessages);
router.post('/messages', isUser, saveMessage);



export default router;



