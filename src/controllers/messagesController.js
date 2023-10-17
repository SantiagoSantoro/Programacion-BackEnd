import Messages from '../dao/managers/mongodb/messages.js';


export const getAllMessages = async (req, res) => {
  try {
    const messages = await Messages.getAll();
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

    const result = await Messages.saveMessage({ user, message });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
