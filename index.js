const  express=require("express");
const app=express();
const mongoose = require('mongoose');
const path =require("path");
const Chat=require("./models/chat.js");
const methodOverride=require("method-override");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded ( { extended:true }));
app.use(methodOverride("_method"));

app.get("/",(req,res)=>{
    res.send("root is working");
});



app.listen(8080,()=>{
    console.log("Server is listening port 8080");
});

main().then(() =>{
    console.log("Connection sucessful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
// let chat1=new Chat({
//     form:"Neha",
//     to:"priya",
//     msg:"HY send me photo",
//     created_at:new Date()
// });

// chat1.save().then((res)=>{
//     console.log(res);
// });

// Index Route
app.get("/chats",async(req,res)=>{
    let chats=await Chat.find();
    // console.log(chats);
    // res.send("Working")
    res.render("index.ejs",{ chats });
});
// New chats
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});
// Create rout or call back
app.post("/chats",(req,res)=>{
    let {form,to,msg}=req.body;
    let newChat= new Chat({
        form : form,
        to : to,
        msg : msg ,
        created_at : new Date(),
    });

    // Console.log(newChat);

    // to save our new chat
    newChat.save()
    .then((res)=>{
        console.log("Chat was saved ..");
    })
    .catch((err)=>{
        console.log(err);
    });
     res.redirect("/chats");

     //  res.send("Working")
    });
app.get("/chats/:id/edit",async(req,res)=>{
    let { id } =req.params;
    let chat =await Chat.findById(id);
    res.render("edit.ejs", { chat });
});

// update rout
 
app.put("/chats/:id",async (req,res)=>{
    let { id } =req.params;
    let { msg : newMsg }=req.body;
    console.log(newMsg);
    let updatedChat= await Chat.findByIdAndUpdate(
        id,
        { msg : newMsg},
        { runValidators : true ,new :true}
    );
    console.log(updatedChat);
    res.redirect("/chats");
});

//Destroy rout

app.delete("/chats/:id",async (req,res)=>{
    let { id } = req.params;
    let deletedChat=await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});