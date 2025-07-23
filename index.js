const express=require("express");
const app= express();
let port= 3000;
const path= require("path")
// requiring the mongoose 
const mongoose= require("mongoose");
// requiring the chat.js
const Chat= require("./models/chat.js");
// ejs
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
// for public folder
app.use(express.static(path.join(__dirname,"public")));
//for req.body ke data ku read karne ke liye
app.use(express.urlencoded({extended:true}));

// method override
// for patch, delete and put request
const methodOverride = require('method-override');
app.use(methodOverride('_method'));


// connecting to mongodb
let connect_db= async ()=>{
    try {
       await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
    console.log("the mongodb is connected");

    } catch (e) {
       console.log(e.message,"some error in db");
       
    }
}
connect_db();
app.get("/",((req,res)=>{
    res.send(" hello i am root");
}))
// Index Route
app.get("/chats",(async (req,res)=>{
    // console.log("hello from chats");
    //
    let allchats= await Chat.find();
    // console.log(allchats);
   res.render("index.ejs",{allchats});
}))
// New Route
app.get("/chats/new",async(req,res)=>{
    // console.log("add new user");
    // res.send("add new user")
    res.render("new.ejs");
})
// create route
app.post("/chats",((req,res)=>{

// form se data ku lenge ab
let{ from,to,message}= req.body;
// jo data aya form se uske liye new object banare 
   let newchat= new Chat({
    from: from,
    to: to,
    message: message,
    created_at: new Date(),
   });
   // data jo ara hamare pass ham usku date lagake send karre databse me 

   newchat.save().then(res =>{
    console.log(" the user addedd successfully");
   }).catch(e =>{
    console.log(e.message);
   })
   res.redirect("/chats");
}))
// Edit route
app.get("/chats/:id/edit",(async(req,res)=>{

  try {
    let {id}= req.params;
    let chat= await Chat.findById(id);
 
     console.log("the user edit");
     res.render("edit.ejs",{chat})
     // res.send("edit route working here ")
    
  } catch (e) {
    console.log(e.message)
    
  }
}));
// Update route
app.patch("/chats/:id",(async(req,res)=>{
    console.log("the patch is working");
    let { id}= req.params;
    let{message:message}= req.body;
    console.log(message)
    let updatechat= await Chat.findByIdAndUpdate(id,
        {message:message,updated_at:new Date()},
        {runValidators:true,new:true});
    console.log(updatechat)
    // res.send("the patch is wroking here ")
    res.redirect("/chats");
}))
//Delete Ejs Form
app.get("/chats/:id/delete",(async(req,res)=>{
    try {
        let{ id}= req.params;
        let chat= await Chat.findById(id);
        res.render("delete.ejs",{chat})
        
    } catch (e) {
        console.log("some error in deleting the user",e.message);
        
    }
}))
// delete route
app.delete("/chats/:id",(async(req,res)=>{
   try {
    let{ id}= req.params;
    let delChat= await Chat.findByIdAndDelete(id);
    console.log(delChat);
    res.redirect("/chats");
   } catch (e) {
    console.log(e.message)
    
   }
}))
// search route
app.get("/chats/search", async (req, res) => {
    try {
      let { from } = req.query;
      console.log("Searching chats for user:", from);
  
      let results = await Chat.find({
        $or: [{ from: from }, { to: from }]
      });
  
      res.render("searchResults.ejs", { results, searchUser: from });
    } catch (e) {
      console.log(e.message);
      res.send("Some error occurred.");
    }
  });
  
app.listen(port,()=>{
    console.log(`the app is listening on the port ${port}`);
})