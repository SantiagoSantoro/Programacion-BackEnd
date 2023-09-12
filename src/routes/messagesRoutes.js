import { Router } from "express";
import Messages from "../dao/managers/mongodb/messages.js";

const router = Router();
const messagesManager = new Messages();

// Ruta para guardar un nuevo mensaje
router.post('/messages', async (req, res) => {
  try {
    const { user, message } = req.body;
    const savedMessage = await messagesManager.saveMessage({ user, message }); // Corregido
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo guardar el mensaje.' });
  }
});



export default router;



