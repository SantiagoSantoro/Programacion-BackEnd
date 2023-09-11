import { messagesModel } from '../../models/messages.js';


export default class MessagesManager {
  constructor() {

  }
  getAll = async () => {
    const messages = await messagesModel.find();
    return messages.map(message => message.toObject());
  }

 
  saveMessage = async ({ user, message }) => {
    try {
      const result = await messagesModel.create({ user, message });
      return result;
    } catch (error) {
      throw error;
    }
  }
}
