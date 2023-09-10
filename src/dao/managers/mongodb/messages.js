import { messagesModel } from '../../models/messages.js';


export default class MessagesManager {
  constructor() {}

  async getAllMessages() {
    try {
      const messages = await messagesModel.find();
      return messages.map(message => message.toObject());
    } catch (error) {
      throw error;
    }
  }

  async saveMessage(user, message) {
    try {
      const newMessage = new Message({
        user,
        message,
      });
      const savedMessage = await newMessage.save();
      return savedMessage.toObject();
    } catch (error) {
      throw error;
    }
  }
}
