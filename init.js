const mongoose= require("mongoose");
// requiring the chat.js
const Chat= require("./models/chat.js");


let connect_db= async()=>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
        console.log("the mongodb is connected");   
        
    } catch (e) {
        console.log("some error in db", e.message);
    }
}
connect_db();
let allChats=[
    {
      "from": "Misty Thompson",
      "to": "Tamara Jefferson",
      "message": "JazakAllah bhai, tumhara message mila.",
      "created_at": new Date(),
    },
    {
      "from": "Vincent Vasquez",
      "to": "Michael Singleton",
      "message": "Bhai, chai pe bulalo kabhi 😄",
      "created_at": new Date(),
    },
    {
      "from": "Angela Beard",
      "to": "Caitlyn Garcia",
      "message": "Assalamualaikum bhai, kaise ho?",
      "created_at": new Date(),
    },
    {
      "from": "Melinda Todd",
      "to": "Hannah Thomas",
      "message": "Assalamualaikum bhai, kaise ho?",
      "created_at": new Date(),
    },
    {
      "from": "Nicholas Johnson",
      "to": "Samantha Chase",
      "message": "JazakAllah bhai, tumhara message mila.",
      "created_at": new Date(),
    },
    {
      "from": "Jessica Carson",
      "to": "Adam Moore",
      "message": "Coding ka kaam kaisa chal raha hai?",
      "created_at": new Date(),
    },
    {
      "from": "Victoria Allen",
      "to": "Donald Hall",
      "message": "JazakAllah bhai, tumhara message mila.",
      "created_at": new Date(),
    },
    {
      "from": "Sean Lowe",
      "to": "Christopher Rogers",
      "message": "Kya haal hai ghar walon ka?",
      "created_at": new Date(),
    },
    {
      "from": "Taylor Daniel",
      "to": "Michael Lewis",
      "message": "Mama ki tabiyat kaisi hai ab?",
      "created_at": new Date(),
    },
    {
      "from": "Victoria Webster",
      "to": "Dr. Steven Munoz",
      "message": "Mama ki tabiyat kaisi hai ab?",
      "created_at": new Date(),
    },
    {
        from:"malik",
        to:"ayaan",
        message:"bhai what about the 23 rd plan for the foundation day",
        created_at: new Date(),

    }
  ]
  
// yahaan pe chat hamare ke table/collcetion ka name hai and ham insertmany ki madad se data ku insert krre
Chat.deleteMany({});
  Chat.insertMany(allChats).then( res =>{
    console.log("the new and old data are inserted successfully 🤝");
  }).catch(e =>{
    console.log("some error in while inserting the data",e.message);
  })