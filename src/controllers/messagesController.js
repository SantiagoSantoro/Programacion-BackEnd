import Messages from '../dao/managers/messages.js';

const messagesManager = new Messages();

export const getAllMessages = async (req, res) => {
  try {
    const messages = await messagesManager.getAll();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const saveMessage = async (req, res) => {
  try {
    const { user, message } = req.body;
    if (!user || !message) {
      return res.status(400).json({ error: 'Usuario y mensaje requeridos.' });
    }

    const result = await messagesManager.saveMessage({ user, message });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
