import mongoose from "mongoose";

const NotificationSchema=mongoose.Schema({
    recipientId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      senderId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      action: {
        type: String,
        required: true,
      },
      postId: {
        type:mongoose.Types.ObjectId,
        ref: 'Post',
      },
      date: {
        type: Date,
        default: Date.now,
      },
      read: {
        type: Boolean,
        default: false,
      },
})

const Notification = mongoose.model('Notification', NotificationSchema);

export default Notification;