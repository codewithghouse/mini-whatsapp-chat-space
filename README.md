# 💬 Mini WhatsApp (Anonymous Chat App)

This is a simple anonymous chat application built using **Node.js**, **Express**, **MongoDB**, and **EJS templating engine**. It allows users to create, update, delete, and search chats between users – similar to a mini version of WhatsApp.

---

## 🔧 Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** EJS Templates, HTML5, CSS3
- **Database:** MongoDB using Mongoose
- **Middleware:** Method-Override (for PATCH/DELETE via forms)

---

## 📁 Folder Structure

project/
│
├── models/
│ └── chat.js # Mongoose schema
│
├── views/
│ ├── index.ejs # Home page (All chats)
│ ├── new.ejs # Create new chat
│ ├── edit.ejs # Edit chat message
│ ├── delete.ejs # Delete confirmation
│ └── searchResults.ejs # Search results
│
├── public/
│ └── index.css # Styling for UI
│
├── app.js (or index.js) # Main Express app
├── package.json
└── README.md # Project Info


---

## 🚀 How to Run Locally

### 1. Clone the Repo
```bash
git clone https://github.com/your-username/mini-whatsapp.git
cd mini-whatsapp
##  Install Dependencies
 Install Dependencies

 ## Start MongoDB
Make sure MongoDB is running locally on mongodb://127.0.0.1:27017/.

If using MongoDB Compass:

Create a database named: whatsapp

Collection: chats

## . Run the App
node index.js
Now visit 👉 http://localhost:3000/chats

## 🛠️ Features
✅ Add New Chat (from → to → message)

✅ Edit Message

✅ Delete Chat

✅ Search chats by user name (from or to)

✅ View Chat Timestamps (created & updated)

## 📷 Screenshots
![alt text](<Screenshot (1).png>)

## 🙏 Acknowledgements
This project was inspired by learning Node.js & MongoDB.

UI design idea by [Codewithghouse].

##💡 Future Improvements
Add user authentication

Real-time chat using Socket.io

Chat timestamps formatting (e.g., 3 mins ago)

Responsive layout with better UI/UX

## 📬 Contact
Made with ❤️ by [codewithghouse]