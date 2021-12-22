const MessageModel = require('./model');
const ChatModel = require('../Chat/model');
const Notification = require('../Notifications/model');

module.exports = {
  Create: async (req, res) => {
    try {
        const {
            text,
            user,
            chatId
        } = req.body;
        const message = await MessageModel.create({
            chatId: chatId,
            user: user._id,
            text: text
        });
        if (message) {
            await MessageModel.updateMany({
                chatId: chatId,
                user: {
                  $ne: user._id
                }
            }, {
                read: 'Yes'
            });
            await ChatModel.updateOne({ _id: req.body.chatId }, {
                $push: {
                    messages: message.id
                }
            });
            const chat = await ChatModel.findOne({_id: req.body.chatId});
            await Notification.create({
                user: req.decoded._id,
                for: chat.to._id === req.decoded._id ? chat.from._id : chat.to._id,
                text: `has sent you a message`,
                type: 'message',
                link: `/chats/${chatId}`,
                chat: chatId
            });
            return res.status(200).json({
                status: "Successful",
                message: "Successfully created a message",
                data: message
            });
        } else {
            return res.status(404).json({
                status: "Failed",
                message: "Unable to creat a message"
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: "Error",
            message: error.message
        });
    }
  },
  Read: async (req, res) => {
    try {
        const id = req.params.id;
        const message = await MessageModel.findOne({_id: id});
        if (message) {
            return res.status(200).json({
                status: "Successful",
                data: message
            });
        } else {
            return res.status(403).json({
                status: "Failed",
                message: "message not found"
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: "Error",
            message: error.message
        });
    }
  },
  Update: async (req, res) => {
    try {
        const id = req.params.id;
        const update = await MessageModel.updateOne({ _id: id }, {
            $set: req.body
        });
        if (update.ok === 1) {
            return res.status(200).json({
                status: "Successful",
                message: "Successfully updated this message"
            });
        } else {
            return res.status(404).json({
                status: "Failed",
                message: "Unable to update this message"
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: "Error",
            message: error.message
        });
    }
  },
  Delete: async (req, res) => {
    try {
        const id = req.params.id;
        const message = await MessageModel.findOne({_id: id});
        const remove = await MessageModel.remove({ _id: id }, {
            $set: req.body
        });
        if (remove.ok === 1) {
            await ChatModel.updateOne({ _id: message.chatId }, {
                $pull: {
                    messages: id
                }
            });
            return res.status(200).json({
                status: "Successful",
                message: "Successfully deleted this message"
            });
        } else {
            return res.status(404).json({
                status: "Failed",
                message: "Unable to deleted this message"
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: "Error",
            message: error.message
        });
    }
  },
  List: async (req, res) => {
    try {
        const messages = await MessageModel.find({});
        if (messages) {
            return res.status(200).json({
                status: "Successful",
                data: messages
            });
        } else {
            return res.status(404).json({
                status: "Failed",
                message: "Unable to fetch messages"
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: "Error",
            message: error.message
        });
    }
  },
  readMessages: async (req, res) => {
    try {
        const chat = req.params.id;
        const user = req.decoded._id;
        await MessageModel.updateMany({
          chatId: chat,
          user: user
        }, {
            read: 'Yes'
        });
        return res.status(200).json({
            data: 'Silky',
            message: 'Message sent'
        });
    } catch (error) {
        return res.status(500).json({
            status: 'Successful',
            message: error.message
        });
    }
  }
}