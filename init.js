const mongoose = require("mongoose");
const Chat=require("./models/chat.js");

main()
   .then(() =>{
         console.log("Connection sucessful");
})
     .catch(err =>
         console.log(err));


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
// let allChats=[
//     {
//         form:"rohit",
//         to:"preti",
//         msg:"hello",
//         created_at:new Date(),
//     },
//     {
//         form:"preti",
//         to:"rohit",
//         msg:"hii",
//         created_at:new Date(),
//     },
//     {
//         form:"rohit",
//         to:"preti",
//         msg:"how are you",
//         created_at:new Date(),
//     },
//     {
//         form:"preti",
//         to:"rohit",
//         msg:"I am fine .",
//         created_at:new Date(),
//     },

// ];

// Chat.insertMany(allChats);
