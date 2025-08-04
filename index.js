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
const ExpressError = require("../utils/ExpressError.js");
const asyncWrap = require("../utils/AsyncWrap.js");


// connecting to mongodb
let connect_db= async ()=>{
    try {
       await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
    console.log("the mongodb is connected");

    } catch (e) {
       console.log(e.message,"some error in db");
       process.exit(1);
       
    }
}
connect_db();
app.get("/",((req,res)=>{
res.redirect("/chats")
}))
// Index Route
app.get("/chats",(async (req,res,next)=>{
    // console.log("hello from chats");
   try{
     //
    let allchats= await Chat.find();
    // console.log(allchats);
   res.render("index.ejs",{allchats});
   }catch(err){
    next(err);
   }
}))
// search route
app.get("/chats/search", async (req, res, next) => {
  try {
    let { from } = req.query;
    console.log("Searching chats for user:", from);

    if (!from) {
      return next(new ExpressError(404, "User not found"));
    }
   
    let results = await Chat.find({
      $or: [{ from: from }, { to: from }]
    });
    // if(results.length===0){
    //   return next( new ExpressError(404,"chat not found"));
    // }

    res.render("searchResults.ejs", { results, searchUser: from });
  } catch (e) {
    next(e);
  }
});
// New Route
app.get("/chats/new",async(req,res)=>{
    // console.log("add new user");
    // res.send("add new user")
    res.render("new.ejs");
})
// create route
app.post("/chats",(async(req,res,next)=>{

// form se data ku lenge ab
try {
  let{ from,to,message}= req.body;
// jo data aya form se uske liye new object banare 
   let newchat= new Chat({
    from: from,
    to: to,
    message: message,
    created_at: new Date(),
   });
   // data jo ara hamare pass ham usku date lagake send karre databse me 

    await newchat.save();
   res.redirect("/chats");
  
} catch (err) {
  next(err);
}
}));
// function asyncWrap(fn){
//     return function (req,res,next){
//         fn(req,res,next).catch((err)=>{
//             console.log(err.message);
//             next(err);
//         })
//     }

// }
// Show
app.get("/chats/:id", asyncWrap((async (req, res, next) => {
    const { id } = req.params;
  const chat = await Chat.findById(id);
  if (!chat){ 
    return next(new ExpressError(404, "Chat not found"))
  };
  res.render("show.ejs", { chat });
    //agar koe bhi error ayega mongoose ka ya phir aysnc function ka to error dono way me call honge and epress bydefualt error thorew karega
})));
//Edit route
app.get("/chats/:id/edit",(async(req,res,next)=>{

  try {
    let {id}= req.params;
    let chat= await Chat.findById(id);
 
     console.log("the user edit");
     res.render("edit.ejs",{chat})
     // res.send("edit route working here ")
    
  } catch (e) {
    next(e);
    
  }
}));
// Update route
app.patch("/chats/:id",(async(req,res,next)=>{
   try{
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
   }catch(e){
    next(e);
   }
}))
//Delete Ejs Form
app.get("/chats/:id/delete",(async(req,res,next)=>{
    try {
        let{ id}= req.params;
        let chat= await Chat.findById(id);
        res.render("delete.ejs",{chat})
        
    } catch (e) {
        console.log("some error in deleting the user",e.message);
        next(e);
        
    }
}))
// delete route
app.delete("/chats/:id",(async(req,res,next)=>{
   try {
    let{ id}= req.params;
    let delChat= await Chat.findByIdAndDelete(id);
    console.log(delChat);
    res.redirect("/chats");
   } catch (e) {
    console.log(e.message)
    next(e);
    
   }
}))


//defining the custom error handler middlware 
app.use((err,req,res,next)=>{
  let {status=500,message="something has brokern"}= err;
  res.status(status).send(message);
})
app.listen(port,()=>{
    console.log(`the app is listening on the port ${port}`);
})