const Notification = require('./model');
const Users = require('../Users/model');

module.exports = {
  List: async ( req, res ) => {
    try {
        let notifications = []
        const userId = req.decoded._id;
        const user = await Users.findOne({_id: userId}, {password: 0});
        if (user.role.name.toLowerCase().includes('admin') || user.role.name.toLowerCase().includes('moderator')) {
            notifications = await Notification.find({
                createdAt: {
                    $gt: user.createdAt
                }
            });
        }
        else {
            notifications = await Notification.find({
                $or: [
                    {
                        for: userId
                    },
                    {
                        user: userId
                    }
                ],
                createdAt: {
                    $gt: user.createdAt
                }
            });
        }
        return res.status(200).json({
            status: "Successful",
            data: notifications
        });
    } catch (error) {
        return res.status(500).json({
            status: "Error",
            message: error.message
        });
    }
  }
}