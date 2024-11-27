
# 🎉 AuctionBazar 🎉

**AuctionBazar** is an innovative online auction platform that empowers users to buy and sell items in real-time auctions. With secure authentication, real-time bidding, and a user-friendly interface, AuctionBazar is your go-to solution for online auctions.

---

## 🌟 Features 🌟

- 🔐 **User Authentication**: Secure login, registration, and JWT-based authentication.
- 🔄 **Password Recovery**: Easily request a password reset via email.
- 🛒 **Auction Listings**: View, create, and manage auction listings.
- 💰 **Bidding**: Place bids on live auctions and track ongoing bids.
- ⏱️ **Real-Time Updates**: Receive instant updates on auction status and bids.
- 📱 **Responsive Design**: Optimized for both mobile and desktop devices.
- 🛡️ **Secure Transactions**: Data encryption and secure user authentication for safe transactions.

---

## 🛠️ Technologies Used 🛠️

### Frontend

- **Angular** ⚙️: A powerful platform for building dynamic web applications.
- **TypeScript** 🔤: JavaScript with type-safety and better tooling.
- **HTML5 & CSS3** 📝: Core web technologies for content and styling.
- **SCSS** 🎨: Extended CSS with more powerful features.
- **Bootstrap** 📱: Responsive framework for mobile-first websites.

### Backend

- **Node.js** 🚀: JavaScript runtime for building server-side applications.
- **Express.js** 🌐: A minimal web framework for Node.js to build APIs quickly.
- **MongoDB** 🗃️: A NoSQL database for storing data efficiently.
- **Mongoose** 🐱: ODM (Object Data Modeling) for MongoDB to interact with data.
- **JWT (JSON Web Token)** 🔑: Secure token-based user authentication.
- **Nodemailer** ✉️: Email service for password reset functionality.
- **Crypto** 🔒: Secure random token generation for password resets.

---

## 🚀 Project Setup 🚀

Follow the steps below to set up **AuctionBazar** on your local machine.

### 🔑 Prerequisites

- **Node.js** (Version >= 14.x)
- **npm** (Node package manager)
- **MongoDB** (Local or cloud-based instance like MongoDB Atlas)
- **Angular CLI** (For running the frontend)

---

### 1. 🧑‍💻 Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/AuctionBazar.git
cd AuctionBazar
```

### 2. ⚙️ Backend Setup

Navigate to the `backend` folder and install dependencies:

```bash
cd backend
npm install
```

#### Configure Environment Variables

In the `backend` folder, create a `.env` file and add the following:

```
EMAIL_USER=your-email@example.com
EMAIL_PASSWORD=your-email-password
MONGO_URI=mongodb://localhost:27017/auctionbazar
JWT_SECRET=your-jwt-secret
PORT=3000
```

- `EMAIL_USER` and `EMAIL_PASSWORD`: Used for sending emails (like password reset links).
- `MONGO_URI`: Your MongoDB connection string.
- `JWT_SECRET`: The secret key for JWT token generation.
- `PORT`: The port your backend will run on.

### 3. 🚀 Run the Backend

To start the backend server:

```bash
npm run dev
```

This will run the backend server on `http://localhost:3000`.

---

### 4. 🖥️ Frontend Setup

Navigate to the `frontend` folder and install the dependencies:

```bash
cd frontend
npm install
```

---

### 5. 🚀 Run the Frontend

To run the frontend:

```bash
ng serve
```

The frontend will be available at `http://localhost:4200`.

---

### 6. 🏠 Open the Application

Once both the frontend and backend are running, open your browser and visit `http://localhost:4200` to start using **AuctionBazar**!

---

## 📡 API Endpoints 📡

### 1. **User Authentication**

- **POST /api/auth/signup**: Register a new user with email, name, and password.
- **POST /api/auth/login**: Authenticate and receive a JWT token for secure access.
- **POST /api/auth/forgot-password**: Request a password reset link via email.
- **POST /api/auth/reset-password**: Reset your password using a secure token.

---

## 🏆 License 🏆

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

## 👩‍💻 Contributions 👨‍💻

We welcome contributions! If you'd like to contribute to **AuctionBazar**, please fork the repository, create a feature branch, and submit a pull request. Ensure your code passes all tests and adheres to the project's coding standards.

---

## 💬 Support 💬

If you have any questions or need assistance, feel free to open an issue or contact us via [email](mailto:ankushpatil2002@gmail.com).

---

Happy bidding! 🎉
