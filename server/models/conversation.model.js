// import mongoose from "mongoose";

// const conversationSchema = new mongoose.Schema({
//     participants: [
//         {
//             senderId: {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: 'User',
//                 required: true,
//             },
//             receiverId: {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: 'User',
//                 required: true,
//             },
//         },
//     ],
//     messages: [
//         {
//             senderId: {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: 'Message',
//                 required: true,
//             },
//             receiverId: {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: 'Message',
//                 required: true,
//             },
//         }
//     ]
// }, {timestamps: true});
// const Conversation = mongoose.model('Conversation', conversationSchema);
// export default Conversation

import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", conversationSchema);