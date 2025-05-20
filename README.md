# 📚 Book Review API

A RESTful backend API for a Book Review platform built with **Node.js**, **Express**, and **MongoDB**. This API allows users to sign up, log in, add books, post reviews, and search/filter content — all secured with JWT authentication.

---

## 🚀 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens (JWT)
- **Environment Config:** dotenv

---

## 📦 Features

- ✅ User registration and login
- 🔐 JWT-based authentication for protected routes
- 📘 Book management (create, fetch, filter)
- ✍️ Submit one review per user per book
- 📝 Edit/delete your own reviews
- 🔍 Search books by title or author
- 📄 Pagination support for books and reviews

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Kedari534/book-review-api.git
cd book-review-api
2. Install Dependencies
bash
Copy code
npm install
3. Configure Environment Variables
Create a .env file in the root folder:

env
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
⚠️ Important: Do not share your .env file publicly or push it to GitHub.

4. Run the Server
bash
Copy code
npm start
Server should be running at: http://localhost:5000

📬 API Endpoints
🔐 Auth
Method	Endpoint	Description
POST	/signup	Register a new user
POST	/login	Login and return JWT

📘 Books
Method	Endpoint	Description
POST	/books	Add a book (Auth required)
GET	/books	List all books (pagination + filters)
GET	/books/:id	Get book details, avg rating, reviews

✍️ Reviews
Method	Endpoint	Description
POST	/books/:id/reviews	Add a review (1/user/book)
PUT	/reviews/:id	Update your own review
DELETE	/reviews/:id	Delete your own review

🔍 Search
Method	Endpoint	Description
GET	/search	Search books by title or author

